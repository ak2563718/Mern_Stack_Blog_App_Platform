import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// 1. Create Post
export const createpost=createAsyncThunk(
    'post/create',
    async(Data,{rejectWithValue})=>{
        try {
            const {data}=await axios.post('https://mern-stack-blog-app-platform.onrender.com/api/addblog',Data,{
                headers:{'Content-Type':'application/json'},
                withCredentials:true
            })
            return data;
        } catch (error) {
            if(error.response){
                return rejectWithValue(error?.response?.data?.message)
            }
        }
    }
)

// 2. Get All Post
export const getallposts=createAsyncThunk(
    'post/GetPost',
    async( _ , { rejectWithValue })=>{
        try {
            const {data}= await axios.get('https://mern-stack-blog-app-platform.onrender.com/api/allblogs',{
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

// 3. Get Post by Id
export const getPostById=createAsyncThunk(
    'post/GetbyId',
    async( id , { rejectWithValue })=>{
        try {
            const {data}= await axios.get(`https://mern-stack-blog-app-platform.onrender.com/api/blog/${id}`,{
                headers:{"Content-Type":'application/json'},
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

// 4. Get All Post by Users
export const getPostByUser=createAsyncThunk(
    'post/AllPostFromUser',
    async( _ , { rejectWithValue })=>{
        try {
            const {data}=await axios.get('https://mern-stack-blog-app-platform.onrender.com/api/userblogs',{
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

// 5. Search By Query
export const SearchPost=createAsyncThunk(
    'Post/searchbyquery',
    async( queryname , { rejectWithValue })=>{
        try {
            const {data}= await axios.get(`https://mern-stack-blog-app-platform.onrender.com/api/blogs/search?query=${queryname}`,{
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

// 6. Increase Likes
export const increaseLike=createAsyncThunk(
    'post/IncreaseLike',
    async( id , { rejectWithValue } )=>{
        try {
            const {data}= await axios.get(`https://mern-stack-blog-app-platform.onrender.com/api/blog/like/${id}`,{
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


// 6. ManageView
export const manageView=createAsyncThunk(
    'post/ManageView',
    async( id , { rejectWithValue } )=>{
        try {
            const {data}= await axios.get(`https://mern-stack-blog-app-platform.onrender.com/api/blog/view/${id}`,{
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

// 7. Update Posts
export const UpdatePost=createAsyncThunk(
    'Post/UpdatePost',
    async({ id , Data }, { rejectWithValue })=>{
        try {
            const { data }= await axios.patch(`http://localhost:8700/api/post/update/${id}`,Data, {
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

// 8. Delete Post
export const DeletePost=createAsyncThunk(
    'Post/DeletePost',
    async( { id } , { rejectWithValue })=>{
        try {
            const { data } = await axios.delete(`http://localhost:8700/api/delete/${id}`,{
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


// 9. Get blog with Category
export const searchwithcategory = createAsyncThunk(
    'Post/searchwithcategory',
    async(category, {rejectWithValue})=>{
        try {
            const {data} = await axios.post('https://mern-stack-blog-app-platform.onrender.com/api/blog/search',{category},{
                headers:{'Content-Type':"application/json"},
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


// 10 .Get blog with Infinite Scroll
export const getblogwithinfinite = createAsyncThunk(
    'Post/getblogwithinfinite',
    async(page, { rejectWithValue }) =>{
        try {
            const {data} = await axios.get(`https://mern-stack-blog-app-platform.onrender.com/api/blogs/scroll/infinite?page=${page}&limit=10`,{
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


export const deleteuserblog =createAsyncThunk(
    'delete/userblog',
    async(id , { rejectWithValue })=>{
        try {
            const { data } = await axios.delete(`https://mern-stack-blog-app-platform.onrender.com/api/blogs/delete/${id}`,{
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


export const updatepostbyId = createAsyncThunk(
    'Patch/ updatepostbyid',
    async({ id , updatedata } , { rejectWithValue })=>{
        try {
            const {data} = await axios.patch(`https://mern-stack-blog-app-platform.onrender.com/api/blogs/update/${id}`,updatedata,{
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