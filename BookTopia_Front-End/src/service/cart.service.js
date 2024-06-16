import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/user";

class CartService {

    addCart(cart) {
        return axios.post(API_URL + "/cart", cart,{ headers: AuthHeader() });
    }

    checkCart(cart) {
        return axios.get(API_URL + "/check/"+cart.id,{ headers: AuthHeader() }    );
    }

    getCart(id) {
        return axios.get(API_URL + "/carts/"+id, { headers: AuthHeader() })
    }

    updateCart(id, qu) {
        return axios.post(API_URL + "/cartQuantUpdate/" + id + "/" + qu, { headers: AuthHeader() });
    }

    deleteCart(id) {
        return axios.delete(API_URL + "/cart/" + id, { headers: AuthHeader() });
    }

    checkCartBook(userId,bookId) {
        return axios.get(API_URL + "/checks/"+userId+"/"+bookId,{ headers: AuthHeader() }    );
    }


}

export default new CartService();