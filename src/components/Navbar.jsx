import soach from '../assets/soach .png'
const Navbar = () => {
  const logout = () => {
    localStorage.removeItem('vgfatoken')
    window.location.reload()
  }
  return (
    <div className='flex justify-between items-center p-3 px-8 sticky top-0 backdrop-blur-sm z-20 bg-[#FEFAF6] shadow-md'>
      <h1 className='text-2xl font-semibold font-poppins'>VGFA Dashboard</h1>
      <img src={soach} alt=""/>
      <button className=' px-3 py-1 bg-[#ffa230] text-white rounded-md font-semibold font-poppins hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out'
       onClick={()=>{logout()}}>
        Logout</button>
    </div>
  )
}

export default Navbar
