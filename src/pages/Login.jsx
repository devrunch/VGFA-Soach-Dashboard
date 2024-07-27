import { useState } from 'react';
import image from '../assets/soach .png'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import saly from "../assets/Saly-10.png"

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const baseUrl = "https://vfgabackend.outhad.com/api/";
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e) => {

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

    let response = await fetch(baseUrl + "auth/official/login", requestOptions)
    response = await response.json()
    if (response.token) {
      localStorage.setItem('vgfatoken', response.token)
      toast.success('Login Successful')
      await new Promise((resolve) => setTimeout(resolve, 4000))
      window.location.href = '/dashboard'
      
    }
    else
      toast.error("Invalid Credentials,Try Again")
      setLoading(false)

  }
  return (
    <div className='flex h-screen p-8'>
      
      <div className="flex min-h-full h-[95vh] flex-1 flex-col justify-around px-6  lg:px-8">
      
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src={image}
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-3xl font-medium leading-9 tracking-tight text-gray-900 ml-[-40px]">
            Log - in
          </h2>
       

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">
            <div>
              <label htmlFor="email" className="block text-base font-medium leading-6 text-[#5F5F5F]">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 pl-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-base font-medium leading-6 text-[#5F5F5F]">
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
              <p htmlFor="email" className="block text-sm float-end mt-4 mb-12 underline font-medium leading-6 text-[#9C9AA5]">
                Forgot Password ?
              </p>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSubmit}
                disabled={loading}
                 className="flex w-full justify-center rounded-md bg-[#f5705e] p-4  text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end"
              >
                Log-in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-base text-gray-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold leading-6 mx-1 text-[#e74b36] hover:text-indigo-500">
              Register
            </Link>
          </p>
        </div>
      </div>
      
      <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
        <p className="block text-sm float-end mt-4 mb-12 font-medium leading-6 text-[#9C9AA5] text-center">
        By signing up to create an account I accept Company’s
        <span className='text-black text-center'> Terms of use & Privacy Policy.</span>
        </p>
      </div>
      </div>
    
      
    </div>
  )
}

export default Login
