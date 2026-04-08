import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// 1. create profile 
export const createProfile = createAsyncThunk(
    'Profile/create',
    async( Data,{rejectWithValue})=>{
        try {
            const {data} = await axios.post('http://localhost:4500/api/createprofile',Data,{
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
            const { data } = await axios.get('http://localhost:4500/api/profile',{
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
            const { data } = await axios.patch('http://localhost:4500/api/updateprofile', Data,{
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
            const { data } = await axios.get('http://localhost:4500/api/user/profile',{
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