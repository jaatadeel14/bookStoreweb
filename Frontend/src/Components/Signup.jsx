import React from 'react'
import { Link } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form";


function Signup() {
     const { register, handleSubmit, formState: { errors } } = useForm();
     const onSubmit = data => console.log(data);

    return (
        <>
            <div className='flex h-screen items-center justify-center'>
                <div className="border-[2px] shadow-md p-5 rounded-md">
                    
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</Link>
                        <h3 className="font-bold text-lg">Signup</h3>

                        {/* Name */}
                        <div className='mt-4 space-y-2'>
                            <span>Name</span>
                            <br />
                            <input type="text" placeholder='Enter Your fullname' className='w-80 px-3 py-1 border rounded-md outline-none' {...register("name", { required: true })} />
                             <br />
                        {errors.name && <span className="text-sm text-red-500 ">This field is required</span>}
                        </div>

                        {/* Email */}
                        <div className='mt-4 space-y-2'>
                            <span>Email</span>
                            <br />
                            <input type="email" placeholder='Enter Your email' className='w-80 px-3 py-1 border rounded-md outline-none' {...register("email", { required: true })} />
                             <br />
                        {errors.email && <span className="text-sm text-red-500 ">This field is required</span>}
                            
                        </div>

                        {/* Password */}
                        <div className='mt-4 space-y-2'>
                            <span>Password</span>
                            <br />
                            <input type="password" placeholder='Enter Your password' className='w-80 px-3 py-1 border rounded-md outline-none' {...register("password", { required: true })} />
                             <br />
                        {errors.password && <span className="text-sm text-red-500 ">This field is required</span>}
                        </div>

                        {/* Button */}
                        <div className='flex justify-around mt-4'>
                            <button type="submit" className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'>Signup</button>
                            <p className='text-xl'>
                                Have account? {" "}
                                <button type="button" className='underline text-blue-500 cursor-pointer' onClick={() => document.getElementById("my_modal_3").showModal()}>
                                    Login
                                </button>{" "}
                                <Login />
                            </p>
                        </div>
                    </form>
                    
                </div>
            </div>
        </>
    );
}

export default Signup;

























// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

// function Signup() {
//     const [showLogin, setShowLogin] = useState(false);

//     const handleToggleLogin = () => {
//         setShowLogin((prev) => !prev);
//     };

//     return (
//         <>
//             <div className="flex h-screen items-center justify-center bg-gray-100">
//                 {showLogin ? (
//                     <div className="relative border-[2px] shadow-md p-5 rounded-md bg-white w-96">
//                         {/* Close Button */}
//                         <button
//                             onClick={handleToggleLogin}
//                             className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
//                         >
//                             ✕
//                         </button>

//                         <h3 className="font-bold text-lg text-center mb-4">Login</h3>
//                         {/* Login Form */}
//                         <form>
//                             <div className="space-y-2">
//                                 <label className="block font-medium">Email</label>
//                                 <input
//                                     type="email"
//                                     placeholder="Enter Your email"
//                                     className="w-full px-3 py-2 border rounded-md outline-none"
//                                 />
//                             </div>

//                             <div className="space-y-2 mt-4">
//                                 <label className="block font-medium">Password</label>
//                                 <input
//                                     type="password"
//                                     placeholder="Enter Your password"
//                                     className="w-full px-3 py-2 border rounded-md outline-none"
//                                 />
//                             </div>

//                             <button
//                                 type="submit"
//                                 className="bg-blue-500 text-white rounded-md px-4 py-2 mt-6 w-full hover:bg-blue-700 duration-200"
//                             >
//                                 Login
//                             </button>
//                         </form>
//                     </div>
//                 ) : (
//                     <div className="relative border-[2px] shadow-md p-5 rounded-md bg-white w-96">
//                         {/* Close Button */}
//                         <Link
//                             to="/"
//                             className="absolute right-2 top-2 text-gray-600 hover:text-gray-800"
//                         >
//                             ✕
//                         </Link>

//                         <h3 className="font-bold text-lg text-center mb-4">Signup</h3>
//                         {/* Signup Form */}
//                         <form>
//                             <div className="space-y-2">
//                                 <label className="block font-medium">Name</label>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter Your fullname"
//                                     className="w-full px-3 py-2 border rounded-md outline-none"
//                                 />
//                             </div>

//                             <div className="space-y-2 mt-4">
//                                 <label className="block font-medium">Email</label>
//                                 <input
//                                     type="email"
//                                     placeholder="Enter Your email"
//                                     className="w-full px-3 py-2 border rounded-md outline-none"
//                                 />
//                             </div>

//                             <div className="space-y-2 mt-4">
//                                 <label className="block font-medium">Password</label>
//                                 <input
//                                     type="password"
//                                     placeholder="Enter Your password"
//                                     className="w-full px-3 py-2 border rounded-md outline-none"
//                                 />
//                             </div>

//                             <div className="flex flex-col items-center mt-6 space-y-3">
//                                 <button
//                                     type="submit"
//                                     className="bg-pink-500 text-white rounded-md px-4 py-2 w-full hover:bg-pink-700 duration-200"
//                                 >
//                                     Signup
//                                 </button>
//                                 <p className="text-sm">
//                                     Already have an account?{" "}
//                                     <button
//                                         onClick={handleToggleLogin}
//                                         className="underline text-blue-500 hover:text-blue-700"
//                                     >
//                                         Login
//                                     </button>
//                                 </p>
//                             </div>
//                         </form>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }

// export default Signup;
