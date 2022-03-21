module.exports = {
    up: async function(query, transaction) {
        const sql = `
      ALTER TABLE "Coin"
      ADD "price" VARCHAR(255) NULL
      ;
    `;
        await transaction.sequelize.query(sql, { raw: true, transaction });
    },

    down: async function(query, transaction) {
        const sql = 'ALTER TABLE "Coin" DROP COLUMN "price";';
        await transaction.sequelize.query(sql, { raw: true, transaction });
    },
};