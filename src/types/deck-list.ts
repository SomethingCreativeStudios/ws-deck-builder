import { WSCard } from '@ws/shared';

export interface DeckRules {
  maxDeckSize: number;
  minDeckSize: number;
  maxNumberOfSingleCard: number;
}

export interface WSDeckRules extends DeckRules {
  maxClimaxCards: number;
  minClimaxCards: number;
}

export enum DeckListSortType {
  COLOR = 'color',
  LEVEL = 'level',
  TYPE = 'type',
  POWER = 'power',
}

export enum DeckListGroupType {
  COLOR = 'color',
  LEVEL = 'level',
  TYPE = 'type',
  NONE = 'none',
}

export interface DeckGroup {
  name: string;
  cards: WSCard[];
}

export enum DeckListError {
  DECK_LIMIT_REACHED = 'deck-to-large',
  CLIMAX_CARDS_LIMIT_REACHED = 'climax-cards-limit-reached',
  SINGLE_CARD_LIMIT_REACHED = 'single card limit reached',
  NO_ERROR_FOUND = 'no-error-found',
}
