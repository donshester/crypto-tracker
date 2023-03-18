import React, { useEffect, useState } from 'react'
import CryptoChart from '../CryptoChart/CryptoChart'
import './CryptoInfoPage.scss'
import AddToPortfolioModal from '../AddToPorfolioModal/AddToPortfolioModal'
import { useDispatch, useSelector } from 'react-redux'
import { ICryptoPriceState, ICryptoPriceData } from '../../redux/reducers/cryptoPriceReducer'
import { fetchCryptoPrice } from '../../redux/thunks/fetchCryptoPriceThunk'
import { AppDispatch } from '../../redux/store'
import { fetchCryptoInfo } from '../../redux/thunks/fetchCryptoInfoThunk'
import { ICryptoInfoState } from '../../redux/reducers/cryptoInfoReducer'

const CryptoInfoPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const dispatch: AppDispatch = useDispatch()

  const { loading, data, error } = useSelector(
    (state: { cryptoPrice: ICryptoPriceState }) => state.cryptoPrice,
  )

  const { cryptoData, fetchInfoError } = useSelector(
    (state: { cryptoInfo: ICryptoInfoState }) => state.cryptoInfo,
  )

  const chartData = {
    labels: data.map((item: ICryptoPriceData) => item.date),
    datasets: [
      {
        label: 'BTC Price',
        data: data.map((item: ICryptoPriceData) => item.priceUsd),
        backgroundColor: 'rgba(0, 119, 204, 0.4)',
        borderColor: 'rgba(0, 119, 204, 1)',
        pointBackgroundColor: 'rgba(0, 119, 204, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(0, 119, 204, 1)',
        pointRadius: 0,
      },
    ],
  }
  const handleAddToPortfolio = () => {
    setIsModalOpen(true)
  }
  useEffect(() => {
    dispatch(fetchCryptoPrice())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchCryptoInfo('bitcoin'))
  }, [dispatch])

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSubmitModal = (price: number, quantity: number) => {
    console.log('Price:', price, 'Quantity:', quantity)
  }
  return (
    <div className='CryptoInfoPage'>
      <h1 className='CryptoInfoPage__title'>
        {cryptoData?.name} ({cryptoData?.symbol.toUpperCase()})
      </h1>
      <div className='CryptoInfoPage__chart'>
        <CryptoChart chartData={chartData} />
      </div>
      <div className='CryptoInfoPage__info'>
        <div className='CryptoInfoPage__row'>
          <span className='CryptoInfoPage__label'>Rank:</span>
          <span className='CryptoInfoPage__value'>{cryptoData?.rank}</span>
        </div>
        <div className='CryptoInfoPage__row'>
          <span className='CryptoInfoPage__label'>Price:</span>
          <span className='CryptoInfoPage__value'>${Number(cryptoData?.priceUsd).toFixed(2)}</span>
        </div>
        <div className='CryptoInfoPage__row'>
          <span className='CryptoInfoPage__label'>24h Change:</span>
          <span
            className={`CryptoInfoPage__value ${
              Number(cryptoData?.changePercent24Hr) >= 0 ? 'green' : 'red'
            }`}
          >
            {Number(cryptoData?.changePercent24Hr).toFixed(2)}%
          </span>
        </div>
        <div className='CryptoInfoPage__row'>
          <span className='CryptoInfoPage__label'>Market Cap:</span>
          <span className='CryptoInfoPage__value'>
            ${(Number(cryptoData?.marketCapUsd) / 1000000000).toFixed(2) + 'B'}
          </span>
        </div>
        <div className='CryptoInfoPage__row'>
          <span className='CryptoInfoPage__label'>24h Volume:</span>
          <span className='CryptoInfoPage__value'>
            ${(Number(cryptoData?.volumeUsd24Hr) / 1000000000).toFixed(2) + 'B'}
          </span>
        </div>
        <div className='CryptoInfoPage__row'>
          <span className='CryptoInfoPage__label'>Total Supply:</span>
          <span className='CryptoInfoPage__value'>
            {(Number(cryptoData?.supply) / 1000000).toFixed(2) + 'M'}
          </span>
        </div>
        <div className='CryptoInfoPage__row'>
          <span className='CryptoInfoPage__label'>Max Supply:</span>
          <span className='CryptoInfoPage__value'>
            {(Number(cryptoData?.maxSupply) / 1000000).toFixed(2) + 'M'}
          </span>
        </div>
      </div>

      <div className='CryptoInfoPage__add-to-portfolio' onClick={handleAddToPortfolio}>
        <button>Add to Portfolio</button>
      </div>
      <AddToPortfolioModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitModal}
      />
    </div>
  )
}

export default CryptoInfoPage
