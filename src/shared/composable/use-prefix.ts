import { computed } from 'vue';
import { useStores } from '@directus/extensions-sdk';


export function usePrefix(prefixProp: any) { 
  const computedPrefix = computed(() => {
    if (prefixProp === '$project_url') {
      const settingsStore = useStores().useSettingsStore();
      return settingsStore.settings?.project_url || "";
    }

    return prefixProp || '';
  });
  
  return computedPrefix;
}

