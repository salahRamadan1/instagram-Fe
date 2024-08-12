// features/users/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { acceptFriend, addFriend, deleteMyRequestFriend, getMyFriends, getMyRequsets, getRequsets, getUsers, getUsersPage, rejectFriend, searchUser } from './friendAction';



const initialStateFreind = {
    // get user
    users: [],
    loadingGetFriends: false,
    errorGetFriends: null,
    errorGetFriendsApi: null,
    numberOfPage: 0,
    // add friend
    loadingAddFirend: false,
    errorAddFriend: null,
    errorAddFriendsApi: null,
    // get requsest
    loadingRequests: false,
    errorRequests: null,
    errorRequestsApi: null,
    requests: [],
    // get my requsest
    loadingMyRequests: false,
    errorMyRequests: null,
    errorMyRequestsApi: null,
    MyRequests: [],
    // accept friend
    loadingAcceptFriend: false,
    errorAcceptFriend: null,
    errorAcceptFriendApi: null,
    // reject Friend
    loadingRejectFriend: false,
    errorRejectFriend: null,
    errorRejectFriendApi: null,
    // deleteMyRequestFriend
    loadingMyRequestFriend: false,
    errorMyRequestFriend: null,
    errorMyRequestFriendApi: null,
    // getMyFriends
    loadingMyFriend: false,
    errorMyFriend: null,
    errorMyFriendApi: null,
    myFriends: []
}

