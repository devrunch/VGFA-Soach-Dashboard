/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect } from "react";
import stateCityData from '../data/stateCity.json'
import { useNavigate } from "react-router-dom";
const myHeaders = new Headers();
myHeaders.append("Authorization", "Bearer " + localStorage.getItem('vgfatoken'));
const baseUrl = "https://vfgabackend.soachglobal.com/api/";


function Profile() {
    const [user, setUser] = useState("");
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => { checkLogin(); }, []);
    const checkLogin = async () => {
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
            redirect: "follow"
        };
        let selecteduser = localStorage.getItem('vgfauser');
        console.log(selecteduser)
        let response;
        if (selecteduser === 'panchayat') {
            response = await fetch(baseUrl + "auth/panchayat/me", requestOptions);
        }
        else {
            response = await fetch(baseUrl + "auth/official/me", requestOptions);
        }

        if (response.status === 401) navigate("/login");
        const res = await response.json();
        console.log(res)
        setUser(res.data.message);
    }
    const handleStateChange = (event) => {
        const state = event.target.value;
        setCities(stateCityData[state] || []);
    };


    return (
        <div className="relative min-h-screen md:flex">
            <Sidebar />
            <div
                className={`flex-1 min-h-screen mx-0 transition-all duration-300 ease-in-out ml-56`}
            >
                <Navbar email={user.email} name={user.name} />
                <div className="flex justify-center mt-10  items-start gap-x-5 ">
                    <div className=" rounded-lg w-64 bg-white font-poppins shadow-lg sticky top-20">
                        <div className="p-3 font-semibold border-b">
                            My Settings
                        </div>
                        <div className="text-red-500  p-3 border-l-[3px] border-l-blue-500 text-sm">
                            <i className="fa-regular fa-user mr-1 text-sm"></i>
                            Profile
                        </div>
                        <div className="text-black p-3 text-sm">
                            <i className="fa-solid fa-shield-halved mr-1"></i>
                            Manage User
                        </div>
                        <div className="text-black p-3 text-sm">
                            <i className="fa-regular fa-credit-card mr-1"></i>
                            Manage Payment Status
                        </div>
                        <div className="border-t p-3 text-sm">
                            <i className="fa-solid fa-arrow-right-from-bracket mr-1"></i>
                            <button>Logout</button>
                        </div>

                    </div>
                    <div className=" rounded-lg mb-10 shadow-lg w-4/6 bg-white">
                        <div className="p-3 font-bold border-b text-2xl">
                            Profile
                        </div>
                        <div className="flex justify-start items-center p-5 gap-x-3 ">
                            <img src={user.profilePicture || "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1726122220~exp=1726125820~hmac=090ebdbaa94d2f34761d5e505dd550a86078a102e45976f9dbfdc458e6613f9c&w=740"} className='w-24' />
                            <div className='flex flex-col gap-1'>
                                <p className='font-bold text-sm'>Profile Picture</p>
                                <p className='text-sm text-gray-600'>upload (.jpg, .jpeg, .png) file</p>
                                <p className='font-semibold text-sm text-red-500'>Change Picture</p>
                            </div>
                        </div>
                        <div className="p-3 font-bold border-b text-lg">
                            Personal Information
                        </div>
                        <div className='flex flex-col gap-4 py-6 px-3'>
                            <div className='flex gap-4'>
                                <div className='w-1/2'>
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                        First Name
                                    </label>
                                    <input
                                        id="firstName"
                                        name="firstName"
                                        type="text"
                                        defaultValue={user ? user.name.split(' ')[0] : ''}
                                        required
                                        className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                    />
                                </div>
                                <div className='w-1/2'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Last Name
                                    </label>
                                    <input
                                        id="lastName"
                                        name="lastName"
                                        type="text"
                                        defaultValue={user ? user.name.split(' ')[1] : ''}
                                        required
                                        className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                    />
                                </div>

                            </div>
                            <div>

                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    defaultValue={user.email}
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone Number
                                </label>
                                <input
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    defaultValue={user.phone}
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                />
                            </div>
                            <div>
                                <select
                                    id="designation"
                                    name="designation"
                                    defaultValue={user.designation}
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-sm mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:leading-6 bg-[#fff]"
                                >
                                    <option value="">Select Designation</option>
                                    <option value="Panchayat-Pradhan">Panchayat Pradhan</option>
                                    <option value="Panchayat-Secretary">Panchayat Secretary</option>
                                    <option value="Gram-Panchayat-Member">Gram Panchayat Member</option>
                                </select>
                            </div>
                            <div className="p-3 font-bold border-b text-lg">
                                Office Information
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    defaultValue={user.address_office}
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                />
                            </div>
                            <div className='flex gap-4'>
                                <div className='w-1/2'>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                            Panchayat Name
                                        </label>
                                        <input
                                            id="panchayat_name"
                                            name="panchayat_name"
                                            type="text"
                                            defaultValue={user.panchayat_name}
                                            required
                                            className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                        />
                                    </div>
                                </div>
                                <div className="w-1/2">
                                    <div>
                                        <label htmlFor="panchayat_samiti" className="block text-sm font-medium leading-6 text-gray-900">
                                            Panchayat Samiti
                                        </label>
                                        <input
                                            id="panchayat_samiti"
                                            name="panchayat_samiti"
                                            type="text"
                                            defaultValue={user.panchayat_samiti}
                                            required
                                            className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className='flex gap-4'>
                                <div className='w-1/2'>
                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                        State
                                    </label>
                                    <select
                                        id="state"
                                        name="state"
                                        defaultValue={user.state}
                                        onChange={handleStateChange}
                                        required
                                        className="block w-full rounded-md border-0 p-3 text-lg mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:leading-6 bg-[#fff] text-sm"
                                    >
                                        <option value="" >Select State</option>
                                        {Object.keys(stateCityData).map(state => (
                                            <option key={state} value={state}>
                                                {state}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className='w-1/2'>
                                    <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                                        City
                                    </label>
                                    <select
                                        id="city"
                                        name="city"
                                        defaultValue={user.city}
                                        required
                                        className="block w-full rounded-md border-0 p-3 text-sm mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:leading-6 bg-[#fff]"
                                    >
                                        <option value="">Select City</option>
                                        {cities.map(city => (
                                            <option key={city} value={city}>
                                                {city}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
