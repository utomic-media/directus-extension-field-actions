import { computed } from 'vue';
import {useStores} from "@directus/extensions-sdk";

export function useLink(props: any) {
  const computedLink = computed(() => {

    // TODO: compute web, mail or phone link
    if (props.contentType === 'url') {
      // TODO: make sure it's really a link
      if(props.prependProjectUrl) {
        const settingsStore = useStores().useSettingsStore();
        const baseUrl = settingsStore.settings?.project_url || ""
        // TODO this could be more robust. absolute urls can start with // and relative urls can start with something else.
        // See https://stackoverflow.com/questions/10687099/how-to-test-if-a-url-string-is-absolute-or-relative
        return props.value.startsWith("/") ? `${baseUrl}${props.value}` : props.value;
      }
      else {
        return props.value
      }
    }
    if (props.contentType === 'email') { return `mailto:${props.value}`}
    if (props.contentType === 'phone') { return `tel:${props.value}`}

    return props.value;
  });

  return { computedLink };
}
