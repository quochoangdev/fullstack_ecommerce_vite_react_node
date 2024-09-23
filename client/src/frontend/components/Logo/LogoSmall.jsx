import './LogoSmall.css'
import { FaOpencart } from 'react-icons/fa6'
import { BsFillBagFill } from 'react-icons/bs'


const LogoSmall = () => {
  return (
    <div className='wrap-logo'>
      <div className='text-logo'>
        Ecommerce
      </div>
      <div className='border-rs'>
        <BsFillBagFill className='icon-outside'/>
        <FaOpencart className='icon-inside'/>
      </div>
    </div>
  )
}

export default LogoSmall