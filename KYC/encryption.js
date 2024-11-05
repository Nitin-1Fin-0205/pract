import crypto from 'crypto';

// Function to encrypt data
export function encryptData(data, rsaPublicKey) {
    // Generate AES key and IV
    const aesKey = crypto.randomBytes(32); // 256 bits
    const aesIV = crypto.randomBytes(16);  // 128 bits

    // Encrypt data using AES
    const cipher = crypto.createCipheriv('aes-256-cbc', aesKey, aesIV);
    let encryptedData = cipher.update(data, 'utf8', 'base64');
    encryptedData += cipher.final('base64');

    // Create SHA-256 hash of the unencrypted data
    const hash = crypto.createHash('sha256').update(data).digest('hex');

    // Encrypt the hash using AES
    const hashCipher = crypto.createCipheriv('aes-256-cbc', aesKey, aesIV);
    let encryptedHash = hashCipher.update(hash, 'utf8', 'base64');
    encryptedHash += hashCipher.final('base64');

    // Encrypt AES key and IV using RSA public key
    const keyIV = Buffer.concat([aesIV, aesKey]);
    console.log('KeyIV:', keyIV.toString('base64'));
    const encryptedKeyIV = crypto.publicEncrypt(rsaPublicKey, keyIV).toString('base64');

    return {
        key: encryptedKeyIV,
        data: encryptedData,
        hash: encryptedHash
    };
}

