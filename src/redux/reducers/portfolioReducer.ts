import { createReducer } from '@reduxjs/toolkit';
import { buyCurrency, sellCurrency } from '../actions/portfolio';
import { PortfolioType } from '../../utils/types';

const initialState: PortfolioType = {
    balance: 100,
    portfolioPrice: 0,
    currencies: [],
};

export const portfolioReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(buyCurrency, (state, action) => {
            const { id, name, boughtPrice, quantity } = action.payload;
            const currencyIndex = state.currencies.findIndex((c) => c.id === id);
            if (currencyIndex === -1) {

                state.currencies.push(action.payload);
            } else {

                const currency = state.currencies[currencyIndex];
                currency.quantity += quantity;
                currency.boughtPrice = (currency.boughtPrice * currency.quantity + boughtPrice * quantity) / (currency.quantity + quantity);
            }
            state.balance -= boughtPrice * quantity;
            state.portfolioPrice = state.currencies.reduce((sum, c) => sum + c.quantity * c.boughtPrice, 0);
        })
        .addCase(sellCurrency, (state, action) => {
            const { id, quantity, currentPrice } = action.payload;
            const currencyIndex = state.currencies.findIndex((c) => c.id === id);
            if (currencyIndex === -1) {
                return;
            }
            const currency = state.currencies[currencyIndex];
            if (currency.quantity < quantity) {
                return;
            }
            if (currency.quantity === quantity) {
                state.currencies.splice(currencyIndex, 1);
            } else {
                currency.quantity -= quantity;
            }

            state.balance += currentPrice * quantity;
            state.portfolioPrice = state.currencies.reduce((sum, c) => sum + c.quantity * c.boughtPrice, 0);
        });
});
