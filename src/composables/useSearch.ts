import { WSCard } from '@ws/shared';
import { computed, reactive } from 'vue';
import { SearchModel } from '../types/search-model';

const state = reactive({
  searchModel: {} as SearchModel,
  cards: [] as WSCard[],
  results: [] as WSCard[],
  availableColors: [] as string[],
  availableSouls: [] as string[],
  availableTraits: [] as string[],
  availableTypes: [] as string[],
  availableTriggers: [] as string[],
});

//@ts-ignore
if (!window.state) {
  //@ts-ignore
  window.state = {};
}

//@ts-ignore
window.state.search = {};

async function setUp() {
  await loadResults();
  await loadOptions();
}

async function loadOptions() {
  state.availableColors = state.cards.reduce((acc, card) => (acc.includes(card.color) ? acc : acc.concat(card.color)), [] as string[]).sort();
  state.availableSouls = state.cards.reduce((acc, card) => (acc.includes('' + card.soul) ? acc : acc.concat('' + card.soul)), [] as string[]).sort();
  state.availableTraits = state.cards.reduce((acc, card) => mergeArray(acc, card.trait?.en ?? []), [] as string[]).sort();
  state.availableTriggers = state.cards.reduce((acc, card) => mergeArray(acc, card.triggers ?? []), [] as string[]).sort();
  state.availableTypes = state.cards.reduce((acc, card) => (acc.includes(card.type) ? acc : acc.concat(card.type)), [] as string[]).sort();
}

async function loadResults() {
  const { cards } = (await import('../test-data/database.json')) as { cards: WSCard[] };
  state.cards = cards;
}

function setSearchModel(searchModel: SearchModel) {
  state.searchModel = searchModel;
  filterCards(state.cards);
}

function updateSearchModel(key: keyof SearchModel, value: any) {
  // @ts-ignore
  state.searchModel[key] = value;
  filterCards(state.cards);
}

function getAvailableColors() {
  return computed(() => state.availableColors?.map((item) => ({ value: item, display: item })));
}

function getAvailableTriggers() {
  return computed(() => state.availableTriggers?.map((item) => ({ value: item, display: item })));
}

function getAvailableTraits() {
  return computed(() => state.availableTraits?.map((item) => ({ value: item, display: item })));
}

function getAvailableSouls() {
  return computed(() => state.availableSouls?.map((item) => ({ value: item, display: item })));
}

function getAvailableTypes() {
  return computed(() => state.availableTypes?.map((item) => ({ value: item, display: item })));
}

function getSearchModel() {
  return computed(() => state.searchModel);
}

function getResults() {
  return computed(() => state.results);
}

function useSearch() {
  return {
    setSearchModel,
    updateSearchModel,
    getSearchModel,
    getResults,
    getAvailableColors,
    getAvailableTriggers,
    getAvailableTraits,
    getAvailableSouls,
    getAvailableTypes,
    loadResults,
    loadOptions,
    setUp,
  };
}

export { useSearch };

function filterCards(cards: WSCard[]) {
  state.results = cards.filter((card) => filterCard(card));
}

function filterCard(card: WSCard) {
  const passes = [] as Boolean[];
  const { searchModel } = state;

  if (searchModel.name?.length) {
    passes.push(card.name?.en?.includes(searchModel.name));
  }

  if (searchModel.text?.length) {
    passes.push((card?.text ?? '').includes(searchModel.text));
  }

  if (searchModel.minLevel) {
    passes.push(card.level >= +searchModel.minLevel);
  }

  if (searchModel.maxLevel) {
    passes.push(card.level <= +searchModel.maxLevel);
  }

  if (searchModel.minCost) {
    passes.push(card.cost >= +searchModel.minCost);
  }

  if (searchModel.maxCost) {
    passes.push(card.cost <= +searchModel.maxCost);
  }

  if (searchModel.minPower) {
    passes.push(card.power >= +searchModel.minPower);
  }

  if (searchModel.maxPower) {
    passes.push(card.power <= +searchModel.maxPower);
  }

  if (searchModel.colors?.length) {
    passes.push(searchModel.colors.includes(card.color));
  }

  if (searchModel.souls?.length) {
    passes.push(searchModel.souls.includes(`${card.soul}`));
  }

  if (searchModel.traits?.length) {
    passes.push(hasArray(searchModel.traits, card.trait?.en ?? []));
  }

  if (searchModel.triggers?.length) {
    passes.push(hasArray(searchModel.triggers, card.triggers ?? []));
  }

  if (searchModel.types?.length) {
    passes.push(searchModel.types.includes(card.type));
  }

  return passes.every(Boolean);
}

function hasArray(searchValues: any[], cardValues: any[]) {
  if (!cardValues?.length) {
    return false;
  }

  return searchValues.every((value) => cardValues.includes(value));
}

function mergeArray<T>(current: T[], newValue: T[]) {
  return newValue.reduce((acc, value) => (acc.includes(value) ? acc : acc.concat(value)), current);
}
