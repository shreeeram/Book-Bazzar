import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from "../type";

const userReducer = (state = {}, action) => {


    switch (action?.type) {
        case SET_CURRENT_USER:
            sessionStorage.setItem('loginUser', JSON.stringify(action?.payload));
            return action?.payload;

        case CLEAR_CURRENT_USER:
            sessionStorage.removeItem('loginUser');
            return null;
        default:
            return JSON.parse(sessionStorage.getItem('loginUser'));
    }


}

export default userReducer;