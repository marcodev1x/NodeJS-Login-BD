const express = require("express");
const router = express.Router();
const { prisma } = require("../data/prisma");
const auth = require("./authenticator");
router.post("/pecas", auth, async (req, res) => {
  try {
    const registrarPecas = await prisma.pecas.create({
      data: {
        name: req.body.name,
        price: req.body.price,
      },
    });
    res.status(201).json({
      message: "Produto cadastrado",
    });
    console.log("Peça cadastrada: ", registrarPecas);
  } catch (error) {
    console.error("Erro ao cadastrar produto", error);
    res.status(500).json({ error: "Problema no servidor!" });
  }
});

router.get("/pecas", auth, async (req, res) => {
  try {
    const pecas = await prisma.pecas.findMany();
    res.status(200).json(pecas);
  } catch (error) {
    console.error("Erro ao buscar peças", error);
    res.status(500).json({ error: "Problema no servidor!" });
  }
});

module.exports = { router };
