import {createContext, useContext, useEffect} from "react";
import useLocalStorage from '../hooks/useLocalStorage.js'
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";
export const AuthContext = createContext({});

const AuthContextProvider = ({children})=>{
    const [token, setToken] = useLocalStorage("token",'');
    const [user, setUser] = useLocalStorage("user",{
        email:'',
        role:''
    });
    const navigate = useNavigate();
    const contextValue = {
        token,
        user,
        setToken,
        setUser
    }

    useEffect(()=>{
        let decodedToken ;

        try{
            if (token||user!==null) {
                decodedToken = jwtDecode(token);
            }else{
                navigate('/login')
            }
        }
        catch(e){
            navigate('/login')
        }
        if(decodedToken){
            setUser({
                email:decodedToken.email,
                role:decodedToken.role
            })
        }

    },[token])

    console.log(user);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )

}
export const useAuthContext = ()=>{
    const context = useContext(AuthContext);
    if(context){
        return context;
    }
    throw new Error('useAuthContext must be used within the AuthProvider');
}
export default AuthContextProvider;