import { FaSignInAlt, FaUser, FaHome } from 'react-icons/fa'
import { SlLogout } from 'react-icons/sl'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout, reset } from '../features/auth/authSlice'
import { BsFillPrinterFill } from 'react-icons/bs'

function Header() {
  let headerContent
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const onLogout = () => {
    dispatch(logout())
    dispatch(reset())
    navigate('/')
  }

  headerContent = (
    <header
      className='header'
      id='top'>
      <div className='logo'>
        <Link to='/'>
          <FaHome className='home-icon' />
        </Link>
      </div>
      <ul>
        {user ? (
          <>
            <a
              className='btn'
              href='/printable'
              target='_blank'>
              <BsFillPrinterFill /> Print
            </a>
            <li>
              <button
                className='btn'
                onClick={onLogout}>
                <SlLogout /> Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to='/login'>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to='/register'>
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  )

  if (location.pathname.includes('/printable')) {
    headerContent = <div></div>
  }
  return headerContent
}

export default Header
