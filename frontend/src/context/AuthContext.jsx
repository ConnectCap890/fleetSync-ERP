import { createContext,useState, useContext } from "react";

const AuthContext = createContext()

export const AuthProvider = ({children}) =>{

    const [user,setUser] = useState(
        localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user'))
        :null)
        
    const [token, setToken] = useState(localStorage.getItem('token')|| null )

    const login = (userData,userToken) =>
    {
        setUser(userData)
        setToken(userToken)
        localStorage.setItem('token',userToken)
        localStorage.setItem('user',JSON.stringify(userData))
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }
    return(
    <AuthContext.Provider value={{user,token,login,logout}}>  
    {children}  
    </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext)

export default AuthContext