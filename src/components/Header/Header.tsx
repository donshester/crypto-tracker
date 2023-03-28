import React from 'react'
import './Header.scss'
import { Portfolio } from '../Portfolio/Portfolio'

interface ICrypto {
  name: string
  symbol: string
  price: number
}

interface IPortfolio {
  currentPrice: number
  absoluteDifference: number
  relativeDifference: number
}

const Header: React.FC = () => {
  const cryptos: ICrypto[] = [
    { name: 'Bitcoin', symbol: 'BTC', price: 20329.01 },
    { name: 'Ethereum', symbol: 'ETH', price: 1456.21 },
    { name: 'Binance Coin', symbol: 'BNB', price: 274.13 },
  ]

  return (
    <header className='Header'>
      <div className='Header__logo'></div>
      <h1 className='Header__title'>Crypto Tracker</h1>
      <div className='Header__cryptos'>
        {cryptos.map((crypto) => (
          <div className='Header__crypto' key={crypto.symbol}>
            <div className='Header__cryptoSymbol'>{crypto.symbol}</div>
            <div className='Header__cryptoName'>{crypto.name}</div>
            <div className='Header__cryptoPrice'>{crypto.price}</div>
          </div>
        ))}
      </div>
      <div className={'Header__portfolio'}>
        <Portfolio />
      </div>
    </header>
  )
}

export default Header
