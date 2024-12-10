import crypto from 'crypto';

// Function to encrypt data
export function encryptData(data, rsaPublicKey) {
    // Generate AES key and IV
    const aesIV = crypto.randomBytes(16);
    // console.log("AES IV", aesIV);

    const aesKey = crypto.randomBytes(32); // 256 bits
    // console.log("AES Key", aesKey);

    // Encrypt data using AES
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, aesIV, { padding: crypto.constants.RSA_PKCS7_PADDING });
    let encryptedData = cipher.update(data, 'utf8', 'base64');
    encryptedData += cipher.final('base64');

    // Create SHA-256 hash of the unencrypted data
    const hash = crypto.createHash('sha256').update(data).digest('hex');
    // console.log("Hash ", hash);

    // Encrypt the hash using AES
    const hashCipher = crypto.createCipheriv('aes-256-cbc', aesKey, aesIV, { padding: crypto.constants.RSA_PKCS7_PADDING });
    let encryptedHash = hashCipher.update(hash, 'utf8', 'base64');
    encryptedHash += hashCipher.final('base64');

    // Concatenate AES IV and AES key with a pipe symbol
    // const keyIV = `${aesIV}|${aesKey}`;
    const keyIV = `${aesIV.toString('base64')}|${aesKey.toString('base64')}`;


    // Encrypt AES key and IV using RSA public key

    const buffer = Buffer.from(keyIV);
    const encryptedKeyIV = crypto.publicEncrypt({ key: rsaPublicKey, padding: crypto.constants.RSA_PKCS1_PADDING }, buffer).toString('base64');

    return {
        key: encryptedKeyIV,
        data: encryptedData,
        hash: encryptedHash
    };
}