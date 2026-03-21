import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

const  Register = ()=>{

    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: '',
        authority:'CANDIDATE'
    })
    const [seePassword, setSeePassword] = useState(false);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState();

    const [noMatch, setNomatch] = useState(true);
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
    const navigate = useNavigate();
    const onChangePassword = (e) => {
        setPassword(e.target.value);

        if (!pattern.test(e.currentTarget.value)) {
            setNomatch(true);
        } else {
            setNomatch(false);
        }

    }

    const onChangeConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleSignUp = async (e)=>{
        e.preventDefault();
        
        if(password.length>0&&pattern.test(password)&&password===confirmPassword){
            const finalCredentials = { ...userCredentials, password: password };
            setUserCredentials(finalCredentials);
            
            try {
                const res = await axios.post('http://localhost:8080/register', finalCredentials);
                console.log(res.data);
                navigate('/login');
            } catch (error) {
                console.error("Registration failed:", error);
            }
        }
    }

console.log(userCredentials);

    return (
        <div className={'w-full flex justify-center items-center py-5'}>
            <form onSubmit={(e)=>handleSignUp(e)} className='md:mt-5 w-[80vw] md:w-[30vw] md:gap-6 md:px-8 md:py-10 flex flex-col gap-8 shadow-taupe-600 shadow-2xl px-4 py-5'>
                {/* Email Field */}
                <div className='w-full flex flex-col justify-center gap-2'>
                    <label htmlFor={'email'} className='text-[1.2rem] md:text-2xl font-medium'>Email</label>
                    <input
                        placeholder='Enter Email'
                        value={userCredentials.email}
                        onChange={(e) => setUserCredentials({ ...userCredentials, email: e.target.value })}
                        className='px-1 py-2 focus:outline-green-600 border-2 border-gray-200 rounded-lg'
                        required
                        type={'email'}
                    />
                </div>

                {/* Password Field */}
                <div className='w-full flex flex-col gap-3'>
                    <label htmlFor={'password'} className='text-[1.2rem] md:text-2xl font-medium'>Password</label>
                    <input
                        placeholder="password"
                        className={`${noMatch ? 'focus:outline-red-500' : 'focus:outline-green-500'} border-2 border-gray-200 rounded-lg px-1 py-2`}
                        type={seePassword ? 'text' : 'password'}
                        id="password"
                        required
                        value={password}
                        onChange={onChangePassword}
                        // REMOVE pattern={pattern} to stop the default browser popup
                    />
                </div>

                {/* Confirm Password Field */}
                <div className='w-full flex flex-col gap-3'>
                    <label htmlFor={'confirm_password'} className='text-[1.2rem] md:text-2xl font-medium'>Confirm Password</label>
                    <input
                        placeholder="Confirm password"
                        className={`${(password !== confirmPassword) ? 'focus:outline-red-500' : 'focus:outline-green-500'} border-2 border-gray-200 rounded-lg px-1 py-2`}
                        type={seePassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={onChangeConfirmPassword}
                        // REMOVE pattern={pattern} here too
                    />
                </div>

                {/* See Password Checkbox */}
                <div className='flex md:justify-start justify-end gap-1 items-center'>
                    <input type={"checkbox"} onChange={(e) => setSeePassword(e.target.checked)} />
                    <span>See Password</span>
                </div>

                {/* Validation List */}
                {password.length > 0 && (
                    <div className='text-sm md:text-[1.1rem]'>
                        <ol className='list-disc px-4'>
                            <li className={/[A-Z]/.test(password) ? 'text-green-700' : 'text-red-600'}>At least one UPPER case character [A-Z].</li>
                            <li className={/[a-z]/.test(password) ? 'text-green-700' : 'text-red-600'}>At least one lower case character [a-z].</li>
                            <li className={/[!@#$%^&*]/.test(password) ? 'text-green-700' : 'text-red-600'}>At least one special Character [!@#$%^&*].</li>
                            <li className={/\d/.test(password) ? 'text-green-700' : 'text-red-600'}>Contains numbers.</li>
                            <li className={password.length >= 8 ? 'text-green-700' : 'text-red-600'}>Length of the password must be at least 8.</li>
                            <li className={(password === confirmPassword && confirmPassword !== '') ? 'text-green-700' : 'text-red-600'}>Password and confirm password should be same</li>
                        </ol>
                    </div>
                )}

                {/* Authority Select */}
                <div className='w-full flex flex-col gap-3'>
                    <label className='text-[1.2rem] md:text-2xl font-medium'>Register Yourself as</label>
                    <select required value={userCredentials.authority} onChange={(e) => setUserCredentials({ ...userCredentials, authority: e.target.value })} className='md:w-1/2 px-4 py-2 border border-gray-200 rounded-lg focus:outline-green-600'>
                        <option value={'CANDIDATE'}>CANDIDATE</option>
                        <option value={'RECRUITER'}>RECRUITER</option>
                    </select>
                </div>

                <div className='w-full flex justify-center items-center'>
                    <button type={'submit'} className='cursor-pointer bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-center md:w-2/6 md:text-2xl rounded-3xl'>Sign up</button>
                </div>
            </form>
        </div>

    );
}

export default Register