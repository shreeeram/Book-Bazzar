export default class User {
    constructor(id, name, email, password, mobNo, address, city, state, pincode, role, token) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.mobNo = mobNo;
        this.address = address;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
        this.role = role;
        this.token=token;
    }
}