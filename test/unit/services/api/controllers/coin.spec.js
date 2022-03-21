const path = require('path');
const sinon = require('sinon');
const sequelizeMockingMocha = require('sequelize-mocking').sequelizeMockingMocha;
const CoinController = require(path.join(srcDir, '/services/api/controllers/coin'));
const DB = require(path.join(srcDir, 'modules/db'));

describe('Controller: Coin', () => {
    let sandbox = null;

    sequelizeMockingMocha(DB.sequelize, [path.resolve('test/mocks/coins.json')], { logging: false });

    beforeEach(async() => {
        sandbox = sinon.createSandbox();
    });

    afterEach(() => {
        sandbox && sandbox.restore();
    });

    describe('getCoinByCode', () => {
        it('should get coin by code', async() => {
            const coinCode = 'BTC';
            const coin = await CoinController.getCoinByCode(coinCode);

            expect(coin.code).to.eq(coinCode);
            expect(Object.keys(coin).length).to.eq(3);
        });

        it('should fail get coin by code', async() => {
            const coinCode = 'AMN';
            expect(CoinController.getCoinByCode(coinCode)).to.be.rejectedWith(Error, 'unknown_coin_code');
        });
    });

    describe('createCoin', () => {
        it('should create a new coin with unique code', async() => {
            const coin_obj = {
                name: "Bitcoin4",
                code: "EMX"
            };
            const coin = await CoinController.createCoin(coin_obj);

            expect(coin.code).to.eq(coin_obj.code);
            expect(Object.keys(coin).length).to.eq(3);
        });

        it('should fail create coin by using existing code code', async() => {
            const coin_obj = {
                name: "Bitcoin4",
                code: "BTC"
            };
            expect(CoinController.createCoin(coin_obj)).to.be.rejectedWith(Error, 'coin_code_already_exist');
        });
    });
});