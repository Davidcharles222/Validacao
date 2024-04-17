const express = require("express")
const app = express()
const session = require("express-session")
const flash = require("express-flash")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use(cookieParser("kjdfksjfkajlakjdfajf"))

app.use(session({
    secret: 'teste',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60000}
}))

app.use(flash())

app.get("/", (req, res) => {
    var emailError = req.flash("emailError")
    var pontosError = req.flash("pontosError")
    var nomeError = req.flash("nomeError")

    var email = req.flash("email")
    var nome = req.flash("nome")
    var pontos = req.flash("pontos")

    emailError = (emailError == undefined || emailError.length == 0) ? undefined : emailError

    email = (email == undefined || email.length == 0) ? undefined : email
    nome = (nome == undefined || nome.length == 0) ? undefined : nome
    pontos = (pontos == undefined || pontos.length == 0) ? undefined : pontos

    res.render("index",{emailError, pontosError, nomeError, email, nome, pontos})
})

app.post("/form", (req, res) => {
    var {email, nome, pontos} = req.body
    
    var emailError
    var nomeError
    var pontosError

    if(email == undefined || email == ""){
        emailError = "O e-mail não pode ser vazio"
    }

    if(pontos == undefined || pontos < 20){
        pontosError = "Você não pode ter menos de 20 pontos"
    }

    if(nome == undefined || nome == ""){
        nomeError = "O nome não pode ser vazio"
    }

    if(nome.length < 4){
        nomeError = "O nome é muito pequeno"
    }

    if(emailError != undefined || nomeError != undefined || pontosError != undefined){
        req.flash("emailError",emailError)
        req.flash("nomeError",nomeError)
        req.flash("pontosError",pontosError)

        req.flash("email",email)
        req.flash("nome",nome)
        req.flash("pontos",pontos)

        res.redirect("/")
    }else{
        res.send("SHOW DE BOLA ESSE FORM!")
    }
})


app.listen(4040, (req, res) => {
    console.log("App rodando!")
})
