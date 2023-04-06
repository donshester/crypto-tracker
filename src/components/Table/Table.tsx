import React, { useEffect, useState } from 'react'
import './Table.scss'
import { fetchCoinData, ICryptoTable } from '../../redux/thunks/fetchCryptosThunk'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '../../redux/store'
import { ICoinDataState } from '../../redux/reducers/cryptosReducer'
import {Link} from 'react-router-dom'
import { correctCryptoParam, formatNumber } from '../helpers'
import AddToPortfolioModal from '../AddToPorfolioModal/AddToPortfolioModal';

const PAGE_LIMIT = 20

const Table: React.FC = () => {
  const dispatch: AppDispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)
  const { data, isLoading, error } = useSelector(
    (state: { cryptos: ICoinDataState }) => state.cryptos,
  )
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>('')

  const handleCloseModal = () => {
    setSelectedId('')
    setModalOpen(false)
  }
  const handleAddPortfolio = (id:string ) => {
    setSelectedId(correctCryptoParam(id));
    setModalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchCoinData((currentPage - 1) * PAGE_LIMIT, PAGE_LIMIT))
  }, [dispatch, currentPage])

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
  }

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1)
  }
  return (
      <div>
    <table className='Table'>
      {isLoading && <p>Loading...</p>}
      <thead className='Table__head'>
        <tr>
          <th className='Table__cellRank'>Rank</th>
          <th className='Table__cellName'>Name</th>
          <th className='Table__cellAbbreviation'>Abbreviation</th>
          <th className='Table__cellPrice'>Price</th>
          <th className='Table__cellMarketCap'>Market Cap</th>
          <th className='Table__cellChange'>Change 24h</th>
          <th className='Table__cellAction'>Action</th>
        </tr>
      </thead>
      <tbody className='Table__body'>
        {data.map((coin: ICryptoTable) => (
          <tr key={coin.id} className='Table__row'>
            <td className='Table__rank'>{coin.rank}</td>
            <td className='Table__name'>
              <Link className='Table__link' to={`/currency/${correctCryptoParam(coin.name)}`}>
                {coin.name}
              </Link>
            </td>
            <td className='Table__abbreviation'>{coin.abbreviation}</td>
            <td className='Table__price'>{formatNumber(Number(coin.price))}</td>
            <td className='Table__marketCap'>{formatNumber(Number(coin.marketCap))}</td>
            <td
              className={`Table__change ${
                Number(coin?.change24h) >= 0 ? '--positive' : '--negative'
              }`}
            >
              {Number(coin?.change24h).toFixed(2) + '%'}
            </td>
            <td className='Table__action'>
              <button className='Table__addButton'
                      onClick={()=> {handleAddPortfolio(coin.name)}}>
                +
              </button>
            </td>
          </tr>
        ))}
      </tbody>
      <div className='Table__buttons'>
        <button
          className='Button Button--prev'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
          className='Button Button--next'
          onClick={handleNextPage}
          disabled={data.length < PAGE_LIMIT}
        >
          Next Page
        </button>
      </div>
    </table>
        {
          modalOpen && <AddToPortfolioModal isOpen={modalOpen} onClose={handleCloseModal} id={selectedId}/>
        }
      </div>
  )
}

export default Table;
