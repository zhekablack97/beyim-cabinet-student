import { configureStore } from '@reduxjs/toolkit';
import { authServiceApi } from './api/authService';
import authReducer from './features/slice/authSlice';
import { programServiceApi } from './api/programService/programServiceApi';
import { contentServiceApi } from './api/contentService';
import { contentInteractionApi } from './api/contentInteractionApi/';
// ...

const store = configureStore({
    reducer: {
        auth: authReducer,
        // Add the generated reducer as a specific top-level slice
        [authServiceApi.reducerPath]: authServiceApi.reducer,
        [programServiceApi.reducerPath]: programServiceApi.reducer,
        [contentServiceApi.reducerPath]: contentServiceApi.reducer,
        [contentInteractionApi.reducerPath]: contentInteractionApi.reducer,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(authServiceApi.middleware)
            .concat(programServiceApi.middleware)
            .concat(contentServiceApi.middleware)
            .concat(contentInteractionApi.middleware),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
