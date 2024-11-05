import crypto from 'crypto';

// Function to decrypt data
export function decryptData(encryptedKeyIV, encryptedData, encryptedHash, rsaPrivateKey) {
    try {
        // Decrypt AES key and IV using RSA private key
        const decryptedKeyIV = crypto.privateDecrypt(rsaPrivateKey, Buffer.from(encryptedKeyIV, 'base64'));
        console.log('Decrypted KeyIV:', decryptedKeyIV.toString('base64'));
        const aesIV = decryptedKeyIV.slice(0, 16);
        const aesKey = decryptedKeyIV.slice(16);

        // Log lengths for debugging
        console.log('AES IV Length:', aesIV.length);
        console.log('AES Key Length:', aesKey.length);

        // Ensure the key length is valid
        if (aesKey.length !== 32) {
            throw new Error('Invalid AES key length');
        }

        // Decrypt data using AES
        const decipher = crypto.createDecipheriv('aes-256-cbc', aesKey, aesIV);
        let decryptedData = decipher.update(encryptedData, 'base64', 'utf8');
        decryptedData += decipher.final('utf8');

        // Decrypt hash using AES
        const hashDecipher = crypto.createDecipheriv('aes-256-cbc', aesKey, aesIV);
        let decryptedHash = hashDecipher.update(encryptedHash, 'base64', 'utf8');
        decryptedHash += hashDecipher.final('utf8');

        // Create SHA-256 hash of the decrypted data
        const hash = crypto.createHash('sha256').update(decryptedData).digest('hex');

        // Verify hash
        if (hash !== decryptedHash) {
            throw new Error('Data integrity check failed');
        }

        return decryptedData;
    } catch (error) {
        console.error('Decryption Error:', error);
        throw error;
    }
}