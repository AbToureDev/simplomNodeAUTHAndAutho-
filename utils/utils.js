
async function generateVerifyCodeMail() {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
}
module.exports = { generateVerifyCodeMail}