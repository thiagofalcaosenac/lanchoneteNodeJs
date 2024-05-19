import express from "express";
import bodyParser from 'body-parser';
import cors from "cors";

var app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3000;

var meusPedidos = []

app.get("/", async (req, res) => {
   res.status(200).json(meusPedidos);
})

app.post("/", async (req, res) => { 
    const novoPedido = req.body
    meusPedidos.push(novoPedido)
    res.status(201).json(meusPedidos)
})

app.put("/:id", async (req, res) => {
    const idDoPedido = parseInt(req.params.id)
    let pedidoFiltrado = meusPedidos.length > 0 && meusPedidos.filter(item => item.id === idDoPedido)

    if(!pedidoFiltrado) return res.status(404).json({message: "Pedido não encontrado"})
    
    meusPedidos[0].itens = req.body.itens;
    return res.status(200).json(meusPedidos)
})

app.delete("/:id", async (req, res) => {
    const idDoPedido = parseInt(req.params.id)
    let pedidoDeletado = meusPedidos.length > 0 && meusPedidos.filter(item => item.id === idDoPedido)

    if(!pedidoDeletado) return res.status(404).json({message: "Pedido não encontrado"})

    meusPedidos = meusPedidos.filter(item => item.id !== idDoPedido)
    return res.status(200).json(pedidoDeletado)
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
})