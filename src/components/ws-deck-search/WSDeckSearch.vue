<script lang="tsx">
import { defineComponent, PropType, ref, watch } from 'vue';
import { SearchModel } from '../../types/search-model';
import { OptionLabel } from '../../types/optionLabel';
import { WsMinMax } from './components';
import InputText from 'primevue/inputtext';
import MultiSelect from 'primevue/multiselect';
import Card from 'primevue/card';

export default defineComponent({
  name: 'ws-deck-search',
  components: { Card, InputText, MultiSelect, WsMinMax },
  props: {
    searchModel: {
      type: Object as PropType<SearchModel>,
      default: () => new SearchModel()
    },
    availableColors: {
      type: Array as PropType<OptionLabel<string>[]>,
      default: () => []
    },
    availableSouls: {
      type: Array as PropType<OptionLabel<string>[]>,
      default: () => []
    },
    availableTraits: {
      type: Array as PropType<OptionLabel<string>[]>,
      default: () => []
    },
    availableTypes: {
      type: Array as PropType<OptionLabel<string>[]>,
      default: () => []
    },
    availableTriggers: {
      type: Array as PropType<OptionLabel<string>[]>,
      default: () => []
    }
  },
  render() {
    const searchArea = (
      <div class="ws-deck-search__body">
        <div class="ws-deck-search__body--name input-block">
          <label>Name</label>
          <input-text
            modelValue={this.searchModel.name}
            onInput={($event: string) => this.$emit('update.searchModel', { ...this.searchModel, name: $event })}
          ></input-text>
        </div>
        <div class="ws-deck-search__body--effect input-block">
          <label>Effect</label>
          <input-text></input-text>
        </div>
        <div class="ws-deck-search__body--color input-block">
          <label>Color</label>
          <multi-select
            v-model={this.searchModel.colors}
            optionLabel="display"
            optionValue="value"
            options={this.availableColors}
            filter={true}
          ></multi-select>
        </div>
        <div class="ws-deck-search__body--type input-block">
          <label>Type</label>
          <multi-select
            v-model={this.searchModel.types}
            optionLabel="display"
            optionValue="value"
            options={this.availableTypes}
            filter={true}
          ></multi-select>
        </div>
        <div class="ws-deck-search__body--trait input-block">
          <label>Trait</label>
          <multi-select
            v-model={this.searchModel.traits}
            optionLabel="display"
            optionValue="value"
            options={this.availableTraits}
            filter={true}
          ></multi-select>
        </div>
        <div class="ws-deck-search__body--triggers input-block">
          <label>Trigger</label>
          <multi-select
            v-model={this.searchModel.triggers}
            optionLabel="display"
            optionValue="value"
            options={this.availableTriggers}
            filter={true}
          ></multi-select>
        </div>
        <div class="ws-deck-search__body--level input-block">
          <label>Level</label>
          <ws-min-max></ws-min-max>
        </div>
        <div class="ws-deck-search__body--cost input-block">
          <label>Cost</label>
          <input-text></input-text>
        </div>
        <div class="ws-deck-search__body--power input-block">
          <label>Power</label>
          <input-text></input-text>
        </div>
        <div class="ws-deck-search__body--soul input-block">
          <label>Souls</label>
          <multi-select
            v-model={this.searchModel.souls}
            optionLabel="display"
            optionValue="value"
            options={this.availableSouls}
            filter={true}
          ></multi-select>
        </div>
      </div>
    );

    return <card class="ws-deck-search" v-slots={{ content: () => searchArea }}></card>;
  }
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
