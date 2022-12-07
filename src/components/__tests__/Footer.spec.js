import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Footer from '../navigation/Footer.vue'

describe('Footer component', () => {
  it('should renders properly', () => {
    const wrapper = mount(Footer,{
       global: {
        stubs: ['FontAwesomeIcon']
       }
    })
    expect(wrapper.text()).toContain('Made with')
    expect(wrapper.find('a').attributes('href')).to.equal('https://github.com/asiz15')
  })
})
