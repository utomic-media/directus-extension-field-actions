import { computed } from 'vue';
import { usePrefix } from './use-prefix';

export function useLink(props: any) {

  // TODO: make sure it's always a valid link (absolute + relative)

  const computedLink = computed(() => {
    const prefix = usePrefix(props.linkPrefix);
    return prefix.value + props.value;
  });

  return { computedLink };
}
