const express = require("express");
const cors = require("cors");
const { executarSQL } = require("./src/database");

const servicosRoutes = require("./src/routes/servicosRoutes");

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

app.use("/servicos", servicosRoutes);

app.use((req, res) => {
    res.status(404).send("Rota não encontrada");
});

//OUVIDOR
app.listen(8000, () => {
    console.log("Servidor on: http://localhost:8000");
});