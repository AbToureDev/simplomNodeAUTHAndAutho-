const jwt = require('jsonwebtoken');
function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization');
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Bearer <token>

        jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: 'Cet token nest pas valide.',
                });
            } else {
                req.user = payload;
                next();
            }
        });
    }else {
        res.status(401).json({
            success: false,
            message: 'Veuillez vous connecter pour acceder au ressource.',
        });
    }
}

module.exports = verifyToken;