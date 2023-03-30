import React, {useEffect, useState} from 'react'
import './Portfolio.scss'
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch, AppState} from '../../redux/store';
import PortfolioModal from '../PortfolioModal/PortfolioModal';
import {fetchCryptoInfo, ICryptoInfoResponse} from '../../redux/thunks/fetchCryptoInfoThunk';
import {correctCryptoParam} from '../helpers';

export const Portfolio: React.FC = () => {
  const dispatch:AppDispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false)
  const portfolio = useSelector((state: AppState) => state.portfolio);
  const [portfolioPrice, setPortfolioPrice] = useState<number>(0);
  const initBalance = 100;
  useEffect(() => {
    const fetchPortfolioPrice = async () => {
      let totalPrice = 0;
      for (const currency of portfolio.currencies) {
        const cryptoInfo = await dispatch(fetchCryptoInfo(correctCryptoParam(currency.name)));
        if (cryptoInfo && cryptoInfo.priceUsd) {
          totalPrice += parseFloat(cryptoInfo.priceUsd ) * currency.quantity;
        }
      }
      setPortfolioPrice(totalPrice);
    };
    fetchPortfolioPrice();
  }, [dispatch, portfolio]);

  const absolutePrice: number = portfolioPrice + portfolio.balance;
  const absoluteDifference: number = absolutePrice - initBalance;
  const percentDifference: number = (absolutePrice/initBalance - 1)*100;
  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

    return (
    <div className='Portfolio'>
      <div className='Portfolio__balance'> {`Free Balance:$${portfolio.balance.toFixed(2)}`}</div>
      <div className='Portfolio__portfolio-price'> {`Portfolio:$${absolutePrice.toFixed(2)}`}</div>
      <div className='Portfolio__absolute-change'>{`Change: $${absoluteDifference.toFixed(2)}`}</div>
      <div className={percentDifference > 0 ?'Portfolio__percent-change--positive':'Portfolio__percent-change--negative' }> {`(${percentDifference.toFixed(2)}%)`}</div>
      <button onClick={() => setIsModalOpen(true)}>Details:</button>
      {isModalOpen && <PortfolioModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  )
}
