const { executarSQL } = require("../database");

const router = require("express").Router();


router.get("/", async (req, res) => {
    try {
        const servicos = await executarSQL("select * from servicos;");
        res.json(servicos);
    } catch (error) {
        res.status(500).send("Erro:" + error.message);
    }
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
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

module.exports = router;