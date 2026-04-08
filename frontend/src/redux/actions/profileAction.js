import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// 1. create profile 
export const createProfile = createAsyncThunk(
    'Profile/create',
    async( Data,{rejectWithValue})=>{
        try {
            const {data} = await axios.post('https://mern-stack-blog-app-platform.onrender.com/api/createprofile',Data,{
                headers:{"Content-Type":'application/json'},
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


export const getProfile = createAsyncThunk(
    'get/ profileuser',
    async( _ ,{ rejectWithValue }) =>{
        try {
            const { data } = await axios.get('https://mern-stack-blog-app-platform.onrender.com/api/profile',{
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            })
            return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error.response.data.message)
            }
        }
    }
)


export const updateProfile = createAsyncThunk(
    'patch/updateprofile',
    async( Data, { rejectWithValue })=>{
        try {
            const { data } = await axios.patch('https://mern-stack-blog-app-platform.onrender.com/api/updateprofile', Data,{
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


export const getfullProfileInfo = createAsyncThunk(
    'get/fullprofileinfo',
    async(_ , { rejectWithValue })=>{
        try {
            const { data } = await axios.get('https://mern-stack-blog-app-platform.onrender.com/api/user/profile',{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(error.response){
              return  rejectWithValue(error.response.data.message)
            }
        }
    }
)