import React, { useEffect, useState } from "react";
import CryptoChart from "../CryptoChart/CryptoChart";
import "./CryptoInfoPage.scss"
import AddToPortfolioModal from "../AddToPorfolioModal/AddToPortfolioModal";
import { useDispatch, useSelector } from "react-redux";
import { CryptoPriceState, ICryptoPriceData } from "../../redux/reducers/fetchCryptoPrice";
import { fetchCryptoPrice } from "../../redux/thunks/thunks";
import { AppDispatch } from "../../redux/store";
import moment from "moment";
interface ICryptoData  {
    id: string;
    rank: string;
    symbol: string;
    name: string;
    supply: string;
    maxSupply: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    priceUsd: string;
    changePercent24Hr: string;
    vwap24Hr: string;
}

const cryptoData = {
        id: "bitcoin",
        rank: 1,
        symbol: "BTC",
        name: "Bitcoin",
        supply: 18734431,
        maxSupply: 21000000,
        marketCapUsd: 863101274357,
        volumeUsd24Hr: 46126083325,
        priceUsd: 46095.87,
        changePercent24Hr:   1.04,
        vwap24Hr: 47319.68
}

const CryptoInfoPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch: AppDispatch  = useDispatch();

    const { loading, data, error } = useSelector((state: { cryptoPrice: CryptoPriceState }) => state.cryptoPrice );


    const chartData = {
        labels: data.map((item:ICryptoPriceData) => item.date),
        datasets: [
            {
                label: "BTC Price",
                data: data.map((item:ICryptoPriceData) => (item.priceUsd)),
                backgroundColor: "rgba(0, 119, 204, 0.4)",
                borderColor: "rgba(0, 119, 204, 1)",
                pointBackgroundColor: "rgba(0, 119, 204, 1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(0, 119, 204, 1)",
                pointRadius: 0
            }
        ]
    };
    const handleAddToPortfolio = () => {
        setIsModalOpen(true);
    };
    useEffect(() => {
        dispatch(fetchCryptoPrice());
    }, [dispatch]);

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    const handleSubmitModal = (price: number, quantity: number) => {
        console.log("Price:", price, "Quantity:", quantity);
    };
    return(
        <div className="CryptoInfoPage">
            <h1 className="CryptoInfoPage__title">{cryptoData?.name} ({cryptoData?.symbol.toUpperCase()})</h1>
            <div className="CryptoInfoPage__chart">
                <CryptoChart chartData={chartData} />
            </div>
            <div className="CryptoInfoPage__info">
                <div className="CryptoInfoPage__row">
                    <span className="CryptoInfoPage__label">Rank:</span>
                    <span className="CryptoInfoPage__value">{cryptoData?.rank}</span>
                </div>
                <div className="CryptoInfoPage__row">
                <span className="CryptoInfoPage__label">Price:</span>
                <span className="CryptoInfoPage__value">${cryptoData?.priceUsd.toFixed(2)}</span>
            </div>
            <div className="CryptoInfoPage__row">
                <span className="CryptoInfoPage__label">24h Change:</span>
                <span className={`CryptoInfoPage__value ${cryptoData?.changePercent24Hr >= 0 ? "green" : "red"}`}>
            {cryptoData?.changePercent24Hr.toFixed(2)}%
          </span>
            </div>
            <div className="CryptoInfoPage__row">
                <span className="CryptoInfoPage__label">Market Cap:</span>
                <span className="CryptoInfoPage__value">${cryptoData?.marketCapUsd.toLocaleString()}</span>
            </div>
            <div className="CryptoInfoPage__row">
                <span className="CryptoInfoPage__label">24h Volume:</span>
                <span className="CryptoInfoPage__value">${cryptoData?.volumeUsd24Hr.toLocaleString()}</span>
            </div>
            <div className="CryptoInfoPage__row">
                <span className="CryptoInfoPage__label">Total Supply:</span>
                <span className="CryptoInfoPage__value">{cryptoData?.supply.toLocaleString()} {cryptoData?.symbol.toUpperCase()}</span>
            </div>
            <div className="CryptoInfoPage__row">
                <span className="CryptoInfoPage__label">Max Supply:</span>
                <span className="CryptoInfoPage__value">{cryptoData?.maxSupply.toLocaleString()} {cryptoData?.symbol.toUpperCase()}</span>
            </div>
        </div>

        <div className = "CryptoInfoPage__add-to-portfolio" onClick={handleAddToPortfolio}>
            <button >Add to Portfolio</button>
        </div>
            <AddToPortfolioModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitModal}/>
    </div>
);
};


export default CryptoInfoPage;