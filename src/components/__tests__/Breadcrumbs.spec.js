import { describe, it, expect } from 'vitest'
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from '../../router'
import { mount } from '@vue/test-utils'
import Breadcrumbs from '../navigation/Breadcrumbs.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: routes,
  })

describe('Breadcrumbs component', () => {
    it('should renders properly',async () => {
        expect(Breadcrumbs).toBeTruthy()
        
        const wrapper = mount(Breadcrumbs, {
            global: {
                plugins: [router]
            }, 
            props: { currentCoin: 'Bitcoin' }
        })

        expect(wrapper.text()).toContain('Crypto currencies')
        expect(wrapper.text()).toContain('Bitcoin')
    })
})
