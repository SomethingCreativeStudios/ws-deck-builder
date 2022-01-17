<script lang="tsx">
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import ContextMenu from 'primevue/contextmenu';
import { WSCard } from '@ws/shared';
import { defineComponent } from 'vue';
import { useDeckList } from '~/composables';
import { DeckGroup, DeckListGroupType, DeckListSortType } from '~/types/deck-list';

export default defineComponent({
  name: 'ws-deck-list',
  components: { Dropdown, InputText, ContextMenu },
  setup() {
    const { getGroups, getSortType, getGroupType, getAllGroupOptions, getAllSortOptions, getFilter } = useDeckList();

    return {
      groups: getGroups(),
      sortType: getSortType(),
      groupType: getGroupType(),
      allSortOptions: getAllSortOptions(),
      allGroupOptions: getAllGroupOptions(),
      filter: getFilter(),
    };
  },
  render() {
    const filterChange = (filter: string) => {
      const { setFilter } = useDeckList();
      console.log(filter);
      setFilter(filter);
    };

    const onTypeChange = (type: 'sort' | 'group', value: string) => {
      const { setGroupType, setSortType } = useDeckList();
      if (type === 'sort') {
        setSortType(value as DeckListSortType);
      }
      if (type === 'group') {
        setGroupType(value as DeckListGroupType);
      }
    };

    const buildCard = (card: WSCard) => (
      <div class="ws-card">
        <img class="ws-card__image" src={card.imageUrl}></img>
      </div>
    );

    const buildGroup = (group: DeckGroup) => (
      <div class="deck-group">
        {group.name ? <div class="deck-group__name">{`${group.name} (${group.cards.length})`}</div> : null}
        <div class="deck-group__cards">{group.cards.map(buildCard)}</div>
      </div>
    );

    const sortType = (
      <div class="action_button">
        <div class="action_button__label">Sort By</div>
        <dropdown
          class="action_button__dropdown"
          modelValue={this.sortType}
          optionLabel="name"
          optionValue="value"
          options={this.allSortOptions}
          onChange={(event: any) => onTypeChange('sort', event?.value)}
        />
      </div>
    );

    const groupType = (
      <div class="action_button">
        <div class="action_button__label">Group By</div>
        <dropdown
          class="action_button__dropdown"
          modelValue={this.groupType}
          optionLabel="name"
          optionValue="value"
          options={this.allGroupOptions}
          onChange={(event: any) => onTypeChange('group', event?.value)}
        />
      </div>
    );

    const filterBar = (
      <div class="action_button action_button--input">
        <div class="action_button__label">Filter</div>
        <input-text class="action_button__input" modelValue={this.filter} onInput={(item: any) => filterChange(item?.target?.value)}></input-text>
      </div>
    );

    return (
      <div class="ws-deck-list">
        <div class="ws-deck-list__action-bar">
          {filterBar} <div class="spacer"></div> {groupType} {sortType}
        </div>
        <div class="ws-deck-list__panel">
          <div class="ws-deck-list__list">{this.groups.map((group) => buildGroup(group))}</div>
        </div>
      </div>
    );
  },
});
</script>

<style lang="scss" scoped>
.ws-deck-list {
  position: relative;
  margin-right: 10px;
}

.ws-deck-list__panel {
  height: 100%;

  overflow: auto;
  position: relative;
}

.ws-deck-list__list {
  position: absolute;

  display: flex;
  flex-direction: column;

  width: 100%;
}

.ws-deck-list__action-bar {
  display: flex;

  column-gap: 20px;

  justify-content: end;
  margin-right: 30px;
  padding-bottom: 20px;
}

.action_button--input {
  flex: 1;
}

.action_button__input {
  width: 100%;
}

.action_button__label {
  padding-bottom: 10px;
  padding-left: 5px;
}

.deck-group__cards {
  display: flex;
  column-gap: 20px;
  row-gap: 20px;
  flex-wrap: wrap;
  padding-bottom: 20px;
}

.deck-group__name {
  font-size: 50px;
  text-transform: capitalize;
  padding-bottom: 20px;
}

.ws-card__image {
  height: 250px;
}

.spacer {
  flex: 1;
}
</style>
