<template>
  <div 
    class="defa-link-wrapper"
    @click="handleClick"
  >
    <slot />

    <v-dialog 
      :model-value="activeDialog"
      @esc="activeDialog = false"
      @update:model-value="activeDialog = false"
    >
      <v-card>
        <v-card-title>{{ t('field_actions.open_link_confirm') }}</v-card-title>
        <v-card-text>
          <div class="defa-link-preview">
            <code>{{ props.href }}</code>
          </div>
          
          <em>{{ t('field_actions.note') }}: {{ t('field_actions.open_link_confirm_disable_note') }}</em>
        </v-card-text>
        <v-card-actions>
          <v-button secondary @click="activeDialog = false">{{ t('cancel') }}</v-button>
          <v-button
            :href="href"
            :target="target"
            @click="activeDialog=false"
          >
            Open link
          </v-button >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>



<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

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

const { t } = useI18n();

const activeDialog = ref(false);


function handleClick(e: MouseEvent) {
  const isExternal = new URL(props.href, window.location.origin).origin !== window.location.origin;

  if (props.safeMode && isExternal) {
    activeDialog.value = true;
    return;
  }

  window.open(props.href, props.target, 'noopener, noreferrer');
  return;
}
</script>



<style scoped lang="scss">
.defa-link-preview {
  background-color: var(--theme--background-normal);
  padding: 1rem;
}

em {
  display: block;
  font-size: 0.875rem;
  margin-top: 0.5rem;
}

code {
  overflow-wrap: break-word;
}
</style>