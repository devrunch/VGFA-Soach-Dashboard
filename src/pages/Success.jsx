import { useState } from 'react';
import image from '../assets/soach .png'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import saly from "../assets/Saly-10.png"
import success from '../assets/success.png'

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const baseUrl = "https://vfgabackend.outhad.com/api/";
const Success = () => {

    return (
        <div className='flex h-screen p-8 '>

            <div className="flex  h-[95vh] py-8 flex-1 flex-col justify-around px-6  lg:px-8">




                <div className="mt-10 sm:mx-auto sm:w-full h-full sm:max-w-xl flex flex-col justify-around items-stretch">
                    <img
                        className="mx-auto h-12 w-auto"
                        src={image}
                        alt="Your Company"
                    /> 
                    <div className='flex flex-col items-center gap-24'>
                        <img src={success} className='w-4/12' alt="" />
                        <div className='flex flex-col items-center gap-8'>
                            <p className="block text-3xl float-end  font-medium leading-6 text-black text-center">
                                Account Created Successfully !
                            </p>
                            <p className="block text-2xl float-end  font-normal leading-10 text-[#9C9AA5] text-center">
                                Welcome aboard! Start your success journey with SimpleFlow!
                            </p>
                        </div>

                    </div>

                    <button
                        type="submit"
                        className="flex w-[250px] mx-auto justify-center rounded-md bg-[#f5705e] p-4  text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end"
                    >
                        Let's Start!
                    </button>


                </div>


            </div>


        </div>
    )
}

export default Success
