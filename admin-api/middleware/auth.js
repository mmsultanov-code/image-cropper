const jwt = require('jsonwebtoken');
require('dotenv').config()

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization']
    if (!authHeader) {
        return res.status(401).json({ error: 'Токен не предоставлен' })
    }
    const parts = authHeader.split(' ')
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Неверный формат токена' })
    }
    const token = parts[1]
    jwt.verify(token, process.env.JWT_SECRET_TOKEN || 'WdimMiw9219', (err, decodedToken) => {
        if (err) {
            return res.status(401).json({ error: 'Недействительный токен' })
        }
        req.userId = decodedToken.userId
        next();
    })
}

module.exports = verifyToken;