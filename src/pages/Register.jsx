import { useState } from 'react'
import image from '../assets/soach.png'
import uploadimg from '../assets/uploadimg.png'
import uploadimg2 from '../assets/uploadimg2.png'
import document from '../assets/document-text.png'
import tick from '../assets/tick-circle.png'
import '../css/style.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useDropzone } from 'react-dropzone';

const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
const baseUrl = "https://vfgabackend.outhad.com/api/";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDesignation, setSelectedDesignation] = useState('');
  const [PanchayatS1, setPanchayatS1] = useState(false);

  const [file, setFile] = useState(uploadimg);
  const [file2, setFile2] = useState(uploadimg2);

  const [addressProof, setAddressProof] = useState(null);
const [identityProof, setIdentityProof] = useState(null);
const [panchayatResolution, setPanchayatResolution] = useState(null);

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


   const [acceptedFilesAddress, setAcceptedFilesAddress] = useState([]);
   const [acceptedFilesIdentity, setAcceptedFilesIdentity] = useState([]);
   const [acceptedFilesResolution, setAcceptedFilesResolution] = useState([]);
 
   const { getRootProps: getRootPropsAddress, getInputProps: getInputPropsAddress } = useDropzone({
     onDrop: (acceptedFiles) => setAcceptedFilesAddress(acceptedFiles),
   });
 
   const { getRootProps: getRootPropsIdentity, getInputProps: getInputPropsIdentity } = useDropzone({
     onDrop: (acceptedFiles) => setAcceptedFilesIdentity(acceptedFiles),
   });
 
   const { getRootProps: getRootPropsResolution, getInputProps: getInputPropsResolution } = useDropzone({
     onDrop: (acceptedFiles) => setAcceptedFilesResolution(acceptedFiles),
   });
 
   
   const filesAddress = acceptedFilesAddress.map(file => (
     <li key={file.path}>
       <p>{file.path}</p>
       <p className='text-[#727476]'>{file.size} bytes</p>
     </li>
   ));
 
   const filesIdentity = acceptedFilesIdentity.map(file => (
     <li key={file.path}>
       <p>{file.path}</p>
       <p className='text-[#727476]'>{file.size} bytes</p>
     </li>
   ));
 
   const filesResolution = acceptedFilesResolution.map(file => (
     <li key={file.path}>
       <p>{file.path}</p>
       <p className='text-[#727476]'>{file.size} bytes</p>
     </li>
   ));

  const handlePanchayatSubmit = async (e) => {
    e.preventDefault();
  
   
    const formData = new FormData();
  
    
    formData.append('name', `${formValues.firstName} ${formValues.lastName}`);
    formData.append('phone', `+91${formValues.phoneNumber}`);
    formData.append('email', formValues.email);
    formData.append('password', 'Pass@123');
    formData.append('designation', formValues.designation);
    formData.append('panchayat_name', formValues.panchayatName);
    formData.append('panchayat_samiti', formValues.city);
    formData.append('address_office', formValues.officeAddress);
    formData.append('address_residence', formValues.address);
  
   
    formData.append('profilePicture', file); 
    formData.append('addressProof', addressProof); 
    formData.append('identityProof', identityProof);
    formData.append('panchayatResolution', panchayatResolution); 
  
    try {
      const response = await fetch(`https://vfgabackend.soachglobal.com/api/auth/panchayat/register`, {
        method: 'POST',
        body: formData, // Send the FormData object
      });
  
      const data = await response.json();
      console.log('Status:', data);
      if (data.success) {
        navigate('/success');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  



  const handleOfficialSubmit = async (e) => {
    e.preventDefault();

    const mappedData = {
      name: `${formValues.firstName} ${formValues.lastName}`,
      phone: `+91${formValues.phoneNumber}`,
      email: formValues.email,
      password: "Pass@123", 
      designation: formValues.designation,
      panchayat_name: formValues.panchayatName,
      // panchayat_samiti: formValues.city,
      address_office: formValues.officeAddress,
      address_residence: formValues.address,
      
  };

    try {
      const response = await fetch(`https://vfgabackend.soachglobal.com/api/auth/official/register`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(mappedData)
      });

      const data = await response.json();
      console.log('Status:', data);
      if(data.success){
        navigate('/success');
      }
      else{
        toast.error(data.message);
      }
  } catch (error) {
      console.error('Error:', error);
  }
  };

  const handleOptionChange = (value) => {
    setSelectedOption(value);
    setIsOpen(false);
  };
  const options = [
    { id: '0', value: 'panchayat', label: 'Panchayat' },
    { id: '1', value: '1', label: 'Official' },
  ];

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
      !panchayatName || !state || !officeAddress) {
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

  const stateCityData = {
    'Andhra Pradesh': [
      'Visakhapatnam', 'Vijayawada', 'Tirupati', 'Guntur', 'Kakinada', 'Nellore',
      'Anantapur', 'Chittoor', 'Rajahmundry', 'Eluru', 'Srikakulam', 'Kadapa',
      'Peddapalli', 'Warangal', 'Karimnagar', 'Kakinada', 'Tiruvuru', 'Narsipatnam',
      'Mangalagiri', 'Jangareddygudem'
    ],
    'Arunachal Pradesh': [
      'Itanagar', 'Tawang', 'Ziro', 'Bomdila', 'Naharlagun', 'Tezpur', 'Namsai',
      'Pasighat', 'Yingkiong', 'Along', 'Tirap', 'Changlang', 'Lower Dibang Valley',
      'Upper Siang', 'Upper Subansiri', 'West Kameng', 'East Kameng', 'West Siang'
    ],
    'Assam': [
      'Guwahati', 'Silchar', 'Dibrugarh', 'Jorhat', 'Tezpur', 'Bongaigaon',
      'Nagaon', 'Karimganj', 'Haflong', 'Sivasagar', 'Dhemaji', 'Barpeta',
      'Bilasipara', 'Darrang', 'Hailakandi', 'Kokrajhar', 'Golaghat', 'Tinsukia',
      'Jorhat', 'Dhubri', 'Kamrup'
    ],
    'Bihar': [
      'Patna', 'Gaya', 'Bhagalpur', 'Muzzafarpur', 'Purnia', 'Chapra', 'Arrah',
      'Darbhanga', 'Begusarai', 'Siwan', 'Kishanganj', 'Nalanda', 'Saharsa',
      'Jehanabad', 'Buxar', 'Lakhisarai', 'Aurangabad', 'Katihar', 'Rohtas',
      'Vaishali', 'Banka'
    ],
    'Chhattisgarh': [
      'Raipur', 'Bilaspur', 'Korba', 'Durg', 'Jagdalpur', 'Ambikapur', 'Raigarh',
      'Kawardha', 'Bastar', 'Janjgiri-Champa', 'Dhamtari', 'Balod', 'Kabirdham',
      'Surguja', 'Gariaband', 'Mungeli', 'Janjgir', 'Bemetara', 'Kanker', 'Balrampur'
    ],
    'Goa': [
      'Panaji', 'Margao', 'Vasco da Gama', 'Mapusa', 'Ponda', 'Cortalim', 'Panjim',
      'Quepem', 'Sanguem', 'Bicholim', 'Mormugao', 'Navelim', 'Cortalim', 'Salcete',
      'Pilerne', 'Aldona', 'Benaulim', 'Pale', 'Assagao', 'Arambol'
    ],
    'Gujarat': [
      'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Gandhinagar', 'Jamnagar',
      'Bhuj', 'Junagadh', 'Anand', 'Nadiad', 'Gondal', 'Morbi', 'Dahod', 'Surendranagar',
      'Mehsana', 'Palanpur', 'Vapi', 'Valsad', 'Navsari', 'Bharuch', 'Bharuch', 'Patan'
    ],
    'Haryana': [
      'Gurugram', 'Faridabad', 'Ambala', 'Karnal', 'Hisar', 'Panipat', 'Rohtak',
      'Yamunanagar', 'Sonipat', 'Fatehabad', 'Bhiwani', 'Mahendragarh', 'Sirsa',
      'Jhajjar', 'Panchkula', 'Kurukshetra', 'Jind', 'Kaithal', 'Rewari', 'Gohana'
    ],
    'Himachal Pradesh': [
      'Shimla', 'Manali', 'Dharamshala', 'Kullu', 'Solan', 'Mandi', 'Bilaspur',
      'Hamirpur', 'Nahan', 'Palampur', 'Kangra', 'Jubbal', 'Kasauli', 'Sundernagar',
      'Paonta Sahib', 'Narkand', 'Chamba', 'Dalhousie', 'Rampur', 'Una'
    ],
    'Jharkhand': [
      'Ranchi', 'Jamshedpur', 'Dhanbad', 'Bokaro', 'Hazaribagh', 'Giridih', 'Deoghar',
      'Dumka', 'Chaibasa', 'Koderma', 'Ramgarh', 'Palamu', 'Lohardaga', 'Jamtara',
      'Garhwa', 'Pakur', 'Sahebganj', 'Simdega', 'East Singhbhum', 'West Singhbhum'
    ],
    'Karnataka': [
      'Bengaluru', 'Mysuru', 'Hubli', 'Belagavi', 'Mangalore', 'Shimoga', 'Tumkur',
      'Bidar', 'Gulbarga', 'Raichur', 'Chikmagalur', 'Kolar', 'Davangere', 'Bagalkot',
      'Udupi', 'Hassan', 'Mandya', 'Chitradurga', 'Bijapur', 'Koppal', 'Haveri'
    ],
    'Kerala': [
      'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Malappuram', 'Thrissur', 'Kottayam',
      'Alappuzha', 'Pathanamthitta', 'Kannur', 'Wayanad', 'Palakkad', 'Muvattupuzha',
      'Changanassery', 'Kollam', 'Idukki', 'Ernakulam', 'Cherthala', 'Punalur',
      'Kattappana', 'Kanjirappally', 'Sabarimala'
    ],
    'Madhya Pradesh': [
      'Bhopal', 'Indore', 'Gwalior', 'Ujjain', 'Jabalpur', 'Sagar', 'Ratlam', 'Khargone',
      'Chhindwara', 'Satna', 'Rewa', 'Mandsaur', 'Shivpuri', 'Dewas', 'Khandwa',
      'Harda', 'Burhanpur', 'Guna', 'Tikamgarh', 'Sehore'
    ],
    'Maharashtra': [
      'Mumbai', 'Pune', 'Nagpur', 'Aurangabad', 'Nashik', 'Thane', 'Kolhapur', 'Solapur',
      'Amravati', 'Jalgaon', 'Ratnagiri', 'Satara', 'Latur', 'Osmanabad', 'Akola',
      'Wardha', 'Nanded', 'Parbhani', 'Malegaon', 'Shirdi', 'Sangli'
    ],
    'Manipur': [
      'Imphal', 'Thoubal', 'Churachandpur', 'Bishnupur', 'Senapati', 'Tamenglong',
      'Jiribam', 'Kakching', 'Moreh', 'Kangpokpi', 'Khoupum', 'Noney', 'Tamei',
      'Nungba', 'Pallel', 'Saikul', 'Kumbi', 'Lamlai', 'Chandel', 'Ukhrul'
    ],
    'Meghalaya': [
      'Shillong', 'Tura', 'Jowai', 'Nongstoin', 'Williamnagar', 'Bhoi', 'Ri Bhoi',
      'Mawkyrwat', 'Khliehriat', 'Nongpoh', 'Mairang', 'Baghmara', 'Nongthymmai',
      'Khliehriat', 'Jowai', 'Mawlai', 'Mawlynnong', 'Pynursla', 'Laitumkhrah'
    ],
    'Mizoram': [
      'Aizawl', 'Lunglei', 'Champhai', 'Kolasib', 'Siaha', 'Mamit', 'Serchhip',
      'Lawngtlai', 'Hnahthial', 'Khawzawl', 'Lunglei', 'Saiha', 'Mamit', 'Kolasib',
      'Champhai', 'Aizawl', 'Siaha', 'Serchhip', 'Lawngtlai'
    ],
    'Nagaland': [
      'Kohima', 'Dimapur', 'Mokokchung', 'Wokha', 'Tuensang', 'Mon', 'Phek',
      'Zunheboto', 'Kiphire', 'Longleng', 'Kohima', 'Dimapur', 'Mokokchung',
      'Tuensang', 'Wokha', 'Phek', 'Mon', 'Zunheboto', 'Kiphire', 'Longleng'
    ],
    'Odisha': [
      'Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Balasore',
      'Koraput', 'Baripada', 'Jeypore', 'Kendrapara', 'Angul', 'Dhenkanal', 'Kalahandi',
      'Nabarangpur', 'Rayagada', 'Sundargarh', 'Bargarh', 'Bhawanipatna', 'Balangir',
      'Jajpur', 'Ganjam'
    ],
    'Punjab': [
      'Chandigarh', 'Amritsar', 'Ludhiana', 'Jalandhar', 'Patiala', 'Bathinda',
      'Mohali', 'Moga', 'Hoshiarpur', 'Firozpur', 'Faridkot', 'Rupnagar', 'Sri Muktsar Sahib',
      'Barnala', 'Sangrur', 'Mansa', 'Tarn Taran', 'Pathankot', 'Kapurthala', 'Fatehgarh Sahib'
    ],
    'Rajasthan': [
      'Jaipur', 'Udaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Alwar', 'Sikar',
      'Bhilwara', 'Pali', 'Nagaur', 'Jhunjhunu', 'Chittorgarh', 'Tonk', 'Barmer',
      'Bundi', 'Dausa', 'Ratangarh', 'Sawai Madhopur', 'Jaisalmer', 'Dholpur'
    ],
    'Sikkim': [
      'Gangtok', 'Namchi', 'Pelling', 'Mangan', 'Rangpo', 'Rangbang', 'Singtam',
      'Gyalshing', 'Tadong', 'Martam', 'Yuksom', 'Zuluk', 'Khecheopalri', 'Kalimati',
      'Bokhim', 'Tadong', 'Singtam', 'Khamdong', 'Rongli', 'Lachung'
    ],
    'Tamil Nadu': [
      'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli',
      'Erode', 'Vellore', 'Dindigul', 'Kanchipuram', 'Tiruppur', 'Nagercoil', 'Cuddalore',
      'Karur', 'Nagapattinam', 'Thanjavur', 'Ariyalur', 'Dharmapuri', 'Ramanathapuram',
      'Sivakasi', 'Pollachi'
    ],
    'Telangana': [
      'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Khammam', 'Mahbubnagar',
      'Adilabad', 'Rangareddy', 'Nalgonda', 'Medak', 'Jagtial', 'Jangaon', 'Kamareddy',
      'Nagarkurnool', 'Peddapalli', 'Mahbubabad', 'Wanaparthy', 'Vikarabad', 'Jogulamba Gadwal',
      'Medchal', 'Nirmal'
    ],
    'Tripura': [
      'Agartala', 'Udaipur', 'Ambassa', 'Kailashahar', 'Belonia', 'Dharmanagar',
      'Sonamura', 'Jirania', 'Teliamura', 'Bishalgarh', 'Khowai', 'Sepahijala', 'Unakoti',
      'North Tripura', 'Dhalai', 'West Tripura', 'Kumarghat', 'Radhanagar', 'Bamanchhara',
      'Dhanpur'
    ],
    'Uttar Pradesh': [
      'Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Meerut', 'Ghaziabad', 'Allahabad',
      'Bareilly', 'Moradabad', 'Aligarh', 'Farrukhabad', 'Bijnor', 'Shahjahanpur',
      'Muzaffarnagar', 'Rampur', 'Jansath', 'Amroha', 'Sitapur', 'Azamgarh', 'Gonda',
      'Jhansi'
    ],
    'Uttarakhand': [
      'Dehradun', 'Haridwar', 'Nainital', 'Rishikesh', 'Roorkee', 'Haldwani', 'Udham Singh Nagar',
      'Kashipur', 'Pithoragarh', 'Mussoorie', 'Almora', 'Rudrapur', 'Tehri', 'Ranikhet',
      'Bageshwar', 'Champawat', 'Kotdwar', 'Jaspur', 'Dwarahat', 'Lansdowne'
    ],
    'West Bengal': [
      'Kolkata', 'Siliguri', 'Howrah', 'Asansol', 'Durgapur', 'Kharagpur', 'Burdwan',
      'Malda', 'Jalpaiguri', 'Haldia', 'Kalyani', 'Ranishwar', 'Bankura', 'Purulia',
      'Cooch Behar', 'Jhargram', 'Alipurduar', 'Jangipur', 'Nadia', 'North 24 Parganas',
      'South 24 Parganas'
    ]
  };
  const [selectedState, setSelectedState] = useState('');
  const [cities, setCities] = useState([]);

  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setCities(stateCityData[state] || []);
    setFormValues({
      ...formValues,
      state: state,
      city: '',
    });
    setCities(stateCityData[value] || []);
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


              <div className=" sm:mx-auto sm:w-full flex flex-col items-center justify-center gap-32">
                <div>
                  <div className="mt-2 w-[103rem] ">
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


                    <div className="relative select-box rounded-lg">
                      <div
                        className="select-box__current rounded-lg"
                        tabIndex="1"
                        onClick={() => setIsOpen(!isOpen)}
                      >
                        <div className="select-box__value p-3">
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

                  <form onSubmit={handlePanchayatSubmit} >

                    {!PanchayatS1 ? (
                      <>
                        <p className='text-center text-2xl font-bold my-12'>Panchayat Representative Registration</p>
                        <div className='w-[60vw] rounded-xl border-[#EDEDED] border-2 '>

                          <div  >
                            <p className='font-semibold text-2xl border-[#EDEDED] border-b-2 p-6 px-8 m-0'>Profile</p>
                          </div>

                          <div className='p-8'>

                            <div className='flex gap-8'>
                              <img className='w-[100px] h-[100px] rounded-full' src={file} />
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
                                    <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
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
                                  <select
                                    id="designation"
                                    name="designation"
                                    onChange={handleInputChange}
                                    required
                                    className="block w-full rounded-md border-0 p-3 text-sm mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:leading-6 bg-[#fff]"
                                  >
                                    <option value="">Select Designation</option>
                                    <option value="Panchayat-Pradhan">Panchayat Pradhan</option>
                                    <option value="Panchayat-Secretary">Panchayat Secretary</option>
                                    <option value="Gram-Panchayat-Member">Gram Panchayat Member</option>
                                  </select>
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
                                    <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                      State
                                    </label>
                                    <select
                                      id="state"
                                      name="state"
                                      value={selectedState}
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
      <div className='w-[60vw] rounded-xl border-[#EDEDED] border-2'>
        <div>
          <p className='font-semibold text-2xl border-[#EDEDED] border-b-2 p-6 px-8 m-0'>Verify Your Identity</p>
        </div>
        <div className='p-8 flex flex-col'>
          <p className='text-[#727476] font-normal'>Upload the required documents to verify your identity and Panchayat affiliation.</p>
          <div>
            <div className='flex flex-col gap-4 py-6'>
              <div className='flex gap-4'>
                <div className='w-1/2'>
                  <div className='border-[#EDEDED] border-b-2'>
                    <h2 className='font-semibold text-xl p-4 mt-5'>Address Proof</h2>
                    <p className='text-[#727476] p-4 font-normal'>e.g: bill, Aadhar card.</p>
                  </div>
                  <div {...getRootPropsAddress({ className: 'dropzone' })}>
                    <input {...getInputPropsAddress()} />
                    {acceptedFilesAddress.length === 0 ? (
                      <div className='h-[20vh] flex flex-col items-center justify-center gap-4'>
                        <img className='w-14' src={file2} alt="Upload" />
                        <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                        <p className='text-[#727476] font-normal text-center'>(Max. File size: 25 MB)</p>
                      </div>
                    ) : (
                      <div className='w-full'>
                        <aside className='flex justify-around w-full items-stretch'>
                          <div>
                            <img src={document} alt="Document" />
                          </div>
                          <div>
                            <ul className='font-medium'>
                              {filesAddress}
                            </ul>
                          </div>
                          <div>
                            <img src={tick} alt="Document" />
                          </div>
                        </aside>
                        <div className="w-full rounded-full h-6 flex items-center mt-4">
                          <div className="bg-green-500 h-2 rounded-full flex items-center justify-end px-2 text-white font-semibold" style={{ width: '100%' }}></div>
                          <span className="ml-2">100%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='w-1/2'>
                  <div className='border-[#EDEDED] border-b-2'>
                    <h2 className='font-semibold text-xl p-4 mt-5'>Identity Proof</h2>
                    <p className='text-[#727476] p-4 font-normal'>e.g., Aadhaar Card, Voter ID</p>
                  </div>
                  <div {...getRootPropsIdentity({ className: 'dropzone' })}>
                    <input {...getInputPropsIdentity()} />
                    {acceptedFilesIdentity.length === 0 ? (
                      <div className='h-[20vh] flex flex-col items-center justify-center gap-4'>
                        <img className='w-14' src={file2} alt="Upload" />
                        <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                        <p className='text-[#727476] font-normal text-center'>(Max. File size: 25 MB)</p>
                      </div>
                    ) : (
                      <div className='w-full'>
                        <aside className='flex justify-around w-full items-stretch'>
                          <div>
                            <img src={document} alt="Document" />
                          </div>
                          <div>
                            <ul className='font-medium'>
                              {filesIdentity}
                            </ul>
                          </div>
                          <div>
                            <img src={tick} alt="Document" />
                          </div>
                        </aside>
                        <div className="w-full rounded-full h-6 flex items-center mt-4">
                          <div className="bg-green-500 h-2 rounded-full flex items-center justify-end px-2 text-white font-semibold" style={{ width: '100%' }}></div>
                          <span className="ml-2">100%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 py-6'>
              <div className='flex gap-4'>
                <div className='w-1/2'>
                  <div className='border-[#EDEDED] border-b-2'>
                    <h2 className='font-semibold text-xl p-4 mt-5'>Panchayat Resolution</h2>
                    <p className='text-[#727476] p-4 font-normal'>(if applicable)</p>
                  </div>
                  <div {...getRootPropsResolution({ className: 'dropzone' })}>
                    <input {...getInputPropsResolution()} />
                    {acceptedFilesResolution.length === 0 ? (
                      <div className='h-[20vh] flex flex-col items-center justify-center gap-4'>
                        <img className='w-14' src={file2} alt="Upload" />
                        <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                        <p className='text-[#727476] font-normal text-center'>(Max. File size: 25 MB)</p>
                      </div>
                    ) : (
                      <div className='w-full'>
                        <aside className='flex justify-around w-full items-stretch'>
                          <div>
                            <img src={document} alt="Document" />
                          </div>
                          <div>
                            <ul className='font-medium'>
                              {filesResolution}
                            </ul>
                          </div>
                          <div>
                            <img src={tick} alt="Document" />
                          </div>
                        </aside>
                        <div className="w-full rounded-full h-6 flex items-center mt-4">
                          <div className="bg-green-500 h-2 rounded-full flex items-center justify-end px-2 text-white font-semibold" style={{ width: '100%' }}></div>
                          <span className="ml-2">100%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handlePanchayatS1}
            type='submit'
            className="flex w-[250px] justify-center rounded-md bg-[#f5705e] p-4 text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end"
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
                <form onSubmit={handleOfficialSubmit} >

                  {!PanchayatS1 ? (
                    <>
                      <p className='text-center text-2xl font-bold my-12'>Government Official Registration</p>
                      <div className='w-[60vw] rounded-xl border-[#EDEDED] border-2 '>

                        <div  >
                          <p className='font-semibold text-2xl border-[#EDEDED] border-b-2 p-6 px-8 m-0'>Profile</p>
                        </div>

                        <div className='p-8'>

                          <div className='flex gap-8'>
                            <img src={file} className='rounded-full w-[100px] h-[100px] ' />
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
                                <label htmlFor="designation" className="block text-sm font-medium leading-6 text-gray-900">
                                  Designation
                                </label>
                                <select
                                  id="designation"
                                  name="designation"
                                  onChange={handleInputChange}
                                  required
                                  className="block w-full rounded-md border-0 p-3 text-sm mt-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:leading-6 bg-[#fff]"
                                >
                                  <option value="">Select Designation</option>
                                  <option value="VDO">VDO</option>
                                  <option value="BDO">BDO</option>
                                </select>
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
                                  <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                                    State
                                  </label>
                                  <select
                                    id="state"
                                    name="state"
                                    value={selectedState}
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
      <div className='w-[60vw] rounded-xl border-[#EDEDED] border-2'>
        <div>
          <p className='font-semibold text-2xl border-[#EDEDED] border-b-2 p-6 px-8 m-0'>Verify Your Identity</p>
        </div>
        <div className='p-8 flex flex-col'>
          <p className='text-[#727476] font-normal'>Upload the required documents to verify your identity and Panchayat affiliation.</p>
          <div>
            <div className='flex flex-col gap-4 py-6'>
              <div className='flex gap-4'>
                <div className='w-1/2'>
                  <div className='border-[#EDEDED] border-b-2'>
                    <h2 className='font-semibold text-xl p-4 mt-5'>Address Proof</h2>
                    <p className='text-[#727476] p-4 font-normal'>e.g: bill, Aadhar card.</p>
                  </div>
                  <div {...getRootPropsAddress({ className: 'dropzone' })}>
                    <input {...getInputPropsAddress()} />
                    {acceptedFilesAddress.length === 0 ? (
                      <div className='h-[20vh] flex flex-col items-center justify-center gap-4'>
                        <img className='w-14' src={file2} alt="Upload" />
                        <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                        <p className='text-[#727476] font-normal text-center'>(Max. File size: 25 MB)</p>
                      </div>
                    ) : (
                      <div className='w-full'>
                        <aside className='flex justify-around w-full items-stretch'>
                          <div>
                            <img src={document} alt="Document" />
                          </div>
                          <div>
                            <ul className='font-medium'>
                              {filesAddress}
                            </ul>
                          </div>
                          <div>
                            <img src={tick} alt="Document" />
                          </div>
                        </aside>
                        <div className="w-full rounded-full h-6 flex items-center mt-4">
                          <div className="bg-green-500 h-2 rounded-full flex items-center justify-end px-2 text-white font-semibold" style={{ width: '100%' }}></div>
                          <span className="ml-2">100%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='w-1/2'>
                  <div className='border-[#EDEDED] border-b-2'>
                    <h2 className='font-semibold text-xl p-4 mt-5'>Identity Proof</h2>
                    <p className='text-[#727476] p-4 font-normal'>e.g., Aadhaar Card, Voter ID</p>
                  </div>
                  <div {...getRootPropsIdentity({ className: 'dropzone' })}>
                    <input {...getInputPropsIdentity()} />
                    {acceptedFilesIdentity.length === 0 ? (
                      <div className='h-[20vh] flex flex-col items-center justify-center gap-4'>
                        <img className='w-14' src={file2} alt="Upload" />
                        <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                        <p className='text-[#727476] font-normal text-center'>(Max. File size: 25 MB)</p>
                      </div>
                    ) : (
                      <div className='w-full'>
                        <aside className='flex justify-around w-full items-stretch'>
                          <div>
                            <img src={document} alt="Document" />
                          </div>
                          <div>
                            <ul className='font-medium'>
                              {filesIdentity}
                            </ul>
                          </div>
                          <div>
                            <img src={tick} alt="Document" />
                          </div>
                        </aside>
                        <div className="w-full rounded-full h-6 flex items-center mt-4">
                          <div className="bg-green-500 h-2 rounded-full flex items-center justify-end px-2 text-white font-semibold" style={{ width: '100%' }}></div>
                          <span className="ml-2">100%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex flex-col gap-4 py-6'>
              <div className='flex gap-4'>
                <div className='w-1/2'>
                  <div className='border-[#EDEDED] border-b-2'>
                    <h2 className='font-semibold text-xl p-4 mt-5'>Panchayat Resolution</h2>
                    <p className='text-[#727476] p-4 font-normal'>(if applicable)</p>
                  </div>
                  <div {...getRootPropsResolution({ className: 'dropzone' })}>
                    <input {...getInputPropsResolution()} />
                    {acceptedFilesResolution.length === 0 ? (
                      <div className='h-[20vh] flex flex-col items-center justify-center gap-4'>
                        <img className='w-14' src={file2} alt="Upload" />
                        <h2 className='font-semibold text-[#F5705E] text-center'>Click to Upload</h2>
                        <p className='text-[#727476] font-normal text-center'>(Max. File size: 25 MB)</p>
                      </div>
                    ) : (
                      <div className='w-full'>
                        <aside className='flex justify-around w-full items-stretch'>
                          <div>
                            <img src={document} alt="Document" />
                          </div>
                          <div>
                            <ul className='font-medium'>
                              {filesResolution}
                            </ul>
                          </div>
                          <div>
                            <img src={tick} alt="Document" />
                          </div>
                        </aside>
                        <div className="w-full rounded-full h-6 flex items-center mt-4">
                          <div className="bg-green-500 h-2 rounded-full flex items-center justify-end px-2 text-white font-semibold" style={{ width: '100%' }}></div>
                          <span className="ml-2">100%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handlePanchayatS1}
            type='submit'
            className="flex w-[250px] justify-center rounded-md bg-[#f5705e] p-4 text-base font-semibold leading-6 text-white shadow-sm hover:bg-[#e74b36] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 self-end"
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
