import { createSlice } from "@reduxjs/toolkit";
import { createProfile, getfullProfileInfo, getProfile, updateProfile } from "../actions/profileAction";


const initialState={
    profile:{},
    profileinfo:[],
    loading:false,
    profilemessage:null,
    profileerror:null,
}


const profileSlice = createSlice({
    name:'Profile',
    initialState,
    extraReducers:(builder)=>{
        // 1. create Profiel
        builder.addCase(createProfile.pending,(state)=>{
            state.loading = true;
        }).addCase(createProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.profilemessage = action.payload.message;
            state.profile = action.payload.profile;
        }).addCase(createProfile.rejected,(state,action)=>{
            state.loading = false;
            state.profileerror = action.payload;
        });

        builder.addCase(getProfile.pending , (state)=>{
            state.loading = true;
        }).addCase(getProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.profilemessage = action.payload.message;
            state.profile = action.payload.profile;
        }).addCase(getProfile.rejected,(state,action)=>{
            state.profileerror = action.payload;
        });


        builder.addCase(updateProfile.pending,(state)=>{
            state.loading = true;
            state.profile = {};
        }).addCase(updateProfile.fulfilled,(state,action)=>{
            state.loading = false;
            state.profile = {...action.payload.profile};
            state.profilemessage = action.payload.message;
        }).addCase(updateProfile.rejected,(state,action)=>{
            state.loading = false;
            state.profileerror = action.payload;
        });

        builder.addCase(getfullProfileInfo.pending,(state)=>{
            state.loading = true;
        }).addCase(getfullProfileInfo.fulfilled,(state,action)=>{
            state.loading = false;
            state.profileinfo = action.payload.profile;
            state.profilemessage = action.payload.message;
        })
    }
})


export default profileSlice.reducer