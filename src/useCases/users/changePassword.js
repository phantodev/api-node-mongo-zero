const User = require("../../entities/users/User");
const bcrypt = require("bcrypt");

async function changePassword(req, res) {
  try {
    const { email, code, newpassword } = req.body;
    const user = await User.findOne({ email });
    const match = await bcrypt.compare(code, user.resetCode);
    if (!match) {
      return res.status(400).send("Invalid code");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(newpassword, salt);
    await User.updateOne(
      { _id: user._id },
      { $set: { password: hashedpassword } },
      { new: true }
    );
    return res.send("Senha Alterada!");
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Erro no sendgrid!" });
  }
}

module.exports = changePassword;
