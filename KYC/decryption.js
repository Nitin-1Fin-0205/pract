import crypto from 'crypto';

// Function to decrypt data
export function decryptData(encryptedKeyIV, encryptedData, encryptedHash, rsaPrivateKey) {
    try {
        console.log('Received Encrypted KeyIV:', Buffer.from(encryptedKeyIV, 'base64'));
        console.log('Received Encrypted Data:', encryptedData);
        console.log('Received Encrypted Hash:', encryptedHash);

        // Decrypt AES key and IV using RSA private key
        const decryptedKeyIV = crypto.privateDecrypt(
            { key: rsaPrivateKey },
            Buffer.from(encryptedKeyIV, 'base64')
        );
        console.log('Decrypted KeyIV:', decryptedKeyIV.toString('base64'));

        // Split the decrypted key and IV
        const [aesIVBase64, aesKeyBase64] = decryptedKeyIV.toString().split('|');
        const aesIV = Buffer.from(aesIVBase64, 'base64');
        const aesKey = Buffer.from(aesKeyBase64, 'base64');

        // Log lengths for debugging
        console.log('AES IV Length:', aesIV.length);
        console.log('AES Key Length:', aesKey.length);

        // Ensure the key length is valid
        if (aesKey.length !== 32) {
            throw new Error('Invalid AES key length');
        }

        // Decrypt data using AES
        const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, aesIV, { padding: crypto.constants.RSA_PKCS7_PADDING });
        let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
        decryptedData += decipher.final('utf8');

        // Decrypt the hash using AES
        const hashDecipher = crypto.createDecipheriv('aes-256-cbc', aesKey, aesIV, { padding: crypto.constants.RSA_PKCS7_PADDING });
        let decryptedHash = hashDecipher.update(encryptedHash, 'base64', 'utf8');
        decryptedHash += hashDecipher.final('utf8');

        // Verify the hash
        const hash = crypto.createHash('sha256').update(decryptedData).digest('hex');
        if (hash !== decryptedHash) {
            throw new Error('Data integrity check failed');
        }

        return decryptedData;
    } catch (error) {
        console.error('Decryption failed:', error);
        throw error;
    }
}