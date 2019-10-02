import { createStore } from 'redux'
import { persistCombineReducers } from 'redux-persist'
//import storage from 'redux-persist/lib/storage/'
import AsyncStorage from 'react-native/Libraries/Storage/AsyncStorage'

import toggleFavorite from './Reducers/favoriteReducer'
import setAvatar from './Reducers/avatarReducer'
import toggleViewed from './Reducers/viewedReducer'

const rootPersistConfig = {
    key: 'root',
    storage: AsyncStorage
}

export default createStore(persistCombineReducers(rootPersistConfig, {toggleFavorite, toggleViewed, setAvatar}))