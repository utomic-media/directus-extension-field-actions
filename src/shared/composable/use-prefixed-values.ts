import { computed } from 'vue';
import { useStores } from '@directus/extensions-sdk';
import { replaceVariables } from '../utils/replace-variables'; 

export function usePrefixedValues(props: any) {
  const variables = {
    project_url: useStores().useSettingsStore().settings?.project_url || '',
  };
  
  // TODO: make sure it's always a valid link (absolute + relative)
  const computedLink = computed(() => {
    if (!props.linkPrefix) {
      return props.value;
    }

    const prefix = replaceVariables(props.linkPrefix, variables);
    return `${prefix}${props.value}`;
  });

  const computedCopyValue = computed(() => { 
    if (!props.copyPrefix) {
      return props.value;
    }

    const prefix = replaceVariables(props.copyPrefix, variables);
    return `${prefix}${props.value}`;
  });

  return { computedLink, computedCopyValue };
}