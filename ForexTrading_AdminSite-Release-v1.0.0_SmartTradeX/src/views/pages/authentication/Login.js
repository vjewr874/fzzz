import { useState, useContext, Fragment } from 'react'
import classnames from 'classnames'
import Avatar from '@components/avatar'
import { useSkin } from '@hooks/useSkin'
import Service from './../../../services/request'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { toast, Slide } from 'react-toastify'
import { handleLogin } from '@store/actions/auth'
import { AbilityContext } from '@src/utility/context/Can'
import { useHistory } from 'react-router-dom'
import InputPasswordToggle from '@components/input-password-toggle'
import { getHomeRouteForLoggedInUser, isObjEmpty } from '@utils'
import { Coffee } from 'react-feather'
import { injectIntl } from "react-intl";
import {

  Row,
  Col,
  CardTitle,

  Form,
  Input,
  FormGroup,
  Label,
  CustomInput,
  Button,

} from 'reactstrap'

import '@styles/base/pages/page-auth.scss'
import "@styles/base/pages/page-auth.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import loginService from '../../../services/loginService'

const ToastContent = ({ name, roleName }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title font-weight-bold'>Welcome, {name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      <span>You have successfully logged in as role {roleName} as user to RocketGameLive. Now you can start to explore. Enjoy!</span>
    </div>
  </Fragment>
)

const Login = ({intl}) => {
  const InputSchema = yup.object().shape({
    username: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .matches(".*\\S+.*", intl.formatMessage({ id: "please_input" }))
      .matches(/^[a-zA-Z0-9]+$/, intl.formatMessage({ id: "not_special_character" }))
      .min(6, intl.formatMessage({ id: "least_six_character" })),
    password: yup
      .string()
      .required(intl.formatMessage({ id: "please_input" }))
      .matches(".*\\S+.*", intl.formatMessage({ id: "please_input" }))
      .min(6, intl.formatMessage({ id: "least_six_character" })),
  });
  const [skin, setSkin] = useSkin()
  const ability = useContext(AbilityContext)
  const dispatch = useDispatch()
  const history = useHistory()
  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')

  const { register, errors, handleSubmit } = useForm({
    mode: "onChange",
    resolver: yupResolver(InputSchema),
  });

  const illustration = skin === 'dark' ? 'login-v2-dark.svg' : 'login-v2.svg',
    source = require(`@src/assets/images/pages/${illustration}`).default

  const onSubmit = data => {
    if (isObjEmpty(errors)) {
      loginService.login(data).then((result) => {
        if (result && Object.keys(result).length > 0) {
            const newData = { ...result, accessToken: result.token, refreshToken: result.token }
            dispatch(handleLogin(newData))

            // history.push(getHomeRouteForLoggedInUser('admin'))
            toast.success(
              <ToastContent name={newData.fullName || newData.username || 'John Doe'} roleName={newData.roleName || ''} />,
              { transition: Slide, hideProgressBar: true, autoClose: 2000 }
            )
            setTimeout(() => {
              window.location.href = getHomeRouteForLoggedInUser('admin')
            }, 1500)
        } else {
          toast.error("Your user or password is'nt corret !")
        }
      })

    }
  }

  return (
    <div className='auth-wrapper auth-v2'>
      <Row className='auth-inner m-0'>

        <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
          <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
            <img className='img-fluid' src={source} alt='Login V2' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='font-weight-bold mb-1'>
              Login! 👋
            </CardTitle>


            <Form className='auth-login-form mt-2' onSubmit={handleSubmit(onSubmit)}>
              <FormGroup>
                <Label className='form-label' for='login-username'>
                  Username
                </Label>
                <Input
                  autoFocus
                  type='text'
                  // value={username}
                  id='login-username'
                  name='username'
                  placeholder='your username'
                  // onChange={e => setUsername(e.target.value)}
                  className={classnames({ 'is-invalid': errors['username'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                {/* <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='login-password'>
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div> */}
                <InputPasswordToggle
                  // value={password}
                  id='login-password'
                  name='password'
                  // className='input-group-merge'
                  // onChange={e => setPassword(e.target.value)}
                  className={classnames({ 'is-invalid': errors['password'] })}
                  innerRef={register({ required: true, validate: value => value !== '' })}
                />
              </FormGroup>
              <FormGroup>
                <CustomInput type='checkbox' className='custom-control-Primary' id='remember-me' label='Remember Me' />
              </FormGroup>
              <Button.Ripple type='submit' color='primary' block>
                Sign in
              </Button.Ripple>
            </Form>
            {/* <p className='text-center mt-2'>
              <span className='mr-25'>New on our platform?</span>
              <Link to='/register'>
                <span>Create an account</span>
              </Link>
            </p>
            <div className='divider my-2'>
              <div className='divider-text'>or</div>
            </div>
            <div className='auth-footer-btn d-flex justify-content-center'>
              <Button.Ripple color='facebook'>
                <Facebook size={14} />
              </Button.Ripple>
              <Button.Ripple color='twitter'>
                <Twitter size={14} />
              </Button.Ripple>
              <Button.Ripple color='google'>
                <Mail size={14} />
              </Button.Ripple>
              <Button.Ripple className='mr-0' color='github'>
                <GitHub size={14} />
              </Button.Ripple>
            </div>
          */}
          </Col>
        </Col>
      </Row>
    </div>
  )
}

export default injectIntl(Login)
