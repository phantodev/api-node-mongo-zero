function updateUser(req, res) {
  try {
    res.send({ message: "Usuário Atualizado com sucesso!" });
  } catch (error) {
    res.status(400);
    res.send({ message: "Erro no banco!" });
  }
}

module.exports = updateUser;
