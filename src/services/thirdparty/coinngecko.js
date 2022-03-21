const request = require('../../helpers/request');
const CoinGeckoService = {

    getCoinByCode: async(coinCode) => {
        const base_url = `${process.env.COINGECKO_BASE_URL}/${process.env.COINGECKO_GET_COIN}`;
        const response = await request
            .get(`${base_url}/${coinCode}`);
        return response.text;
    },
};

module.exports = CoinGeckoService;