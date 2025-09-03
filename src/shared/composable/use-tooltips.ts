import { computed } from 'vue';
import { useClipboard } from './use-clipboard';
import type { ClickAction } from '../types';

type Options = {
  useCustomTooltip: boolean | null;
  customTooltip: string | null;
  clickAction: ClickAction;
};


export function useTooltips(options: Options) { 
  const { isCopySupported } = useClipboard();

  const copyTooltip = computed(() => {
    if (isCopySupported.value === false) {
      return 'Copying not supported';
    }

    return 'Copy value';
  });


  const linkTooltip = computed(() => {
    return 'Open Link';
  });


  const actionTooltip = computed(() => {
    if (options.clickAction === 'copy') {
      return copyTooltip.value;
    }

    if (options.clickAction === 'link') {
      return linkTooltip.value;
    }

    return null;
  });


  return {
    copyTooltip,
    linkTooltip,
    actionTooltip
  };
}

