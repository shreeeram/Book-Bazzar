import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/auth"

class userService {
    register(user) {
        return axios.post(API_URL + "/signup", user);
    }

    login(user) {
        return axios.post(API_URL + "/signin", user);
    }

    userCount(){
        return axios.get(BASE_API_URL+"/api/admin/usercount",{ headers: AuthHeader() })
    }

    getRevenue(){
        return axios.get(BASE_API_URL+"/api/admin/revenue",{ headers: AuthHeader() })
    }

}

export default new userService();