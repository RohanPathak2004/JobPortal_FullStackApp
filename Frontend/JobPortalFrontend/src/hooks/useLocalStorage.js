import {useState} from "react";

const useLocalStorage = (key,defaultValue)=>{
    const [localStorageValue, setLocalStorageValue] = useState(()=>{
        try{
            const value = localStorage.getItem(key);

            if(value){
                return JSON.parse(value);
            }else{
                return defaultValue;
            }
        }catch(e){
            localStorage.setItem(key,defaultValue);
            return defaultValue;
        }
    });

    const setLocalStorageStateValue = (valueOrFun)=>{
        let newValue;
        if(typeof valueOrFun == 'function'){
            const fun = valueOrFun;
            newValue = fun(localStorageValue);
        }else{
            newValue = valueOrFun;
        }

        localStorage.setItem(key,JSON.stringify(newValue));
        setLocalStorageValue(newValue);
    }

    return [localStorageValue, setLocalStorageStateValue];
}

export default useLocalStorage;