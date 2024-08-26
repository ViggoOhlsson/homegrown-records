const bcrypt = require("bcrypt")
const crypto = require("crypto")
import sharp from "sharp"

const utils = {
    sendDelay: () => Math.floor(Math.random() * 400) + 200,
    hashPassword: (password) => bcrypt.hashSync(password, 8),
    verifyPassword: (password, hash) => bcrypt.compareSync(password, hash),
    encryptToken: (text) => {
        const cipher = crypto.createCipher('aes-256-cbc', process.env.JWT_SECRET);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted
    },
    decryptToken: (cipherText) => {
        const decipher = crypto.createDecipher('aes-256-cbc', process.env.JWT_SECRET);
        let decrypted = decipher.update(cipherText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    },


    // MODEL UTILS
    createUserWishlist: async (userId) => {
        
    }
    createThumbnailFromImageBuffer: async (buffer, height, width) => {
        return await sharp(buffer)
    }
}

module.exports = utils