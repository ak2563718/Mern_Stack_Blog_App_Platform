import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../slices/userSlices'
import postReducer from '../slices/postSlices'
import profileReducer from '../slices/profileSlice'
import commentReducer from '../slices/commentSlice'

const store= configureStore({
    reducer:{
        user:userReducer,
        post:postReducer,
        profile:profileReducer,
        comment:commentReducer,
    }
})

export default store;