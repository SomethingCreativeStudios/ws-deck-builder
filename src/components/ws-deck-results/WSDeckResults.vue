<script lang="tsx">
import { defineComponent } from 'vue';
import VirtualScroller from 'primevue/virtualscroller';
import Divider from 'primevue/divider';
import Chip from 'primevue/chip';
import Skeleton from 'primevue/skeleton';
import { WSCard } from '@ws/shared';
import { useSearch, useDeckList } from '~/composables';
import iconMap from '../../icons/icon-map.json';

export default defineComponent({
  name: 'ws-deck-results',
  components: { VirtualScroller, Skeleton, Divider, Chip },
  setup() {
    const { getResults, getSearchModel } = useSearch();

    return { results: getResults(), searchModel: getSearchModel() };
  },
  render() {
    const onImageClick = (card: WSCard) => {
      const { addCard } = useDeckList();
      addCard(card);
    };

    const onTraitClick = (trait: string) => {
      if (this.searchModel?.traits?.includes(trait)) return;
      const { updateSearchModel } = useSearch();
      updateSearchModel('traits', (this.searchModel?.traits ?? [])?.concat(trait));
    };

    const onTriggerClick = (trigger: string) => {
      if (this.searchModel?.triggers?.includes(trigger)) return;
      const { updateSearchModel } = useSearch();

      updateSearchModel('triggers', (this.searchModel?.triggers ?? []).concat(trigger));
    };

    const slots = {
      item: ({ item, options }: { item: WSCard; options: any }) => (
        <div>
          <div class="ws-deck-results__item" style={`height: ${options.last ? 166 : 150}px`}>
            <img class="ws-deck-results__item--image" src={item.imageUrl} onClick={() => onImageClick(item)}></img>
            <div class="ws-deck-results__item--name">{item.name?.en}</div>
            <div class="ws-deck-results__item--textarea">
              <div class="ws-deck-results__item--text">{item.text}</div>
            </div>
            <div class="ws-deck-results__item--traits">
              {item.trait?.en?.map((trait) => (
                <chip class="ws-deck-results__item--trait" onClick={() => onTraitClick(trait)} label={trait}></chip>
              ))}
            </div>
            <div class="ws-deck-results__item--triggers">
              {item.triggers?.map((trigger) => (
                // @ts-ignore
                <img class="ws-deck-results__item--trigger" onClick={() => onTriggerClick(trigger)} src={`icons/${iconMap[trigger]}`} />
              ))}
            </div>
          </div>
          {!options.last ? <divider></divider> : null}
        </div>
      ),
      loader: (options: any) => (
        <div style="height: 150px">
          <skeleton width={options.even ? '60%' : '50%'} height={'1.3rem'} />
        </div>
      ),
    };
    return <virtual-scroller class="ws-deck-results" items={this.results} itemSize={166} v-slots={slots}></virtual-scroller>;
  },
});
</script>

<style lang="scss" scoped>
.ws-deck-results {
}

.ws-deck-results__item {
  padding-right: 10px;

  display: grid;
  grid-template-areas:
    'image name       triggers'
    'image textarea   textarea'
    '.     traits     traits';

  grid-template-columns: 110px 1fr max-content;
  grid-template-rows: 30px 90px 1fr;
}

.ws-deck-results__item--name {
  grid-area: name;
}

.ws-deck-results__item--image {
  grid-area: image;

  width: 100px;
}

.ws-deck-results__item--textarea {
  grid-area: textarea;
  overflow: auto;
  padding-left: 5px;
}

.ws-deck-results__item--text {
}

.ws-deck-results__item--traits {
  grid-area: traits;
  padding-top: 10px;

  display: flex;
  column-gap: 10px;
}

.ws-deck-results__item--trait {
  cursor: pointer;
  user-select: none;
}

.ws-deck-results__item--triggers {
  grid-area: triggers;
}

.ws-deck-results__item--trigger {
  border-radius: 50%;
  height: 24px;

  cursor: pointer;
  user-select: none;
}
</style>
