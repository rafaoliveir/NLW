const express = require('express');
const server = express();

//pegar o banco de dados
const db = require('./database/db.js');

//configurar pasta public
server.use(express.static('public'));

//habilita o req.body
server.use(express.urlencoded({ extended: true }));

//utilizando template engine
const nunjucks = require('nunjucks');
nunjucks.configure('src/views', {
  express: server,
  noCache: true,
});

//Configurar caminhos da aplicação
//página inicial
//req: Requisição
//res: Resposta
server.get('/', (req, res) => {
  return res.render('index.html', { title: 'novo título' });
});

server.get('/cadastro', (req, res) => {
  //req.query: query strings da url
  console.log(req.query);
  return res.render('cadastro.html');
});

server.post('/savepoint', (req, res) => {
  //req.body: o corpo do formulario
  //console.log(req.body)

  //inserir dados bd
  const query = `
    INSERT INTO places(
        image,
        name,
        address,
        number,
        state,
        city,
         items
    ) VALUES(?,?,?,?,?,?, ?);
    `;
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.number,
    req.body.state,
    req.body.city,
    req.body.items,
  ];

  function afterInsertData(err) {
    if (err) {
      return console.log(err);
    }

    console.log('Cadastrado com sucesso');
    console.log(this);
    return res.render('cadastro.html', { saved: true });
  }
  db.run(query, values, afterInsertData);
});

server.get('/resultado', (req, res) => {
  const search = req.query.search;
  if (search == '') {
    //pesquisa vazia
    return res.render('resultado-pesquisa.html', { total: 0 });
  }

  //pegar os dados do banco
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (
    err,
    rows
  ) {
    if (err) {
      return console.log(err);
    }
    const total = rows.length; //conta quantos elementos dentro do array (total: x resultados)

    console.log('Aqui estão os seus registros');
    console.log(rows);
    //mostra a página html com os dados do banco
    return res.render('resultado-pesquisa.html', {
      places: rows,
      total: total,
    });
  });
});
/*SEM NUNJUCKS ficaria assim
server.get("/", (req,res) =>{
    res.sendFile(__dirname + "/views/index.html")
})
server.get("/cadastro", (req,res) =>{
    res.sendFile(__dirname + "/views/cadastro.html")
})*/

//ligar o servidor
server.listen(3000);
