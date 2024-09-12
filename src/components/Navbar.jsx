import soach from '../assets/soach .png'
import { BellOutlined } from '@ant-design/icons'
const Navbar = ({email,name,profile}) => {
  const logout = () => {
    localStorage.removeItem('vgfatoken')
    window.location.reload()
  }
  return (
    <div className='flex justify-between items-center p-3 px-8 sticky top-0 backdrop-blur-sm z-20 bg-[#fff] shadow-md'>
      <img src={soach} alt="" className='w-24'/>
      <div className='flex'>
        <div className='flex items-center gap-3'>
          <BellOutlined className='text-xl'/>
          <img src={profile||"https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1726122220~exp=1726125820~hmac=090ebdbaa94d2f34761d5e505dd550a86078a102e45976f9dbfdc458e6613f9c&w=740"} className='w-10' />
          <div className='flex flex-col'>
            <p className='font-bold text-xs'>{name}</p>
            <p className='text-xs'>{email}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
