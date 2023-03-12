import React from "react";
import "./Table.scss"
type CoinData = {
    rank: number;
    name: string;
    abbreviation: string;
    price: number;
    marketCap: number;
    change24h: number;
    logo: string;
};


const data: CoinData[] = [
    {
        rank: 1,
        name: 'Bitcoin',
        abbreviation: 'BTC',
        price: 48239.05,
        marketCap: 905454535490,
        change24h: 2.38,
        logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=002'
    },
    {
        rank: 2,
        name: 'Ethereum',
        abbreviation: 'ETH',
        price: 1812.12,
        marketCap: 208135237690,
        change24h: 3.28,
        logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002'
    },
    {
        rank: 3,
        name: 'Binance Coin',
        abbreviation: 'BNB',
        price: 279.97,
        marketCap: 43079644912,
        change24h: -1.67,
        logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.svg?v=002'
    },
    {
        rank: 4,
        name: 'Cardano',
        abbreviation: 'ADA',
        price: 1.07,
        marketCap: 34212392513,
        change24h: 2.97,
        logo: 'https://cryptologos.cc/logos/cardano-ada-logo.svg?v=002'
    },
    {
        rank: 5,
        name: 'Polkadot',
        abbreviation: 'DOT',
        price: 34.54,
        marketCap: 31985389084,
        change24h: -0.69,
        logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.svg?v=002'
    },
    {
        rank: 6,
        name: 'XRP',
        abbreviation: 'XRP',
        price: 0.46,
        marketCap: 20938857323,
        change24h: 1.58,
        logo: 'https://cryptologos.cc/logos/xrp-xrp-logo.svg?v=002'
    },
    {
        rank: 7,
        name: 'Litecoin',
        abbreviation: 'LTC',
        price: 199.49,
        marketCap: 13288524292,
        change24h: 0.98,
        logo: 'https://cryptologos.cc/logos/litecoin-ltc-logo.svg?v=002'
    },
    {
        rank: 8,
        name: 'Chainlink',
        abbreviation: 'LINK',
        price: 29.25,
        marketCap: 12252007635,
        change24h: -0.07,
        logo: 'https://cryptologos.cc/logos/chainlink-link-logo.svg?v=002'
    },
    {
        rank: 9,
        name: 'Stellar',
        abbreviation: 'XLM',
        price: 0.4,
        marketCap: 9191600541,
        change24h: 3.1,
        logo: 'https://cryptologos.cc/logos/stellar-xlm-logo.svg?v=002'
    },
    {
        rank: 10,
        name: 'Bitcoin Cash',
        abbreviation: 'BCH',
        price: 522.64,
        marketCap: 9772284247,
        change24h: 1.2,
        logo: 'https://cryptologos.cc/logos/bitcoin-cash-bch-logo.svg?v=002'
    },
    {
        rank: 11,
        name: 'Dogecoin',
        abbreviation: 'DOGE',
        price: 0.053,
        marketCap: 6896114696,
        change24h: 0.63,
        logo: 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=002'
    },
    {
        rank: 12,
        name: 'USD Coin',
        abbreviation: 'USDC',
        price: 1,
        marketCap: 6539374654,
        change24h: -0.09,
        logo: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=002'
    },
    {
        rank: 13,
        name: 'Wrapped Bitcoin',
        abbreviation: 'WBTC',
        price: 47908.77,
        marketCap: 6283104972,
        change24h: 1.66,
        logo: 'https://cryptologos.cc/logos/wrapped-bitcoin-wbtc-logo.svg?v=002'
    },
    {
        rank: 14,
        name: 'Aave',
        abbreviation: 'AAVE',
        price: 413.3,
        marketCap: 5127388484,
        change24h: -1.46,
        logo: 'https://cryptologos.cc/logos/aave-aave-logo.svg?v=002'
    },
    {
        rank: 15,
        name: 'Uniswap',
        abbreviation: 'UNI',
        price: 27.69,
        marketCap: 13907511715,
        change24h: -1.58,
        logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.svg?v=002'
    }
];

const Table: React.FC= () =>{


    return (
        <table className="Table">
            <thead className="Table__head">
                <tr>
                    <th className="Table__cell">Rank</th>
                    <th className="Table__cell">Logo</th>
                    <th className="Table__cell">Name</th>
                    <th className="Table__cell">Abbreviation</th>
                    <th className="Table__cell">Price</th>
                    <th className="Table__cell">Market Cap</th>
                    <th className="Table__cell">Change 24h</th>
                    <th className="Table__cell">Action</th>
                </tr>
            </thead>
            <tbody className="Table__body">
            {data.map((coin) => (
                <tr className="Table__row">
                    <td className="Table__rank">{coin.rank}</td>
                    <td className="Table__logo"><img src={coin.logo} alt={coin.name}/></td>
                    <td className="Table__name">{coin.name}</td>
                    <td className="Table__abbreviation">{coin.abbreviation}</td>
                    <td className="Table__price">{coin.price}</td>
                    <td className="Table__marketCap">{coin.marketCap}</td>
                    <td className="Table__change">{coin.change24h}</td>
                    <td className= "Table__action">
                        <button className="Table__addButton" >
                            +
                        </button>
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;