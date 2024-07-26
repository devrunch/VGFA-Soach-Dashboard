import { useState } from 'react'
import image from '../assets/soach.png'
import uploadimg from '../assets/uploadimg.png'
import uploadimg2 from '../assets/uploadimg2.png'

import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const baseUrl = "https://vfgabackend.outhad.com/api/";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [PanchayatS1, setPanchayatS1] = useState(false);

  const [file, setFile] = useState(uploadimg);
  const [file2, setFile2] = useState(uploadimg2);

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    designation: '',
    address: '',
    panchayatName: '',
    state: '',
    city: '',
    officeAddress: ''
  });

  function handleImgChange(e) {
    console.log(e.target.files);
    setFile(URL.createObjectURL(e.target.files[0]));
  }

  function handleImgChange2(e) {
    console.log(e.target.files);
    setFile2(URL.createObjectURL(e.target.files[0]));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const raw = JSON.stringify({
      email: email,
      password: password
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    let response = await fetch(baseUrl + "auth/official/register", requestOptions);
    response = await response.json();
    toast.error("Invalid Credentials");
    setLoading(false);
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleChoice = (e) => {
    setSelectedDesignation(selectedOption);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/; 
    return phoneRegex.test(phoneNumber);
  };

  const handlePanchayatS1 = (e) => {
    const {
      firstName, lastName, email, phoneNumber, designation, address,
      panchayatName, state, city, officeAddress
    } = formValues;

    if (!firstName || !lastName || !email || !phoneNumber || !designation || !address ||
      !panchayatName || !state || !city || !officeAddress) {
      toast.error("Please fill all the fields");
    } else if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
    } else if (!validatePhoneNumber(phoneNumber)) {
      toast.error("Please enter a valid phone number");
    } else {
      setPanchayatS1(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };


  return (
    <div className='flex min-h-screen p-8'>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
        <div className="sm:mx-auto  w-[60vw]">
          <img
            className="mx-auto h-10 w-auto"
            src={image}
            alt="Your Company"
          />


          {!selectedDesignation && (
            <div className="vis flex flex-col items-center justify-center gap-8">


              <h2 className="mt-10 text-center text-3xl font-medium leading-9 tracking-tight text-gray-900">
                Welcome To Soach Global!
              </h2>
              <p className='text-[#727476] text-center p-4 font-normal'>Please select your role to proceed with registration.</p>


              <div className=" sm:mx-auto sm:w-full flex flex-col items-center justify-center gap-16">
                <div>
                  <div className="mt-2">
                    <select
                      id="options"
                      value={selectedOption}
                      onChange={handleOptionChange}
                      className="block w-[500px] bg-[#fff] rounded-md border-0 p-4  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    >
                      <option value="">Select an option</option>
                      <option value="panchayat">Panchayat</option>
                      <option value="official">Government Official</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    onClick={handleChoice}
                    className="flex w-[500px] justify-center rounded-md bg-[#f5705e] p-3  text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Next
                  </button>



                  <p className="mt-10 text-center text-sm text-gray-500">
                    Already a member?{' '}
                    <Link to="/login" className="font-semibold leading-6 text-[#f5705e] hover:text-indigo-500">
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

        {/*  */}

        {selectedDesignation && (
          <div>

            <div className="mt-10 sm:mx-auto sm:w-full ">

              {selectedDesignation === 'panchayat' ? (
                <>

                  <form  >

                    {!PanchayatS1 ? (
                      <>
                        <p className='text-center text-2xl font-bold my-12'>Panchayat Representative Registration</p>
                        <div className='w-[60vw] rounded-xl border-[#EDEDED] border-2 '>

                          <div  >
                            <p className='font-semibold text-2xl border-[#EDEDED] border-b-2 p-6 px-8 m-0'>Profile</p>
                          </div>

                          <div className='p-8'>

                            <div className='flex gap-8'>
                              <img src={file} />
                              <div className='flex flex-col gap-2'>
                                <h2 className='font-semibold'>Add Profile Picture</h2>
                                <p className='text-[#727476] font-normal'>upload (.jpg, .jpeg, .png) file</p>
                                <input
                                    type="file" onChange={handleImgChange} />
                              </div>

                            </div>
                            <div>
                              <h2 className='font-semibold border-[#EDEDED] border-b-2 p-4 mt-5'>Personal Information</h2>

                              <div className='flex flex-col gap-4 py-6'>
                                <div className='flex gap-4'>
                                  <div className='w-1/2'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                      First Name
                                    </label>
                                    <input
                                  onChange={handleInputChange} 
                                   
                                      id="firstName"
                                      name="firstName"
                                      type="text"
                                      required
                                      className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                    />
                                  </div>
                                  <div className='w-1/2'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                      Last Name
                                    </label>
                                    <input
                                  onChange={handleInputChange} 
                                 
                                      id="lastName"
                                      name="lastName"
                                      type="text"
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
                                  onChange={handleInputChange} 
                                  
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone Number
                                  </label>
                                  <input
                                  onChange={handleInputChange} 
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Designation
                                  </label>
                                  <input
                                  onChange={handleInputChange} 
                                    id="designation"
                                    name="designation"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                  </label>
                                  <input
                                  onChange={handleInputChange} 
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h2 className='font-semibold border-[#EDEDED] border-b-2 p-4 mt-5'>Office Information</h2>

                              <div className='flex flex-col gap-4 py-6'>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Panchayat Name
                                  </label>
                                  <input
                                  onChange={handleInputChange} 
                                    id="panchayatName"
                                    name="panchayatName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                                <div className='flex gap-4'>
                                  <div className='w-1/2'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                      State
                                    </label>
                                    <input
                                  onChange={handleInputChange} 
                                      id="state"
                                      name="state"
                                      type="text"
                                      required
                                      className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                    />
                                  </div>
                                  <div className='w-1/2'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                      City
                                    </label>
                                    <input
                                  onChange={handleInputChange} 
                                      id="city"
                                      name="city"
                                      type="text"
                                      required
                                      className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                    />
                                  </div>

                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Office Address
                                  </label>
                                  <input
                                  onChange={handleInputChange} 
                                    id="officeAddress"
                                    name="officeAddress"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                                <button
                                  onClick={handlePanchayatS1}
                                  type='button'
                                  className="flex w-[250px] justify-center rounded-md bg-[#f5705e] p-4  text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (


                      <div>

                        <>
                          <p className='text-center text-2xl font-bold my-12'>Document Upload</p>
                          <div className='w-[60vw] rounded-xl border-[#EDEDED] border-2 '>

                            <div  >
                              <p className='font-semibold text-2xl border-[#EDEDED] border-b-2 p-6 px-8 m-0'>Verify Your Identity</p>
                            </div>

                            <div className='p-8 flex flex-col '>

                              <p className='text-[#727476] font-normal'>Upload the required documents to verify your identity and Panchayat affiliation.</p>
                              <div>


                                <div className='flex flex-col gap-4 py-6'>
                                  <div className='flex gap-4'>
                                    <div className='w-1/2'>
                                      <div className=' border-[#EDEDED] border-b-2 '>
                                        <h2 className='font-semibold  text-xl p-4 mt-5'>Address Proof</h2>
                                        <p className='text-[#727476]  p-4 font-normal'>eg: bill, Aadhar card.</p>
                                      </div>
                                      <div className='flex flex-col items-center justify-center gap-8 border-[#CACACA] border-dashed border-[1.23px] rounded-lg   py-8'>

                                        <img src={file2} />
                                        <div className='flex flex-col gap-2 justify-center '>
                                          <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                                          <p className='text-[#727476] font-normal text-center'> (Max. File size: 25 MB)</p>
                                          <input
                                    type="file" className=' text-center' onChange={handleImgChange2} />
                                        </div>

                                      </div>
                                    </div>
                                    <div className='w-1/2'>
                                      <div className=' border-[#EDEDED] border-b-2 '>
                                        <h2 className='font-semibold   text-xl p-4 mt-5'>Identity Proof</h2>
                                        <p className='text-[#727476]  p-4 font-normal'>e.g., Aadhaar Card, Voter ID</p>
                                      </div>
                                      <div className='flex flex-col items-center justify-center gap-8 border-[#CACACA] border-dashed border-[1.23px] rounded-lg   py-8'>

                                        <img src={file2} />
                                        <div className='flex flex-col gap-2 justify-center '>
                                          <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                                          <p className='text-[#727476] font-normal text-center'> (Max. File size: 25 MB)</p>
                                          <input
                                    type="file" className=' text-center' onChange={handleImgChange2} />
                                        </div>

                                      </div>
                                    </div>

                                  </div>

                                </div>
                                <div className='flex flex-col gap-4 py-6'>
                                  <div className='flex gap-4'>
                                    <div className='w-1/2'>
                                      <div className=' border-[#EDEDED] border-b-2 '>
                                        <h2 className='font-semibold  text-xl p-4 mt-5'>Panchayat Resolution</h2>
                                        <p className='text-[#727476]  p-4 font-normal'>(if applicable)</p>
                                      </div>
                                      <div className='flex flex-col items-center justify-center gap-8 border-[#CACACA] border-dashed border-[1.23px] rounded-lg   py-8'>

                                        <img src={file2} />
                                        <div className='flex flex-col gap-2 justify-center '>
                                          <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                                          <p className='text-[#727476] font-normal text-center'> (Max. File size: 25 MB)</p>
                                          <input
                                    type="file" className=' text-center' onChange={handleImgChange2} />
                                        </div>

                                      </div>
                                    </div>


                                  </div>

                                </div>
                                
                              </div>
                              <button
                                  onClick={handlePanchayatS1}
                                  type='submit'
                                  className="flex w-[250px] justify-center rounded-md bg-[#f5705e] p-4  text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end"
                                >
                                  Submit
                                </button>
                            </div>
                            
                          </div>
                        </>

                      </div>


                    )}


                  </form>
                </>

              ) : (
                <form  >

                    {!PanchayatS1 ? (
                      <>
                        <p className='text-center text-2xl font-bold my-12'>Government Official Registration</p>
                        <div className='w-[60vw] rounded-xl border-[#EDEDED] border-2 '>

                          <div  >
                            <p className='font-semibold text-2xl border-[#EDEDED] border-b-2 p-6 px-8 m-0'>Profile</p>
                          </div>

                          <div className='p-8'>

                            <div className='flex gap-8'>
                              <img src={file} className='rounded-full w-[110px] h-[110px] ' />
                              <div className='flex flex-col gap-2'>
                                <h2 className='font-semibold'>Add Profile Picture</h2>
                                <p className='text-[#727476] font-normal'>upload (.jpg, .jpeg, .png) file</p>
                                <input
                                    type="file" onChange={handleImgChange} />
                              </div>

                            </div>
                            <div>
                              <h2 className='font-semibold border-[#EDEDED] border-b-2 p-4 mt-5'>Personal Information</h2>

                              <div className='flex flex-col gap-4 py-6'>
                                <div className='flex gap-4'>
                                  <div className='w-1/2'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                      First Name
                                    </label>
                                    <input
                                  onChange={handleInputChange} 
                                   
                                      id="firstName"
                                      name="firstName"
                                      type="text"
                                      required
                                      className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                    />
                                  </div>
                                  <div className='w-1/2'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                      Last Name
                                    </label>
                                    <input
                                  onChange={handleInputChange} 
                                 
                                      id="lastName"
                                      name="lastName"
                                      type="text"
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
                                  onChange={handleInputChange} 
                                  
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Phone Number
                                  </label>
                                  <input
                                  onChange={handleInputChange} 
                                    id="phoneNumber"
                                    name="phoneNumber"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Designation
                                  </label>
                                  <input
                                  onChange={handleInputChange} 
                                    id="designation"
                                    name="designation"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Address
                                  </label>
                                  <input
                                  onChange={handleInputChange} 
                                    id="address"
                                    name="address"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                              </div>
                            </div>
                            <div>
                              <h2 className='font-semibold border-[#EDEDED] border-b-2 p-4 mt-5'>Office Information</h2>

                              <div className='flex flex-col gap-4 py-6'>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Office Name
                                  </label>
                                  <input
                                  onChange={handleInputChange} 
                                    id="panchayatName"
                                    name="panchayatName"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                                <div className='flex gap-4'>
                                  <div className='w-1/2'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                      State
                                    </label>
                                    <input
                                  onChange={handleInputChange} 
                                      id="state"
                                      name="state"
                                      type="text"
                                      required
                                      className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                    />
                                  </div>
                                  <div className='w-1/2'>
                                    <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                      City
                                    </label>
                                    <input
                                  onChange={handleInputChange} 
                                      id="city"
                                      name="city"
                                      type="text"
                                      required
                                      className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                    />
                                  </div>

                                </div>
                                <div>
                                  <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Office Address
                                  </label>
                                  <input
                                  onChange={handleInputChange} 
                                    id="officeAddress"
                                    name="officeAddress"
                                    type="text"
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-lg mt-2  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset  sm:leading-6 bg-[#fff]"
                                  />
                                </div>
                                <button
                                  onClick={handlePanchayatS1}
                                  type='button'
                                  className="flex w-[250px] justify-center rounded-md bg-[#f5705e] p-4  text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end"
                                >
                                  Next
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (


                      <div>

                        <>
                          <p className='text-center text-2xl font-bold my-12'>Document Upload</p>
                          <div className='w-[60vw] rounded-xl border-[#EDEDED] border-2 '>

                            <div  >
                              <p className='font-semibold text-2xl border-[#EDEDED] border-b-2 p-6 px-8 m-0'>Verify Your Identity</p>
                            </div>

                            <div className='p-8 flex flex-col '>

                              <p className='text-[#727476] font-normal'>Upload the required documents to verify your identity and affiliation.</p>
                              <div>


                                <div className='flex flex-col gap-4 py-6'>
                                  <div className='flex gap-4'>
                                    <div className='w-1/2'>
                                      <div className=' border-[#EDEDED] border-b-2 '>
                                        <h2 className='font-semibold  text-xl p-4 mt-5'>Address Proof</h2>
                                        <p className='text-[#727476]  p-4 font-normal'>eg: bill, Aadhar card.</p>
                                      </div>
                                      <div className='flex flex-col items-center justify-center gap-8 border-[#CACACA] border-dashed border-[1.23px] rounded-lg   py-8'>

                                        <img src={file2} />
                                        <div className='flex flex-col gap-2 justify-center '>
                                          <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                                          <p className='text-[#727476] font-normal text-center'> (Max. File size: 25 MB)</p>
                                          <input
                                    type="file" className=' text-center' onChange={handleImgChange2} />
                                        </div>

                                      </div>
                                    </div>
                                    <div className='w-1/2'>
                                      <div className=' border-[#EDEDED] border-b-2 '>
                                        <h2 className='font-semibold   text-xl p-4 mt-5'>Identity Proof</h2>
                                        <p className='text-[#727476]  p-4 font-normal'>e.g., Aadhaar Card, Voter ID</p>
                                      </div>
                                      <div className='flex flex-col items-center justify-center gap-8 border-[#CACACA] border-dashed border-[1.23px] rounded-lg   py-8'>

                                        <img src={file2} />
                                        <div className='flex flex-col gap-2 justify-center '>
                                          <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                                          <p className='text-[#727476] font-normal text-center'> (Max. File size: 25 MB)</p>
                                          <input
                                    type="file" className=' text-center' onChange={handleImgChange2} />
                                        </div>

                                      </div>
                                    </div>

                                  </div>

                                </div>
                                <div className='flex flex-col gap-4 py-6'>
                                  <div className='flex gap-4'>
                                    <div className='w-1/2'>
                                      <div className=' border-[#EDEDED] border-b-2 '>
                                        <h2 className='font-semibold  text-xl p-4 mt-5'>Panchayat Resolution</h2>
                                        <p className='text-[#727476]  p-4 font-normal'>(if applicable)</p>
                                      </div>
                                      <div className='flex flex-col items-center justify-center gap-8 border-[#CACACA] border-dashed border-[1.23px] rounded-lg   py-8'>

                                        <img src={file2} />
                                        <div className='flex flex-col gap-2 justify-center '>
                                          <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                                          <p className='text-[#727476] font-normal text-center'> (Max. File size: 25 MB)</p>
                                          <input
                                    type="file" className=' text-center' onChange={handleImgChange2} />
                                        </div>

                                      </div>
                                    </div>


                                  </div>

                                </div>
                                
                              </div>
                              <button
                                  onClick={handlePanchayatS1}
                                  type='submit'
                                  className="flex w-[250px] justify-center rounded-md bg-[#f5705e] p-4  text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end"
                                >
                                  Submit
                                </button>
                            </div>
                            
                          </div>
                        </>

                      </div>


                    )}


                  </form>
              )}
              <div>
              </div>
            </div>
          </div>
        )}

      </div>


    </div>
  )
}

export default Register;
