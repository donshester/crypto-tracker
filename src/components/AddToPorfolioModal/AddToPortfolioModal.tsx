import React, { SetStateAction, useState } from "react";
import "./AddToPortfolioModal.scss"
import CurrencyInput from "react-currency-input-field";
import {
    CurrencyInputOnChangeValues,
    CurrencyInputProps
} from "react-currency-input-field/dist/components/CurrencyInputProps";


interface IAddToPortfolioModalProps {
    isOpen: boolean;
    setIsOpen: SetStateAction<any>;
    onClose: () => void;
    onSubmit: (price: number, quantity: number) => void;
}

const BTCtoUSD = 24736.80
const AddToPortfolioModal:React.FC<IAddToPortfolioModalProps> = ({isOpen, onClose, onSubmit })=> {
    const [price, setPrice] = useState<string | number>(123.45);
    const [quantity, setQuantity] = useState<string | number>(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [className, setClassName] = useState('');
    const limit = 1000;
    const prefixPrice = '$';
    const prefixCrypto = "BTC "
    const handleOnValueChange: CurrencyInputProps['onValueChange'] = (value, _, values): void => {


        if (!value) {
            setClassName('');
            setPrice('');
            setQuantity('');
            return;
        }

        if (Number.isNaN(Number(value))) {
            setErrorMessage('Please enter a valid number');
            setClassName('is-invalid');
            return;
        }

        if (Number(value) > limit) {
            setErrorMessage(`Max: ${prefixPrice}${limit}`);
            setClassName('is-invalid');
            setPrice(value);
            setQuantity(Number(value)/BTCtoUSD)
            return;
        }
        setQuantity(Number(value)/BTCtoUSD)
        setClassName('is-valid');
        setPrice(value);
    };

    const handleQuantityChange:CurrencyInputProps['onValueChange'] = (value, _, values) => {
        if (!value){
            setQuantity('');
            setPrice(0);
        }
        const inputValue = Number(value);

        if (Number.isNaN(Number(value))) {
            setErrorMessage('Please enter a valid number');
            setClassName('is-invalid');
            return;
        }

        setClassName('is-valid')
        setPrice(inputValue*BTCtoUSD)
        setQuantity(inputValue);
    }

    const handleSubmit = () =>{
        onSubmit(Number(price),Number(quantity));
        onClose();
    }

    return (
        <div className={`Modal ${isOpen ? "is-active" : ""}`}>
            <div className="Modal__background"/>
            <div className="Modal__content">
                <div className="box">
                    <h2 className="box__title">Add to portfolio</h2>
                    <div className="field">
                        <label className="field__label">Price:</label>
                        <div className="field__control">
                            <CurrencyInput
                                className="input"
                                value={price}
                                onValueChange={handleOnValueChange}
                                placeholder="Please enter a number"
                                groupSeparator=","
                                decimalSeparator="."
                                prefix={prefixPrice}
                                step={2}
                                />
                            <div className="invalid-feedback">{errorMessage}</div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="field__label">Quantity:</label>
                        <div className="field__control">
                            <CurrencyInput className="input"
                                           value={quantity}
                                           onValueChange={handleQuantityChange}
                                           placeholder="BTC "
                                           groupSeparator=","
                                           decimalSeparator="."
                                           prefix={prefixCrypto}
                                           decimalsLimit={15}
                                           step={1}/>
                        </div>
                    </div>
                    <button className="button button--primary" onClick={handleSubmit}>
                        Add
                    </button>
                    <button className="button" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
            <button className="modal__close" aria-label="close" onClick={onClose} />
        </div>
    )
}

export default AddToPortfolioModal;