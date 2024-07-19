import { verifyToken } from "../services/Jwt.js";

export const auth = async (req, res, next) => {
    try {
        let token = req.header("Auth" || "auth")
        if (!token) {
            return res.status(401).json({ error: 'Token is not auth' })
        }
        let decodedToken = await verifyToken(token);
        req.user = decodedToken.id;
        next();
    } catch (error) {
        console.log(error)
        // io.emit('tokenError', { message: 'Token error occurred' });
    }
}

export const restric = (...type) => {
    return (req, res, next) => {
        if (!type.includes(req.user.userType)) {
            return res.status(401).json({ error: `${req.user.userType} is not allowed` });
        }
        next();
    }
}