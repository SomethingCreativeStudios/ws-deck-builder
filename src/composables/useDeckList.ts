import { WSCard } from '@ws/shared';
import { computed, reactive } from 'vue';
import { DeckGroup, DeckListError, DeckListGroupType, DeckListSortType, WSDeckRules } from '~/types/deck-list';

const state = reactive({
  deck: [] as WSCard[],
  rules: {} as WSDeckRules,
  groups: [] as DeckGroup[],
  filter: '',
  groupType: DeckListGroupType.TYPE,
  sortType: DeckListSortType.LEVEL,
});

//@ts-ignore
if (!window.state) {
  //@ts-ignore
  window.state = {};
}

//@ts-ignore
window.state.decklist = {};

async function setUp() {
  const rules = (await import('../components/ws-deck-list/deck-rules'))?.rules;
  state.rules = rules;
}

function addCard(card: WSCard) {
  const cardError = cardMeetsRules(card);

  if (cardError === DeckListError.NO_ERROR_FOUND) {
    state.deck.push(card);
    buildGroups(state.deck);
    return null;
  }

  return cardError;
}

function removeCard(card: WSCard) {
  state.deck = state.deck.filter((foundCard) => foundCard.name !== card.name);
  buildGroups(state.deck);
}

function getGroups() {
  return computed(() => state.groups);
}

function getSortType() {
  return computed(() => state.sortType);
}

function getGroupType() {
  return computed(() => state.groupType);
}

function getAllSortOptions() {
  return [
    { name: 'Color', value: DeckListSortType.COLOR },
    { name: 'Level', value: DeckListSortType.LEVEL },
    { name: 'Type', value: DeckListSortType.TYPE },
    { name: 'Power', value: DeckListSortType.POWER },
  ];
}

function getAllGroupOptions() {
  return [
    { name: 'Color', value: DeckListGroupType.COLOR },
    { name: 'Level', value: DeckListGroupType.LEVEL },
    { name: 'Type', value: DeckListGroupType.TYPE },
    { name: 'No Group', value: DeckListGroupType.NONE },
  ];
}

function getFilter() {
  return computed(() => state.filter);
}

function setSortType(sortType: DeckListSortType) {
  state.sortType = sortType;
  buildGroups(state.deck);
}

function setFilter(filter: string) {
  state.filter = filter;
  buildGroups(state.deck);
}

function setGroupType(groupType: DeckListGroupType) {
  state.groupType = groupType;
  buildGroups(state.deck);
}

export function useDeckList() {
  return { setUp, addCard, removeCard, getGroups, getGroupType, getSortType, getAllGroupOptions, getFilter, getAllSortOptions, setGroupType, setFilter, setSortType };
}

function buildGroups(cards: WSCard[]) {
  const groupNames = findGroupNames(cards, state.groupType);
  state.groups = groupNames.map((name) => buildGroup(name, state.groupType, state.sortType, state.filter, cards));
}

function buildGroup(groupName: string, groupType: DeckListGroupType, sortType: DeckListSortType, filter: string, cards: WSCard[]) {
  const groupedCards = cards.filter((card) => {
    if (groupType === DeckListGroupType.COLOR) {
      return card.color === groupName;
    }

    if (groupType === DeckListGroupType.LEVEL) {
      return card.level === +groupName;
    }

    if (groupType === DeckListGroupType.TYPE) {
      return card.type === groupName;
    }

    if (groupType === DeckListGroupType.NONE) {
      return card;
    }
  });

  return { name: groupName, cards: sortCards(groupedCards, filter, sortType) } as DeckGroup;
}

function sortCards(cards: WSCard[], filter: string, sortType: DeckListSortType): WSCard[] {
  return cards
    .sort((card1, card2) => {
      if (sortType === DeckListSortType.COLOR) {
        card1.color === card2.color ? 1 : -1;
      }

      if (sortType === DeckListSortType.LEVEL) {
        card1.level === card2.level ? 1 : -1;
      }

      if (sortType === DeckListSortType.POWER) {
        card1.power === card2.power ? 1 : -1;
      }

      if (sortType === DeckListSortType.TYPE) {
        card1.type === card2.type ? 1 : -1;
      }

      return 0;
    })
    .filter((card) => card.name.en?.toLowerCase()?.includes(filter.toLowerCase()));
}

function findGroupNames(cards: WSCard[], groupType: DeckListGroupType) {
  if (groupType === DeckListGroupType.COLOR) {
    return cards.reduce((acc, card) => (acc.includes(card.color) ? acc : acc.concat(card.color)), [] as string[]);
  }

  if (groupType === DeckListGroupType.LEVEL) {
    return cards.reduce((acc, card) => (acc.includes('' + card.level) ? acc : acc.concat('' + card.level)), [] as string[]);
  }

  if (groupType === DeckListGroupType.TYPE) {
    return cards.reduce((acc, card) => (acc.includes(card.type) ? acc : acc.concat(card.type)), [] as string[]);
  }

  if (groupType === DeckListGroupType.NONE) {
    return [''];
  }

  return ['NOT FOUND'];
}

function cardMeetsRules(card: WSCard): DeckListError {
  const numberOfClimax = state.deck.filter((foundCard) => foundCard.type === 'climax');
  const sameCard = state.deck.filter((foundCard) => foundCard.name === card.name);

  if (state.deck.length + 1 > state.rules.maxDeckSize) {
    return DeckListError.DECK_LIMIT_REACHED;
  }

  if (card.type === 'climax' && numberOfClimax.length + 1 > state.rules.maxClimaxCards) {
    return DeckListError.CLIMAX_CARDS_LIMIT_REACHED;
  }

  if (sameCard.length + 1 > state.rules.maxNumberOfSingleCard) {
    return DeckListError.SINGLE_CARD_LIMIT_REACHED;
  }

  return DeckListError.NO_ERROR_FOUND;
}
