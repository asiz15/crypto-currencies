import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CoinsList from '../coins/CoinsList.vue'
import { routes } from '../../router'
import { createRouter, createWebHistory } from 'vue-router'
import { largeCurrencyParser, percentageParser, priceParser } from '../../utils/parsers'

const mockedCoinsList = [
    {
        "id": "bitcoin",
        "rank": "1",
        "symbol": "BTC",
        "name": "Bitcoin",
        "supply": "19226200.0000000000000000",
        "maxSupply": "21000000.0000000000000000",
        "marketCapUsd": "328526370057.3350661629392600",
        "volumeUsd24Hr": "7570300925.8558541563247031",
        "priceUsd": "17087.4312166384967473",
        "changePercent24Hr": "0.7604725091383276",
        "vwap24Hr": "16995.9794881143469007",
        "explorer": "https://blockchain.info/"
    },
    {
        "id": "ethereum",
        "rank": "2",
        "symbol": "ETH",
        "name": "Ethereum",
        "supply": "122373866.2178000000000000",
        "maxSupply": null,
        "marketCapUsd": "155511745357.7783242760887274",
        "volumeUsd24Hr": "2545634730.6510129559803870",
        "priceUsd": "1270.7921238755323763",
        "changePercent24Hr": "0.9317496555781718",
        "vwap24Hr": "1255.7295103089019995",
        "explorer": "https://etherscan.io/"
    },
    {
        "id": "tether",
        "rank": "3",
        "symbol": "USDT",
        "name": "Tether",
        "supply": "65576715611.0968250000000000",
        "maxSupply": null,
        "marketCapUsd": "65604724056.8830692910177161",
        "volumeUsd24Hr": "11730844492.3900540039039188",
        "priceUsd": "1.0004271096154365",
        "changePercent24Hr": "0.0025171444930817",
        "vwap24Hr": "1.0001579772763601",
        "explorer": "https://www.omniexplorer.info/asset/31"
    },
    {
        "id": "binance-coin",
        "rank": "4",
        "symbol": "BNB",
        "name": "BNB",
        "supply": "166801148.0000000000000000",
        "maxSupply": "166801148.0000000000000000",
        "marketCapUsd": "48483983074.2687940375095368",
        "volumeUsd24Hr": "237605693.3111275244533277",
        "priceUsd": "290.6693608263942766",
        "changePercent24Hr": "0.8181553471563965",
        "vwap24Hr": "288.8407553580661773",
        "explorer": "https://etherscan.io/token/0xB8c77482e45F1F44dE1745F52C74426C631bDD52"
    },
    {
        "id": "usd-coin",
        "rank": "5",
        "symbol": "USDC",
        "name": "USD Coin",
        "supply": "43027922117.1149600000000000",
        "maxSupply": null,
        "marketCapUsd": "43019549382.6570628487378257",
        "volumeUsd24Hr": "660929654.1952717879032135",
        "priceUsd": "0.9998054116014455",
        "changePercent24Hr": "-0.0679460174232944",
        "vwap24Hr": "1.0001098002762189",
        "explorer": "https://etherscan.io/token/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48"
    },
    {
        "id": "binance-usd",
        "rank": "6",
        "symbol": "BUSD",
        "name": "Binance USD",
        "supply": "22100085744.1544230000000000",
        "maxSupply": null,
        "marketCapUsd": "22102993363.9491685261055368",
        "volumeUsd24Hr": "940025279.3569724564587340",
        "priceUsd": "1.0001315659960964",
        "changePercent24Hr": "-0.0314164150524786",
        "vwap24Hr": "1.0003357136492134",
        "explorer": "https://etherscan.io/token/0x4Fabb145d64652a948d72533023f6E7A623C7C53"
    },
    {
        "id": "xrp",
        "rank": "7",
        "symbol": "XRP",
        "name": "XRP",
        "supply": "45404028640.0000000000000000",
        "maxSupply": "100000000000.0000000000000000",
        "marketCapUsd": "17809158493.4105048578258560",
        "volumeUsd24Hr": "418037085.5596911581466627",
        "priceUsd": "0.3922374077114604",
        "changePercent24Hr": "0.7661005675956667",
        "vwap24Hr": "0.3860353591640018",
        "explorer": "https://xrpcharts.ripple.com/#/graph/"
    },
    {
        "id": "dogecoin",
        "rank": "8",
        "symbol": "DOGE",
        "name": "Dogecoin",
        "supply": "132670764299.8940900000000000",
        "maxSupply": null,
        "marketCapUsd": "13291293601.2907015503790117",
        "volumeUsd24Hr": "257345275.7754403213791363",
        "priceUsd": "0.1001825358542938",
        "changePercent24Hr": "-1.1387100081050505",
        "vwap24Hr": "0.1004704389867934",
        "explorer": "http://dogechain.info/chain/Dogecoin"
    },
    {
        "id": "cardano",
        "rank": "9",
        "symbol": "ADA",
        "name": "Cardano",
        "supply": "34459209115.7740000000000000",
        "maxSupply": "45000000000.0000000000000000",
        "marketCapUsd": "10973416801.5485157239780388",
        "volumeUsd24Hr": "57720413.8249816321328870",
        "priceUsd": "0.3184465657549099",
        "changePercent24Hr": "-0.2974392212247784",
        "vwap24Hr": "0.3173499826303584",
        "explorer": "https://cardanoexplorer.com/"
    },
    {
        "id": "polygon",
        "rank": "10",
        "symbol": "MATIC",
        "name": "Polygon",
        "supply": "8734317475.2849300000000000",
        "maxSupply": "10000000000.0000000000000000",
        "marketCapUsd": "8007833781.5830353579260546",
        "volumeUsd24Hr": "135624966.6020158790385936",
        "priceUsd": "0.9168242171460346",
        "changePercent24Hr": "0.8997879592437168",
        "vwap24Hr": "0.9099752248844247",
        "explorer": "https://etherscan.io/token/0x7D1AfA7B718fb893dB30A3aBc0Cfc608AaCfeBB0"
    },
    {
        "id": "polkadot",
        "rank": "11",
        "symbol": "DOT",
        "name": "Polkadot",
        "supply": "1179376018.6811200000000000",
        "maxSupply": null,
        "marketCapUsd": "6489080244.8544114765861784",
        "volumeUsd24Hr": "57901439.9972194934306816",
        "priceUsd": "5.5021300603611228",
        "changePercent24Hr": "0.2493516008481845",
        "vwap24Hr": "5.4786513095847522",
        "explorer": "https://polkascan.io/polkadot"
    },
    {
        "id": "multi-collateral-dai",
        "rank": "12",
        "symbol": "DAI",
        "name": "Multi Collateral DAI",
        "supply": "5878638969.2536790000000000",
        "maxSupply": null,
        "marketCapUsd": "5879348806.3204919272813972",
        "volumeUsd24Hr": "30296924.5109834273381522",
        "priceUsd": "1.0001207485389944",
        "changePercent24Hr": "-0.0177480809596786",
        "vwap24Hr": "0.9998603824914738",
        "explorer": "https://etherscan.io/token/0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359"
    },
    {
        "id": "litecoin",
        "rank": "13",
        "symbol": "LTC",
        "name": "Litecoin",
        "supply": "71772943.7272410100000000",
        "maxSupply": "84000000.0000000000000000",
        "marketCapUsd": "5724189309.9390680663798431",
        "volumeUsd24Hr": "264378488.4522542546636047",
        "priceUsd": "79.7541387140637061",
        "changePercent24Hr": "-0.5243000866629586",
        "vwap24Hr": "79.8092034764290326",
        "explorer": "http://explorer.litecoin.net/chain/Litecoin"
    },
    {
        "id": "terra-luna",
        "rank": "14",
        "symbol": "LUNA",
        "name": "Terra",
        "supply": "3453685944.3708580000000000",
        "maxSupply": null,
        "marketCapUsd": "5616509137.9845882871819868",
        "volumeUsd24Hr": "3492123.4223692647473249",
        "priceUsd": "1.6262362092126248",
        "changePercent24Hr": "-0.4968408237488583",
        "vwap24Hr": "1.6236577589929981",
        "explorer": "https://finder.terra.money/"
    },
    {
        "id": "solana",
        "rank": "15",
        "symbol": "SOL",
        "name": "Solana",
        "supply": "363962628.2583893000000000",
        "maxSupply": null,
        "marketCapUsd": "5196884180.4849446546133874",
        "volumeUsd24Hr": "82707283.8162050960548559",
        "priceUsd": "14.2786203225115243",
        "changePercent24Hr": "3.3633766786791752",
        "vwap24Hr": "14.0604499119353600",
        "explorer": "https://explorer.solana.com/"
    }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes
})

