import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret_changeme";

export interface JwtPayload {
    userId: string;
    username: string;
}

export function signToken(payload: JwtPayload) {
    return jwt.sign(payload, SECRET, { expiresIn: "8h" });
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET) as JwtPayload;
}