// ** React Imports
import { Fragment } from 'react'

// ** Custom Components
import NavbarUser from './NavbarUser'
import NavbarBookmarks from './NavbarBookmarks'
import {useLocation} from "react-router-dom";

const ThemeNavbar = props => {
  // ** Props
    const location = useLocation()
  const { skin, setSkin, setMenuVisibility } = props
  return (
    <Fragment>
      <div className='bookmark-wrapper d-flex align-items-center'>
          <NavbarBookmarks setMenuVisibility={setMenuVisibility} />
          <div className='title'>{location.pathname.includes("purchase-list") ? "ĐƠN HÀNG" : location.pathname.includes("customer") ? "DANH SÁCH KHÁCH HÀNG" : location.pathname.includes("lottery") ? "DANH SÁCH VÉ": location.pathname.includes("history") ? "DANH SÁCH LỊCH SỬ" : location.pathname.includes("notification") ? "THÔNG BÁO" : location.pathname.includes("payment-method") ? "PHƯƠNG THỨC THANH TOÁN" : location.pathname.includes("system-configuration") ? "CẤU HÌNH HỆ THỐNG" : location.pathname.includes("permission") ? "PHÂN QUYỀN" : location.pathname.includes("account-admin") ? "QUẢN LÝ NHÂN VIÊN" : "DASHBOARD"}</div>
      </div>
      <NavbarUser skin={skin} setSkin={setSkin} />
    </Fragment>
  )
}

export default ThemeNavbar
