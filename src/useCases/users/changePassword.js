const User = require("../../entities/users/User");
const bcrypt = require("bcrypt");

async function changePassword(req, res) {
  try {
    const { email, code, newPassword } = req.body;
    const userExist = await User.findOne({ email });
    // const match = bcrypt.compare(code, userExist.resetCode);
    if (userExist) {
      if (code === userExist.resetCode) {
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(newPassword, salt);
        await User.updateOne(
          { _id: userExist._id },
          { $set: { password: hashPassword } },
          { new: true }
        );
        res.send({ message: "Senha alterada com sucesso!" });
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

module.exports = changePassword;
