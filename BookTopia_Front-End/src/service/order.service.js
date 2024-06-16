import axios from "axios";
import { BASE_API_URL } from "../common/constant";
import { AuthHeader } from "./auth.header";

const API_URL = BASE_API_URL + "/api/user"

class OrderService {

    createOrder(type,id) {
        return axios.get(API_URL + "/order/" + type+"/"+id, { headers: AuthHeader() });
    }

    getOrderByUser(id) {
        return axios.get(API_URL + "/order/"+id, { headers: AuthHeader() });
    }

    getAllOrder() {
        return axios.get(BASE_API_URL + "/api/admin/orders",{ headers: AuthHeader() });
    }

    updateOrder(id, st) {
        return axios.put(BASE_API_URL + "/api/admin/updatestatus/"+ id + "/" + st,{ headers: AuthHeader() });
    }
   
    getPieValues(){
        return axios.get(BASE_API_URL + "/api/admin/piechart",{ headers: AuthHeader() })
    }

    getPaymentDetails(oId){
        return axios.get(BASE_API_URL+"/api/payment/getDetails/"+oId,{ headers: AuthHeader() })
    }

}

export default new OrderService();