const crypto = require('crypto');

function myCrypto() {

    this.myencrypt = (data) => {
        const algorithm = 'aes-192-cbc';
        // Use the async `crypto.scrypt()` instead.
        const key = crypto.scryptSync(data, 'salt', 24);
        // Use `crypto.randomBytes` to generate a random iv instead of the static iv
        // shown here.
        const iv = Buffer.alloc(16, 0); // Initialization vector.

        const cipher = crypto.createCipheriv(algorithm, key, iv);

        let encrypted = cipher.update(data, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
        // console.log(encrypted);

    }

    this.mydecrypt = (data) => {
        const algorithm = 'aes-192-cbc';
        // Use the async `crypto.scrypt()` instead.
        const key = crypto.scryptSync(data, 'salt', 24);
        // Use `crypto.randomBytes` to generate a random iv instead of the static iv
        // shown here.
        const iv = Buffer.alloc(16, 0); // Initialization vector.
        // deCryption
        const decipher = crypto.createDecipheriv(algorithm, key, iv);

        // // Encrypted using same algorithm, key and iv.
        // const encrypted =
        //   'e5f79c5915c02171eec6b212d5520d44480993d7d622a7c4c2da32f6efda0ffa';
        let decrypted = decipher.update(encrypted, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;

        // console.log(decrypted);

    }


}

module.exports = new myCrypto();