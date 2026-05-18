import React, {createContext, useContext, useEffect} from 'react'
import useLocalStorage from "../hooks/useLocalStorage.js";

const ThemeContext = createContext();

export function ThemeProvider({children}){

    const [theme, setTheme] = useLocalStorage('theme','dark');
    useEffect(()=>{
        const root = document.documentElement
        if(theme==='dark'){
            root.classList.add('dark')
            setTheme('dark')
        }else{
            root.classList.remove('dark')
            setTheme('light')
        }
    },[theme])


    return <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>
}


export const useTheme = () => useContext(ThemeContext)