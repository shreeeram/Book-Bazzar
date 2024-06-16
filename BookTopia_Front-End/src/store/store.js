import { combineReducers, createStore } from 'redux';
import userReducer from './reducer/user.reducer';


const allReducer = combineReducers({
    user: userReducer,
 
})

const store = createStore(allReducer);

export default store;
