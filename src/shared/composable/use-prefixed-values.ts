import { computed } from 'vue';
import { usePrefix } from './use-prefix';

export function usePrefixedValues(props: any) {

  // TODO: make sure it's always a valid link (absolute + relative)

  const computedLink = computed(() => {
    const prefix = usePrefix(props.linkPrefix);
    return prefix.value + props.value;
  });

  const computedCopyValue = computed(() => { 
    const prefix = usePrefix(props.copyPrefix);
    return prefix.value + props.value;
  });

  return { computedLink, computedCopyValue };
}
