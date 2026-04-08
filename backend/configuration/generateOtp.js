import crypto from 'crypto';

export const generateOtp=(length=6)=>{
    const otp=crypto.randomInt(0, Math.pow(10, length)).toString().padStart(length, '0');
    return otp;
}