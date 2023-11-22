const User = require("../../entities/users/User");

async function verifyCode(req, res) {
  try {
    const { email, code } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      console.log(code);
      console.log(userExist.resetCode);
      if (userExist.resetCode === code) {
        res.send({ message: "Código Válido!" });
      } else {
        res.send({ message: "Código Inválido!" });
      }
    } else {
      res.send({ message: "E-mail não existe na base!" });
    }
  } catch (error) {
    console.log(error);
    res.status(400);
    res.send({ message: "Erro no banco!" });
  }
}

module.exports = verifyCode;
