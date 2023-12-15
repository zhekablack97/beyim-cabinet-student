import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'authSlice',
    initialState: {
        isLogin: false
    },
    reducers: {
        login: state => {
            state.isLogin = true;
        },
        logout: state => {
            state.isLogin = false;
        }
    },
});

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
