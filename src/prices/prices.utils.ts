import { TokenPriceSnapshot } from '../aws/models/token-price-snapshot.model';
import { getDataMapper } from '../aws/dynamodb.utils';
import { Currency } from '@badger-dao/sdk';
import { TOKENS } from '../config/tokens.config';
import { TokenPrice } from './interface/token-price.interface';
import { Chain } from '../chains/config/chain.config';
import { COINGECKO_URL } from '../config/constants';
import { CoinGeckoPriceResponse } from './interface/coingecko-price-response.interface';
import { request } from '../common/request';
import { ethers } from 'ethers';

/**
 * Update pricing db entry using chain strategy.
 * @param chain Chain objects
 * @param token Target for price update.
 */
export async function updatePrice({ address, price }: TokenPrice): Promise<TokenPrice> {
  try {
    if (Number.isNaN(price) || price === 0) {
      // TODO: add discord warning logs for errors on pricing
      throw new Error(`Attempting to update ${address} with bad price`);
    }
    const mapper = getDataMapper();
    return mapper.put(
      Object.assign(new TokenPriceSnapshot(), {
        address: ethers.utils.getAddress(address),
        price,
      }),
    );
  } catch (err) {
    console.error(err);
    return { address, price: 0 };
  } // ignore issues to allow for price updates of other coins
}

/**
 * Load token price fromt he pricing database.
 * @param contract Address for the token price being requested.
 * @returns Most recent price data for the requested contract.
 */
export async function getPrice(address: string, currency?: Currency): Promise<TokenPrice> {
  try {
    const mapper = getDataMapper();
    for await (const item of mapper.query(
      TokenPriceSnapshot,
      { address: ethers.utils.getAddress(address) },
      { limit: 1, scanIndexForward: false },
    )) {
      item.price = await convert(item.price, currency);
      return item;
    }
    return { address, price: 0 };
  } catch (err) {
    console.error(err);
    return { address, price: 0 };
  }
}

/**
 * Convert USD value to supported currencies.
 * @param value USD value
 * @param currency Target currency
 * @returns Converted value in target currency
 */
export async function convert(value: number, currency?: Currency): Promise<number> {
  if (!currency) {
    return value;
  }
  switch (currency) {
    case Currency.ETH:
      const wethPrice = await getPrice(TOKENS.WETH);
      return value / wethPrice.price;
    case Currency.AVAX:
      const wavaxPrice = await getPrice(TOKENS.AVAX_WAVAX);
      return value / wavaxPrice.price;
    case Currency.FTM:
      const wftmPrice = await getPrice(TOKENS.FTM_WFTM);
      return value / wftmPrice.price;
    case Currency.MATIC:
      const wmaticPrice = await getPrice(TOKENS.MATIC_WMATIC);
      return value / wmaticPrice.price;
    case Currency.USD:
    default:
      return value;
  }
}

export async function fetchPrices(chain: Chain, inputs: string[], lookupName = false): Promise<CoinGeckoPriceResponse> {
  if (inputs.length === 0) {
    return {};
  }

  let baseURL;
  let params: Record<string, string>;

  // utilize coingecko name look up api
  if (lookupName) {
    baseURL = `${COINGECKO_URL}/price`;
    params = {
      ids: inputs.join(','),
      vs_currencies: 'usd',
    };
  } else {
    baseURL = `${COINGECKO_URL}/token_price/${chain.network}`;
    params = {
      contract_addresses: inputs.join(','),
      vs_currencies: 'usd',
    };
  }

  return request<CoinGeckoPriceResponse>(baseURL, params);
}
