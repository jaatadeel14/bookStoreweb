import React from 'react'
import { Link, replace, useLocation, useNavigate } from 'react-router-dom'
import Login from './Login'
import { useForm } from "react-hook-form";
import axios from "axios"
import toast from 'react-hot-toast';

function Signup() {
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/"
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.password
        }
        await axios.post("http://localhost:4001/user/signup", userInfo)
            .then((res) => {
                console.log(res.data)
                if (res.data) {
                    toast.success("Signup Successfully");
                    navigate(from, { replace: true })
                }
                localStorage.setItem("Users", JSON.stringify(res.data.user))
            }).catch((err) => {
                if (err.response) {
                    toast.error("Error: " + err.response.data.message)
                }
            })
    }



    return (
        <>
            <div className='flex h-screen items-center justify-center  dark:bg-slate-900 dark:text-white'>
                <div className="border-[2px] shadow-md p-5 rounded-md  dark:bg-slate-900 dark:text-white">

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex justify-between items-center mb-4 ">
                            <h3 className="font-bold text-lg">Signup</h3>
                            <Link to="/" className="btn btn-sm btn-circle btn-ghost">✕</Link>
                        </div>

                        {/* Name */}
                        <div className='mt-4 space-y-2'>
                            <span>Name</span>
                            <br />
                            <input
                                type="text"
                                placeholder='Enter Your fullname'
                                className='w-80 px-3 py-1 border rounded-md outline-none'
                                {...register("fullname", { required: true })}
                            />
                            <br />
                            {errors.fullname && <span className="text-sm text-red-500 ">This field is required</span>}
                        </div>

                        {/* Email */}
                        <div className='mt-4 space-y-2'>
                            <span>Email</span>
                            <br />
                            <input
                                type="email"
                                placeholder='Enter Your email'
                                className='w-80 px-3 py-1 border rounded-md outline-none'
                                {...register("email", { required: true })}
                            />
                            <br />
                            {errors.email && <span className="text-sm text-red-500 ">This field is required</span>}
                        </div>

                        {/* Password */}
                        <div className='mt-4 space-y-2'>
                            <span>Password</span>
                            <br />
                            <input
                                type="password"
                                placeholder='Enter Your password'
                                className='w-80 px-3 py-1 border rounded-md outline-none'
                                {...register("password", { required: true })}
                            />
                            <br />
                            {errors.password && <span className="text-sm text-red-500 ">This field is required</span>}
                        </div>

                        {/* Button */}
                        <div className='flex justify-around mt-4'>
                            <button
                                type="submit"
                                className='bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200'
                            >
                                Signup
                            </button>
                            <p className='text-xl'>
                                Have account? {" "}
                                <button
                                    type="button"
                                    className='underline text-blue-500 cursor-pointer'
                                    onClick={() => document.getElementById("my_modal_3").showModal()}
                                >
                                    Login
                                </button>
                            </p>
                        </div>
                    </form>

                    {/* Login Modal */}
                    <Login />
                </div>
            </div>
        </>
    );
}

export default Signup;


