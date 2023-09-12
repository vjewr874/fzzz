// @ts-nocheck
// ** React Imports
import { useState, useEffect } from 'react'
import Service from '../../../services/request'
import { useForm } from 'react-hook-form'
// ** Third Party Components
import { toast } from 'react-toastify';
import { Info } from 'react-feather'
import {  Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput, Card } from 'reactstrap'
import { useLocation } from 'react-router-dom'
import { formatToPrice } from "./../../../helper/common"
import { useHistory } from 'react-router-dom'
import moment from  "moment"
import Flatpickr from 'react-flatpickr'
import '@styles/react/libs/flatpickr/flatpickr.scss'
import '@styles/react/libs/charts/apex-charts.scss'
const UserAccountTab = ({ selectedUser ={} }) => {
  // ** States
  const [endDate, setEndPicker] = useState(moment().endOf('month').toDate())
  const [startDate, setStartPicker] = useState(moment().startOf('month').toDate())
  const [img, setImg] = useState(null)
  const [userData, setUserData] = useState({})
  const [userFindData, setUserFindData] = useState({})
  const [dataTable, setDataTable] = useState([])
  const { state } = useLocation()
  const history = useHistory()
  const { appUserId } = state
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {}
  })


  function handleFindById(item) {
    Service.send({
      method: 'POST', path: 'AppUsers/findById', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, data} = res
        if (statusCode === 200) {
          const {
            userId,
            firstName,
            lastName,
            phoneNumber,
            socmnd,
            sotaikhoan,
            tennganhang,
            tentaikhoan,
            cmndnguoi,
            cmndsau,
            cmndtruoc,
            active, 
            note,
            memberLevelName
          } = data
          setUserFindData(data)
          setUserData({
            userId,
            firstName,
            lastName,
            phoneNumber,
            socmnd,
            sotaikhoan,
            tennganhang,
            tentaikhoan,
            cmndnguoi,
            cmndsau,
            cmndtruoc,
            note,
            active,
            memberLevelName
          })
        } 
      }
      summaryUserPayment({endDate, startDate, appUserId})
    })
  }

  function handleUpdateData(item, messageSuccess) {
   
     
      Service.send({
        method: 'POST', path: 'AppUsers/updateUserById', data: item, query: null
      }).then(res => {
        if (res) {
          const { statusCode, message } = res
          if (statusCode === 200) {
            toast.success(messageSuccess || 'Tác vụ thành công!')
            history.push("/pages/users")
          } else {
            toast.warn(message || 'Đã có lỗi xảy ra!')
          }
        }
      })
    
  }

  function summaryUserPayment(item){
    Service.send({
      method: 'POST', path: 'Statistical/summaryUserPayment', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, message, data } = res
        if (statusCode === 200) {
         setDataTable(data)
        } else {
          toast.warn(message || 'Đã có lỗi xảy ra!')
        }
      }
    })
  }

  const handleOnchange = (name, value) => {
    setUserData(
      {
        ...userData,
        [name]: value
      }
    )
  }

  useEffect(()=>{
    handleFindById({
      id: appUserId
    })
    
  },[])

  return (
    <Card style={{padding: "20px" }}> 
  
  
     <Row>
     
      <Col sm='12'>
        <Form onSubmit={handleSubmit(() => {
            const newData = {}
            Object.keys(userData).forEach(key=>{
              if(userData[key] && key !==""){
                newData[key] = userData[key]
              }
            })
            
            handleUpdateData({
              id: appUserId,
              data: {
                ...newData
              }
            })
         
          })}>
          <Row>
            <Col md='4' sm='12'>
            <FormGroup>
              <Label >Trạng Thái</Label>
              <Input
                type='select'
                name='active'
                
                value={userData.active}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              >
                <option value={1}>Hoạt Động</option>
                <option value={0}>Khoá</option>
              </Input>
            </FormGroup>
            </Col>
            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='firstName'>Họ</Label>
              <Input
                id='firstName'
                name='firstName'
                
                placeholder='Bruce'
                value={userData.firstName || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='lastName'>Tên</Label>
                <Input

                  id='lastName'
                  name='lastName'
                  
                  placeholder='Wayne'
                  value={userData.lastName || ''}
                  onChange={(e) => {
                    const { name, value } = e.target
                    handleOnchange(name, value)
                  }}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='phoneNumber'>Số Điện Thoại</Label>
                <Input
                  name='phoneNumber'
                  placeholder='+84943881692'
                  options={{ phone: true, phoneRegionCode: 'VI' }}
                  value={userData.phoneNumber || ''}
                  onChange={(e) => {
                    const { name, value } = e.target
                    handleOnchange(name, value)
                  }}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='sotaikhoan'>Số tài khoản</Label>
                <Input
                  id='sotaikhoan'
                  name='sotaikhoan'
                  placeholder='Số tài khoản'
                  value={userData.sotaikhoan || ''}
                  onChange={(e) => {
                    const { name, value } = e.target
                    handleOnchange(name, value)
                  }}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
              <FormGroup>
                <Label for='tentaikhoan'>Tên tài khoản</Label>
                <Input
                  id='tentaikhoan'
                  name='tentaikhoan'
                  placeholder='Tên tài khoản'
                  value={userData.tentaikhoan || ''}
                  onChange={(e) => {
                    const { name, value } = e.target
                    handleOnchange(name, value)
                  }}
                />
              </FormGroup>
            </Col>
            <Col md='4' sm='12'>
            <Label for='tennganhang'>Ngân hàng</Label>
              <Input
                id='tennganhang'
                name='tennganhang'
                type="select"
               
                placeholder='BANK'
                value={userData.tennganhang || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              >
                 <option value="Vietcom Bank">Vietcom Bank</option>
                  <option value="Exim Bank">Exim Bank</option>
                  <option value="Vietin Bank">Vietin Bank</option>
                  <option value="SacomBank">SacomBank</option>
                  <option value="Vietnam Prosperity Joint-Stock Commercial Bank">Vietnam Prosperity Joint-Stock Commercial Bank</option>
                  <option value="Techcom">Techcom</option>
                  <option value="BIDV Bank">BIDV Bank</option>
                  <option value="MB Bank">MB Bank</option>
                  <option value="KienLong Bank">KienLong Bank</option>
                  <option value="HD Bank">HD Bank</option>
                  <option value="SHB Bank">SHB Bank</option>
                  <option value="SCB Bank">SCB Bank</option>
                  <option value="ACB Bank">ACB Bank</option>
                  <option value="AB Bank">AB Bank</option>
                  <option value="Agri Bank">Agri Bank</option>
                  <option value="Bac A Bank">Bac A Bank</option>
                  <option value="BaoViet Bank">BaoViet Bank</option>
                  <option value="DONGA Bank">DONGA Bank</option>
                  <option value="GP Bank">GP Bank</option>
                  <option value="INDOVINA Bank">INDOVINA Bank</option>
                  <option value="LienViet Post Bank">LienViet Post Bank</option>
                  <option value="Maritime">Maritime</option>
                  <option value="Nam A Bank">Nam A Bank</option>
                  <option value="Navi Bank">Navi Bank</option>
                  <option value="NCB">NCB</option>
                  <option value="OCB (PHUONG DONG)">OCB (PHUONG DONG)</option>
                  <option value="PG Bank">PG Bank</option>
                  <option value="PVCOM Bank">PVCOM Bank</option>
                  <option value="SaiGon Bank">SaiGon Bank</option>
                  <option value="SaA Bank">SaA Bank</option>
                  <option value="ShinHan Bank">ShinHan Bank</option>
                  <option value="Tien Phong Bank">Tien Phong Bank</option>
                  <option value="United Overseas Bank">United Overseas Bank</option>
                  <option value="VIB Bank">VIB Bank</option>
                  <option value="VietABank">VietABank</option>
                  <option value="VPBANK">VPBANK</option>
                </Input>
            </Col>
            <Col md='4' sm='12'>
            <Label for='memberLevelName'>Cấp độ</Label>
              <Input
                id='memberLevelName'
                name='memberLevelName'
                type="select"
               
                placeholder='Cấp độ'
                value={userData.memberLevelName || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              >
                 <option value="Agency">Đại lý</option>
                  <option value="Member">Thành viên</option>
                 
                </Input>
            </Col>
         
              
            <Col sm='12'>
              <div className='permissions border mt-1'>
                <h6 className='py-1 mx-1 mb-0 font-medium-2'>
                  <Info size={18} className='mr-25' />
                  <span className='align-middle'>Thông tin giao dịch</span>
                </h6>
                <div className='py-1 mx-1 mb-0 '>
                <Row>
                   <Col style={{marginBottom: "12px"}} md='4' sm='12'>
                    <FormGroup>
                    <div className='d-flex align-items-center'>
                       <Label style={{minWidth: "70px"}}>Từ ngày</Label> 
                       <Flatpickr
                         value={startDate}                
                         className='form-control'
                         placeholder="Từ: YY-MM-DD"
                         
                         onChange={date => {
                          
                           setStartPicker(date[0])
                           summaryUserPayment({startDate: date[0], endDate, appUserId})
                         }}
                       />
                      </div>
                     </FormGroup>  
                      </Col>
                      <Col md='4' sm='12'>
                      <FormGroup>
                      <div className='d-flex align-items-center'>
                      <Label style={{minWidth: "70px"}}>Đến ngày</Label> 
                       <Flatpickr
                         value={endDate}               
                         placeholder="Tới: YY-MM-DD"
                         className='form-control'
                         onChange={date => {
                           setEndPicker(date[0])
                           summaryUserPayment({endDate: date[0], startDate, appUserId})
                         }}
                       />
                        </div>
                       </FormGroup>
                      </Col>
                </Row>
                </div>
                <Table borderless striped responsive>
                  <thead className='thead-light'>
                    <tr>
                      <th>Mua</th>
                      <th>Bán</th>
                      <th>Rút</th>
                      <th>Nạp</th>
                      <th>Ngày</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                  {dataTable.length ? (
                    <>
                    {dataTable.map(item=>(
                      <tr>                 
                        <td>
                         {formatToPrice(item.totalBuy)}
                        </td>
                        <td>
                         {formatToPrice(item.totalSell)}
                        </td>
                        <td>
                         {formatToPrice(item.totalWithdraw)}
                        </td>
                        <td>
                         {formatToPrice(item.totalDeposit)}
                        </td>
                        <td>
                          {item.createdDate && moment(item.createdDate).format("DD/MM/YYYY hh:mm:ss")}
                        </td>
                     </tr>
                    ))}
                    </>
                  ):(
                    <>
                     <tr>                 
                      <td colSpan="5">
                       Không tìm thấy dữ liêu
                       </td>
                   </tr>
                 
                    </>
                  )}
                    
                  </tbody>
                </Table>
              </div>
             
            </Col>
         
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
                <Button.Ripple className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
                  Sửa
                </Button.Ripple>
                <Button.Ripple onClick={(e)=>{
                   e.preventDefault()
                   const newData = {
                     id: appUserId,
                     data: {         
                       active: 0
                     }
                   }
                   handleUpdateData(newData, 'Action Lock Successful!')
                }} color='secondary' outline>
                  Khoá
                </Button.Ripple>
              </Col>
          </Row>
        </Form>

      </Col>
    </Row>
    
    </Card>
  )
}
export default UserAccountTab
