import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../navigation/Pagination.vue'


describe('Pagination component', () => {
  it('should renders properly', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalRows: 100,
        rowsPerPage: 15,
        maxPagesVisible: 7
      }
    })
    expect(wrapper.find('.prev-page').exists()).toBe(true)
    expect(wrapper.find('.prev-page').text()).to.equal('Previous')
    expect(wrapper.find('.next-page').exists()).toBe(true)
    expect(wrapper.find('.next-page').text()).to.equal('Next')
    expect(wrapper.findAll('.page-link').length).to.equal(9)
    expect(wrapper.findAll('.page-link-item').length).to.equal(7)
    expect(wrapper.findAll('.active').length).to.equal(1)
  })
})

describe('Pagination component', () => {
  it('should renders properly', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalRows: 100,
        rowsPerPage: 15,
        maxPagesVisible: 5
      }
    })
    expect(wrapper.find('.prev-page').exists()).toBe(true)
    expect(wrapper.find('.prev-page').text()).to.equal('Previous')
    expect(wrapper.find('.next-page').exists()).toBe(true)
    expect(wrapper.find('.next-page').text()).to.equal('Next')
    expect(wrapper.findAll('.page-link').length).to.equal(7)
    expect(wrapper.findAll('.page-link-item').length).to.equal(5)
    expect(wrapper.findAll('.active').length).to.equal(1)
  })
})

describe('Pagination component', () => {
  it('should renders properly', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 3,
        totalRows: 150,
        rowsPerPage: 15,
        maxPagesVisible: 10
      }
    })
    expect(wrapper.find('.prev-page').exists()).toBe(true)
    expect(wrapper.find('.prev-page').text()).to.equal('Previous')
    expect(wrapper.find('.next-page').exists()).toBe(true)
    expect(wrapper.find('.next-page').text()).to.equal('Next')
    expect(wrapper.findAll('.page-link').length).to.equal(12)
    expect(wrapper.findAll('.page-link-item').length).to.equal(10)
    expect(wrapper.findAll('.active').length).to.equal(1)
  })
})

describe('Pagination component', () => {
  it('should renders prev button as disabled when current page === first page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 1,
        totalRows: 150,
        rowsPerPage: 15,
        maxPagesVisible: 10
      }
    })
    expect(wrapper.find('.prev-page').classes()).toContain('disabled')
  })
})

describe('Pagination component', () => {
  it('should renders next button as disabled when current page === last page', () => {
    const wrapper = mount(Pagination, {
      props: {
        currentPage: 10,
        totalRows: 150,
        rowsPerPage: 15,
        maxPagesVisible: 10
      }
    })
    expect(wrapper.find('.next-page').classes()).toContain('disabled')
  })
})
