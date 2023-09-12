// @ts-nocheck
// ** React Imports
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
// ** Custom Components
import Avatar from '@components/avatar'

// ** Utils
import { isUserLoggedIn } from '@utils'
import Service from '../../../../services/request'
// ** Store & Actions
import { useDispatch } from 'react-redux'
import { handleLogout } from '@store/actions/auth'
import { toast } from 'react-toastify'
// ** Third Party Components
import { UncontrolledDropdown, DropdownMenu, DropdownToggle, DropdownItem,
   Input, Label, 
   Modal, ModalHeader, ModalBody,
  Button, FormGroup, Form
} from 'reactstrap'
import {Settings, Power, Clipboard } from 'react-feather'

// ** Default Avatar Image
import defaultAvatar from '@src/assets/images/new_image/avatar_default.jpg'

const UserDropdown = () => {
  // ** Store Vars
  const dispatch = useDispatch()
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {}
  })
  // ** State
  const [userData, setUserData] = useState(null)
  const [modalPassword, setModalModalPassword] = useState(false)
  const [userDataAll, setUserDataAll] = useState({})
  //** ComponentDidMount
  useEffect(() => {
    if (isUserLoggedIn() !== null) {
      setUserData(JSON.parse(localStorage.getItem('userData')))
    }
  }, [])

  function copyToClipboard(text) {
    var selected = false;
    var el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    if (document.getSelection().rangeCount > 0) {
      selected = document.getSelection().getRangeAt(0)
    }
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    if (selected) {
      document.getSelection().removeAllRanges();
      document.getSelection().addRange(selected);
    }
    toast.success("Copy link successlly!")
  }

  function handleUpdatePassWord(item) {
    Service.send({
      method: 'POST', path: '/Staff/changePasswordStaff', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message } = res
        if (statusCode === 200) {
          toast.success('Đổi mật khẩu thành công!')
          setUserDataAll({})
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      }

    })
  }

  //** Vars
  const userAvatar = (userData && userData.staffAvatar) || defaultAvatar
  return (
    <>
    <UncontrolledDropdown tag='li' className='dropdown-user nav-item'>
      <DropdownToggle href='/' tag='a' className='nav-link dropdown-user-link' onClick={e => e.preventDefault()}>
        <Avatar img={userAvatar} imgHeight='40' imgWidth='40' status='online' />
        <div className='user-nav d-sm-flex d-none' style={{marginLeft:"12px"}}>
          <span className='user-name font-weight-bold'>{(userData && userData['username']) || 'John Doe'}</span>
          <span className='user-status'>{(userData && userData.roleName) || 'Admin'}</span>
        </div>
      </DropdownToggle>
      <DropdownMenu style={{minWidth: "200px"}} right>
        {/* <DropdownItem tag={Link} to='/pages/profile'>
          <User size={14} className='mr-75' />
          <span className='align-middle'>Profile</span>
        </DropdownItem> */}
        {/* <DropdownItem tag={Link} to='/apps/email'>
          <Mail size={14} className='mr-75' />
          <span className='align-middle'>Inbox</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/todo'>
          <CheckSquare size={14} className='mr-75' />
          <span className='align-middle'>Tasks</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/apps/chat'>
          <MessageSquare size={14} className='mr-75' />
          <span className='align-middle'>Chats</span>
        </DropdownItem>
        <DropdownItem divider />
        <DropdownItem tag={Link} to='/pages/account-settings'>
          <Settings size={14} className='mr-75' />
          <span className='align-middle'>Settings</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/pricing'>
          <CreditCard size={14} className='mr-75' />
          <span className='align-middle'>Pricing</span>
        </DropdownItem>
        <DropdownItem tag={Link} to='/pages/faq'>
          <HelpCircle size={14} className='mr-75' />
          <span className='align-middle'>FAQ</span>
        </DropdownItem> */}
        <DropdownItem tag={Link} to='/setting' onClick={(e) =>{
          e.preventDefault()
          setModalModalPassword(true)
        }}>
          <Settings size={14} className='mr-75' />
          <span className='align-middle'>Đổi mật khẩu</span>
        </DropdownItem>
       {/*<DropdownItem tag={Link} to='/login' onClick={(e) =>{*/}
       {/*   e.preventDefault()*/}
       {/*   const newUserl = `${process.env.REACT_APP_WEB_APP_URL}?refer=${userData.username}`*/}
       {/*   copyToClipboard(newUserl)*/}
       {/* }}>*/}
       {/*   <Clipboard size={14} className='mr-75' />*/}
       {/*   <span className='align-middle'>Sao chép link</span>*/}
       {/* </DropdownItem>*/}
        
        <DropdownItem tag={Link} to='/login' onClick={() => dispatch(handleLogout())}>
          <Power size={14} className='mr-75' />
          <span className='align-middle'>Đăng xuất</span>
        </DropdownItem>
      
      </DropdownMenu>
    </UncontrolledDropdown>

    <Modal
        isOpen={modalPassword}
        toggle={() => setModalModalPassword(false)}
        className={`modal-dialog-centered `}

      >
        <ModalHeader toggle={() => setModalModalPassword(false)}>
         Đổi mật khẩu
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit(() => {
            handleUpdatePassWord({
              // username: userData['username'],
              newPassword: userDataAll.newPassword,
              password: userDataAll.password
            })
            setModalModalPassword(false)
          })}>
             <FormGroup>
              <Label for='newPassword'>Mật khẩu hiện tại</Label>
              <Input
                id='password'
                name='password'
                innerRef={register({ required: true })}
                invalid={errors.password && true}
                placeholder='Nhập mật khẩu'
                value={userDataAll.password || ''}
                type="password"
                onChange={(e) => {
                  const { value } = e.target
                  setUserDataAll({
                    ...userDataAll,
                    password: value
                  })
                }}
              />
            </FormGroup>
        
            <FormGroup>
              <Label for='newPassword'>Mật khẩu mới</Label>
              <Input
                id='newPassword'
                name='newPassword'
                innerRef={register({ required: true })}
                invalid={errors.newPassword && true}
                placeholder='Nhập mật khẩu mới'
                value={userDataAll.newPassword || ''}
                type="password"
                onChange={(e) => {
                  const { value } = e.target
                  setUserDataAll({
                    ...userDataAll,
                    newPassword: value
                  })
                }}
              />
            </FormGroup>
        

          
            <FormGroup className='d-flex mb-0'>
              <Button.Ripple className='mr-1' color='primary' type='submit'>
                Lưu
            </Button.Ripple>

            </FormGroup>
          </Form>
        </ModalBody>

      </Modal>
      
    </>
  )
}

export default UserDropdown
