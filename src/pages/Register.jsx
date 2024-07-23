import { useState } from 'react'
import image from '../assets/soach .png'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import saly from "../assets/Saly-10.png"

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const baseUrl = "https://vfgabackend.outhad.com/api/";
const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async(e) => {

    e.preventDefault()
    setLoading(true)
    const raw = JSON.stringify({
      "email": email,
      "password": password
    });
    
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    let response = await fetch(baseUrl + "auth/official/register", requestOptions)
    if(response.status === 200){
      toast.success('User registered successfully')
      toast.success("Please Login With your Credetials")
      await new Promise((resolve) => setTimeout(resolve, 4000))
      navigate('/login')
    }
    response =  await response.json()
    toast.error("Invalid Credentials")
    setLoading(false)


  }
  return (
    <div className='flex h-screen p-8'>
      <div className='w-[50vw]'>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={image}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
           Register your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
                
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-[#000842] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already a member?{' '}
            <Link to="/" className="font-semibold leading-6 text-[#000842] hover:text-indigo-500">
              Login here
            </Link>
          </p>
        </div>
      </div>
      </div>
      <div className='bg-[#000842] w-[50vw] rounded-xl flex flex-col text-white gap-24 p-36 justify-around items-center'>
        <img src={saly} alt="" />
        <p className='text-xl text-center'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat officiis in nam provident, excepturi porro accusamus debitis veritatis beatae dolores deleniti. Maiores perspiciatis sequi facere consequuntur ad. Neque, quo eveniet.</p>
      </div>

    </div>
  )
}

export default Register
