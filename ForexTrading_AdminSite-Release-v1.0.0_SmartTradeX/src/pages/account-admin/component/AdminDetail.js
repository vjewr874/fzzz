import { Button, Card, Col, CustomInput, FormGroup, Input, Label, Media, Row } from "reactstrap";
import React, { useEffect, useState } from "react";
import Avatar from "../../../@core/components/avatar";
import "./styles/AdminDetail.scss"
import { useHistory } from "react-router-dom"
import Service from "../../../services/request";
import { toast } from "react-toastify";
import Select from "react-select";
import { convertTimeDate } from "../../../ultils/convertDate";
import { convertFileToBase64 } from "../../../helper/common";
import SystemConfig from "../../../services/systemConfig";
import DefaultAvatar from "../../../assets/images/new_image/avatar_default.jpg"
import ModalUpdatePassword from "../../../components/Modal/account-admin/UpdatePassword";
import Loader from "../../../components/Loader";

const AdminDetail = (props) => {
    const [listRoles, setListRoles] = useState([])
    const history = useHistory()
    const [roleName, setRoleName] = useState(null)
    const [passwordToUpdate, setPasswordToUpdate] = useState(undefined)
    const [IsOpenModal, setIsOpenModal] = useState(false)
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false)
    const [dataToAction, setDataToAction] = useState(
        {
            // lastName:undefined,
            firstName: undefined,
            username: undefined,
            email: undefined,
            password: undefined,
            phoneNumber: undefined,
            staffAvatar: undefined,
            roleId: undefined

        }
    )
    useEffect(() => {
        // dataToAction.lastName=props?.data?.lastName
        dataToAction.firstName = props?.data?.firstName
        dataToAction.username = props?.data?.username
        dataToAction.email = props?.data?.email
        dataToAction.password = null
        dataToAction.phoneNumber = props?.data?.phoneNumber
        dataToAction.staffAvatar = props?.data?.staffAvatar || undefined
        dataToAction.roleId = props?.data?.roleId
        setRoleName(props?.data?.roleName)
        setDataToAction({ ...dataToAction })
        getListRole()
    }, [props?.data])


    function getListRole() {
        // @ts-ignore
        Service.send({
            method: 'POST', path: '/Role/getList', data: {
                skip: 0,
                limit: 100,
                order: {
                    key: "createdAt",
                    value: "desc"
                }
            }, query: null
        }).then(res => {
            if (res) {
                const { statusCode, data, message } = res
                if (statusCode === 200) {
                    const newData = data.data.filter(item => item.roleId !== 1)
                    setListRoles(newData)
                } else {
                    toast.warn(message || 'Đã có lỗi xảy ra!')
                }
            }

        })
    }

    const handleChangeInput = (caseInput, value) => {
        // eslint-disable-next-line default-case
        switch (caseInput) {
            case "lastName":
                dataToAction.lastName = value.target.value
                setDataToAction({ ...dataToAction })
                break
            case "firstName":
                dataToAction.firstName = value.target.value
                setDataToAction({ ...dataToAction })
                break
            case "username":
                dataToAction.username = value.target.value
                setDataToAction({ ...dataToAction })
                break
            case "email":
                dataToAction.email = value.target.value
                setDataToAction({ ...dataToAction })
                break
            case "password":
                dataToAction.password = value.target.value
                setDataToAction({ ...dataToAction })
                break
            case "phoneNumber":
                dataToAction.phoneNumber = value.target.value
                setDataToAction({ ...dataToAction })
                break
            case "staffAvatar":
                dataToAction.staffAvatar = value.target.value
                setDataToAction({ ...dataToAction })
                break
            case "roleId":
                dataToAction.roleId = value.target.value
                setDataToAction({ ...dataToAction })
                break
            case "passwordToUpdate":
                setPasswordToUpdate(value.target.value)
                break
        }
    }
    const createAdminAccount = (params) => {
        Service.send({
            method: "POST", path: '/Staff/insertStaff', data: params, headers: {}
        })
            .then(res => {
                if (res) {
                    const { statusCode, message } = res
                    if (message === 'DUPLICATED_USER') {
                        toast.warn("Email đã được sử dụng")
                    }
                    else if (statusCode === 200) {
                        toast.success("Tạo mới thành công")
                        history.push('/account-admin/list')
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else { }

            })
    }
    const updateNewPassword = (params) => {
        Service.send({
            method: "POST", path: '/Staff/adminChangePasswordStaff', data: params, headers: {}
        })
            .then(res => {
                setTimeout(() => setIsLoadingSubmit(false), 500)
                if (res) {
                    const { statusCode, message } = res
                    if (statusCode === 200) {
                        toast.success("Cập nhật thành công")
                    }
                    else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else { }
            })
    }
    const updatePaymentMethod = (params) => {
        Service.send({
            method: "POST", path: '/Staff/updateStaffById', data: params, headers: {}
        })
            .then(res => {
                if (res) {
                    const { statusCode, message } = res
                    if (statusCode === 200) {
                        toast.success("Cập nhật thành công")
                        history.push('/account-admin/list')
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else { }

            })
    }
    function handleChangeImage(e) {
        setIsLoadingSubmit(true)
        const file = e?.target?.files[0]
        convertFileToBase64(file).then((dataUrl) => {
            const newData = dataUrl.replace(/,/gi, "").split("base64")
            if (newData[1]) {
                const dataImage = {
                    imageData: newData[1],
                    imageFormat: file.type.replace("image/", ""),
                }
                if (file.size > 10048576) {
                    return;
                }
                SystemConfig.uploadImage(dataImage).then(r => {
                    setIsLoadingSubmit(false)
                    dataToAction.staffAvatar = r
                    setDataToAction({ ...dataToAction })
                })
            }
        })
    }



    const validateUsername = (name) => {
        let regexUsername = /^[a-zA-Z0-9]+$/
        return !!name.match(regexUsername);
    }
    const validateEmail = (email) => {
        let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        return !!email.match(regexEmail);
    };
    const handleSubmit = () => {
        if (!props?.id) {
            if (dataToAction?.username?.length < 6 || dataToAction?.username?.length === undefined || validateUsername(dataToAction?.username) === false) {
                toast.warn("Tên tài khoản ít nhất 6 ký tự và không kí tự hoặc khoảng cách")
                return
            }
            if (dataToAction?.roleId === undefined || dataToAction?.roleId === null) {
                toast.warn("Vui lòng chọn vai trò")
                return
            }
            if (dataToAction?.password === undefined || dataToAction?.password === null) {
                toast.warn("Vui lòng nhập mật khẩu")
                return
            }
            /*if(dataToAction?.lastName === undefined || dataToAction?.lastName === null){
                toast.warn("Vui lòng nhập Họ")
                return
            }
            if(dataToAction?.firstName === undefined || dataToAction?.firstName === null){
                toast.warn("Vui lòng nhập Họ và tên")
                return
            }
            if(dataToAction.email===undefined || validateEmail(dataToAction?.email)===false){
                toast.warn("Email không hợp lệ")
                return
            }
            if(!dataToAction?.phoneNumber  || dataToAction?.phoneNumber.length !== 10){
                toast.warn("Vui lòng nhập Số điện thoại")
                return
            }*/
            createAdminAccount(dataToAction)
        }
        else {
            if (dataToAction?.roleId === undefined || dataToAction?.roleId === null) {
                toast.warn("Vui lòng chọn vai trò")
                return
            }
            /*if(dataToAction?.lastName === undefined || dataToAction?.lastName === null){
                toast.warn("Vui lòng nhập Họ của bạn")
                return
            }
            if(dataToAction?.firstName === undefined || dataToAction?.firstName === null){
                toast.warn("Vui lòng nhập Họ và tên của bạn")
                return
            }
            if(!dataToAction?.phoneNumber  || dataToAction?.phoneNumber.length !== 10){
                toast.warn("Số điện thoại 10 số")
                return
            }*/
            dataToAction.username = undefined
            dataToAction.password = undefined
            // dataToAction.email = undefined
            setDataToAction({ ...dataToAction })
            updatePaymentMethod({
                id: props?.id,
                data: {
                    ...dataToAction
                }
            })
            // if(passwordToUpdate!==undefined && passwordToUpdate!=="" && passwordToUpdate !==null){
            //     updateNewPassword({
            //         id:props?.id,
            //         newPassword:passwordToUpdate
            //     })
            // }
        }
    }
    const handleUpdatePassword = () => {
        if (passwordToUpdate !== undefined && passwordToUpdate !== "" && passwordToUpdate !== null) {
            setIsLoadingSubmit(true)
            updateNewPassword({
                id: props?.id,
                newPassword: passwordToUpdate
            })
            setIsOpenModal(false)
        }
        else {
            toast.warn("Vui lòng nhập mật khẩu mới")
        }
    }

    return (
        <div className={"admin-detail"}>
            {isLoadingSubmit ? <Loader /> : null}
            <Card className={"p-2 detail-input"}>
                <h2 className={"detail-title mb-3"} >{props.title}</h2>

                <Row>
                    <Col lg={2} id={'render-image2'} className={"text-center"}>
                        <Avatar img={dataToAction?.staffAvatar ? dataToAction?.staffAvatar : DefaultAvatar} imgHeight={'88'} imgWidth={'88'} width='88' height='88' style={{ marginBottom: "14px" }} />
                        {
                            !props?.disabled &&
                            <Media className="flex-column flex-md-row" style={{ display: "block" }}>
                                <Media body>
                                    <div className="d-inline-block input-add-image">
                                        <FormGroup className="mb-0 position-relative" >
                                            <CustomInput
                                                // label={'Tải hình'}
                                                type="file"
                                                id="exampleCustomFileBrowser"
                                                name="customFile"
                                                onChange={handleChangeImage}
                                                multiple={'multiple'}
                                                accept=".jpg, .png, .gif"
                                            />
                                            <p className={'content-input'}>
                                                Thay đổi ảnh
                                            </p>
                                        </FormGroup>
                                    </div>
                                </Media>
                            </Media>
                        }
                    </Col>
                    <Col>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Tên tài khoản</Label>
                                    <Input
                                        value={dataToAction.username || ""}
                                        onChange={e => handleChangeInput("username", e)}
                                        disabled={!!props?.id}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Vai trò</Label>
                                    <Select
                                        getOptionValue={option => option?.roleId}
                                        getOptionLabel={option => option?.roleName}
                                        isClearable={false}
                                        className='react-select'
                                        classNamePrefix='select'
                                        options={listRoles}
                                        placeholder={'Vai trò'}
                                        value={listRoles?.find(item => item.roleName === roleName)}
                                        onChange={(value) => {
                                            setRoleName(value.roleName)
                                            dataToAction.roleId = value.roleId
                                            setDataToAction({ ...dataToAction })
                                        }}
                                        isDisabled={props.disabled}
                                    />
                                </FormGroup>
                            </Col>
                            {
                                !props?.id &&
                                <Col lg={4}>

                                    <FormGroup>
                                        <Label>Mật khẩu</Label>
                                        <Input
                                            autoComplete="new-password"
                                            type={"password"}
                                            value={dataToAction.password || ""}
                                            onChange={e => handleChangeInput("password", e)}
                                        />
                                    </FormGroup>
                                </Col>
                            }
                            {/*{*/}
                            {/*    props?.id && !props.disabled &&*/}
                            {/*    <Col lg={4}>*/}
                            {/*        <FormGroup>*/}
                            {/*            <Label>Mật khẩu mới</Label>*/}
                            {/*            <Input*/}
                            {/*                type={"password"}*/}
                            {/*                value={passwordToUpdate ||""}*/}
                            {/*                onChange={e=>handleChangeInput("passwordToUpdate",e)}*/}
                            {/*                placeholder={"Để rỗng sẽ là mật khẩu cũ"}*/}
                            {/*            />*/}
                            {/*        </FormGroup>*/}
                            {/*    </Col>*/}
                            {/*}*/}
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Họ và tên</Label>
                                    <Input
                                        value={dataToAction.firstName || ""}
                                        onChange={e => handleChangeInput("firstName", e)}
                                        disabled={props.disabled} />
                                </FormGroup>
                            </Col>
                            {/*<Col lg={4}>
                                <FormGroup>
                                    <Label>Tên</Label>
                                    <Input
                                        value={dataToAction.firstName ||""}
                                        onChange={e=>handleChangeInput("firstName",e)}
                                        disabled={props.disabled}/>
                                </FormGroup>
                            </Col>*/}
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Email</Label>
                                    <Input
                                        type={"email"}
                                        value={dataToAction.email || ""}
                                        onChange={e => handleChangeInput("email", e)}
                                        disabled={false} />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label>Số điện thoại</Label>
                                    <Input
                                        type={"number"}
                                        value={dataToAction.phoneNumber || ""}
                                        onChange={e => handleChangeInput("phoneNumber", e)}
                                        disabled={props.disabled} />
                                </FormGroup>
                            </Col>
                            {
                                props?.disabled &&
                                <>
                                    <Col lg={4}>
                                        <FormGroup>
                                            <Label>Ngày tạo</Label>
                                            <Input
                                                value={convertTimeDate(props?.data?.createdAt || "")}
                                                disabled={props.disabled} />
                                        </FormGroup>
                                    </Col>
                                    <Col lg={4}>
                                        <FormGroup>
                                            <Label>Cập nhật lần cuối</Label>
                                            <Input
                                                value={convertTimeDate(props?.data?.updatedAt || "")}
                                                disabled={props.disabled} />
                                        </FormGroup>
                                    </Col>
                                </>
                            }
                        </Row>
                    </Col>
                </Row>
            </Card>
            <div className={'d-flex justify-content-end align-items-center'}>
                <Button color={'primary'} className={'mr-2'} onClick={() => history.push('/account-admin/list')}>
                    Trở lại
                </Button>
                {
                    props?.id && !props.disabled &&
                    <Button color={'primary'} type={'button'} className={'mr-2'}
                        onClick={() => setIsOpenModal(true)}
                    >
                        Đổi mật khẩu
                    </Button>
                }
                {
                    !props?.disabled &&
                    <Button color={'primary'} type={'button'}
                        onClick={() => handleSubmit()}
                    >
                        {props?.id ? 'Cập nhật' : 'Lưu'}
                    </Button>
                }

            </div>
            <ModalUpdatePassword id={props.id} IsOpenModal={IsOpenModal} handleChangeInput={handleChangeInput} setPasswordToUpdate={setPasswordToUpdate} passwordToUpdate={passwordToUpdate} setIsOpenModal={setIsOpenModal} handleUpdatePassword={handleUpdatePassword} />
        </div>
    )

}
export default AdminDetail