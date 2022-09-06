const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit")
const fetch = require('node-fetch')

const initialState = {
    loading: false,
    posts: [],
    error: ''
}

const postThunk = createAsyncThunk('post/postThunk', async (dispatchRelatedThunk) => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts?id=8");
    const data = await res.json()

    // DISPATCH AFTER GETTING VALUE
    dispatchRelatedThunk(data)

    return data;
})

const postSlice = createSlice({
    name: "post",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(postThunk.pending, (state, action) => {
            state.loading = true
            state.error = ''
        })
        builder.addCase(postThunk.fulfilled, (state, action) => {
            state.loading = false
            state.error = ''
            state.posts = action.payload
        })
        builder.addCase(postThunk.rejected, (state, action) => {
            state.loading = false
            state.posts = []
            state.error = action.error.message
        })
    }
})

module.exports = postSlice.reducer;
module.exports.postThunk = postThunk;