import { describe, test, expect } from 'vitest';
import Interface from './interface.vue';
import { mount } from '@vue/test-utils'


describe('Interface.vue - Default', () => {
  const componentWrapper = mount(Interface, {
    // props: {
    // }
  });

  // Debugging output
  // console.log(componentWrapper.html())

  test('Component renders', () => {
    expect(componentWrapper.exists()).toBe(true);
  });
  
  test('Component renders without any buttons', () => {
    expect(componentWrapper.findComponent('v-button-stub').exists()).toBe(false);
  });
});

describe('Interface.vue - With value', () => {
  const value = "Hello world";

  const componentWrapper = mount(Interface, {
    props: {
      value: value,
      type: "string",
    },
  });

  test('Input contains value', () => {
    const vInput = componentWrapper.getComponent('v-input-stub');

    expect(componentWrapper.props('value')).toBe(value);
    expect(vInput.attributes('model-value')).toBe(value);
  });
});


describe('Interface.vue - Enabled Buttons', () => {
  const componentWrapper = mount(Interface, {
    props: {
      type: "string",
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
      type: "string",
      clickAction: "link"
    }
  });

  test('Input-wrapper should be a LinkWrapper', () => {
    expect(componentWrapper.findComponent('.defa-click-action-wrapper .defa-link-wrapper').exists()).toBe(true);
  });
});