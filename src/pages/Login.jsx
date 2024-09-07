import { useState } from 'react';
import image from '../assets/soach .png'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import saly from "../assets/Saly-10.png"
import PasswordReset from '../components/PasswordReset'
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const baseUrl = "https://vfgabackend.soachglobal.com";
const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const options = [
    { id: '0', value: 'panchayat', label: 'Panchayat' },
    { id: '1', value: '1', label: 'Official' },
  ];
  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      setSelectedDesignation(selectedOption);
  
      if (!email.trim() || !password.trim() || !selectedDesignation) {
        toast.error('Email, Password, and Designation cannot be empty');
        setLoading(false);
        return;
      }
  
      const raw = JSON.stringify({
        email: email.trim(),
        password: password.trim(),
      });
  
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
  
      let response;
  
      if (selectedOption === "panchayat") {
        response = await fetch(`${baseUrl}/api/auth/panchayat/login`, requestOptions);
      } else {
        response = await fetch(`${baseUrl}/api/auth/official/login`, requestOptions);
      }
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        toast.error(`Login failed: ${errorData.message || 'Invalid Credentials, Try Again'}`);
        setLoading(false);
        return;
      }
  
      const responseData = await response.json();
  
      if (responseData.token) {
        localStorage.setItem('vgfatoken', responseData.token);
        toast.success('Login Successful');
        await new Promise((resolve) => setTimeout(resolve, 4000));
        window.location.href = '/dashboard';
      } else {
        toast.error("Invalid Credentials, Try Again");
      }
    } catch (error) {
      console.error('An error occurred:', error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  
  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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



                {/*  */}
                <div>
                  <div className="mt-2 w-[80rem] ">
                    {/* <select
                      id="options"
                      value={selectedOption}
                      onChange={handleOptionChange}
                      className="block w-[500px] bg-[#fff] rounded-md border-0 p-4  text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
                    >
                      <option value="">Select an option</option>
                      <option value="panchayat">Panchayat</option>
                      <option value="official">Government Official</option>
                    </select> */}


                    <div className="relative select-box mx-0 mb-4 rounded-lg">
                      <div
                        className="select-box__current rounded-lg"
                        tabIndex="1"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <div className="select-box__value p-2 text-lg">
                          {selectedOption ? (

                            options.find(option => option.value === selectedOption)?.label
                            
                          ) : (
                            'Select an Option'
                          )}
                        </div>
                        <img
                          className="select-box__icon"
                          src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
                          alt="Arrow Icon"
                          aria-hidden="true"
                        />
                      </div>
                      <ul className={`select-box__list ${isOpen ? 'show' : ''}`}>
                        {options.map(option => (
                          <li key={option.id}>
                            <label
                              className="select-box__option"
                              htmlFor={option.id}
                              onClick={() => handleOptionChange(option.value)}
                            >
                              {option.label}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>




                  </div>
                </div>

                {/*  */}
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
                <p htmlFor="email" onClick={handleShow} className="block text-sm float-end mt-4 mb-12 underline font-medium leading-6 text-[#9C9AA5]">
                  Forgot Password ?
                </p>

                <PasswordReset show={show} handleClose={handleClose} />
              </div>

              <div>
                <button
                  type="submit"
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex w-full justify-center rounded-md bg-[#f5705e] p-3  text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end"
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
