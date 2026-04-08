import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// 1. Create Comment Post Comment
export const postComment = createAsyncThunk(
    'Post/Comment',
    async({id,comment}, {rejetWithValue})=>{
        try {
            const {data} = await axios.post(`http://localhost:4500/api/addcomment/${id}`,{comment},{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
            if(error.response){
                return rejetWithValue(error.response.data.message)
            }
        }
    }
)


export const getCommentbyPostId = createAsyncThunk(
    'Get/comment by postId',
    async(postId , { rejectWithValue }) =>{
        try {
            const {data} = await axios.get(`http://localhost:4500/api/comments/${postId}`,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true,
            })
            return data;
        } catch (error) {
           if(error.response){
            return rejetWithValue (error.response.data.message)
           } 
        }
    }
)

export const getcommentpagination = createAsyncThunk(
    'Get/ paginationcomment',
    async({page ,id}, {rejectWithValue})=>{
        try {
            const {data} = await axios.get(`http://localhost:4500/api/comments/pagination/${id}?page=${page}&limit=3`,{
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


export const commentofUserPost = createAsyncThunk(
    'Get/ UserComment',
    async(_ ,{rejectWithValue})=>{
        try {
            const {data} = await axios.get('http://localhost:4500/api/allpostcomment/usercomment',{
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