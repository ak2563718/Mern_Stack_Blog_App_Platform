import { createSlice } from "@reduxjs/toolkit";
import { deleteUser, forgetPasswordUser, getAllUsers, getUserById, loginUser, logoutUser, resetPasswordUser, sessionUser, signupUser, verifyOtpUser } from "../actions/userAction";



const InitialState={
    user:{},
    users:[],
    userProfile:{},
    loading:false,
    error:null,
    message:null,
    loginsuccess:false,
    signupsuccess:false,
    islogin:false,
    sentotp:false,
    verifyotp:false,
    resetPassword:false,
    openOnce:false,
}

const userSlice= createSlice({
    name:'user',
    initialState:InitialState,
    reducers:{
        clearmessage:(state)=>{
            state.message=null;
            state.error=null;
            state.signupsuccess=false;
            state.loginsuccess=false;
            state.sentotp=false;
            state.verifyotp=false;
            state.resetPassword=false;
        },
        clearOpenonce:(state)=>{
            state.openOnce = false;
        }
    },
    extraReducers:(builder)=>{
        // 1.Login User
        builder.addCase(loginUser.pending,(state)=>{
            state.loading=true;
        }).addCase(loginUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message;
            state.loginsuccess=action.payload.success;
            state.user=action.payload.user;
            state.islogin=true;
        }).addCase(loginUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
        

        // 2.Signup User
        builder.addCase(signupUser.pending,(state)=>{
            state.loading=true;
        }).addCase(signupUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message;
            state.signupsuccess=action.payload.success;
            state.openOnce = true;
        }).addCase(signupUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });


        // 3.Checkauthentication User
        builder.addCase(sessionUser.pending,(state)=>{
            state.loading=true;
        }).addCase(sessionUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.user=action.payload.user;
            state.islogin=true;
        }).addCase(sessionUser.rejected,(state,action)=>{
            state.loading=false;
            state.islogin=false;
        });


        // 4.Logout User
        builder.addCase(logoutUser.pending,(state)=>{
            state.loading=true;
        }).addCase(logoutUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message;
            state.user={};
            state.islogin=false;      
        }).addCase(logoutUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

        // 5. Forget-Password User
        builder.addCase(forgetPasswordUser.pending,(state)=>{
            state.loading=true;
        }).addCase(forgetPasswordUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message;
            state.sentotp=true;
        }).addCase(forgetPasswordUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

        // 6. Verify-Otp User
        builder.addCase(verifyOtpUser.pending,(state)=>{
            state.loading=true;
        }).addCase(verifyOtpUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message;
            state.verifyotp=true;
        }).addCase(verifyOtpUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

        // 7. Reset-Password User
        builder.addCase(resetPasswordUser.pending,(state)=>{
            state.loading=true;
        }).addCase(resetPasswordUser.fulfilled,(state,action)=>{
            state.loading=false;
            state.message=action.payload.message;
            state.resetPassword=true;
        }).addCase(resetPasswordUser.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

        builder.addCase(getAllUsers.pending,(state)=>{
            state.loading = true;
        }).addCase(getAllUsers.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = action.payload.users;
        });

        builder.addCase(getUserById.pending,(state)=>{
            state.loading = true;
        }).addCase(getUserById.fulfilled,(state,action)=>{
            state.loading = false;
            state.userProfile = action.payload.user;
            state.message = action.payload.message;
        });

        builder.addCase(deleteUser.pending,(state)=>{
            state.loading = true;
        }).addCase(deleteUser.fulfilled,(state,action)=>{
            state.loading = false;
            state.users = state.users.filter(user => user._id !== action.payload.user._id);
            state.message = action.payload.message;
        })

    }
})

export const {clearmessage , clearOpenonce}= userSlice.actions;
export default userSlice.reducer;