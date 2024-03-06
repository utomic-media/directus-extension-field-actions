<template>
  <span 
    class="defa-link-wrapper"
    @click="handleClick"
  >
    <test>{{ props.safeMode }}</test>
    <slot />

    <v-dialog 
      :model-value="activeDialog"
      @esc="activeDialog = null"
      @update:model-value="activeDialog = null"
    >
      <v-card>
        <v-card-title>Open Link</v-card-title>
        <v-card-text>
          <p>Are you sure you want to open this link?</p>
          <code>{{ props.href }}</code>
          <p>
            <em>Note: You can permanently disable this warning in the display / interface settings</em>
          </p>
        </v-card-text>
        <v-card-actions>
          <!-- <v-button secondary @click="activeDialog = null">{{ t('cancel') }}</v-button> -->
          <v-button secondary @click="activeDialog = null">Cancel</v-button>
          <v-button
            :href="href"
            :target="target"
          >
            Open Link
          </v-button >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>



<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps({
  target: {
    type: String,
    default: '_blank',
  },
  href: {
    type: String,
    required: true,
  },
  safeMode: {
    type: Boolean,
    default: false,
  },
});


const activeDialog = ref(false);


function handleClick(e: MouseEvent) {
  const isExternal = new URL(props.href).origin !== window.location.origin;

  if (props.safeMode && isExternal) {
    activeDialog.value = true;
    return;
  }

  window.open(props.href, props.target, 'noopener, noreferrer');
  return;
}
</script>



<style scoped lang="scss">
</style>