import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/user";

class WishlistService {

    addWishlist(wishlist) {
        return axios.post(API_URL + "/wishlist", wishlist,{ headers: AuthHeader() });
    }

    getWishlist(id) {
        return axios.get(API_URL + "/wishlist/"+id, { headers: AuthHeader() })
    }

    deleteWishlist(id) {
        return axios.delete(API_URL + "/wishlist/" + id, { headers: AuthHeader() });
    }

    checkWishlist(userId,bookId) {
        return axios.get(API_URL + "/wishlist/"+userId+"/"+bookId,{ headers: AuthHeader() }    );
    }


}

export default new WishlistService();