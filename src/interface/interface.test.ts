import { describe, test, expect } from 'vitest';
import Interface from './interface.vue';
import { mount } from '@vue/test-utils'


describe('Interface.vue - Default', () => {
  const componentWrapper = mount(Interface, {
    // props: {
    // }
  })

  // Debugging output
  // console.log(componentWrapper.html())

  test('Component renders', () => {
    expect(componentWrapper.exists()).toBe(true);
  });
  
  test('Component renders without any buttons', () => {
    expect(componentWrapper.findComponent('v-button').exists()).toBe(false);
  });
});


describe('Interface.vue - Enabled Buttons', () => {
  const componentWrapper = mount(Interface, {
    props: {
      showCopy: true,
      showLink: true
    }
  });
  
  test('Component renders', () => {
    expect(componentWrapper.exists()).toBe(true);
  });

  test('Contain copy-button', () => {
    expect(componentWrapper.find('[data-testid="copy-button"]').exists()).toBe(true);
  });

  test('Contain link-button', () => {
    expect(componentWrapper.find('[data-testid="link-button"]').exists()).toBe(true);
  });
});

describe('Interface.vue - Click-Action: copy', () => { 
  const componentWrapper = mount(Interface, {
    props: {
      clickAction: "link"
    }
  });

  test('Input-wrapper should be a LinkWrapper', () => {
    expect(componentWrapper.findComponent('.defa-link-wrapper.dynamic-input-wrapper').exists()).toBe(true);
  });
});