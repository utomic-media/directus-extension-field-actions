import { describe, test, expect } from 'vitest';
import Interface from './interface.vue';
import { mount } from '@vue/test-utils'


describe('Interface.vue', () => {
  test('Component renders with default options', () => {

    const mountedComponent = mount(Interface, {})

    console.log(mountedComponent)
    expect(mountedComponent.exists()).toBe(true)
  });
});