const store = require('./rtk/app/store');
const { postThunk } = require('./rtk/features/posts/postSlice');
const { relaedThunk } = require('./rtk/features/posts/relatedPostSlice');

// SUBSCRIBE
store.subscribe(() => {
    console.log(store.getState().post);
    console.log(store.getState().relatedPost);
})

// DISPATCH
store.dispatch(postThunk((data) => {
    store.dispatch(relaedThunk(data))
}))


// Server
const express = require('express')
const app = express()
const port = 5000 || process.env.PORT;

app.listen(() => {
    console.log("Server Listening on port:", port);
})

app.get("/", (req, res) => {
    res.send("ASSIGNMENT 5 - PLAY WITH JSONPLACE HOLDER")
})



