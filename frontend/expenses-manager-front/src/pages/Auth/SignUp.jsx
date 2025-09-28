import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import {Link, useNavigate} from 'react-router-dom';
import Input from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';

const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault(); 

        let profileImageUrl = "";

        if(!name){
            setError("Please enter your full name");
            return;
        }

        if(!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }   

        if(!password) {
            setError("Please enter your password");
            return;
        }

        if(!confirmPassword){
            setError("Please confirm your password");
            return;
        }

        if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }

    
    }
    
    return(
        <AuthLayout>
            <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">Create an Account</h3>
                <p className="text-xd text-slate-700 mt-[5px] mb-6">
                    Join us today by entering your details below.
                </p>

                <form onSubmit={handleSignUp} className="flex flex-col items-center">

                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic}/>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                        <Input
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                            placeholder="John Doe"
                            label="Full Name"
                            type="text"
                        />
                        <Input
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            placeholder="password"
                            label="Password"
                            type="password"
                        />
                        <Input
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            placeholder="example@example.com"
                            label="Email Address"
                            type="text"
                        />
                        <Input
                            value={confirmPassword}
                            onChange={({ target }) => setConfirmPassword(target.value)}
                            placeholder="confirm password"
                            label="Confirm Password"
                            type="password"
                        />
                    </div>

                    {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

                    <button type="submit" className="btn-primary mt-4 w-28 flex justify-center items-center">
                        CREATE ACCOUNT
                    </button>

                    <p className="text-[13px] text-slate-800 mt-3 text-center">
                        Already have an account?{' '}
                        <Link className="font-medium text-primary underline" to="/login"> 
                            Log In
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}

export default SignUp;