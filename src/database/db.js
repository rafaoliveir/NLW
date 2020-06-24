//importar a dependência do sqlite3

const sqlite3 = require('sqlite3').verbose(); //querer ver msg
//criar o objeto que irá fazer operações no banco de dados
const db = new sqlite3.Database('./src/database/database.db');
//exportar o arquivo
module.exports = db;

// //utilizar o obj de banco de dados pra operação
// db.serialize(()=>{
//     //criar uma tabela
// db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         image TEXT,
//         name TEXT,
//         address TEXT,
//         number NUMBER,
//         state TEXT,
//         city TEXT,
//         items TEXT

//     );

//     `) //crase pra conseguir quebra de linha

//     //inserir dados na tabela
// const query =`
//     INSERT INTO places(
//         image,
//         name,
//         address,
//         number,
//         state,
//         city,
//         items
//     ) VALUES(?,?,?,?,?,?, ?);
//     `
// const values = [
//     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
//     "Papersider",
//     "Guilherme Gamballa, Jardim América",
//     "260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Papéis e Papelão"
// ]

// function afterInsertData(err){
//     if(err){
//         return console.log(err)
//     }

//     console.log("Cadastrado com sucesso")
//     console.log(this)

// }
// db.run(query, values, afterInsertData)

//     //consultar os dados da tabela
// db.all(`SELECT * FROM places`, function (err, rows) {
//   if (err) {
//     return console.log(err);
//   }

//   console.log('Aqui estão os seus registros');
//   console.log(rows);
// });

//     //deletar um dado da tabela
// db.run(`DELETE FROM places WHERE id =?`, [7], function (err) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('Registro deletado com sucesso!');
// });
// })
