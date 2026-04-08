import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const secretkey = process.env.SECRET_KEY;

export const encodeUser = (user)=>{
    return jwt.sign({
        id:user._id,
        name:user.name,
        role:user.role,
        email:user.email,
    },secretkey);
}

export const decodeUser = (token) =>{
    if(!token) return null;
    const decode = jwt.verify(token, secretkey)
    return decode;
}


export const encodeemail =(email)=>{
    return jwt.sign({
        email
    },secretkey)
}

export const decodeemail =(token)=>{
    if(!token) return null;
    return jwt.verify(token, secretkey)
}


export const likecount = (id)=>{
    return jwt.sign({
        id
    },secretkey);
}



export const generatetoken = (user)=>{
    return jwt.sign({
        id:user._id,
        email:user.email,
        name:user.name,
        role:user.role,
    },secretkey)
}

export const decodetoken = (token)=>{
    if(!token) return null;
    return jwt.verify(token, secretkey)
}