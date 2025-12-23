<template>
  <div class="defa-click-action-wrapper">
    <!-- NOTE: use @click.stop to prevent parent/item click handlers (e.g., opening the item page) -->
    <link-wrapper
      v-if="clickAction === 'link'"
      :href="computedLink"
      :target="openLinkAsNewTab ? '_blank' : '_self'"
      :safeMode="openLinkSafeMode === 'always'"
      v-tooltip="actionTooltip"
      @click.stop
    >
      <slot />
    </link-wrapper>

    <div
      v-else
      v-tooltip="actionTooltip"
      @click="valueClickAction($event)"
    >
      <slot />
    </div>
  </div>
</template>



<script setup lang="ts">
import LinkWrapper from './LinkWrapper.vue';
import type { ClickAction } from '../types';

const props = defineProps<{
  clickAction: ClickAction;
  computedLink: string;
  openLinkAsNewTab?: boolean;
  openLinkSafeMode?: string;
  actionTooltip?: string | null;
  disabled: boolean;
}>();

const emit = defineEmits<{
  copy: [];
}>()


function valueClickAction(e: Event) {
  if (props.clickAction === 'copy' && props.disabled) {
    e.stopPropagation();
    emit('copy');
  }
  // else go on with the default events
}
</script>



<style scoped lang="scss">
.defa-click-action-wrapper,
.defa-click-action-wrapper div {
  width: 100%;
}
</style>