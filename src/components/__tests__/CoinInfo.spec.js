import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CoinInfo from '../coins/CoinInfo.vue'
import { percentageParser, priceParser } from "../../utils/parsers"

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

describe('CoinInfo component', () => {
    it('should renders properly', () => {
        const wrapper = mount(CoinInfo, { 
            props: { coinData: mockedCoinInfo },
            global: {
                stubs: ['FontAwesomeIcon']
            }
         })
        expect(wrapper.find('h1').text()).to.equal('Bitcoin') 
        expect(wrapper.find('img').attributes('src')).to.equal('https://assets.coincap.io/assets/icons/btc@2x.png')
        expect(wrapper.find('.coin-symbol').text()).to.equal('BTC')
        expect(wrapper.find('a.explorer-link').attributes('href')).to.equal('https://blockchain.info/')
        expect(wrapper.find('.coin-price').text()).to.equal(`$ ${priceParser('17121.0786828316452478')}`)
        expect(wrapper.text()).toContain('Rank # 1')
        expect(wrapper.text()).toContain(`${percentageParser('1.2240954926083520')} %`)
    })
})
