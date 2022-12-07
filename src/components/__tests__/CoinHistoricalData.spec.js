import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CoinHistoricalData from '../coins/CoinHistoricalData.vue'
import { percentageParser, priceParser } from "../../utils/parsers"

const mockedHistoricalData = [
    {
        "date": "2022-11-29",
        "data": {
            "openPrice": "5.1395435346412318",
            "closePrice": "5.3096577428061104",
            "highestPrice": "5.3389211788403136",
            "lowestPrice": "5.1140209292541659"
        }
    },
    {
        "date": "2022-11-30",
        "data": {
            "openPrice": "5.3093792823302135",
            "closePrice": "5.4720242729749541",
            "highestPrice": "5.4889086644158555",
            "lowestPrice": "5.3073203445710621"
        }
    },
    {
        "date": "2022-12-01",
        "data": {
            "openPrice": "5.4716094252641752",
            "closePrice": "5.4034337377942692",
            "highestPrice": "5.4765061979832671",
            "lowestPrice": "5.3409768727261799"
        }
    },
    {
        "date": "2022-12-02",
        "data": {
            "openPrice": "5.4047820974581182",
            "closePrice": "5.6304267514841601",
            "highestPrice": "5.6808005498559513",
            "lowestPrice": "5.3925282594493384"
        }
    },
    {
        "date": "2022-12-03",
        "data": {
            "openPrice": "5.6267365210105328",
            "closePrice": "5.5037741329629207",
            "highestPrice": "5.6919024608106782",
            "lowestPrice": "5.4994456861227467"
        }
    },
    {
        "date": "2022-12-04",
        "data": {
            "openPrice": "5.5068483046564575",
            "closePrice": "5.6043951195870537",
            "highestPrice": "5.6054180959897098",
            "lowestPrice": "5.5013949586909723"
        }
    },
    {
        "date": "2022-12-05",
        "data": {
            "openPrice": "5.6008593701486603",
            "closePrice": "5.4868199584803204",
            "highestPrice": "5.7301317618404483",
            "lowestPrice": "5.4560617938213855"
        }
    }
]

describe('CoinHistoricalData component', () => {
    it('should renders properly', () => {
        const wrapper = mount(CoinHistoricalData, { 
            props: { 
                data: mockedHistoricalData,
                loading: false,
                error: false
            },
            global: {
                stubs: ['FontAwesomeIcon']
            }
         })

         expect(wrapper.findAll('tr.day-row').length).to.equal(7)
         expect(wrapper.findAll('td.day-open-price').length).to.equal(7)
         expect(wrapper.findAll('td.day-highest-price').length).to.equal(7)
         expect(wrapper.findAll('td.day-lowest-price').length).to.equal(7)
         expect(wrapper.findAll('td.day-close-price').length).to.equal(7)
         expect(wrapper.find('.loading').exists()).toBe(false)
         
         mockedHistoricalData.forEach(day => {
            expect(wrapper.text()).toContain(day.date)
            expect(wrapper.text()).toContain(priceParser(day.data.highestPrice))
            expect(wrapper.text()).toContain(priceParser(day.data.lowestPrice))
            expect(wrapper.text()).toContain(priceParser(day.data.openPrice))
            expect(wrapper.text()).toContain(priceParser(day.data.closePrice))
         })
    })
})

describe('CoinHistoricalData component', () => {
    it('should renders a spinner when loading === true', () => {
        const wrapper = mount(CoinHistoricalData, { 
            props: { 
                data: mockedHistoricalData,
                loading: true,
                error: false
            },
            global: {
                stubs: ['FontAwesomeIcon']
            }
         })

         expect(wrapper.findAll('tr.day-row').length).to.equal(0)
         expect(wrapper.find('.loading').exists()).toBe(true)
    })
})

describe('CoinHistoricalData component', () => {
    it('should renders a message when there is not historical data', () => {
        const wrapper = mount(CoinHistoricalData, { 
            props: { 
                data: [],
                loading: false,
                error: true
            },
            global: {
                stubs: ['FontAwesomeIcon']
            }
         })

         expect(wrapper.findAll('tr.day-row').length).to.equal(0)
         expect(wrapper.find('.loading').exists()).toBe(false)
         expect(wrapper.find('.not-data').exists()).toBe(true)
         expect(wrapper.text()).toContain('There is not historical data for this coin.')
    })
})
