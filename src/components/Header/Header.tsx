import React from 'react'
import './Header.scss'
import { Portfolio } from '../Portfolio/Portfolio'
import { useSelector} from "react-redux";
import {ICoinDataState} from '../../redux/reducers/cryptosReducer';


const Header: React.FC = () => {
    const { data, isLoading, error } = useSelector(
        (state: { cryptos: ICoinDataState }) => state.cryptos,
    )
    const topCryptos = data.slice(0,3)

    return (
        <header className='Header'>
            <div className='Header__logo'></div>
            <h1 className='Header__title'>Crypto Tracker</h1>
            <div className='Header__cryptos'>
                {topCryptos.map((crypto) => (
                    <div className='Header__crypto' key={crypto.id}>
                        <div className='Header__cryptoSymbol'>{crypto.name}</div>
                        <div className='Header__cryptoName'>{crypto.name}</div>
                        <div className='Header__cryptoPrice'>{'$'+ Number(crypto.price).toFixed(2)}</div>
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
