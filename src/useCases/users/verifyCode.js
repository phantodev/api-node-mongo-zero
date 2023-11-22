const User = require("../../entities/users/User");
const bcrypt = require("bcrypt");

async function verifyCode(req, res) {
  try {
    const { code, email } = req.body;
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(code, user.resetCode);
    if (!match) {
      return res.status(400).send("Invalid code");
    }
    res.status(200).json({ message: "Código Verificado!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Erro no sendgrid!" });
  }
}

module.exports = verifyCode;
