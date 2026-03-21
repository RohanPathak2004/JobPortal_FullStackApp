import {use, useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";
import {AuthContext} from "../context/AuthContext.jsx";



const Login = () => {

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    })
    const [seePassword, setSeePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [noMatch, setNomatch] = useState(true);
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const navigate = useNavigate();


    const {setToken} = useContext(AuthContext);

    const onChangePassword = (e) => {
        const newPassword = e.currentTarget.value;
        setUserCredentials({...userCredentials,password:newPassword});

        if (!pattern.test(newPassword)) {
            setNomatch(true);
        } else {
            setNomatch(false);
        }

    }

    const handleLogin = async (e)=>{
        e.preventDefault();
        if(userCredentials.password.length>0&&pattern.test(userCredentials.password)){
            try {
                const res = await axios.post('http://localhost:8080/login', userCredentials);
                setToken(res.data);
                navigate('/');
            } catch (error) {
                console.error("Login failed:", error);
                alert("Login failed. Please check your credentials.");
            }
        }else return;


    }

    console.log(userCredentials);

    return (
        <div className={' w-full flex justify-center items-center py-5'}>


            <form onSubmit={(e)=>handleLogin(e)} className=' md:mt-25 w-[80vw] md:w-[30vw] md:gap-8 md:px-8 flex flex-col gap-8 shadow-taupe-600  shadow-2xl px-4 py-5'>
                <div className='w-full flex flex-col justify-center gap-2 '>
                    <label className='text-[1.2rem] md:text-2xl font-medium '>Email</label>
                    <input value={userCredentials.email} onChange={(e)=>setUserCredentials({...userCredentials,email: e.target.value})} className=' px-1 py-2 focus:outline-green-600  border-2 border-gray-200 rounded-lg' required type={'email'}/>
                </div>
                <div className='w-full flex flex-col gap-3' >
                    <label className='text-[1.2rem] md:text-2xl font-medium '>Password</label>
                    <input
                        placeholder="Enter Your password"
                        className={`${noMatch?'focus:outline-red-500':'focus:outline-green-500'}  border-2 border-gray-200 rounded-lg px-1 py-2 focus:outline-green-600`}
                        type={seePassword? 'text' : 'password'}
                        id="password"
                        name="password"

                        required
                        onChange={(e) => onChangePassword(e)}

                    />
                    <div className='flex  md:justify-start justify-end gap-1 items-center'>
                        <input  type={"checkbox"}  onChange={(e) => setSeePassword(e.target.checked)} />
                        <span>See Password</span>
                    </div>

                    {userCredentials.password.length > 0 && <div className='text-sm md:text-[1.1rem]'>
                        <ol className={`${noMatch?'text-red-600':'text-green-700'} list-disc px-4`}>
                            <li>At least one UPPER case character [A-Z].</li>
                            <li>At least one lower case character [a-z].</li>
                            <li>At least one special Character [!@#$%^&*].</li>
                            <li>Contains numbers.</li>
                            <li>Length of the password must be at least 8.</li>
                        </ol>
                    </div>}
                </div>
                <div className='w-full flex justify-center items-center'>
                    <button type={'submit'}  className='w-25 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-center md:w-2/6  md:py-2 md:text-2xl md:rounded-3xl rounded-3xl '>Login</button>
                </div>
                <div className='w-full text-center'>
                    <h2>Don't have an Account, <span className='text-blue-500 hover:underline hover:underline-offset-1 hover:text-blue-600'><Link to={'/register'}>Register</Link></span></h2>
                </div>
            </form>
        </div>

    )

}

export default Login;