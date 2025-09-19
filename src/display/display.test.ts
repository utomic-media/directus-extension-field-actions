import { describe, test, expect } from 'vitest';
import Display from './display.vue';
import { mount } from '@vue/test-utils'

const value = "Hello world";

describe('Display.vue - Default', () => {
  const componentWrapper = mount(Display, {
    // props: {
    // }
  })

  // Debugging output
  // console.log(componentWrapper.html())

  test('Component renders', () => {
    expect(componentWrapper.exists()).toBe(true);
  });
  
  test('Component renders without any buttons', () => {
    expect(componentWrapper.findComponent('v-button-stub').exists()).toBe(false);
  });
});

describe('Display.vue - With value', () => {
  const componentWrapper = mount(Display, {
    props: {
      value: value,
    },
  });

  test('Contains value', () => {
    expect(componentWrapper.html()).toContain(value);
  });
});


describe('Display.vue - Enabled Buttons', () => {
  
  const componentWrapper = mount(Display, {
    props: {
      value: value,
      showCopy: true,
      showLink: true,
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

describe('Display.vue - Click-Action: copy', () => { 
  const componentWrapper = mount(Display, {
    props: {
      value: value,
      clickAction: "link"
    }
  });

  test('Input-wrapper should be a LinkWrapper', () => {
    expect(componentWrapper.findComponent('.defa-link-wrapper.dynamic-input-wrapper').exists()).toBe(true);
  });
});

describe('Display.vue - Hide field value', () => {
  const componentWrapper = mount(Display, {
    props: {
      value: value,
      clickAction: "link",
      hideFieldValue: true,
    }
  });

  console.log(componentWrapper.html());

  test('Display doesn\'t contain field', () => {
    expect(componentWrapper.html()).not.toContain(value);
  });
});
