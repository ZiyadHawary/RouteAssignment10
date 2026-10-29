import CryptoJS from 'crypto-js';
const key = () => process.env.PHONE_ENCRYPTION_KEY || 'development-only-key';
export const encrypt = (value) => CryptoJS.AES.encrypt(value, key()).toString();
export const decrypt = (value) => value ? CryptoJS.AES.decrypt(value, key()).toString(CryptoJS.enc.Utf8) : '';
