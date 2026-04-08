import validator from 'validator'
import { AppError } from './AppError.js'


export const validatephone= (phone) => {
    if(!validator.isMobilePhone(phone.toString(),'en-IN')){
        throw new AppError('Invalid phone number',400)
    }
}

export const validateEmail= (email)=>{
    if(!validator.isEmail(email)){
        throw new AppError('Invalid email address',400)
    }
}

export const passwordChecker= (password)=>{
    const regex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");
   const result=regex.test(password)
   if(!result){
    throw new AppError("Password must Include one upperCase one LowerCase one Digit and One Special_Character",400)
   }
}

