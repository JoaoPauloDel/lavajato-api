const mysql = require("mysql2/promise");


async function executarSQL(comandoSQL) {
    const conexao = await mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "4321",
        database: "lavajato_db",
        port: 3307
    })

    const [result] = await conexao.query(comandoSQL);
    conexao.end();

    return result;
}

module.exports = { executarSQL }