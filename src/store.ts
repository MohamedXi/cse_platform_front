import { configureStore } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import logger from 'redux-logger'
import { rootReducer } from './reducers/rootReducer'
import { loadUser } from 'redux-oidc'
import userManager from './auth/userManager'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    window['runConfig'].NODE_ENV === 'development'
      ? getDefaultMiddleware({ serializableCheck: false, thunk: true }).concat(logger)
      : getDefaultMiddleware({ serializableCheck: false, thunk: true }),
})
loadUser(store, userManager)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>() // Export a hook that can be reused to resolve types
