const { createAsyncThunk, createSlice } = require("@reduxjs/toolkit")
const fetch = require('node-fetch')

const initialState = {
    isLoading: false,
    relatedPosts: [],
    error: '',
    title: ''
}

const relaedThunk = createAsyncThunk("relatedPost/dataLoad", async (post) => {
    const query = post[0].title.split(' ');
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?title_like=${query[0]}&&title_like=${query[1]}&&title_like=${query[2]}&&title_like=${query[3]}`)
    const data = await res.json();

    return data;
})

const relatedPostLoad = createSlice({
    name: "relatedPost",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(relaedThunk.pending, (state, action) => {
            state.isLoading = true
            state.error = ''
        })
        builder.addCase(relaedThunk.fulfilled, (state, action) => {
            state.isLoading = false
            state.relatedPosts = action.payload
            state.error = ''
        })
        builder.addCase(relaedThunk.rejected, (state, action) => {
            state.isLoading = false
            state.relatedPosts = []
            state.error = action.error.message
        })
    }
})

module.exports = relatedPostLoad.reducer;
module.exports.relaedThunk = relaedThunk;
