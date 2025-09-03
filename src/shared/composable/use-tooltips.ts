import { computed } from 'vue';
import { useClipboard } from './use-clipboard';
import type { ClickAction } from '../types';

type Options = {
  clickAction: ClickAction;
  useCustomCopyTooltip: boolean | null;
  customCopyTooltip: string | null;
  useCustomLinkTooltip: boolean | null;
  customLinkTooltip: string | null;
};


export function useTooltips(options: Options) { 
  const { isCopySupported } = useClipboard();

  const copyTooltip = computed(() => {
    if (isCopySupported.value === false) {
      return 'Copying not supported';
    }

    if (options.useCustomCopyTooltip) {
      return options.customCopyTooltip;
    }

    return 'Copy value';
  });


  const linkTooltip = computed(() => {
    if (options.useCustomLinkTooltip) {
      return options.customLinkTooltip;
    }

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

