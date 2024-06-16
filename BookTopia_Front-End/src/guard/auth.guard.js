import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const AuthGuard = ({ children, roles }) => {

    const loginUser = useSelector(state => state.user);

    const authorize = () => {

        if (!loginUser) {
            return (<Navigate to={{ pathname: '/login' }}></Navigate>);
        }



        if (loginUser.role!="ROLE_ADMIN") {
            return (<Navigate to={{ pathname: '/401' }} />);
        }
       // console.log(children);


        return (children);
    }

    return authorize();
}