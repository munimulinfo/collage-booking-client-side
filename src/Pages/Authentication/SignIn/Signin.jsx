import { useContext, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../Providers/Authprovider';
import { useForm } from 'react-hook-form';
import { FaGoogle } from 'react-icons/fa';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';
const Login = () => {

    // Authcontext import auth info and 2 hokks
    const {user, signIn, googleSignIn,forgotPassword } = useContext(AuthContext);
    const emailRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [error, setError] = useState();

    // visible and hidden function implement password field
    const [show, setShow] = useState();
    const handleShow = () => {
        setShow(!show);
    };
    /// login form data collect and user login
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const email = data?.email;
        const password = data?.password;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                reset();
                console.log(user);
                Swal.fire({
                    icon: 'success',
                    title: 'Login successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
            })
            .catch(err => {
                setError(err.message);
                console.log(err.message);
            })
    };
    // handle google login or sign in  and data save server
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                Swal.fire({
                    icon: 'success',
                    title: 'Login successfully.',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(from, { replace: true });
                const saveUser = { name: loggedInUser?.displayName, email: loggedInUser?.email, image: loggedInUser?.photoURL, role: 'student' }
                fetch('https://collage-booking.vercel.app/allusers', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(saveUser)
                })
                    .then(res => res.json())
                    .then(() => {
                        navigate(from, { replace: true });
                    })
            }).catch(err => {
                setError(err.message);
            })
    }

    const handleForgetPassword = event => {
        event.preventDefault();
        const email = emailRef.current?.value;
        if (!email) {
            Swal.fire({
                title: 'Error!',
                text: 'Please Provide Your email and reset password',
                icon: 'error',
                confirmButtonText: 'ok'
              })
            return;
        }
       forgotPassword(email)
            .then(() => {
                Swal.fire({
                    title: 'success',
                    text: 'Please check you email',
                    icon: 'success',
                    confirmButtonText: 'ok'
                  })
                  return;
            })
            .then(error => {
                console.log(error.message)
            })
    }

    return (
        <div className='flex justify-center items-center'>
            <div className='w-1/2 lg:px-16'>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full  mt-28 mb-10 p-10 border border-purple-500 bg-white rounded-lg text-black">
                    <h3 className='text-2xl text-center font-bold mb-5'>Login Here</h3>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" ref={emailRef} {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                        {errors.email && <span className='text-purple-600 animate-pulse'>please provide your email</span>}
                    </div>
                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input type={show ? 'text' : "password"} {...register("password", { required: true })} placeholder="password" className="input input-bordered" />
                        <span onClick={handleShow} className='absolute top-12 right-4 text-[22px]'>{show ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</span>
                        {errors.password && <span className='text-purple-600 animate-pulse'>please provide your password</span>}
                        <label className="label">
                            <Link onClick={handleForgetPassword} className="underline  text-error">Forgot password?</Link>
                        </label>
                    </div>
                    <div className="form-control mt-6 mb-3">
                        <button className="btn bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 border-0 text-white">Login</button>
                    </div>
                    {error && <p className='text-center text-error mb-2'>{error}</p>}
                    <p className='text-center'>Dont have an account? <Link to='/signup' className='text-purple-600 underline'>Create an account</Link></p>
                </form>
                <div className='flex justify-center items-center gap-8 mb-24'>

                    <li onClick={handleGoogleSignIn} className="btn btn-outline border-purple-500 w-full flex ">
                        <FaGoogle className='text-xl text-lime-400'></FaGoogle>
                        <Link>Google Login</Link>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default Login;
