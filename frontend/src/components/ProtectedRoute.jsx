import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children,allowedRoles}) =>{

    const {token,user} = useAuth()

    if (!token) return <Navigate to='/login'/>
    if (allowedRoles && !allowedRoles.includes(user?.userType)) {
        return <Navigate to='/login'/>
    }
    return children
}

export default ProtectedRoute