import React, {useState} from 'react'

import './Portfolio.scss'
import {useSelector} from 'react-redux';
import {AppState} from '../../redux/store';
import PortfolioModal from '../PortfolioModal/PortfolioModal';

export const Portfolio: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const balance = useSelector((state: AppState) => state.portfolio.balance);


  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

    return (
    <div className='Portfolio'>
      <div className='Portfolio__balance'> {`Balance:${balance}  USD`}</div>
      <div className='Portfolio__absolute-change'>Change: +2.38</div>
      <div className='Portfolio__percent-change'> (+34.55%)</div>
      <button onClick={() => setIsModalOpen(true)}>Details:</button>
      {isModalOpen && <PortfolioModal isOpen={isModalOpen} onClose={handleCloseModal} />}
    </div>
  )
}
