import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { mount } from '@vue/test-utils'
import NavBar from '../navigation/NavBar.vue'
import { routes } from '../../router'

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

describe('NavBar component', () => {
  it('should renders properly', () => {
    const wrapper = mount(NavBar, {
      global: {
        plugins: [router]
      }
    })
    expect(wrapper.text()).toContain('Crypto Currencies')
  })
})