const friendSlice = createSlice({
    name: 'friend',
    initialState: initialStateFreind,
    reducers: {
        makeStateIsEmpity: (state) => {
            const fields = [
                // get user
                'loadingGetFriends', 'errorGetFriends', 'errorGetFriendsApi',
                // add friend
                'loadingAddFirend', 'errorAddFriend', 'errorAddFriendsApi',
                // get requsest
                'loadingRequests', 'errorRequests', 'errorRequestsApi',
                // get my requsest
                'loadingMyRequests', 'errorMyRequests', 'errorMyRequestsApi',
                // accept friend
                'loadingAcceptFriend', 'errorAcceptFriend', 'errorAcceptFriendApi',
                // reject Friend
                'loadingRejectFriend', 'errorRejectFriend', 'errorRejectFriendApi',
                // delete MyRequest Friend
                'loadingMyRequestFriend', 'errorMyRequestFriend', 'errorMyRequestFriendApi',
                // my friends
                'loadingMyFriend', 'errorMyFriend', 'errorMyFriendApi',

            ];

            fields.forEach(field => {
                state[field] = field.startsWith('loading') ? false : null;
            });

        }
    },
    extraReducers: (builder) => {
        builder
            // get user
            .addCase(getUsers.pending, (state) => {
                state.loadingGetFriends = true;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.loadingGetFriends = false;
                console.log(action);

                if (action.payload.message === 'success') {
                    state.users = action.payload.users
                    state.numberOfPage = action.payload.numberOfPage


                } else {
                    state.errorGetFriends = action.payload.message
                    state.users = null
                }
            })
            .addCase(getUsers.rejected, (state, action) => {
                state.loadingGetFriends = false;
                state.errorGetFriendsApi = action.error.message;
            })
            // get friends page
            .addCase(getUsersPage.pending, (state) => {
                state.loadingGetFriends = true;
            })
            .addCase(getUsersPage.fulfilled, (state, action) => {
                console.log(action);
                state.loadingGetFriends = false;
                if (action.payload.message === 'success') {
                    state.users = action.payload.users
                    state.numberOfPage = action.payload.numberOfPage


                } else {
                    state.errorGetFriends = action.payload.message
                }
            })
            .addCase(getUsersPage.rejected, (state, action) => {
                state.loadingGetFriends = false;
                state.errorGetFriendsApi = action.error.message;
            })
            //  add friend
            .addCase(addFriend.pending, (state) => {
                state.loadingAddFirend = true;
            })
            .addCase(addFriend.fulfilled, (state, action) => {

                state.loadingAddFirend = false;
                if (action.payload.message != 'success') {
                    state.errorAddFriend = action.payload.message
                } else {
                    state.errorAddFriend = null

                }
                // state.friend = action.payload.data
            })
            .addCase(addFriend.rejected, (state, action) => {
                state.loadingAddFirend = false;
                state.errorAddFriendsApi = action.error.message;
            })
            // get requests
            .addCase(getRequsets.pending, (state) => {
                state.loadingRequests = true;
            })
            .addCase(getRequsets.fulfilled, (state, action) => {
                state.loadingRequests = false;
                console.log(action);
                if (action.payload.message != 'success') {
                    state.errorRequests = action.payload.message
                    !action.payload.Document_ ? state.requests = null : state.requests = action.payload.Document_
                } else {
                    state.errorRequests = null
                    state.requests = action.payload.Document_

                }

            })
            .addCase(getRequsets.rejected, (state, action) => {
                state.loadingRequests = false;
                state.errorRequestsApi = action.error.message;
            })
            // accept freind
            .addCase(acceptFriend.pending, (state) => {
                state.loadingAcceptFriend = true;
            })
            .addCase(acceptFriend.fulfilled, (state, action) => {
                console.log(action);
                state.loadingAcceptFriend = false;
                if (action.payload.message != 'success') {
                    state.errorAcceptFriend = action.payload.message
                } else {
                    state.errorAcceptFriend = null

                }

            })
            .addCase(acceptFriend.rejected, (state, action) => {
                state.loadingAcceptFriend = false;
                state.errorAcceptFriendApi = action.error.message;
            })
            // reject Friend
            .addCase(rejectFriend.pending, (state) => {
                state.loadingRejectFriend = true;
            })
            .addCase(rejectFriend.fulfilled, (state, action) => {
                console.log(action);
                state.loadingRejectFriend = false;
                if (action.payload.message != 'success') {
                    state.errorRejectFriend = action.payload.message
                } else {
                    state.errorRejectFriend = null

                }

            })
            .addCase(rejectFriend.rejected, (state, action) => {
                state.loadingRejectFriend = false;
                state.errorRejectFriendApi = action.error.message;
            })
            // get my requsets
            .addCase(getMyRequsets.pending, (state) => {
                state.loadingMyRequests = true;
            })
            .addCase(getMyRequsets.fulfilled, (state, action) => {
                state.loadingMyRequests = false;

                if (action.payload.message !== 'success') {
                    state.errorMyRequests = action.payload.message
                    !action.payload.Document_ ? state.MyRequests = null : state.MyRequests = action.payload.Document_
                } else {
                    state.errorMyRequests = null
                    state.MyRequests = action.payload.Document_
                }
            })
            .addCase(getMyRequsets.rejected, (state, action) => {
                state.loadingMyRequests = false;
                state.errorMyRequestsApi = action.error.message;
            })
            // delete MyRequest Friend
            .addCase(deleteMyRequestFriend.pending, (state) => {
                state.loadingMyRequestFriend = true;
            })
            .addCase(deleteMyRequestFriend.fulfilled, (state, action) => {
                console.log(action);
                state.loadingMyRequestFriend = false;
                if (action.payload.message != 'success') {
                    state.errorMyRequestFriend = action.payload.message
                } else {
                    state.errorMyRequestFriend = null

                }

            })
            .addCase(deleteMyRequestFriend.rejected, (state, action) => {
                state.loadingMyRequestFriend = false;
                state.errorMyRequestFriendApi = action.error.message;
            })
            // get my friends
            .addCase(getMyFriends.pending, (state) => {
                state.loadingMyFriend = true;
                state.myFriends=[]
            })
            .addCase(getMyFriends.fulfilled, (state, action) => {
                state.loadingMyFriend = false;
                if (action.payload.message === 'success') {
                    state.myFriends = action.payload
                } else {
                    state.errorMyFriend = action.payload.message
                    state.myFriends = []
                }
            })
            .addCase(getMyFriends.rejected, (state, action) => {
                state.loadingMyFriend = false;
                state.errorMyFriendApi = action.error.message;
            })
    },
});


export const { makeStateIsEmpity } = friendSlice.actions;

export default friendSlice.reducer;
