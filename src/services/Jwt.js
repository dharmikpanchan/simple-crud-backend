import jwt from 'jsonwebtoken';

export function generateToken(payload, option) {
    const token = jwt.sign(payload, process.env.key, option);
    return token;
}

export function checkTokenExpiration(token) {
    try {
        const decodedToken = jwt.decode(token, { complete: true });
        if (!decodedToken) {
            return true; // Handle invalid token
        }

        const expirationTime = decodedToken.payload.exp * 1000;
        const currentTime = Date.now();

        return currentTime > expirationTime;
    } catch (error) {
        console.error('Error decoding token:', error);
        return true; // Consider it expired for safety
    }
}

export function verifyToken(userType) {
    const token = jwt.verify(userType, process.env.key);
    return token;
}