const User = require('../models/user');
const VerificationCode = require('../models/verificationCode');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {generateVerifyCodeMail} = require('../utils/utils')
const {sendMail} = require('../Mail/sendeMail')

async function signup(req, res) {
    try {
        const {firstName, lastName, email, password} =req.body;
        const hasPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            email,
            firstName,
            lastName,
            password:hasPassword,
        })
        const saveUser = await User.create(newUser);
        res.status(201).json({message:"user saved successfully", user: saveUser});

    }catch (err) {
        res.status(403).json({message: err.message});
    }
}
async function login(req, res) {
        const {email, password} =req.body;
        const user = await User.findOne({email: email});
        if (!user) {
            return res.status(401).json({ error: "Vous n\'avais pas compte." });
        }
        const passwordValidate = await bcrypt.compare(password, user.password);
        if (!passwordValidate) {
           return res.status(404).json({error: 'Invalid password'});
        } else if (!user.isEmailVerified) {
            return res.status(404).json({error: 'Your compte has not been verified'});
        }
        return  res.status(200).json(await token(user));
}
async function logOut(req, res) {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(400).send('Unable to log out')
            } else {
                res.send('Logout successful')
            }
        });
    } else {
        res.end()
    }
}
async function sendVerifyEmail(req, res) {
    const {email} =req.body;
    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(401).json({ error: "Vous n\'avais pas compte." });
    }
    const code = await generateVerifyCodeMail();
    const message =`Votre code de verification est: ${code}`
    const subject ='Verification code.'
    await sendMail({email, subject, message})
    const verify = await VerificationCode.findOne({userId:user.id});
    const verifyCode = new VerificationCode({
        verifyCode:code,
        userId:user.id
    })

    if (verify) {
        await VerificationCode.findByIdAndUpdate(verify._id, { verifyCode: code }, { new: true });

    } else {
        await VerificationCode.create(verifyCode);
    }
    return res.status(200).json('Code de verification envoyer avec success.')

}
async function verifyEmailCode(req, res) {
    const {email, verifyCode } =req.body;
    const verify = await VerificationCode.findOne({ verifyCode: verifyCode});
    const id = verify.userId;
    await User.findByIdAndUpdate(id, { isActive: true, isEmailVerified: true}, {new: true});
    await VerificationCode.deleteOne(verify._id);
    return res.status(200).json('Votre email a ete verifier avec success.')
}
async function resetPassword(req, res) {
    const {email, newPassword } =req.body;
    const user = await User.findOne({email: email});
    if (!user) {
        return res.status(401).json({ error: "Vous n\'avais pas compte." });
    }
     const hasPassword = await bcrypt.hash(newPassword, 12);
    await User.findByIdAndUpdate(user._id, { password: hasPassword}, {new: true});
    return res.status(200).json('Votre mot de passe a ete changer avec success.')
}
const token = async function (user) {
    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        isActive: user.isActive
    }
    const access_token = await jwt.sign(payload, process.env.SECRET_KEY, {
        expiresIn: '1d'
    })
    const refresh_token = await jwt.sign(payload, process.env.REFRESH_KEY, {
        expiresIn: '7d'
    })

    return {
        access_token: access_token,
        refresh_token: refresh_token
    }
}
module.exports = {signup, login, logOut, sendVerifyEmail, verifyEmailCode,resetPassword};