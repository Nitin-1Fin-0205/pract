import { encryptData } from './KYC/encryption.js';
import { decryptData } from './KYC/decryption.js';

// Function to encrypt KYC data
function encryptKYCData(kycData, rsaPublicKey) {
    const encrypted = encryptData(kycData, rsaPublicKey);
    return `${encrypted.key}|${encrypted.data}|${encrypted.hash}`;
}

// Function to decrypt KYC data
function decryptKYCData(encryptedKYCData, rsaPrivateKey) {
    const [encryptedKeyIV, encryptedData, encryptedHash] = encryptedKYCData.split('|');
    return decryptData(encryptedKeyIV, encryptedData, encryptedHash, rsaPrivateKey);
}


//////////////////////////

import fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser';



// Load RSA keys
const rsaPublicKey = fs.readFileSync('./KYC/CAMS_PUBLIC_KEY.pem', 'utf8');
const rsaPrivateKey = fs.readFileSync('./KYC/keys/uat_private_key.pem', 'utf8');

// Example KYC data
const kycData = "DBKPG7469H|nitin.gupta@1finance.org.in|7039964057|Test|EKYC_1FINANCE|Fin1cams$1024|FPL";
// const kycData = "BTHPA6429G|arulmurugank@sterlingsoftware.co.in|7402230427|Test|INV_PLKYCTEAM|Test$123|P|MFKYC3|SESS_ID";

// Encrypt KYC data
const encryptedKYC = encryptKYCData(kycData, rsaPublicKey);
console.log('Encrypted KYC:', encryptedKYC);

console.log('\n\n------------------------------------------------------------------\n\n')

// // Decrypt KYC data
// try {
//     const decryptedKYC = decryptKYCData(encryptedKYC, rsaPrivateKey);
//     console.log('Decrypted KYC:', decryptedKYC);
// } catch (error) {
//     console.error('Error:', error.message);
// }


const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/encrypt', (req, res) => {
    console.log('Encrypting KYC data...');
    const kycData = req.body;
    console.log('Received KYC Data:', kycData);


    try {
        const decryptedKYC = decryptKYCData(encryptedKYC, rsaPrivateKey);
        console.log('Decrypted KYC:', decryptedKYC);

        // res.json({
        //     status: 'success',
        //     encryptedData: encryptedResult
        // });
        // res.status(200).json({
        //     status: 'success',
        //     encryptedData: encryptedResult
        // });

    } catch (error) {
        console.error('Encryption Error:', error);
        res.status(500).json({
            status: 'error',
            message: 'Encryption failed',
            error: error.message
        });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});