// npm init
// npm i express
// RAPIDAPI CLIENT
// http localhost : 3000 / clientes/...

const express = require('express')
const app = express()
const port = 3000
app.use(express.json())
const fs = require('fs')

app.get('/ola', (req, res)=>{
    res.json('hello class')
})

app.post("/clientes", (req,res) => {
    const cliente = req.body
    if (!cliente || Object.keys(cliente).length === 0) {
        res.status(400).json({resposta: "Body não preenchido"})
    } else {
        try {
            const bd = JSON.parse(fs.readFileSync('bd.json', 'utf8'))
            bd.push(cliente)
            fs.writeFileSync('bd.json', JSON.stringify(bd), 'utf8')
            res.status(201).json({resposta: "Cliente cadastrado com sucesso!"})
        } catch(error) {
            res.status(500).json({resposta: error.message})
        }
    }    
})
app.get("/clientes", (req, res) => {
    try{
        const clientes = JSON.parse(fs.readFileSync("bd.json", "utf8"))
        res.status(200).json(clientes)
    }catch(error) {
        res.status(500).json({resposta: error.message})
    }

})

app.get("/clientes/:cpf", (req, res) => {
    const cpf = req.params.cpf
    try{
        const clientes = JSON.parse(fs.readFileSync("bd.json", "utf8"))
       const cliente_encontrado = clientes.find((cliente) => cliente.cpf.replace(/\D/g, "") == cpf)
       if(!cliente_encontrado) {
        res.status(404).json({erro: "cliente não existe no banco de dados! "})
       }
       res.status(200).json(cliente_encontrado)
    }catch(error) {
        res.status(500).json({resposta: error.message})
    }

})


app.delete("/clientes/:cpf", (req, res) => {
    const cpf = req.params.cpf
    try{
        const clientes = JSON.parse(fs.readFileSync("bd.json", "utf8"))
       const indice = clientes.findIndex((cliente) => cliente.cpf.replace(/\D/g, "") == cpf)
       if(indice == -1){
        res.status(404).json({resposta: "cliente não existe no banco de dados"})
       }
        clientes.splice(indice, 1)
        fs.writeFileSync('bd.json', JSON.stringify(clientes), 'utf8')
       res.status(200).json({resposta: "cliente removido"})
    }catch(error) {
        res.status(500).json({resposta: error.message})
    }
    cliente.findindex("clientes/:cpf") 
    
})

app.listen(port, ()=> {
    console.log('API executado com sucesso' + port)
})
