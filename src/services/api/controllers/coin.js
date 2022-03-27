const errors = require('../../../helpers/errors');
const Models = require('../../../models/pg');
const dayjs = require('dayjs');
const CoinGeckoService = require('../../thirdparty/coinngecko')

const CoinController = {
    async getCoinByCode(coinCode) {
        const coin = await Models.Coin.findByCoinCode(coinCode);

        errors.assertExposable(coin, 'unknown_coin_code');

        //if coin code is found get latest price 
        //if coin code price is 0 or date is not set or date is less than 1 hour
        const ft = dayjs(coin.updateAt);
        const tt = dayjs();
        const mins = tt.diff(ft, "minutes", true);
        const totalHours = parseInt(mins / 60);

        if (!coin.price || (totalHours > 1)) {

            let coin_g_resp = await CoinGeckoService.getCoinByCode(coin.name.toLowerCase());

            coin_g_resp = JSON.parse(coin_g_resp);

            coin.updateAt = coin_g_resp.last_updated;

            coin.price = `${coin_g_resp.market_data.current_price[coin.code.toLowerCase()]}`;

            await Models.Coin.update({
                updateAt: coin_g_resp.last_updated,
                price: `${coin_g_resp.market_data.current_price[coin.code.toLowerCase()]}`
            }, { where: { id: coin.id } });

        }

        return coin.filterKeys();
    },

    async createCoin(newCoin) {
        const coin = await Models.Coin.findByCoinCode(newCoin.code);

        errors.assertExposableExist(coin, 'coin_code_already_exist');

        const createdCoin = await Models.Coin.create(newCoin);
        return createdCoin.filterKeys();
    },
};

module.exports = CoinController;