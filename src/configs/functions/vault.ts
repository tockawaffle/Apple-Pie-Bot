import crypto, { CipherGCM, CipherGCMTypes, DecipherGCM } from "crypto";
import "dotenv/config";

export default class AesGcmUtil {
    private algorithm: CipherGCMTypes = "aes-256-gcm";
    private encryptedPrefix: string = process.env.AES_PREFIX as string || "tck::";

    private deriveKeyFromPassword(
        password: string,
        salt: Buffer,
        iterations: number
    ): Buffer {
        return crypto.pbkdf2Sync(password, salt, iterations, 32, "sha512");
    }

    public encrypt(
        plainText: string | object,
        password: string
    ): string | undefined {
        try {
            if (typeof plainText === "object") {
                plainText = JSON.stringify(plainText);
            } else {
                plainText = String(plainText);
            }

            const salt = crypto.randomBytes(64);
            const iv = crypto.randomBytes(16);
            const iterations =
                Math.floor(Math.random() * (99999 - 10000 + 1)) + 10000;

            const encryptionKey = this.deriveKeyFromPassword(
                password,
                salt,
                Math.floor(iterations * 0.47 + 1337)
            );
            const cipher: CipherGCM = crypto.createCipheriv(
                this.algorithm,
                encryptionKey,
                iv
            );

            const encryptedData = Buffer.concat([
                cipher.update(plainText, "utf8"),
                cipher.final(),
            ]);
            const authTag = cipher.getAuthTag();

            const output = Buffer.concat([
                salt,
                iv,
                authTag,
                Buffer.from(iterations.toString()),
                encryptedData,
            ]).toString("hex");

            return this.encryptedPrefix + output;
        } catch (error) {
            console.error("Encryption failed!", error);
            return undefined;
        }
    }

    public decrypt(cipherText: string, password: string): string | undefined {
        try {
            const cipherTextParts = cipherText.split(this.encryptedPrefix);

            if (cipherTextParts.length !== 2) {
                console.error(
                    "Could not determine the beginning of the cipherText. Maybe not encrypted by this method."
                );
                return undefined;
            } else {
                cipherText = cipherTextParts[1];
            }

            const inputData: Buffer = Buffer.from(cipherText, "hex");

            const salt: Buffer = inputData.slice(0, 64);
            const iv: Buffer = inputData.slice(64, 80);
            const authTag: Buffer = inputData.slice(80, 96);
            const iterations: number = parseInt(
                inputData.slice(96, 101).toString("utf-8"),
                10
            );
            const encryptedData: Buffer = inputData.slice(101);

            const decryptionKey = this.deriveKeyFromPassword(
                password,
                salt,
                Math.floor(iterations * 0.47 + 1337)
            );
            const decipher: DecipherGCM = crypto.createDecipheriv(
                this.algorithm,
                decryptionKey,
                iv
            );
            decipher.setAuthTag(authTag);

            const decrypted =
                decipher.update(encryptedData) + decipher.final("utf-8");

            try {
                return JSON.parse(decrypted);
            } catch (error) {
                return decrypted;
            }
        } catch (error: any) {
            console.error("Decryption failed!", error);
            return undefined;
        }
    }
}

(async() => {
    const teste = new AesGcmUtil()
    const teste2 = teste.encrypt("teste", "teste")
    console.log(teste2)
})()