describe('CoinsList', () => {
    it('should renders properly', () => {

        expect(CoinsList).toBeTruthy()
        const wrapper = mount(CoinsList, { 
            props: { 
                coins: mockedCoinsList,
                loading: false
            },
            global: {
                plugins: [router]
            }
         })
         expect(wrapper.findAll('.coin-item').length).to.equal(15)
         mockedCoinsList.forEach(coin => {
            expect(wrapper.text()).toContain(coin.name)
            expect(wrapper.text()).toContain(coin.symbol)
            expect(wrapper.text()).toContain(`# ${coin.rank}`)
            expect(wrapper.text()).toContain(priceParser(coin.priceUsd))
            expect(wrapper.text()).toContain(largeCurrencyParser(coin.marketCapUsd))
            expect(wrapper.text()).toContain(priceParser(coin.vwap24Hr))
            expect(wrapper.text()).toContain(largeCurrencyParser(coin.supply))
            expect(wrapper.text()).toContain(largeCurrencyParser(coin.volumeUsd24Hr))
            expect(wrapper.text()).toContain(percentageParser(coin.changePercent24Hr))
         })
    })
})

describe('CoinsList', () => {
    it('should renders a list of skeletons when loading === true', () => {

        expect(CoinsList).toBeTruthy()
        const wrapper = mount(CoinsList, { 
            props: { 
                coins: mockedCoinsList,
                loading: true
            },
            global: {
                plugins: [router]
            }
         })
         expect(wrapper.findAll('.coin-item-skeleton').length).to.equal(15)
         expect(wrapper.findAll('.coin-item').length).to.equal(0)
    })
})
