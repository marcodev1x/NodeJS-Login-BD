const express = require("express");
const router = express.Router();
const { prisma } = require("../data/prisma");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { userExists } = require("./userExists");

router.post("/register", async (req, res) => {
  try {
    const checkUser = await userExists(req.body.email);
    if (checkUser) {
      return res.status(400).json({
        alert: "Email já cadastrado",
      });
    }
    const secretPassword = await bcrypt.hash(req.body.password, 10);
    const createUser = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        password: secretPassword,
      },
    });
    delete createUser.password;
    res.status(201).json({ message: "Usuário criado", user: createUser });
    console.log("Usuário criado:", createUser);
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    res.status(500).json({ error: "Problema no servidor!" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const checkUser = await userExists(req.body.email);
    if (!checkUser)
      return res.status(401).json({
        alert: "Dados inválidos",
      });
    const checkSenha = await bcrypt.compareSync(
      req.body.password,
      checkUser.password
    );
    if (!checkSenha)
      return res.status(401).json({
        alert: "Dados inválidos",
      });
    const token = jwt.sign(
      { id: checkUser.id, email: checkUser.email },
      "shhhhh"
    );
    res.json({
      message: "Login realizado",
      token,
    });
  } catch (error) {
    console.error("Erro ao logar. Contate o suporte do Integrado!", error);
    res
      .status(500)
      .json({ alert: "Erro ao logar. Contate o suporte do Integrado!" });
  }
});

module.exports = { router };
