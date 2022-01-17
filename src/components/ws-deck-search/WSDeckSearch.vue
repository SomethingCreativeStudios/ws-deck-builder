<script lang="tsx">
import { defineComponent } from 'vue';
import { useSearch } from '~/composables';
import { WsMinMax } from './components';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Card from 'primevue/card';
import { SearchModel } from '~/types/search-model';

export default defineComponent({
  name: 'ws-deck-search',
  components: { Card, InputText, MultiSelect, WsMinMax },
  setup() {
    const { getSearchModel, getAvailableColors, getAvailableTraits, getAvailableSouls, getAvailableTriggers, getAvailableTypes } = useSearch();
    return {
      searchModel: getSearchModel(),
      availableColors: getAvailableColors(),
      availableTraits: getAvailableTraits(),
      availableSouls: getAvailableSouls(),
      availableTriggers: getAvailableTriggers(),
      availableTypes: getAvailableTypes(),
    };
  },
  render() {
    const updateSearchModel = (key: keyof SearchModel, value: any) => {
      const { updateSearchModel: update } = useSearch();
      update(key, value);
    };

    const updateMinMax = (base: string, value: { min: string; max: string }) => {
      const { updateSearchModel: update } = useSearch();
      const [letter, ...rest] = base;
      // @ts-ignore
      update(`min${letter.toUpperCase()}${rest.join('')}`, value.min);
      // @ts-ignore
      update(`max${letter.toUpperCase()}${rest.join('')}`, value.max);
    };

    const searchArea = (
      <div class="ws-deck-search__body">
        <div class="ws-deck-search__body--name input-block">
          <label>Name</label>
          <input-text value={this.searchModel.name} onInput={(event: any) => updateSearchModel('name', event.target.value)}></input-text>
        </div>
        <div class="ws-deck-search__body--effect input-block">
          <label>Effect</label>
          <input-text value={this.searchModel.text} onInput={(event: any) => updateSearchModel('text', event.target.value)}></input-text>
        </div>
        <div class="ws-deck-search__body--color input-block">
          <label>Color</label>
          <multi-select
            modelValue={this.searchModel.colors}
            optionLabel="display"
            optionValue="value"
            options={this.availableColors}
            filter={true}
            onChange={(event: any) => updateSearchModel('colors', event.value)}
          ></multi-select>
        </div>
        <div class="ws-deck-search__body--type input-block">
          <label>Type</label>
          <multi-select
            modelValue={this.searchModel.types}
            optionLabel="display"
            optionValue="value"
            options={this.availableTypes}
            filter={true}
            onChange={(event: any) => updateSearchModel('types', event.value)}
          ></multi-select>
        </div>
        <div class="ws-deck-search__body--trait input-block">
          <label>Trait</label>
          <multi-select
            modelValue={this.searchModel.traits}
            optionLabel="display"
            optionValue="value"
            options={this.availableTraits}
            filter={true}
            onChange={(event: any) => updateSearchModel('traits', event.value)}
          ></multi-select>
        </div>
        <div class="ws-deck-search__body--triggers input-block">
          <label>Trigger</label>
          <multi-select
            modelValue={this.searchModel.triggers}
            optionLabel="display"
            optionValue="value"
            options={this.availableTriggers}
            filter={true}
            onChange={(event: any) => updateSearchModel('triggers', event.value)}
          ></multi-select>
        </div>
        <div class="ws-deck-search__body--soul input-block">
          <label>Souls</label>
          <multi-select
            modelValue={this.searchModel.souls}
            value={this.searchModel.souls}
            optionLabel="display"
            optionValue="value"
            options={this.availableSouls}
            filter={true}
            onChange={(event: any) => updateSearchModel('souls', event.value)}
          ></multi-select>
        </div>
        <div class="ws-deck-search__body--level input-block">
          <label>Level</label>
          <ws-min-max
            minValue={this.searchModel.minLevel}
            maxValue={this.searchModel.maxLevel}
            onUpdate={(event: { min: string; max: string }) => updateMinMax('level', event)}
          ></ws-min-max>
        </div>
        <div class="ws-deck-search__body--cost input-block">
          <label>Cost</label>
          <ws-min-max
            minValue={this.searchModel.minCost}
            maxValue={this.searchModel.maxCost}
            onUpdate={(event: { min: string; max: string }) => updateMinMax('cost', event)}
          ></ws-min-max>
        </div>
        <div class="ws-deck-search__body--power input-block">
          <label>Power</label>
          <ws-min-max
            minValue={this.searchModel.minPower}
            maxValue={this.searchModel.maxPower}
            onUpdate={(event: { min: string; max: string }) => updateMinMax('power', event)}
          ></ws-min-max>
        </div>
      </div>
    );

    return <card class="ws-deck-search" v-slots={{ content: () => searchArea }}></card>;
  },
});
</script>

<style lang="scss" scoped>
@import '../../common.scss';

.ws-deck-search__body {
  display: grid;

  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.ws-deck-search__body--name {
  grid-column: span 2;
}

.ws-deck-search__body--power {
}

.ws-deck-search__body--color {
}

.ws-deck-search__body--type {
}

.ws-deck-search__body--cost {
}

.ws-deck-search__body--soul {
}

.ws-deck-search__body--level {
}

.ws-deck-search__body--trait {
}

.ws-deck-search__body--triggers {
}

.ws-deck-search__body--effect {
  grid-column: span 2;
}
</style>
