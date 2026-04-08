import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ReceiptJapaneseYen } from 'lucide-react';

export const loginUser = createAsyncThunk(
    'user/login',
    async (Data , {rejectWithValue})=>{
        try {
            const {data}= await axios.post('http://localhost:4500/api/login',Data,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(error.response ){
                return rejectWithValue(error.response?.data?.message)
            }
        }
    }
)

export const signupUser=createAsyncThunk(
    'User/signup',
    async(Data,{rejectWithValue})=>{
        try {
            const {data}=await axios.post('http://localhost:4500/api/signup',Data,{
                headers:{'Content-Type':"application/json"},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error.response?.data?.message)
            }
        }
    }
)

export const sessionUser=createAsyncThunk(
    'User/Sesssion',
    async(_,{rejectWithValue})=>{
        try {
            const {data}=await axios.get('http://localhost:4500/api/checkauthentication',{
            headers:{'Content-Type':"application/json"},
            withCredentials:true,
        })
        return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error.response?.data?.message)
            }
        }
    }
)

export const logoutUser=createAsyncThunk(
    'User/logout',
    async(_ ,{rejectWithValue})=>{
        try {
            const {data}=await axios.get('http://localhost:4500/api/logout',{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            }) 
            return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error.response?.data?.message)
            }
        }
    }
)

export const forgetPasswordUser=createAsyncThunk(
    'User/forgetPassword',
    async( email ,{rejectWithValue})=>{
        try {
            const {data}=await axios.post('http://localhost:4500/api/forgot-password',{email:email},{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error.response?.data?.message)
            }
        }
    }
)

export const verifyOtpUser=createAsyncThunk(
    'User/verifyOtp',
    async( otp ,{rejectWithValue})=>{
        try {
            const {data}=await axios.post('http://localhost:4500/api/verify-otp',{otp},{
                headers:{'Content-Type':"application/json"},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error.response?.data?.message);
            }
        }
    }
)

export const resetPasswordUser=createAsyncThunk(
    'User/ResetPassword',
    async( password ,{rejectWithValue})=>{
        try {
            const {data}=await axios.post('http://localhost:4500/api/reset-password',password,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            })
            return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error.response?.data?.message)
            }
        }
    }
)


export const getAllUsers = createAsyncThunk(
    'User /getAllUsers',
    async(_ , { rejectWithValue })=>{
        try {
            const { data } = await axios.get('http://localhost:4500/api/getallusers',{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error.response?.data?.message)
            }
        }
    }
)


export const getUserById = createAsyncThunk(
    'User/getbyId',
    async(id , { rejectWithValue})=>{
        try {
            const  { data } = await axios.get(`http://localhost:4500/api/getuser/${id}`,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error.response.data.message)
            }
        }
    }
)


export const deleteUser = createAsyncThunk(
    'delete/ user',
    async(id , {rejectWithValue})=>{
        try {
            const { data } = await axios.delete(`http://localhost:4500/api/user/delete/${id}`,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error.response.data.message)
            }
        }
    }
)