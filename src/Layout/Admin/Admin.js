import { Outlet } from 'react-router-dom'
import AdminHeader from 'Components/General/AdminHeader'
import SideBar from 'Components/General/SideBar'
import classes from 'Layout/Admin/Admin.module.scss'
import { useSelector } from 'react-redux'

const AdminRoot = () => {
  const showSideBarMobile = useSelector(
    (state) => state.global.showSideBarMobile
  )

  return (
    <>
      <AdminHeader className={classes.admin_header} />
      <div className={classes.admin_root}>
        <SideBar
          className={`${classes.sideBar} ${
            showSideBarMobile && classes.sideBar_able
          }`}
        />
        <div className={`${classes.outlet}`} style={{ overflow: 'scroll' }}>
          <Outlet />
        </div>
      </div>
    </>
  )
}
export default AdminRoot
