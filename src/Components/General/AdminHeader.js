import classes from 'Components/General/AdminHeader.module.scss'
import adminAvatar from 'assets/Icons/account.svg'
import sideBarIcon from 'assets/Icons/SideBarIcon.svg'
import chevrondown from 'assets/Icons/chevron-down.svg'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalActions } from 'Store/global-redux'
import clsx from 'clsx'
import useClickOutside from 'hooks/useClickOutside'
import { useState } from 'react'
import UseApiCall from 'hooks/useApiCall'
import { apiSignOut } from 'services'
import { useNavigate } from 'react-router-dom'
import { LoginActions } from 'Store/auth-redux'

const AdminHeader = (props) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [showOptions, setShowOptions] = useState(false)
  const optRef = useClickOutside(() => setShowOptions(false))
  const userName = useSelector((state) => state?.login?.userName)

  const logOut = () => {
    localStorage.removeItem('username')
    localStorage.removeItem('nickName')
    dispatch({ type: 'CLEAR_STATE' })
    navigate('/login?mode=email')
  }

  const svgContentLogout = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9" stroke="#1E333F" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M16 17L21 12L16 7" stroke="#1E333F" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M21 12H9" stroke="#1E333F" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
  `

  const svgDataURLLogout = `data:image/svg+xml;base64,${btoa(svgContentLogout)}`

  const options = [
    {
      title: 'Logout',
      icon: svgDataURLLogout,
      role: 'user',
      onClick: () => {
        logOut()
      },
    },
  ]

  const storedUsername = localStorage.getItem('username')

  if (storedUsername !== null) {
    const firstName = storedUsername.split(' ')[0]
    const formattedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1)
    dispatch(LoginActions.setUserName(formattedFirstName))
  }

  return (
    <div ref={optRef} className={`${classes.header} ${props.className}`}>
      <img
        src={sideBarIcon}
        alt="side-bar-icon"
        className={clsx(classes.sideBarIcon, 'cursor-pointer')}
        onClick={() => dispatch(GlobalActions.setShowSideBarTablet())}
      />
      <div className={`${classes.logo} text-black text-3xl font-bold`}>
        {' '}
        AI Voice
      </div>
      <div
        className={clsx(classes.profile, 'relative')}
        onClick={() => setShowOptions((pre) => !pre)}
      >
        <img src={adminAvatar} alt="admin-img" className={classes.userImg} />
        {userName && (
          <div className={clsx(classes.userTextBox)}>
            <span className={clsx(classes.userName)}>
              {(userName && userName) || ''}
            </span>
            <img
              src={chevrondown}
              alt="down"
              className={clsx(classes.chevrondown)}
            />
          </div>
        )}
        {showOptions && (
          <div
            className={clsx(
              classes.profileContainer,
              'absolute top-20 right-0  z-10',
              showOptions ? 'block' : 'hidden'
            )}
          >
            <div className={clsx(classes.profileWrapper)}></div>
            <ul
              className={clsx(classes.listBox)}
              aria-labelledby="dropdownDefaultButton"
            >
              {options?.map((option, index) => (
                <li
                  onClick={option.onClick}
                  key={index}
                  className={clsx(classes.list)}
                >
                  <img
                    src={option.icon}
                    alt="admin-img"
                    className={clsx(classes.listImg)}
                  />
                  <p className={clsx(classes.listText)}>{option.title}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
export default AdminHeader
