import React, { useState } from 'react';

function PasswordReset({ show, handleClose }) {
    const [resetEmail, setResetEmail] = useState('');
    const [submittedEmail, setSubmittedEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    };

    const handleEmailResetSubmit = () => {
        if (validateEmail(resetEmail)) {
            setSubmittedEmail(resetEmail);
            setErrorMessage('');
        } else {
            setErrorMessage('Please enter a valid email address.');
        }
    };

    return (
        <div className={`fixed poppins-medium inset-0 flex items-center justify-center bg-black bg-opacity-50 ${show ? 'block' : 'hidden'}`}>
            {!submittedEmail ? (
                <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-2xl">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h5 className="text-lg font-medium">Forgot Password?</h5>
                        <button className="text-gray-500 hover:text-gray-700 text-3xl" onClick={handleClose}>
                            &times;
                        </button>
                    </div>
                    <div className="p-8">
                        Enter your registered email address to reset your password.
                    </div>
                    <div className='pl-12 pr-16 pt-2 pb-6'>
                        <label htmlFor="email" className="block text-base font-medium leading-6">
                            E-mail Address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={resetEmail}
                                onChange={(e) => setResetEmail(e.target.value)}
                                autoComplete="email"
                                placeholder='Enter email'
                                required
                                className="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 bg-[#F9FAFB] focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            {errorMessage && (
                                <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-end p-4">
                        <button
                            className="flex w-[180px] justify-center rounded-md bg-[#f5705e] p-3 text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end mx-12 mb-4"
                            onClick={handleEmailResetSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            ) : (
                <div className="bg-white rounded-xl shadow-lg w-11/12 max-w-2xl">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200">
                        <h5 className="text-lg font-medium">Password Reset Link Sent</h5>
                        <button className="text-gray-500 hover:text-gray-700 text-3xl" onClick={handleClose}>
                            &times;
                        </button>
                    </div>
                    <div className="p-8 pb-0 text-2xl font-bold text-center">
                        Check Your E-mail
                    </div>
                    <div className="p-8 text-center text-[#868484]">
                        A password reset link has been sent to your registered email address. Please check your inbox and follow the instructions.
                    </div>
                    <div className="flex items-center justify-end p-4">
                        <button
                            className="flex w-full justify-center rounded-md bg-[#f5705e] p-3 text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end mx-12 mb-4"
                            onClick={()=>{handleClose();  setSubmittedEmail('')}}
                        >
                            Back To Login
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default PasswordReset;
