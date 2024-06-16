import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/category";

class CategoryService {

    saveCategory(category) {
        return axios.post(API_URL , category,{ headers: AuthHeader() });
    }

    deleteCategory(category) {

        return axios.delete(API_URL + "/" + category.id ,{ headers: AuthHeader() });
    }

    getAllCategory() {
        return axios.get(API_URL + "/categories", { headers: AuthHeader() } );
    }

    updateCategory(category) {
        return axios.put(API_URL + "/category/" + category.id, category, { headers: AuthHeader() });
    }

}

export default new CategoryService();