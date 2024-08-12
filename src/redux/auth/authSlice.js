import { createSlice } from '@reduxjs/toolkit';

import { jwtDecode } from 'jwt-decode';
import { ChangeName, ChangePassword, changeProfileImage, googleLogIn, logInUser, numberVerviy, registerUser, resetPassWord, SendNumberverfiy, verfiy } from './authAction';
import { handleVerifyToken } from '../../future/shareFunction/tokenJwtDecode';



const initialStateAuth = {
    // google log in 
    loadingGoogleLogIn: false,
    errorGoogleLogIn: null,
    errorGoogleLogInNetWork: null,
    // register
    loadingRegister: false,
    errorRegister: null,
    errorRegisterNetWork: null,
    errorPassword: null,
    errorName: null,
    errorEmail: null,
    // Verfiy
    loadingVerfiy: false,
    errorVerfiy: null,
    errorVerfiyApi: null,
    errorVerfiyNetWork: null,
    // SendNumberverfiy
    loadingSendNumberverfiy: false,
    errorSendNumberverfiy: null,
    errorSendNumberverfiyApi: null,
    errorSendNumberverfiyNetWork: null,
    // login
    loadingLogIn: false,
    errorLogIn: null,
    errorLogInNetWork: null,
    errorLogInPassword: null,
    errorLogInEmail: null,
    // resetPassword
    loadingResetPassWord: false,
    errorResetPassWord: null,
    errorResetPassWordApi: null,
    errorResetPassWordNetWork: null,
    // change profile image
    loadingProfileImage: false,
    errorProfileImageApi: null,
    errorProfileImageNetWork: null,
    // change Name
    loadingChangeName: false,
    errorChangeNameApi: null,
    errorChangeNameNetWork: null,
    // change Password
    loadingChangePassword: false,
    errorChangePasswordApi: null,
    errorChangePasswordNetWork: null,
    errorCurrentPasswordChange: null,
    errorNewPasswordChange: null,


    emailUser: null,
    userData: null,
    isLoggedIn: false,

}
const authSlice = createSlice({
    name: 'auth',
    initialState: initialStateAuth,
    reducers: {
        logIn: (state) => {
            if (localStorage.getItem('userToken')) {
                state.isLoggedIn = true
                let token = localStorage.getItem('userToken')
                state.userData = jwtDecode(token)
            }

        },
        logout: (state) => {

            localStorage.removeItem('userToken')
            localStorage.removeItem('user')
            state.isLoggedIn = false
            state.userData = null

        },
        makeStateIsEmpity: (state) => {
            const fields = [
                // google log in 
                'loadingGoogleLogIn', 'errorGoogleLogIn', 'errorGoogleLogInNetWork',
                // register
                'loadingRegister', 'errorRegister', 'errorRegisterNetWork', 'errorPassword', 'errorName', 'errorEmail',
                // Verfiy
                'loadingVerfiy', 'errorVerfiy', 'errorVerfiyApi', 'errorVerfiyNetWork',
                // SendNumberverfiy
                'loadingSendNumberverfiy', 'errorSendNumberverfiy', 'errorSendNumberverfiyApi', 'errorSendNumberverfiyNetWork',
                // login
                'loadingLogIn', 'errorLogIn', 'errorLogInNetWork', 'errorLogInPassword', 'errorLogInEmail',
                // resetPassWord
                'loadingResetPassWord', 'errorResetPassWord', 'errorResetPassWordNetWork', 'errorResetPassWordApi',
                // change profile image
                'loadingProfileImage', 'errorProfileImage', 'errorProfileImageNetWork', 'errorProfileImageApi',
                // change name
                'loadingChangeName', 'errorChangeName', 'errorChangeNameNetWork', 'errorChangeNameApi',
                // change Password
                'loadingChangePassword', 'errorChangePassword', 'errorChangePasswordNetWork', 'errorChangePasswordApi', 'errorCurrentPasswordChange', 'errorNewPasswordChange'

            ];

            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            // google log in and register
            .addCase(googleLogIn.pending, (state) => {
                state.loadingGoogleLogIn = true;
                state.errorGoogleLogIn = null;
                state.errorGoogleLogInNetWork = null;

            })
            .addCase(googleLogIn.fulfilled, (state, action) => {
                state.loadingGoogleLogIn = false;
                console.log(action);
                if (action.payload.message === 'success') {
                    localStorage.setItem('userToken', action.payload.token)
                    state.isLoggedIn = true
                    state.userData = jwtDecode(localStorage.getItem('userToken'))
                } else {
                    state.errorGoogleLogIn = action.payload.message;
                }
            })
            .addCase(googleLogIn.rejected, (state, action) => {
                state.loadingGoogleLogIn = false;
                state.errorGoogleLogInNetWork = !action.payload ? action.error.message : null;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.loadingRegister = true;
                state.errorRegister = null;
                state.errorRegisterNetWork = null;
                state.errorPassword = null;
                state.errorName = null;
                state.errorEmail = null;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loadingRegister = false;
                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path === 'name') state.errorName = elm.message;
                        if (elm.path === 'email') state.errorEmail = elm.message;
                        if (elm.path === 'password') state.errorPassword = elm.message;
                    });
                    return;
                }
                state.errorName = null;
                state.errorEmail = null;
                state.errorPassword = null;
                if (action.payload.message === 'Registration successful') {
                    state.emailUser = action.payload.email;
                } else {
                    state.errorRegister = action.payload.message;
                }
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loadingRegister = false;
                state.errorRegisterNetWork = !action.payload ? action.error.message : null;
            })
            // Confirm Email
            .addCase(verfiy.pending, (state) => {
                state.loadingVerfiy = true;
                state.errorVerfiy = null;
                state.errorVerfiyApi = null;
                state.errorVerfiyNetWork = null;
            })
            .addCase(verfiy.fulfilled, (state, action) => {
                state.loadingVerfiy = false;
                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path === 'email') state.errorEmail = elm.message;
                        if (elm.path === 'ConfirmEmailNum') state.errorVerfiy = elm.message;
                    });
                    return;
                }
                state.errorVerfiy = null;
                if (action.payload.message === 'success') {
                    console.log('hello');
                } else {
                    state.errorVerfiyApi = action.payload.message;
                }
            })
            .addCase(verfiy.rejected, (state, action) => {
                state.loadingVerfiy = false;
                state.errorVerfiyNetWork = !action.payload ? action.error.message : null;
            })
            // Send Number Verify
            .addCase(SendNumberverfiy.pending, (state) => {
                state.loadingSendNumberverfiy = true;
                state.errorSendNumberverfiy = null;
                state.errorSendNumberverfiyApi = null;
                state.errorSendNumberverfiyNetWork = null;
            })
            .addCase(SendNumberverfiy.fulfilled, (state, action) => {
                state.loadingSendNumberverfiy = false;
                if (action.payload.message === 'success') {
                    state.emailUser = action.payload.email;
                } else {
                    state.errorSendNumberverfiyApi = action.payload.message;
                }
            })
            .addCase(SendNumberverfiy.rejected, (state, action) => {
                state.loadingSendNumberverfiy = false;
                state.errorSendNumberverfiyNetWork = !action.payload ? action.error.message : null;
            })
            // Login
            .addCase(logInUser.pending, (state) => {
                state.loadingLogIn = true;
                state.errorLogIn = null;
                state.errorLogInNetWork = null;
                state.errorLogInPassword = null;
                state.errorLogInEmail = null;
            })
            .addCase(logInUser.fulfilled, (state, action) => {
                state.loadingLogIn = false;
                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path === 'email') state.errorLogInEmail = elm.message;
                        if (elm.path === 'password') state.errorLogInPassword = elm.message;
                    });
                    return;
                }
                state.errorLogInEmail = null;
                state.errorLogInPassword = null;
                if (action.payload.message === 'success') {
                    localStorage.setItem('userToken', action.payload.token)
                    state.isLoggedIn = true
                    state.userData = jwtDecode(localStorage.getItem('userToken'))





                } else {
                    state.errorLogIn = action.payload.message;
                }
            })
            .addCase(logInUser.rejected, (state, action) => {
                state.loadingLogIn = false;
                state.errorLogInNetWork = !action.payload ? action.error.message : null;
            })
            // Reset Password
            .addCase(resetPassWord.pending, (state) => {
                state.loadingResetPassWord = true;
                state.errorResetPassWord = null;
                state.errorResetPassWordNetWork = null;
                state.errorResetPassWordApi = null;
            })
            .addCase(resetPassWord.fulfilled, (state, action) => {
                state.loadingResetPassWord = false;
                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path === 'password') state.errorResetPassWord = elm.message;
                    });
                    return;
                }
                state.errorResetPassWord = null;
                if (action.payload.message === 'success') {
                    state.emailUser = null;
                } else {
                    state.errorResetPassWordApi = action.payload.message;
                }
            })
            .addCase(resetPassWord.rejected, (state, action) => {
                state.loadingResetPassWord = false;
                state.errorResetPassWordNetWork = !action.payload ? action.error.message : null;
            })
            // change profile image
            .addCase(changeProfileImage.pending, (state) => {
                state.loadingProfileImage = true;
                state.errorProfileImageNetWork = null;
                state.errorProfileImageApi = null;

            })
            .addCase(changeProfileImage.fulfilled, (state, action) => {
                state.loadingProfileImage = false;
                if (action.payload.message === 'success') {
                    localStorage.setItem('userToken', action.payload.newToken)
                    state.userData = jwtDecode(localStorage.getItem('userToken'))
                } else {
                    state.errorProfileImageApi = action.payload.message;
                }
            })
            .addCase(changeProfileImage.rejected, (state, action) => {
                console.log(action);
                state.loadingProfileImage = false;
                state.errorProfileImageNetWork = !action.payload ? action.error.message : null;
            })


            // change name
            .addCase(ChangeName.pending, (state) => {
                state.loadingChangeName = true;
                state.errorChangeNameNetWork = null;
                state.errorName = null;
                state.errorChangeNameApi = null
            })
            .addCase(ChangeName.fulfilled, (state, action) => {
                state.loadingChangeName = false;
                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path === 'name') state.errorName = elm.message;
                    });
                    return;
                }
                state.errorName = null;

                if (action.payload.message === 'success') {
                    localStorage.setItem('userToken', action.payload.newToken)
                    state.userData = jwtDecode(localStorage.getItem('userToken'))
                } else {
                    state.errorChangeNameApi = action.payload.message;
                }
            })
            .addCase(ChangeName.rejected, (state, action) => {
                state.loadingChangeName = false;
                state.errorChangeNameNetWork = !action.payload ? action.error.message : null;
            })
            // change Password
            .addCase(ChangePassword.pending, (state) => {
                state.loadingChangePassword = true;
                state.errorChangePasswordNetWork = null;
                state.errorCurrentPasswordChange = null;
                state.errorChangePasswordApi = null
            })
            .addCase(ChangePassword.fulfilled, (state, action) => {
                state.loadingChangePassword = false;
                if (action.payload.length >= 0) {
                    action.payload.forEach((elm) => {
                        if (elm.path === 'currentPassword') state.errorCurrentPasswordChange = elm.message;
                        if (elm.path === 'newPassword') state.errorNewPasswordChange = elm.message;
                    });
                    return;
                }
                state.errorCurrentPasswordChange = null;
                state.errorNewPasswordChange = null;

                if (action.payload.message === 'success') {
                    console.log(action);
                } else {
                    state.errorChangePasswordApi = action.payload.message;
                }
            })
            .addCase(ChangePassword.rejected, (state, action) => {
                state.loadingChangePassword = false;
                state.errorChangePasswordNetWork = !action.payload ? action.error.message : null;
            })
    }

})

export const { logout, logIn, currentUser, makeStateIsEmpity } = authSlice.actions;
export default authSlice.reducer;