import { createAction } from '@reduxjs/toolkit';
import { CurrencyType } from '../../utils/types';

export type SellCurrencyPayload = {
    id: string;
    quantity: number;
    currentPrice: number;
};
export const buyCurrency = createAction<CurrencyType>('portfolio/buyCurrency');
export const sellCurrency = createAction<SellCurrencyPayload>('portfolio/sellCurrency');
