const User = require("../../entities/users/User");
const bcrypt = require("bcrypt");

const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(
  "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"
);

async function forgotPassword(req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new Error("Usuário não existente!");
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedCode = await bcrypt.hash(code, 10);
    user.resetCode = hashedCode;
    await user.save();
    const to = "kduburko@gmail.com";
    const from = "eduardoburko@gmail.com";
    const subject = "Esqueceu a senha da API X";
    const text = "Teste de envio de texto";
    const html = `Segue o código que você precisa copiar e colocar no APP <b>${user.resetCode}</b>`;
    const msg = { to, from, subject, text, html };
    await sgMail.send(msg);
    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Erro no sendgrid!" });
  }
}

module.exports = forgotPassword;
