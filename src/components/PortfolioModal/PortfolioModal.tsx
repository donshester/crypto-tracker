import {useDispatch, useSelector} from 'react-redux'
import {AppDispatch, AppState} from '../../redux/store'
import {correctCryptoParam, extractCurrencyName} from '../helpers'
import {fetchCryptoInfo, ICryptoInfoResponse} from '../../redux/thunks/fetchCryptoInfoThunk'
import React, {useState} from 'react';
import {sellCurrency} from '../../redux/actions/portfolio';
import './PortfolioModal.scss'
import CurrencyInput from 'react-currency-input-field';
import {
    CurrencyInputProps
} from 'react-currency-input-field/dist/components/CurrencyInputProps';
interface IPortfolioModalProps {
    isOpen: boolean
    onClose: () => void
}

const PortfolioModal: React.FC<IPortfolioModalProps> = ({ onClose }) => {
    const portfolio = useSelector((state: AppState) => state.portfolio);
    const dispatch:AppDispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState<string>('');
    const [sellFormData, setSellFormData] = useState({
        id: '',
        name: '',
        quantity: '',
        maxQuantity: 0
    });
    const getCurrencyQuantity = (currencyName: string): number => {
        const currency = portfolio.currencies?.find(crypto => crypto.name === currencyName);
        return currency ? currency.quantity : 0;
    };
    const handleSellCurrency = async (id: string, name: string, quantity: number) => {
        const response:ICryptoInfoResponse = await dispatch(fetchCryptoInfo(correctCryptoParam(name)));
        const currentPrice = parseFloat(response.priceUsd);
        dispatch(sellCurrency({ id, currentPrice, quantity}));
    };

    const handleSellFormChange = (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        if (event.target instanceof HTMLSelectElement) {
            const selectedOption = event.target.options[event.target.selectedIndex];
            setSellFormData({ ...sellFormData, id: selectedOption.value, name: extractCurrencyName(selectedOption.label), maxQuantity: getCurrencyQuantity(extractCurrencyName(selectedOption.label))});
        } else {
            setSellFormData({ ...sellFormData, [event.target.name]: event.target.value });
        }
    };

    const handleSellFormSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        const { id,name, quantity } = sellFormData;
        await handleSellCurrency(id, name, parseFloat(quantity));

        setSellFormData({id: '', name: '', quantity: '', maxQuantity: 0});
    };


    const handleQuantityChange: CurrencyInputProps['onValueChange'] = (value, _, values) => {

        setSellFormData({ ...sellFormData, quantity: value as string });
        if (parseFloat(sellFormData.quantity) > sellFormData.maxQuantity){
            setErrorMessage(`Max is ${sellFormData.maxQuantity} ${sellFormData.id}!`);
        }
        else{
            setErrorMessage('');
        }

    }
    return (
        <div className='portfolio-modal'>
            <div className='portfolio-modal__header'>
                <h2>My Portfolio</h2>
                <button className='portfolio-modal__closeButton' onClick={onClose}>
                    X
                </button>
            </div>
            <div className='portfolio-modal__content'>
                <form  className='portfolio-modal__form'>
                    <h3>Sell Crypto</h3>
                    <div className='portfolio-modal__formGroup'>
                        <label htmlFor='sell-crypto-select'>Select Crypto:</label>
                        <select id='sell-crypto-select' name='id' value={sellFormData.id} onChange={handleSellFormChange}>
                            <option value=''>Select a cryptocurrency</option>
                            {portfolio.currencies?.map((crypto) => (
                                <option value={crypto.id} key={crypto.id}>
                                    {crypto.name} ({crypto.id})
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className='portfolio-modal__formGroup'>
                        <label htmlFor='sell-quantity-input'>Quantity:</label>
                        <CurrencyInput
                            className='input'
                            id='sell-quantity-input'
                            name='quantity'
                            value={sellFormData.quantity}
                            onValueChange={handleQuantityChange}
                            prefix={sellFormData.id + ' '}
                            max={sellFormData.maxQuantity}
                            groupSeparator=','
                            decimalSeparator='.'
                            decimalsLimit={15}
                            step={1}
                            allowNegativeValue={false}
                        />
                    </div>
                    <div className='invalid-feedback'>{errorMessage}</div>
                    <button onClick={handleSellFormSubmit} className='portfolio-modal__sellButton' type='submit'>
                        Sell
                    </button>
                </form>
                <table className='portfolio-modal__table'>
                    <thead>
                    <tr>
                        <th>Coin</th>
                        <th>Quantity</th>
                        <th>Bought Price</th>
                        <th>Value</th>
                        <th>Change</th>
                        <th>Sell</th>
                    </tr>
                    </thead>
                    <tbody>
                    {portfolio.currencies.map((crypto) => (
                        <tr key={crypto.id}>
                            <td>
                                {crypto.name} ({crypto.id})
                            </td>
                            <td>{crypto.quantity}</td>
                            <td>${crypto.boughtPrice.toLocaleString()}</td>
                            <td>${(crypto.quantity * crypto.boughtPrice).toLocaleString()}</td>
                            <td
                                /* className={
                                                    crypto.percentChange > 0
                                                        ? 'portfolio-modal__positiveChange'
                                                        : 'portfolio-modal__negativeChange'
                                                }*/
                            >
                                {/** crypto.percentChange > 0 ? '+' : '-'*/}
                                {/** Math.abs(crypto.percentChange).toFixed(2)}%*/}
                            </td>
                            <td>
                                <button
                                    className='portfolio-modal__sellButton'
                                     onClick={() => handleSellCurrency( crypto.id, crypto.name, crypto.quantity)}
                                >
                                    Sell
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default PortfolioModal;