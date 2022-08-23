import { computed } from 'vue';


export function useLink(props: any) {
  const computedLink = computed(() => {
    // TODO: compute web, mail or phone link
    if (props.contentType === 'url') { return props.value}	// TODO: make sure it's really a link 
    if (props.contentType === 'email') { return `mailto:${props.value}`}
    if (props.contentType === 'phone') { return `tel:${props.value}`}
  
    return props.value;
  });

  return { computedLink };
}
