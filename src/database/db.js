// importar a dependencia do sqlite3
const sqlite3 = require('sqlite3').verbose()

// Iniciar o objeto de banco de dados
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db

/* // utilizar o objeto de banco de dados para as operações
db.serialize(() => {
    // // Com comandos SQL:
    // // Criar uma tabela
    // db.run(`
    //     CREATE TABLE IF NOT EXISTS places (
    //         id INTEGER PRIMARY KEY AUTOINCREMENT,
    //         image TEXT,
    //         name TEXT,
    //         address TEXT,
    //         address2 TEXT,
    //         state TEXT,
    //         city TEXT,
    //         items TEXT
    //     );
    // `)
    // // Inserir dados da tabela
    // const query = `
    //     INSERT INTO places (
    //         image, 
    //         name, 
    //         address, 
    //         address2, 
    //         state, 
    //         city, 
    //         items
    //     ) VALUES (?,?,?,?,?,?,?); `

    // const values = [
    //     "https://i.ytimg.com/vi/6pyMDjCM_fc/hqdefault.jpg?sqp=-oaymwEYCKgBEF5IVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLB2KzZqtNBH_QV5QkkWqV3XvflttA",
    //     "Papersider",
    //     "Rua taquaril",
    //     "Nº 827",
    //     "MG",
    //     "BH",
    //     "Eletronicos"
    // ]

    // function afterInsertData(err) {
    //     if (err) {
    //         return console.log(err)
    //     }
    
    //     console.log("Cadastrado com sucesso!")
    //     console.log(this)
    // }

    // db.run(query, values, afterInsertData)

    // // Consultar os dados da tabela
    // db.all(`SELECT * FROM places`, function(err, rows){
    //     if (err) {
    //         return console.log(err)
    //     }

    //     console.log("Aqui estão os seus registros: ")
    //     console.log(rows)
    // })

    // Deletar um dado na tabela
    // db.run(`DELETE FROM places WHERE id = ?`, [3], function(err){
    //     if (err) {
    //         return console.log(err)
    //     }
    //     console.log("Registro deletado com sucesso!")
    // })

})
*/