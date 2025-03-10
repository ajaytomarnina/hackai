import { NavLink } from 'react-router-dom'
import classes from 'Components/General/SideBar.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalActions } from 'Store/global-redux'
import clsx from 'clsx'

const SideBar = (props) => {
  const dispatch = useDispatch()
  const showSideBarTablet = useSelector(
    (state) => state.global.showSideBarTablet
  )
  const showSideBarMobile = useSelector(
    (state) => state.global.showSideBarMobile
  )

  const selectedOption = useSelector((state) => state.global.selectedOption)
  const subMenu = useSelector((state) => state.global.subMenu)

  const navLinkClickHandler = () => {
    dispatch(GlobalActions.setShowSideBarMobile(false))
    // dispatch(GlobalActions.setShowSideBarTablet())
  }

  const optionHandler = ({ isActive, id, navName }) => {
    return isActive
      ? `${classes.active} ${showSideBarTablet && classes.active_open}`
      : undefined
  }

  const svgDashboardIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H7.5V12C7.5 11.1716 8.17157 10.5 9 10.5H15C15.8284 10.5 16.5 11.1716 16.5 12V22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2ZM13.5 22V13.5H10.5V22H13.5Z" fill="#8F999F"/>
      <path d="M3 9L2.69303 8.60532C2.57124 8.70005 2.5 8.8457 2.5 9H3ZM12 2L12.307 1.60532C12.1264 1.46489 11.8736 1.46489 11.693 1.60532L12 2ZM3.58579 21.4142L3.93934 21.0607H3.93934L3.58579 21.4142ZM7.5 22V22.5C7.77614 22.5 8 22.2761 8 22H7.5ZM16.5 22H16C16 22.2761 16.2239 22.5 16.5 22.5V22ZM21 9H21.5C21.5 8.8457 21.4288 8.70005 21.307 8.60532L21 9ZM13.5 22V22.5C13.7761 22.5 14 22.2761 14 22H13.5ZM13.5 13.5H14C14 13.2239 13.7761 13 13.5 13V13.5ZM10.5 13.5V13C10.2239 13 10 13.2239 10 13.5H10.5ZM10.5 22H10C10 22.2761 10.2239 22.5 10.5 22.5V22ZM3.30697 9.39468L12.307 2.39468L11.693 1.60532L2.69303 8.60532L3.30697 9.39468ZM3.5 20V9H2.5V20H3.5ZM3.93934 21.0607C3.65804 20.7794 3.5 20.3978 3.5 20H2.5C2.5 20.663 2.76339 21.2989 3.23223 21.7678L3.93934 21.0607ZM5 21.5C4.60218 21.5 4.22064 21.342 3.93934 21.0607L3.23223 21.7678C3.70107 22.2366 4.33696 22.5 5 22.5V21.5ZM7.5 21.5H5V22.5H7.5V21.5ZM8 22V12H7V22H8ZM8 12C8 11.4477 8.44772 11 9 11V10C7.89543 10 7 10.8954 7 12H8ZM9 11H15V10H9V11ZM15 11C15.5523 11 16 11.4477 16 12H17C17 10.8954 16.1046 10 15 10V11ZM16 12V22H17V12H16ZM19 21.5H16.5V22.5H19V21.5ZM20.0607 21.0607C19.7794 21.342 19.3978 21.5 19 21.5V22.5C19.663 22.5 20.2989 22.2366 20.7678 21.7678L20.0607 21.0607ZM20.5 20C20.5 20.3978 20.342 20.7794 20.0607 21.0607L20.7678 21.7678C21.2366 21.2989 21.5 20.663 21.5 20H20.5ZM20.5 9V20H21.5V9H20.5ZM11.693 2.39468L20.693 9.39468L21.307 8.60532L12.307 1.60532L11.693 2.39468ZM14 22V13.5H13V22H14ZM13.5 13H10.5V14H13.5V13ZM10 13.5V22H11V13.5H10ZM13.5 21.5H10.5V22.5H13.5V21.5Z" fill="#8F999F"/>
    </svg>
  `

  const svgDashboardWhiteIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2L3 9V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H7.5V12C7.5 11.1716 8.17157 10.5 9 10.5H15C15.8284 10.5 16.5 11.1716 16.5 12V22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V9L12 2ZM13.5 22V13.5H10.5V22H13.5Z" fill="white"/>
      <path d="M3 9L2.69303 8.60532C2.57124 8.70005 2.5 8.8457 2.5 9H3ZM12 2L12.307 1.60532C12.1264 1.46489 11.8736 1.46489 11.693 1.60532L12 2ZM3.58579 21.4142L3.93934 21.0607H3.93934L3.58579 21.4142ZM7.5 22V22.5C7.77614 22.5 8 22.2761 8 22H7.5ZM16.5 22H16C16 22.2761 16.2239 22.5 16.5 22.5V22ZM21 9H21.5C21.5 8.8457 21.4288 8.70005 21.307 8.60532L21 9ZM13.5 22V22.5C13.7761 22.5 14 22.2761 14 22H13.5ZM13.5 13.5H14C14 13.2239 13.7761 13 13.5 13V13.5ZM10.5 13.5V13C10.2239 13 10 13.2239 10 13.5H10.5ZM10.5 22H10C10 22.2761 10.2239 22.5 10.5 22.5V22ZM3.30697 9.39468L12.307 2.39468L11.693 1.60532L2.69303 8.60532L3.30697 9.39468ZM3.5 20V9H2.5V20H3.5ZM3.93934 21.0607C3.65804 20.7794 3.5 20.3978 3.5 20H2.5C2.5 20.663 2.76339 21.2989 3.23223 21.7678L3.93934 21.0607ZM5 21.5C4.60218 21.5 4.22064 21.342 3.93934 21.0607L3.23223 21.7678C3.70107 22.2366 4.33696 22.5 5 22.5V21.5ZM7.5 21.5H5V22.5H7.5V21.5ZM8 22V12H7V22H8ZM8 12C8 11.4477 8.44772 11 9 11V10C7.89543 10 7 10.8954 7 12H8ZM9 11H15V10H9V11ZM15 11C15.5523 11 16 11.4477 16 12H17C17 10.8954 16.1046 10 15 10V11ZM16 12V22H17V12H16ZM19 21.5H16.5V22.5H19V21.5ZM20.0607 21.0607C19.7794 21.342 19.3978 21.5 19 21.5V22.5C19.663 22.5 20.2989 22.2366 20.7678 21.7678L20.0607 21.0607ZM20.5 20C20.5 20.3978 20.342 20.7794 20.0607 21.0607L20.7678 21.7678C21.2366 21.2989 21.5 20.663 21.5 20H20.5ZM20.5 9V20H21.5V9H20.5ZM11.693 2.39468L20.693 9.39468L21.307 8.60532L12.307 1.60532L11.693 2.39468ZM14 22V13.5H13V22H14ZM13.5 13H10.5V14H13.5V13ZM10 13.5V22H11V13.5H10ZM13.5 21.5H10.5V22.5H13.5V21.5Z" fill="white"/>
    </svg>
  `

  const dashboardIcon = `data:image/svg+xml;base64,${btoa(svgDashboardIcon)}`
  const dashboardWhiteIcon = `data:image/svg+xml;base64,${btoa(
    svgDashboardWhiteIcon
  )}`

  const svgCustomersIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.248 2.16137C14.713 2.02439 14.1682 2.34706 14.0312 2.88208C13.8943 3.41711 14.2169 3.96189 14.752 4.09887C15.3973 4.2641 15.9692 4.6394 16.3777 5.16561C16.7861 5.69181 17.0078 6.339 17.0078 7.00512C17.0078 7.67125 16.7861 8.31843 16.3777 8.84464C15.9692 9.37085 15.3973 9.74615 14.752 9.91137C14.2169 10.0484 13.8943 10.5931 14.0312 11.1282C14.1682 11.6632 14.713 11.9859 15.248 11.8489C16.3236 11.5735 17.2768 10.948 17.9576 10.071C18.6383 9.19397 19.0078 8.11534 19.0078 7.00512C19.0078 5.89491 18.6383 4.81627 17.9576 3.93926C17.2768 3.06225 16.3236 2.43675 15.248 2.16137ZM13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM17 19V21H1V19C1 17.9391 1.42143 16.9217 2.17157 16.1716C2.92172 15.4214 3.93913 15 5 15H13C14.0609 15 15.0783 15.4214 15.8284 16.1716C16.5786 16.9217 17 17.9391 17 19ZM17.0318 13.8801C17.1698 13.3454 17.7153 13.0238 18.25 13.1619C19.3227 13.4388 20.273 14.0642 20.9517 14.9398C21.6304 15.8153 21.9992 16.8915 22 17.9994V20.0001C22 20.5524 21.5523 21.0001 21 21.0001C20.4477 21.0001 20 20.5524 20 20.0001V18.0009C19.9994 17.3363 19.7782 16.6904 19.371 16.1651C18.9638 15.6398 18.3936 15.2645 17.75 15.0984C17.2153 14.9603 16.8937 14.4149 17.0318 13.8801Z" fill="#8F999F"/>
    </svg>
  `

  const svgCustomersWhiteIcon = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M15.248 2.16137C14.713 2.02439 14.1682 2.34706 14.0312 2.88208C13.8943 3.41711 14.2169 3.96189 14.752 4.09887C15.3973 4.2641 15.9692 4.6394 16.3777 5.16561C16.7861 5.69181 17.0078 6.339 17.0078 7.00512C17.0078 7.67125 16.7861 8.31843 16.3777 8.84464C15.9692 9.37085 15.3973 9.74615 14.752 9.91137C14.2169 10.0484 13.8943 10.5931 14.0312 11.1282C14.1682 11.6632 14.713 11.9859 15.248 11.8489C16.3236 11.5735 17.2768 10.948 17.9576 10.071C18.6383 9.19397 19.0078 8.11534 19.0078 7.00512C19.0078 5.89491 18.6383 4.81627 17.9576 3.93926C17.2768 3.06225 16.3236 2.43675 15.248 2.16137ZM13 7C13 9.20914 11.2091 11 9 11C6.79086 11 5 9.20914 5 7C5 4.79086 6.79086 3 9 3C11.2091 3 13 4.79086 13 7ZM17 19V21H1V19C1 17.9391 1.42143 16.9217 2.17157 16.1716C2.92172 15.4214 3.93913 15 5 15H13C14.0609 15 15.0783 15.4214 15.8284 16.1716C16.5786 16.9217 17 17.9391 17 19ZM17.0318 13.8801C17.1698 13.3454 17.7153 13.0238 18.25 13.1619C19.3227 13.4388 20.273 14.0642 20.9517 14.9398C21.6304 15.8153 21.9992 16.8915 22 17.9994V20.0001C22 20.5524 21.5523 21.0001 21 21.0001C20.4477 21.0001 20 20.5524 20 20.0001V18.0009C19.9994 17.3363 19.7782 16.6904 19.371 16.1651C18.9638 15.6398 18.3936 15.2645 17.75 15.0984C17.2153 14.9603 16.8937 14.4149 17.0318 13.8801Z" fill="white"/>
    </svg>
  `

  const customersIcon = `data:image/svg+xml;base64,${btoa(svgCustomersIcon)}`
  const customersWhiteIcon = `data:image/svg+xml;base64,${btoa(
    svgCustomersWhiteIcon
  )}`

  const svgProfileIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="user">
      <path id="Vector" d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" fill="#8F999F"/>
      <path id="Vector_2" d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" fill="#8F999F"/>
    </g>
  </svg>
`;


const svgProfileActiveIcon = `
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g id="user">
      <path id="Vector" d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" fill="white"/>
      <path id="Vector_2" d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" fill="white"/>
    </g>
  </svg>
`;

const profileIcon = `data:image/svg+xml;base64,${btoa(svgProfileIcon)}`;
const profileActiveIcon = `data:image/svg+xml;base64,${btoa(svgProfileActiveIcon)}`;

  const SideBarList = [
    {
      id: 1,
      name: 'Dashboard',
      isActive: true,
      address: '/dashboard',
      icon: dashboardIcon,
      activeIcon: dashboardWhiteIcon,
      role: 'user',
    },
    {
      id: 2,
      name: 'Agents',
      isActive: true,
      address: '/agents',
      icon: customersIcon,
      activeIcon: customersWhiteIcon,
      role: 'user',
    },
    {
      id: 3,
      name: 'Chat',
      isActive: true,
      address: '/chat',
      icon: profileIcon,
      activeIcon: profileActiveIcon,
      role: 'user',
    },
  ]

  return (
    <>
      <div
        className={`${classes.sidebar} ${
          showSideBarTablet && classes.sidebar_open
        } ${props.className}`}
        onMouseEnter={() => dispatch(GlobalActions.setShowSideBarTablet(true))}
        onMouseLeave={() => dispatch(GlobalActions.setShowSideBarTablet(false))}
      >
        {showSideBarMobile && (
          <div className={`${classes.logo} text-black text-3xl font-bold`}>
            {' '}
            AI Voice
          </div>
        )}
        <ul>
          {SideBarList.map((opt) => (
            <li
              key={opt.id}
              className={clsx(
                classes.list,
                showSideBarTablet && classes.list_open,
                !opt.isActive && 'opacity-25'
              )}
              onClick={navLinkClickHandler}
            >
              <NavLink
                onClick={(e) => {
                  !opt?.isActive && e.preventDefault()
                  dispatch(GlobalActions.setSelectedOption(opt.id))
                  opt.name !== 'Receivables' &&
                    subMenu !== 'all' &&
                    dispatch(GlobalActions.setSubMenu('all'))
                }}
                to={
                  opt.name === 'Receivables'
                    ? subMenu === 'all'
                      ? opt.address
                      : opt.address2
                    : opt.address
                }
                className={({ isActive }) => {
                  if (isActive && selectedOption !== opt.id) {
                    setTimeout(() => {
                      dispatch(GlobalActions.setSelectedOption(opt.id))
                    }, 0)
                  }
                  return optionHandler({ isActive, id: opt.id, navName: opt.name })
                }}
                end
              >
                <div
                  className={`${classes.icon_box} ${
                    showSideBarTablet && classes.icon_box_open
                  }`}
                >
                  <img
                    src={`${
                      selectedOption === opt.id ? opt.activeIcon : opt.icon
                    }`}
                    alt={`${opt.address}-icon`}
                    className={`${classes.icon}`}
                  />
                </div>
                <div
                  className={clsx(
                    classes.name,
                    showSideBarTablet && classes.name_open,
                    'flex w-[90%] justify-between'
                  )}
                >
                  {opt.name}
                </div>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default SideBar
