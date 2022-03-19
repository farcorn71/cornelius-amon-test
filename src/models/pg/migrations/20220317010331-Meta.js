module.exports = {
    up: async function(query, transaction) {
        const sql = `
      CREATE TABLE "Meta" (
        key VARCHAR(255) NOT NULL,
        "createdAt" timestamp with time zone NOT NULL,
        "updatedAt" timestamp with time zone NOT NULL,
        "data" jsonb NOT NULL,
        "validation" jsonb NOT NULL
      );
    `;
        await transaction.sequelize.query(sql, { raw: true, transaction });
    },

    down: async function(query, transaction) {
        const sql = 'DROP TABLE "Meta"';
        await transaction.sequelize.query(sql, { raw: true, transaction });
    },
};