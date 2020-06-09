const express = require('express')
const server = express()

// Pegar o objeto de banco de dados
const db = require('./database/db');

// Configurar pasta publica
server.use(express.static("public"))

// Habilitar o uso do req.body na aplicação
server.use(express.urlencoded({ extended: true }))

// Utilizando template engine
const nunjucks = require('nunjucks')
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar caminhos da aplicação
//pag. inicial
// req: Requisição
// res: Respostas
server.get("/", (req, res) => {
    // res.send("Hello world!")
    return res.render("index.html")
})

server.get("/create-point", (req, res) => {
    // res.send("Hello world!")

    // Query Strings da url
    // console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

    // req.body: o corpo do formulario
    // console.log(req.body)

    // inserir dados no banco de dados

    const query = `
     INSERT INT places (
         image, 
         name, 
         address, 
         address2, 
         state, 
         city, 
         items
     ) VALUES (?,?,?,?,?,?,?); `

    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.render("create-point.html", {saved: false})
        }

        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }

    db.run(query, values, afterInsertData)

})

server.get("/search-results", (req, res) => {
    // res.send("Hello world!")

    const search = req.query.search

    if (search == "")
    { // Pesquisa vazia
        return res.render("search-results.html", { total: 0 })
        
    }

    // pegar os dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }

        // console.log("Aqui estão os seus registros: ")
        // console.log(rows)

        var total = rows.length
        // mostrar a pagina html com os dados do banco de dados
        return res.render("search-results.html", { places: rows, total: total })
    })
})


// Ligar o server
server.listen(3000)

