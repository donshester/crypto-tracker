import React, { SetStateAction, useEffect, useState } from 'react'
import './AddToPortfolioModal.scss'
import CurrencyInput from 'react-currency-input-field'
import { CurrencyInputProps } from 'react-currency-input-field/dist/components/CurrencyInputProps'
import { fetchCryptoInfo } from '../../redux/thunks/fetchCryptoInfoThunk'
import { useDispatch, useSelector } from 'react-redux'
import { ICryptoInfoState } from '../../redux/reducers/cryptoInfoReducer'
import { AppDispatch } from '../../redux/store'
import {buyCurrency} from '../../redux/actions/portfolio';
import {CurrencyType} from '../../utils/types';
interface IAddToPortfolioModalProps {
  isOpen: boolean
  onClose: () => void
  id: string
}

const AddToPortfolioModal: React.FC<IAddToPortfolioModalProps> = ({
  isOpen,
  onClose, id}) => {
  const [price, setPrice] = useState<string | number>(123.45);
  const [quantity, setQuantity] = useState<string | number>(0);
  const [errorMessage, setErrorMessage] = useState('');
  const [className, setClassName] = useState('');
  const dispatch: AppDispatch = useDispatch()
  const { cryptoData, fetchInfoError } = useSelector(
      (state: { cryptoInfo: ICryptoInfoState }) => state.cryptoInfo,
  )

  useEffect(() => {
    if (id) {
      dispatch(fetchCryptoInfo(id))
    }
  }, [dispatch, id])

  const limit = 1000
  const prefixPrice = '$'
  const prefixCrypto = `${cryptoData?.id} `

  const handleOnValueChange: CurrencyInputProps['onValueChange'] = (value, _, values): void => {
    if (!value) {
      setClassName('')
      setPrice('')
      setQuantity('')
      return
    }

    if (Number.isNaN(Number(value))) {
      setErrorMessage('Please enter a valid number')
      setClassName('is-invalid')
      return
    }

    if (Number(value) > limit) {
      setErrorMessage(`Max: ${prefixPrice}${limit}`)
      setClassName('is-invalid')
      setPrice(value)
      setQuantity(Number(value) / Number(cryptoData?.priceUsd))
      return
    }
    setQuantity(Number(value) / Number(cryptoData?.priceUsd))
    setClassName('is-valid')
    setPrice(value)
  }

  const handleQuantityChange: CurrencyInputProps['onValueChange'] = (value, _, values) => {
    if (!value) {
      setQuantity('')
      setPrice(0)
    }
    const inputValue = Number(value)

    if (Number.isNaN(Number(value))) {
      setErrorMessage('Please enter a valid number')
      setClassName('is-invalid')
      return
    }

    setClassName('is-valid')
    setPrice((inputValue * Number(cryptoData?.priceUsd)).toFixed(2))
    setQuantity(inputValue)
  }

  const handleSubmit = () => {
    const currency: CurrencyType = {
      id: cryptoData?.symbol ?? '',
      name: cryptoData?.name ?? '',
      boughtPrice: Number(cryptoData?.priceUsd ?? 0),
      quantity: Number(quantity),
    }
    dispatch(buyCurrency(currency));
    onClose()
  }

  return (
    <div className={`Modal ${isOpen ? 'is-active' : ''}`}>
      <div className='Modal__background' />
      <div className='Modal__content'>
        <div className='box'>
          <h2 className='box__title'>Add to portfolio</h2>
          <div className='field'>
            <label className='field__label'>Price:</label>
            <div className='field__control'>
              <CurrencyInput
                className='input'
                value={price}
                onValueChange={handleOnValueChange}
                placeholder='Please enter a number'
                groupSeparator=','
                decimalSeparator='.'
                prefix={prefixPrice}
                decimalsLimit={2}
                step={1}
              />
              <div className='invalid-feedback'>{errorMessage}</div>
            </div>
          </div>
          <div className='field'>
            <label className='field__label'>Quantity:</label>
            <div className='field__control'>
              <CurrencyInput
                className='input'
                value={quantity}
                onValueChange={handleQuantityChange}
                placeholder={`${cryptoData?.id} `}
                groupSeparator=','
                decimalSeparator='.'
                prefix={cryptoData?.symbol + ' '}
                decimalsLimit={15}
                step={1}
              />
            </div>
          </div>
          <button className='button button--primary' onClick={handleSubmit}>
            Add
          </button>
          <button className='button' onClick={onClose}>
            Close
          </button>
        </div>
      </div>
      <button className='modal__close' aria-label='close' onClick={onClose} />
    </div>
  )
}

export default AddToPortfolioModal;
