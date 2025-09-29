import { config } from '@vue/test-utils';
import { createI18n } from 'vue-i18n';
import { vi } from 'vitest';
import { defineComponent, h } from 'vue';

// Setup i18n
const i18n = createI18n({
  legacy: false,
});
config.global.plugins = [i18n];

// Mock used imports @directus/extensions-sdk
vi.mock('@directus/extensions-sdk', async (importOriginal) => {
  return {
    useStores: () => ({
      useNotificationsStore: () => ({
        add: vi.fn(),
      }),
      useSettingsStore: () => ({
        project_url: 'http://example.com',
      }),
    })
  }
});

// List of global Directus components to stub
const globalDirectusComponents: string[] = [
  "v-avatar",
  "v-badge",
  "v-breadcrumb",
  "v-button",
  "v-card",
  "v-card-actions",
  "v-card-subtitle", 
  "v-card-text",
  "v-card-title",
  "v-checkbox",
  "v-checkbox-tree",
  "v-chip",
  "v-detail",
  "v-dialog",
  "v-divider",
  "v-error",
  "v-fancy-select",
  "v-field-template",
  "v-collection-field-template",
  "v-field-list",
  "v-form",
  "v-hover",
  "v-highlight",
  "v-icon",
  "v-image",
  "v-icon-file",
  "v-info",
  "v-input",
  "v-item-group",
  "v-item",
  "v-list-group",
  "v-list-item-hint",
  "v-list-item-icon",
  "v-remove",
  "v-list-item",
  "v-list",
  "v-menu",
  "v-drawer",
  "v-notice",
  "v-overlay",
  "v-pagination",
  "v-progress-circular",
  "v-progress-linear",
  "v-radio",
  "v-resizeable",
  "v-select",
  "v-skeleton-loader",
  "v-slider",
  "v-tab-item",
  "v-tab",
  "v-table",
  "v-tabs-items",
  "v-tabs",
  "v-template-input",
  "v-textarea",
  "v-text-overflow",
  "v-upload",
  "v-date-picker",
  "v-emoji-picker",
  "v-workspace",
  "v-workspace-tile",
  "v-error-boundary"
];

const globalDirectusPrivateComponents: string[] = [
  "value-null",
];


const allGlobalComponents = [
  ...globalDirectusComponents,
  ...globalDirectusPrivateComponents,
];

// Register global stubs
config.global.stubs = {
  ...Object.fromEntries(allGlobalComponents.map(component => [component, true])),
};



// Mock global directive tooltip
config.global.directives = {
  tooltip: {
    beforeMount(el, binding) {
      if (binding.value) {
        el.setAttribute('data-tooltip', binding.value);
      }
    },
    updated(el, binding) {
      if (binding.value) {
        el.setAttribute('data-tooltip', binding.value);
      } else {
        el.removeAttribute('data-tooltip');
      }
    },
    unmounted(el) {
      el.removeAttribute('data-tooltip');
    }
  }
};