// ** React Imports
import React, {useEffect, useState} from 'react'
// ** Custom Components
import './../index.scss'
import {useHistory} from 'react-router-dom'
import Service from '../../../services/request'
// ** Third Party Components
import {Button, Card, Col, CustomInput, Form, FormGroup, Input, Row} from 'reactstrap'
import {toast} from "react-toastify";

const UserAccountTab = (props) => {
  const id = props.match.params ? props.match.params.id : null
  // const [listPermission, setListPermission] = useState([])
  const history = useHistory()
  // const [role, setRole] = useState({
  //   roleName: '',
  //   permission: []
  // })
  // function getData() {
  //   const newParams = {
  //     filter: {
  //
  //     },
  //     skip: 0,
  //     limit: 100,
  //     order: {
  //     }
  //   }
  //
  //   const token = window.localStorage.getItem('accessToken')
  //
  //   if (token) {
  //     const newToken = token.replace(/"/g, "");
  //
  //     Service.send({
  //       method: 'POST', path: '/Permission/getList', data: newParams, query: null, headers: {
  //         Authorization: `Bearer ` + newToken
  //       }
  //     }).then(res => {
  //       if (res) {
  //         const { statusCode, data, message } = res
  //         if (statusCode === 200) {
  //           setListPermission(data.data)
  //         } else {
  //           toast.warn(message || 'Đã có lỗi xảy ra!')
  //         }
  //       }
  //     })
  //   } else {
  //     window.localStorage.clear()
  //   }
  // }


  // useEffect(() => {
  //   getData()
  //   if (id) {
  //     const data = props?.location?.state?.data || {}
  //     role.roleName = data.roleName
  //     role.permission = data.permissions?.split(',')
  //     setRole({
  //       ...role
  //     })
  //   }
  // }, [])

  // function handleRenderTable() {
  //   const newData = []
  //   let tmp = []
  //   for (let i = 0; i < listPermission.length; i++) {
  //     if (i % 4 === 0 && i !== 0) {
  //       if (tmp.length < 4) {
  //         const fillLength = 4 - tmp.length
  //         for (let j = 0; j < fillLength; j++) {
  //           tmp.push({})
  //         }
  //       }
  //       newData.push(tmp)
  //       tmp = []
  //     } else {
  //       tmp.push(listPermission[i])
  //     }
  //   }
  //
  //   return (
  //     <>
  //       {newData.map(el => {
  //         return (
  //           <tr>
  //             {
  //               el && el.map(item => {
  //                 const valueCheck = role?.permission?.includes(item.permissionKey)
  //                 return (
  //                   <>
  //                     {item.permissionKey ?
  //                       <td>
  //                         <CustomInput onChange={(e) => {
  //                           const { checked } = e.target
  //                           if (checked && !valueCheck) {
  //                             if(!role?.permission){
  //                               role.permission=[]
  //                             }
  //                             role.permission.push(item?.permissionKey)
  //                           } else {
  //                             if(!role?.permission){
  //                               role.permission=[]
  //                             }
  //                             const newRole = role.permission.filter(el2 => el2 !== item?.permissionKey)
  //                             role.permission = newRole
  //                           }
  //                           setRole({
  //                             ...role
  //                           })
  //                         }}
  //                           type='checkbox'
  //                           checked={valueCheck}
  //                           id={item.permissionKey}
  //                           label={item.permissionName}
  //                         />
  //                       </td> :
  //                       <td/>
  //                     }
  //                   </>
  //                 )
  //               })
  //             }
  //           </tr>
  //         )
  //       })}
  //     </>
  //   )
  // }
  //
  // function handleSubmit() {
  //   const token = window.localStorage.getItem('accessToken')
  //   let path = '/Role/insert'
  //   const permissions = role?.permission.join(','||undefined)
  //   let newParams = {
  //     roleName: role.roleName,
  //     permissions
  //   }
  //   if (id) {
  //     path = '/Role/updateById'
  //     newParams = {
  //       id,
  //       data: newParams
  //     }
  //   }
  //   if (role.permission===undefined || role.permission===[]||role.permission===""){
  //     return toast.warning("Vui lòng chọn quyền")
  //   }
  //   else {
  //     if (token) {
  //       const newToken = token.replace(/"/g, "");
  //
  //       Service.send({
  //         method: 'POST', path, data: newParams, query: null, headers: {
  //           Authorization: `Bearer ` + newToken
  //         }
  //       }).then(res => {
  //         if (res) {
  //           const { statusCode, message } = res
  //           if (statusCode === 200 || statusCode === 201) {
  //             toast.success(`${id ? 'Update' : 'Create'} role successfully`)
  //           } else {
  //             toast.warn(message || 'Đã có lỗi xảy ra!')
  //           }
  //         }
  //       })
  //     } else {
  //       window.localStorage.clear()
  //     }
  //   }
  // }

  // custom
  const [roles,setRoles]=useState({
    roleName: '',
    permissions: []
  })
  const [permissionsList,setPermissionsList]= useState([])

  useEffect(()=>{
    getPermissionsList()
    if (id) {
          const data = props?.location?.state?.data || {}
          roles.roleName = data.roleName
          roles.permissions = data.permissions?.split(',')
          setRoles({
            ...roles
          })
        }
  },[])

  const getPermissionsList=()=>{
    const params={
      skip:0,
      limit:100
    }
    const token = window.localStorage.getItem('accessToken')
    if (token) {
      const newToken = token.replace(/"/g, "");
      Service.send({
        method: 'POST', path: '/Permission/getList', data: params, query: null, headers: {
          Authorization: `Bearer ` + newToken
        }
      }).then(res => {
        if (res) {
          const { statusCode, data} = res
          if (statusCode === 200) {
            setPermissionsList(data.data)
          } else {
            toast.warn( 'Đã có lỗi xảy ra!')
          }
        }
      })
    } else {
      window.localStorage.clear()
    }
  }
  const handleChangeNamePermission=(name)=>{
    if (name==="VIEW_DASHBOARD"){
      return "THỐNG KÊ"
    }
    if (name==="VIEW_PRODUCTS"){
      return "DANH SÁCH VÉ BÁN"
    }
    if (name==="VIEW_ORDERS"){
      return "DANH SÁCH ĐƠN MUA"
    }
    if (name==="VIEW_USERS" ){
      return "DANH SÁCH KHÁCH HÀNG"
    }
    if (name==="VIEW_DEPOSIT"){
      return "LỊCH SỬ NẠP"
    }
    if (name==="VIEW_WITHDRAW"){
      return "LỊCH SỬ RÚT"
    }
    if (name==="VIEW_TRANSACTION"){
      return "LỊCH SỬ GIAO DỊCH"
    }
    if (name==="VIEW_NOTIFICATIONS"){
      return "THÔNG BÁO"
    }
    if (name==="VIEW_PAYMENT_METHOD"){
      return "PHƯƠNG THỨC THANH TOÁN"
    }
    if (name==="VIEW_SYSTEM_CONFIG"){
      return "CẤU HÌNH HỆ THỐNG"
    }
    if (name==="VIEW_ROLES"){
      return "PHÂN QUYỀN"
    }
    if (name==="VIEW_STAFFS"){
      return "DANH SÁCH NHÂN VIÊN"
    }
    if (name==="APPROVE_DEPOSIT"){
      return "DUYỆT NẠP TIỀN"
    }
    if (name==="APPROVE_WITHDRAW"){
      return "DUYỆT RÚT TIỀN"
    }
    if (name==="EDIT_USERS"){
      return "CHỈNH SỬA NGƯỜI DÙNG"
    }
    return name
  }

  const handleSubmit=()=>{
      const token = window.localStorage.getItem('accessToken')
      let path = '/Role/insert'
      const permissions = roles?.permissions?.join(',')
      let newParams = {
        roleName: roles.roleName,
        permissions:permissions
      }
      if (id) {
        path = '/Role/updateById'
        newParams = {
          id,
          data: {
            roleName: roles.roleName,
            permissions:permissions,
            isDeleted:0
          }
        }
      }
      if(roles?.roleName?.toLowerCase()==="admin"){
        toast.warn("Không đặt tên vài trò là Admin")
        return
      }
      if(roles.roleName==="" || roles.roleName===undefined){
        return toast.warn("Vui lòng nhập tên vai trò")
      }
      else if (roles?.permissions.length===0 || roles?.permissions===[]|| roles?.permissions===""){
        return toast.warn("Vui lòng chọn quyền")
      }
      else
      {
        if (token) {
          const newToken = token.replace(/"/g, "");

          Service.send({
            method: 'POST', path, data: newParams, query: null, headers: {
              Authorization: `Bearer ` + newToken
            }
          }).then(res => {
            if (res) {
              const { statusCode } = res
              if (statusCode === 200 || statusCode === 201) {
                toast.success(`${id ? 'Cập nhật' : 'Tạo'} thành công`)
              } else {
                toast.warn( 'Đã có lỗi xảy ra!')
              }
              history.push("/permission/list")
            }
          })
        } else {
          window.localStorage.clear()
        }
      }
  }
  return (
    <>
      {/*<Card className="accountAdmin" >*/}
      {/*  <Breadcrumbs onClickParent={() => {*/}
      {/*    history.push(`/permission/list`)*/}
      {/*  }} breadCrumbTitle='Role' breadCrumbParent='Permission' breadCrumbActive={id ? 'Edit' : 'Add'} />*/}
      {/*  <Row>*/}
      {/*    <Col sm='12'>*/}
      {/*      <Form onSubmit={e => e.preventDefault()}>*/}
      {/*        <Row>*/}
      {/*          <Col md='4' sm='12'>*/}
      {/*            <FormGroup>*/}
      {/*              <Label for='roleName'>Role Name</Label>*/}
      {/*              <Input onChange={(e) => {*/}
      {/*                const { value } = e.target*/}
      {/*                role.roleName = value*/}
      {/*                setRole({*/}
      {/*                  ...role*/}
      {/*                })*/}
      {/*              }} value={role.roleName} type='text' id='roleName' placeholder='Role Name' />*/}
      {/*            </FormGroup>*/}
      {/*          </Col>*/}

      {/*          <Col sm='12'>*/}
      {/*            <div className='permissions border mt-1'>*/}
      {/*              <h6 className='py-1 mx-1 mb-0 font-medium-2'>*/}
      {/*                <Lock size={18} className='mr-25' />*/}
      {/*                <span className='align-middle'>{id ? 'Edit' : 'Add'} Permissions</span>*/}
      {/*              </h6>*/}
      {/*              <Table borderless striped responsive>*/}

      {/*                <tbody>*/}
      {/*                  {*/}
      {/*                    handleRenderTable()*/}
      {/*                  }*/}

      {/*                </tbody>*/}
      {/*              </Table>*/}
      {/*            </div>*/}
      {/*          </Col>*/}
      {/*          <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>*/}
      {/*            <Button.Ripple onClick={() => { handleSubmit() }} className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>*/}
      {/*              Save Changes*/}
      {/*            </Button.Ripple>*/}
      {/*          </Col>*/}
      {/*        </Row>*/}
      {/*      </Form>*/}
      {/*    </Col>*/}
      {/*  </Row>*/}
      {/*</Card>*/}


      {/*  custom   */}
      <div className={"#AddEditPermission"}>
        <Card className={"p-2"}>
          <Form>
            <Row>
              <Col lg={4} className={"mb-2"}>
                <FormGroup>
                  <Input onChange={(e) => {
                    const { value } = e.target
                    roles.roleName = value
                    setRoles({
                      ...roles
                    })
                  }} value={roles.roleName||""} type='text' id='roleName' placeholder='Nhập vai trò' />
                </FormGroup>
              </Col>
              <Col lg={12}>
                <div className={"border"}>
                  <h6 className='py-1 mx-1 mb-0 font-medium-2'>Thêm Quyền</h6>
                  <Row>
                    {
                      permissionsList.map((value, index) => {
                        if(value.permissionKey!=="VIEW_ROLES"){
                          const valueCheck = roles?.permissions?.includes(value.permissionKey)
                          return(
                              <Col lg={3} key={index}>
                                <CustomInput
                                    onChange={(e)=>{
                                      const { checked } = e.target
                                      if (checked && !valueCheck) {
                                        if(!roles?.permissions){
                                          roles.permissions=[]
                                        }
                                        roles.permissions.push(value?.permissionKey)
                                      } else {
                                        if(!roles?.permissions){
                                          roles.permissions=[]
                                        }
                                        roles.permissions = roles.permissions.filter(el2 => el2 !== value?.permissionKey)
                                      }
                                      setRoles({
                                        ...roles
                                      })
                                    }}
                                    className={"m-1"}
                                    type='checkbox'
                                    checked={valueCheck}
                                    id={value.permissionKey}
                                    label={handleChangeNamePermission(value.permissionName)}
                                />
                              </Col>
                          )
                        }
                      })
                    }
                  </Row>
                </div>
              </Col>
            </Row>
          </Form>
        </Card>
      </div>

      <div className={'d-flex justify-content-end align-items-center'}>
        <Button color={'primary'} className={'mr-2'} onClick={() => history.push('/permission/list')}>
          Trở lại
        </Button>
        <Button onClick={() => {
          handleSubmit()
        }} className='mb-1 mb-sm-0 mr-0' type='submit' color='primary'>
          {
            id? "Lưu": "Tạo"
          }
        </Button>
      </div>
    </>
  )
}
export default UserAccountTab
