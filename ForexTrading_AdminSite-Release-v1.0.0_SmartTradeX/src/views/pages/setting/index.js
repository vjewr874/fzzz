// @ts-nocheck
// ** React Imports
import { useState, useEffect } from 'react'
import Service from '../../../services/request'
import { useForm } from 'react-hook-form'
// ** Third Party Components
import { toast } from 'react-toastify';

import {  Row, Col, Button, Form, Input, Label, FormGroup, Table, CustomInput, Card } from 'reactstrap'
import { useLocation } from 'react-router-dom'

const UserAccountTab = ({ selectedUser ={} }) => {
  // ** States
  
  
  const [userData, setUserData] = useState({})
  const { handleSubmit } = useForm({
    defaultValues: {}
  })
  


  function handleFindById(item) {
    Service.send({
      method: 'POST', path: 'SystemConfiguration/find', data: item, query: null
    }).then(res => {
      if (res) {
        const { statusCode, data} = res
        if (statusCode === 200) {
          
          if(data.data){
            const {           
              telegramGroupUrl,
              fbMessengerUrl,
              zaloUrl,
              playStoreUrl,
              appStoreUrl,
              websiteUrl,
              hotlineNumber,
              address,
              systemVersion,
              exchangeVNDPrice
            } = data.data[0]
        
            setUserData({
              telegramGroupUrl,
              fbMessengerUrl,
              zaloUrl,
              playStoreUrl,
              appStoreUrl,
              websiteUrl,
              hotlineNumber,
              address,
              systemVersion,
              exchangeVNDPrice
            })
          } 
          }
        
      }
    })
  }

  function handleUpdateData(item, messageSuccess) {
   
     
      Service.send({
        method: 'POST', path: 'SystemConfiguration/updateConfigs', data: item, query: null
      }).then(res => {
        if (res) {
          const { statusCode, message } = res
          if (statusCode === 200) {
            toast.success(messageSuccess || 'Tác vụ thành công!')
            
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
    handleFindById()
  },[])

  return (
    <Card style={{padding: "20px"}}>
      <h2 style={{ border: 'unset' }} className="content-header-title mb-2" >Cấu hình hệ thống</h2>
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
             
              data: {
                ...newData
              }
            })
         
          })}>
          <Row>
           
            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='telegramGroupUrl'>Telegram Group</Label>
              <Input
                id='telegramGroupUrl'
                name='telegramGroupUrl'
                
                placeholder='Link'
                value={userData.telegramGroupUrl || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>
            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='fbMessengerUrl'>Fb Messenger</Label>
              <Input
                id='fbMessengerUrl'
                name='fbMessengerUrl'
                
                placeholder='Link'
                value={userData.fbMessengerUrl || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>
            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='zaloUrl'>Zalo</Label>
              <Input
                id='zaloUrl'
                name='zaloUrl'
                
                placeholder='Link'
                value={userData.zaloUrl || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>

            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='playStoreUrl'>PlayStore</Label>
              <Input
                id='playStoreUrl'
                name='playStoreUrl'
                
                placeholder='Link'
                value={userData.playStoreUrl || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>


            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='appStoreUrl'>AppStore</Label>
              <Input
                id='appStoreUrl'
                name='appStoreUrl'
                
                placeholder='Link'
                value={userData.appStoreUrl || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>



            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='websiteUrl'>Website</Label>
              <Input
                id='websiteUrl'
                name='websiteUrl'
                
                placeholder='Link'
                value={userData.websiteUrl || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>


            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='hotlineNumber'>Số Hotline</Label>
              <Input
                id='hotlineNumber'
                name='hotlineNumber'
                
                placeholder='Số Hotline'
                value={userData.hotlineNumber || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>



            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='address'>Địa chỉ</Label>
              <Input
                id='address'
                name='address'
                
                placeholder='Địa chỉ'
                value={userData.address || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>
            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='systemVersion'>Phiên bản</Label>
              <Input
                id='systemVersion'
                name='systemVersion'
                
                placeholder='Phiên bản'
                value={userData.systemVersion || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>
            <Col md='4' sm='12'>
             <FormGroup>
              <Label for='exchangeVNDPrice'>Giá chuyển đổi</Label>
              <Input
                id='exchangeVNDPrice'
                name='exchangeVNDPrice'
                
                placeholder='Giá chuyển đổi'
                value={userData.exchangeVNDPrice || ''}
                onChange={(e) => {
                  const { name, value } = e.target
                  handleOnchange(name, value)
                }}
              />
            </FormGroup>
            </Col>
            <Col className='d-flex flex-sm-row flex-column mt-2' sm='12'>
                <Button.Ripple className='mb-1 mb-sm-0 mr-0 mr-sm-1' type='submit' color='primary'>
                  Sửa
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
