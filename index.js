const express = require("express");
const cors = require("cors");
const { executarSQL } = require("./src/database");

const app = express();

//MIDDLEWARES
app.use(express.json());

//ROTAS
app.get("/", (req, res) => {
    res.send("Olá mundo3");
});

app.get("/carros", async (req, res) => {
    try {
        const carros = await executarSQL("select * from carros;");
        res.json(carros);
    } catch (error) {
        res.status(500).send("Erro:" + error.message);
    }
});

app.post("/carros", async (req, res) => {
    try {
        let { modelo, placa, cor, telefone } = req.body;
        const carro = await executarSQL(`insert into carros (modelo, placa, cor, telefone) values ("${modelo}", "${placa}", "${cor}", "${telefone}");`);
        if(carro.affectedRows > 0){
            res.json("Carro criado com sucesso");
        }else{
            res.send("Ocorreu um erro");
        }
    } catch (error) {
        res.status(500).send("Erro:" + error.message);
    }
});

app.put("/carros/:id", async (req, res) => {
    try {
        let { modelo, placa, cor, telefone } = req.body;
        const carro = await executarSQL(`update carros set modelo = "${modelo}", placa = "${placa}", cor = "${cor}", telefone = "${telefone}" where id = ${req.params.id};`);
        if(carro.affectedRows > 0){
            res.json("Carro atualizado com sucesso");
        }else{
            res.send("Ocorreu um erro");
        }
    } catch (error) {
        res.status(500).send("Erro:" + error.message);
    }
});

app.delete("/carros/:id", async (req, res) => {
    try {
        const carro = await executarSQL(`delete from carros where id = ${req.params.id};`);
        if(carro.affectedRows > 0){
            res.json("Carro deletado com sucesso");
        }else{
            res.send("Ocorreu um erro");
        }
    } catch (error) {
        res.status(500).send("Erro:" + error.message);
    }
});

app.get("/servicos", async (req, res) => {
    try {
        const servicos = await executarSQL("select * from servicos;");
        res.json(servicos);
    } catch (error) {
        res.status(500).send("Erro:" + error.message);
    }
});

app.post("/servicos", async (req, res) => {
    try {
        let { nome, valor } = req.body;
        const servico = await executarSQL(`insert into servicos (nome, valor) values ("${nome}", ${valor});`);
        if(servico.affectedRows > 0){
            res.json("Serviço criado com sucesso");
        }else{
            res.send("Ocorreu um erro");
        }
    } catch (error) {
        res.status(500).send("Erro:" + error.message);
    }
});

app.put("/servicos/:id", async (req, res) => {
    try {
        let { nome, valor } = req.body;
        const servico = await executarSQL(`update servicos set nome = "${nome}", valor = ${valor} where id = ${req.params.id};`);
        if(servico.affectedRows > 0){
            res.json("Serviço atualizado com sucesso");
        }else{
            res.send("Ocorreu um erro");
        }
    } catch (error) {
        res.status(500).send("Erro:" + error.message);
    }
});

app.delete("/servicos/:id", async (req, res) => {
    try {
        const servico = await executarSQL(`delete from servicos where id = ${req.params.id};`);
        if(servico.affectedRows > 0){
            res.json("Serviço deletado com sucesso");
        }else{
            res.send("Ocorreu um erro");
        }
    } catch (error) {
        res.status(500).send("Erro:" + error.message);
    }
});




app.use((req, res) => {
    res.status(404).send("Rota não encontrada");
});

//OUVIDOR
app.listen(8000, () => {
    console.log("Servidor on: http://localhost:8000");
});