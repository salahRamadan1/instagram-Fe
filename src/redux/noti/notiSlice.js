
import { createSlice } from '@reduxjs/toolkit';
import { getNotiSeen, getNotiSeenPage, } from './notiAction';



const initialStateNoti = {
    // get noti
    noti: [],
    loadingGetNotiSeen: false,
    errorGetNotiSeen: null,
    errorGetNotiSeenApi: null,
    numberOfPage: null


}

const notiSlice = createSlice({
    name: 'friend',
    initialState: initialStateNoti,
    reducers: {
        makeStateIsEmpity: (state) => {
            const fields = [
                // get noti
                'loadingGetNotiSeen', 'errorGetNotiSeen', 'errorGetNotiSeenApi',

            ];
            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            // get noti
            .addCase(getNotiSeen.pending, (state) => {
                state.loadingGetNotiSeen = true;
                state.noti = []

            })
            .addCase(getNotiSeen.fulfilled, (state, action) => {
                console.log(action);
                state.loadingGetNotiSeen = false;
                if (action.payload.message === 'success') {
                    state.noti = action.payload.noti
                    state.numberOfPage = action.payload.numberOfPage

                } else {
                    state.errorGetNotiSeen = action.payload.message
                }
            })
            .addCase(getNotiSeen.rejected, (state, action) => {
                state.loadingGetSeenNoti = false;
                state.errorGetNotiSeenApi = action.error.message;
            })
            // get noti page
            .addCase(getNotiSeenPage.pending, (state) => {
                state.loadingGetNotiSeen = true;
            })
            .addCase(getNotiSeenPage.fulfilled, (state, action) => {
                console.log(action);
                state.loadingGetNotiSeen = false;
                if (action.payload.message === 'success') {
                    state.noti = action.payload.noti
                    state.numberOfPage = action.payload.numberOfPage

                } else {
                    state.errorGetNotiSeen = action.payload.message
                }
            })
            .addCase(getNotiSeenPage.rejected, (state, action) => {
                state.loadingGetSeenNoti = false;
                state.errorGetNotiSeenApi = action.error.message;
            })

    },
});


export const { makeStateIsEmpity } = notiSlice.actions;

export default notiSlice.reducer;
