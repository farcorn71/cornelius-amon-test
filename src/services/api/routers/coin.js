const Joi = require('joi');
const Router = require('@koa/router');
const CoinController = require('../controllers/coin');
const { validateParams } = require('../../../helpers/validation');

const CoinRouter = {
    schemaGetByCoinCode: Joi.object({
        coinCode: Joi.string().min(3).uppercase().max(5),
    }),

    schemaCreateCoin: Joi.object({
        name: Joi.string().min(3).uppercase().max(255),
        code: Joi.string().min(3).uppercase().max(255),
    }),

    async getCoinByCode(ctx) {

        const params = {
            coinCode: ctx.params.coinCode,
        };

        const formattedParams = await validateParams(CoinRouter.schemaGetByCoinCode, params);

        ctx.body = await CoinController.getCoinByCode(formattedParams.coinCode);
    },

    async createCoin(ctx) {

        const newcoin = ctx.request.body;

        await validateParams(CoinRouter.schemaCreateCoin, newcoin);

        ctx.body = await CoinController.createCoin(newcoin);
    },

    router() {
        const router = Router();

        /**
         * @api {get} / Get coinCode
         * @apiName coinCode
         * @apiGroup Status
         * @apiDescription Get coinCode
         *
         * @apiSampleRequest /
         *
         */
        router.get('/:coinCode', CoinRouter.getCoinByCode);

        /**
         * @api {put} / Add New Coin
         * @apiName createCoin
         * @apiGroup Coin
         * @apiDescription PUT coin
         *
         * @apiSampleRequest /
         *
         */
        router.put('/createCoin', CoinRouter.createCoin);

        return router;
    },
};

module.exports = CoinRouter;