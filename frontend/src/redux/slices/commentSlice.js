import { createSlice } from "@reduxjs/toolkit";
import { commentofUserPost, getCommentbyPostId, getcommentpagination, postComment } from "../actions/commentAction";



const initialState={
    comments:[],
    userComment:[],
    commentloading:false,
    commentMessage:null,
    commentError:null,
    totalPages:0,
    totalComments:0,
}

const commentSlice = createSlice({
    name:'Comments',
    initialState,
    reducers:{
        clearComment:(state)=>{
            state.comments = [];
        }
    },
    extraReducers:(builder)=>{
        // 1. Add comment 
        builder.addCase(postComment.pending,(state)=>{
            state.loading = true;
        }).addCase(postComment.fulfilled,(state,action)=>{
            state.loading = false;
            state.comments.unshift(action.payload.comments)
            state.commentMessage = action.payload.message;
        }).addCase(postComment.rejected,(state,action)=>{
            state.loading = false;
            state.commentError = action.payload;
        });

        // 2. Get Comment by postId
        builder.addCase(getCommentbyPostId.pending,(state)=>{
            state.commentloading = true;
        }).addCase(getCommentbyPostId.fulfilled,(state,action)=>{
            state.commentloading = false;
            state.comments = action.payload.comments;
        });

        builder.addCase(getcommentpagination.pending,(state)=>{
            state.commentloading = true;
        }).addCase(getcommentpagination.fulfilled,(state,action)=>{
            state.commentloading = false;
            state.comments = [...state.comments,...action.payload.comments];
            state.totalComments = action.payload.totalComments;
            state.totalPages = action.payload.totalPages;
        });

        builder.addCase(commentofUserPost.pending,(state)=>{
            state.commentloading = true;
        }).addCase(commentofUserPost.fulfilled,(state,action)=>{
            state.commentloading = false;
            state.userComment = action.payload.comments;
        })

    }
}) 

export const {clearComment} = commentSlice.actions;
export default commentSlice.reducer;