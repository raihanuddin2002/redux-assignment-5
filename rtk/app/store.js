const { configureStore } = require("@reduxjs/toolkit");
const postSliceReducer = require('../features/posts/postSlice');
const relatedPostSliceReducer = require('../features/posts/relatedPostSlice');


const store = configureStore({
    reducer: {
        relatedPost: relatedPostSliceReducer,
        post: postSliceReducer,
    },
    middleware: (getDefaultMiddlewares) => getDefaultMiddlewares()
})

module.exports = store;