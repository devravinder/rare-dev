import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key';
const key = new TextEncoder().encode(secretKey);
export const SESSION_COOKIE_NAME = 'session';

export type SessionDetails = { email: string }

const TOKEN_EXPIRATION = '1 hour';
const COOKIE_EXPIRATION = 10 * 60 * (1000); // in ms

export async function encrypt(payload: SessionDetails) {
    return await new SignJWT(payload)
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime(TOKEN_EXPIRATION)
        .sign(key);
}

export async function decrypt(token: string): Promise<SessionDetails> {
    const { payload } = await jwtVerify(token, key, {
        algorithms: ['HS256'],
    });
    return payload as SessionDetails;
}



export const createSession = async (payload: SessionDetails) => {
    const session = await encrypt(payload);
    const expires = new Date(Date.now() + COOKIE_EXPIRATION) // 7 days
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE_NAME, session, { httpOnly: true, secure: true, expires, sameSite: 'lax', path: '/' });

}
export async function getSession() {
    const session = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
    if (!session) return null;
    try {
        return await decrypt(session);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
        return null;
    }
}

export async function updateSession() {
    const session = await getSession()
    if (!session) return;
    await createSession(session)

}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE_NAME)
}