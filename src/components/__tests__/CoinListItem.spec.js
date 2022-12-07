import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CoinListItem from '../coins/CoinListItem.vue'
import { percentageParser, priceParser, largeCurrencyParser } from "../../utils/parsers"
import { routes } from '../../router'
import { createRouter, createWebHistory } from 'vue-router'

const mockedCoinInfo = {
    id: "bitcoin",
    rank: "1",
    symbol: "BTC",
    name: "Bitcoin",
    supply: "19224431.0000000000000000",
    maxSupply: "21000000.0000000000000000",
    marketCapUsd: "329142995783.6678486828090018",
    volumeUsd24Hr: "5716783232.6962679988193156",
    priceUsd: "17121.0786828316452478",
    changePercent24Hr: "1.2240954926083520",
    vwap24Hr: "17030.6981571979424561",
    explorer: "https://blockchain.info/"
}

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

describe('CoinListItem component', () => {
    it('should renders properly', () => {

        expect(CoinListItem).toBeTruthy()
        const wrapper = mount(CoinListItem, { 
            props: { coin: mockedCoinInfo },
            global: {
                plugins: [router],
                stubs: ['FontAwesomeIcon']
            }
         })
        expect(wrapper.find('.coin-name').text()).to.equal('Bitcoin') 
        expect(wrapper.find('img').attributes('src')).to.equal('https://assets.coincap.io/assets/icons/btc@2x.png')
        expect(wrapper.find('.coin-symbol').text()).to.equal('BTC')
        expect(wrapper.text()).toContain('1')
        expect(wrapper.text()).toContain(`${percentageParser('1.2240954926083520')} %`)
        expect(wrapper.text()).toContain(`${priceParser('17121.0786828316452478')}`)
        expect(wrapper.text()).toContain(`${largeCurrencyParser('329142995783.66784868280900188')}`)
        expect(wrapper.text()).toContain(`${largeCurrencyParser('19224431.0000000000000000')}`)
        expect(wrapper.text()).toContain(`${largeCurrencyParser('5716783232.6962679988193156')}`)
        expect(wrapper.text()).toContain(`${priceParser('17030.6981571979424561')}`)
    })
})
