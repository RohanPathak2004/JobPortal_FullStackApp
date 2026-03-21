import {createContext, useContext, useEffect} from "react";
import useLocalStorage from '../hooks/useLocalStorage.js'
import {jwtDecode} from "jwt-decode";
export const AuthContext = createContext({});

const AuthContextProvider = ({children})=>{
    const [token, setToken] = useLocalStorage("token",'');
    const [user, setUser] = useLocalStorage("user",{
        email:'',
        role:''
    });
    const contextValue = {
        token,
        user,
        setToken,
        setUser
    }

    useEffect(()=>{
        let decodedToken ;

        try{
            if (token) {
                decodedToken = jwtDecode(token);
            }
        }
        catch(e){
            console.error(e);
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