/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { toast } from 'react-toastify';
const baseUrl = "https://vfgabackend.soachglobal.com/api/";
const state = ["NEW", "APPROVED BY PANCHAYAT", "APPROVED BY GOVERNMENT", "APPROVED", "DISAPPROVED"];
const Table = ({ data, fetchData }) => {
    const [selectedForm, setSelectedForm] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isDisapproving, setIsDisapproving] = useState(false);
    const [remark, setRemark] = useState('');

    const openModal = (form) => {
        setSelectedForm(form);
        setIsOpen(true);
    };

    const closeModal = () => {
        setSelectedForm(null);
        setIsOpen(false);
        setIsDisapproving(false);
        setRemark('');
    };

    const approveForm = async () => {
        const raw = JSON.stringify({
            id: selectedForm._id,
            isDisapproved: false,
        });


        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('vgfatoken'),
            },
            body: raw,
            redirect: "follow"
        };
        const response = await fetch(baseUrl + "forms/update", requestOptions)
        closeModal();
        if (response.status === 200) {
            toast.success('Form Approved');
        }
        else {
            toast.error('Some Error Occured');
        }

        fetchData();
    };

    const disapproveForm = () => {
        setIsDisapproving(true);
    };

    const submitDisapproval = async () => {
        // Implement your disapproval logic here with the remark
        const raw = JSON.stringify({
            "id": selectedForm._id,
            "isDisapproved": true,
            "remarks": remark
        });

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('vgfatoken'),
            },
            body: raw,
            redirect: "follow"
        };

        const response = await fetch(baseUrl + "forms/update", requestOptions)
        if (response.status === 200) {
            toast.success('Form Disapproved');
        }
        else {
            toast.error('Some Error Occured');
        }
        closeModal();
        toast.success('Form Disapproved');
        fetchData();
    };

    return (
        <div className='w-[76%] '>
            {data && (
                <div className="relative overflow-x-auto shadow-lg">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                        <thead className="text-xs text-gray-900 uppercase  bg-[#FCF2E8]">
                            <tr className='border-b border-red-300'>
                                <th scope="col" className="px-6 py-3  border-r border-red-300">Farmer name</th>
                                <th scope="col" className="px-6 py-3  border-r border-red-300">Crops</th>
                                <th scope="col" className="px-6 py-3  border-r border-red-300">VGFA Units</th>
                                <th scope="col" className="px-6 py-3  border-r border-red-300">Land Area Owned</th>
                                <th scope="col" className="px-6 py-3  border-r border-red-300">Status</th>
                                <th scope="col" className="px-6 py-3  border-r border-red-300">Date Applied</th>
                                <th scope="col" className="px-6 py-3 ">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 && data.map((form) => (
                                <tr key={form._id} className="bg-white border-b border-red-300 text-gray-900">
                                    <td scope="row" className="px-6 py-4 font-medium whitespace-nowrap border-r border-red-300">
                                        {form.farmer ? (<>
                                        <div className='flex items-center gap-x-2 '>
                                            <img src={form.farmer.imageUrl} alt="" className='w-8 h-8 object-cover rounded-full' />
                                            <p>
                                                {form.farmer.first_name + " " + form.farmer.last_name}
                                            </p>
                                        </div>
                                        </>) : 'N/A'}
                                    </td>
                                    <td className="px-6 py-4 border-r border-red-300">{form.cropType}</td>
                                    <td className="px-6 py-4 border-r border-red-300">{form.vgfaUnitEq}</td>
                                    <td className="px-6 py-4 border-r border-red-300">{form.landArea}</td>
                                    <td className="px-6 py-4 border-r border-red-300">{state[form.state]}</td>
                                    <td className="px-6 py-4 border-r border-red-300">{form.createdAt ? new Date(form.createdAt).toLocaleDateString() : 'N/A'}</td>
                                    <td className="px-6 py-4">
                                        <button
                                            className="text-blue-600 hover:underline"
                                            onClick={() => openModal(form)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedForm && (
                <Dialog
                    open={isOpen}
                    onClose={closeModal}
                    className="fixed z-10 inset-0 overflow-y-auto"
                >
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 bg-black opacity-30" aria-hidden="true"></div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className='text-1xl font-bold text-center py-2 or-gradient2 text-gray-100 '>
                                Approve VGFA Request
                            </div>
                            <div className="bg-white p-6">
                                <h2 className="text-2xl font-semibold mb-6">Form Details</h2>
                                <div className="space-y-4">
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <span className="font-medium text-gray-700">Farmer:</span>
                                        <span className="text-gray-900">{selectedForm?.farmer ? `${selectedForm.farmer.first_name} ${selectedForm.farmer.last_name}` : 'N/A'}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <span className="font-medium text-gray-700">Crop Type:</span>
                                        <span className="text-gray-900">{selectedForm?.cropType}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <span className="font-medium text-gray-700">Land Area:</span>
                                        <span className="text-gray-900">{selectedForm?.landArea}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <span className="font-medium text-gray-700">VGFA Units:</span>
                                        <span className="text-gray-900">{selectedForm?.vgfaUnitEq}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                        <span className="font-medium text-gray-700">Date Applied:</span>
                                        <span className="text-gray-900">{selectedForm?.createdAt ? new Date(selectedForm.createdAt).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                </div>

                                {isDisapproving ? (
                                    <div className="mt-4">
                                        <textarea
                                            className="w-full p-2 border border-gray-300 rounded-md"
                                            rows="4"
                                            placeholder="Enter your remarks"
                                            value={remark}
                                            onChange={(e) => setRemark(e.target.value)}
                                        ></textarea>
                                        <div className="mt-4 flex justify-end space-x-4">
                                            <button
                                                className="bg-red-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600"
                                                onClick={submitDisapproval}
                                            >
                                                Submit
                                            </button>
                                            <button
                                                className="bg-gray-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-gray-600"
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="mt-6 flex justify-end space-x-4">
                                        <button
                                            className="bg-amber-400 text-white px-4 py-2 rounded transition duration-300 hover:bg-amber-600"
                                            onClick={approveForm}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-red-600"
                                            onClick={disapproveForm}
                                        >
                                            Disapprove
                                        </button>
                                        <button
                                            className="bg-gray-500 text-white px-4 py-2 rounded transition duration-300 hover:bg-gray-600"
                                            onClick={closeModal}
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Dialog>
            )}
        </div>
    );
};

export default Table;
