import React, { useState } from "react";
import CryptoChart from "../CryptoChart/CryptoChart";
import "./CryptoInfoPage.scss"
import AddToPortfolioModal from "../AddToPorfolioModal/AddToPortfolioModal";

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
const chartData = {
    labels: ["2022-03-04", "2022-03-05", "2022-03-06", "2022-03-07", "2022-03-08", "2022-03-09", "2022-03-10"],
    datasets: [
        {
            label: "BTC Price",
            data: [50000, 52000, 54000, 53000, 55000, 56000, 58000],
            backgroundColor: "rgba(0, 119, 204, 0.4)",
            borderColor: "rgba(0, 119, 204, 1)",
            pointBackgroundColor: "rgba(0, 119, 204, 1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(0, 119, 204, 1)"
        }
    ]
};
const CryptoInfoPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddToPortfolio = () => {
        setIsModalOpen(true);
    };

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