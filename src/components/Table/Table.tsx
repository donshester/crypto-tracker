import React, { useEffect, useState } from 'react'
import './Table.scss'
import { fetchCoinData, ICryptoTable } from '../../redux/thunks/fetchCryptosThunk';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../redux/store';
import { ICoinDataState } from '../../redux/reducers/cryptosReducer';

const PAGE_LIMIT = 20;
const Table: React.FC = () => {
  const dispatch:AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error} = useSelector((state: {cryptos: ICoinDataState}) => state.cryptos);


  useEffect(() => {
    dispatch(fetchCoinData((currentPage - 1) * PAGE_LIMIT, PAGE_LIMIT));
  },[dispatch, currentPage]);


  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <table className='Table'>
      {isLoading && <p>Loading...</p>}
      <thead className='Table__head'>
        <tr>
          <th className='Table__cell'>Rank</th>
          <th className='Table__cell'>Logo</th>
          <th className='Table__cell'>Name</th>
          <th className='Table__cell'>Abbreviation</th>
          <th className='Table__cell'>Price</th>
          <th className='Table__cell'>Market Cap</th>
          <th className='Table__cell'>Change 24h</th>
          <th className='Table__cell'>Action</th>
        </tr>
      </thead>
      <tbody className='Table__body'>
        {data.map((coin:ICryptoTable) => (
          <tr key={coin.id} className='Table__row'>
            <td className='Table__rank'>{coin.rank}</td>
            <td className='Table__logo'>
              <img src={''} alt={coin.name} />
            </td>
            <td className='Table__name'>{coin.name}</td>
            <td className='Table__abbreviation'>{coin.abbreviation}</td>
            <td className='Table__price'>{Number(coin?.price).toFixed(2)+ '$'}</td>
            <td className='Table__marketCap'>{(Number(coin.marketCap) / 1000000000).toFixed(2) + 'B'}</td>

            <td className={`Table__change ${
                Number(coin?.change24h) >= 0 ? '--positive' : '--negative'
            }`}>
                {Number(coin?.change24h).toFixed(2)+'%'}
            </td>
              <td className='Table__action'>
              <button className='Table__addButton'>+</button>
            </td>
          </tr>
        ))}
      </tbody>
      <div className='Table__buttons'>
        <button
            className="Button Button--prev"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <button
            className="Button Button--next"
            onClick={handleNextPage}
            disabled={data.length < PAGE_LIMIT}
        >
          Next Page
        </button>
      </div>
    </table>


  )
}

export default Table
