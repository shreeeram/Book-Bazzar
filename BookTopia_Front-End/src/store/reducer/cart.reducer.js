import { ADD_CART, REMOVE_CART, CLEAR_CURRENT_USER, SET_CURRENT_USER } from "../type";

const cartReducer = (state = {}, action) => {


    switch (action?.type) {
        case ADD_CART:
            sessionStorage.setItem('cart', JSON.stringify(action?.payload));
            return action?.payload;

        case REMOVE_CART:
            sessionStorage.removeItem('cart');
            return null;   

        default:
            return JSON.parse(sessionStorage.getItem('loginUser'));
    }


}

export default cartReducer;