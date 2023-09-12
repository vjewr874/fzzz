import React, {useEffect, useState} from "react"
import {Button, Card, Col, FormGroup, Input, Label, Row} from "reactstrap"
import Flatpickr from "react-flatpickr"
import "flatpickr/dist/themes/material_blue.css"
import Select from "react-select"
import RenderImage from "../render-image/render-image"
import {PRODUCT_CHANNEL} from "../../../../constants/province1"
import {LOTTERY_TYPE} from "../../../../constants/lotteryType"
import {toast} from "react-toastify"
import LotteryList from "../../../../services/lotteryList"
import {useHistory} from "react-router-dom"
import "./style/lotteryInfo.scss"
import {convertFileToBase64} from "../../../../helper/common"
import moment from "moment/moment"
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf"
import PDFJSWorker from 'pdfjs-dist/legacy/build/pdf.worker.entry'
const lotteryType = LOTTERY_TYPE


const LotteryInfo = (props) => {
    const [productTitle, setProductTitle] = useState(null)
    const [quantity, setQuantity] = useState(1)
    const [productType, setProductType] = useState("SINGLE")
    const [productChannel, setProductChannel] = useState(null)
    const [productImage, setProductImage] = useState([])
    const [expireDate, setExpireDate] = useState("")
    const date = (new Date()).getHours() > 16 ? moment(new Date((new Date()).getTime() + 86400000)).format('YYYY-MM-DD 07:00:00.000') : (new Date()).getHours() < 16 ? moment(new Date()).format('YYYY-MM-DD 07:00:00.000') : (new Date()).getMinutes() > 15 ?  moment(new Date((new Date()).getTime() + 86400000)).format('YYYY-MM-DD 07:00:00.000') : moment(new Date()).format('YYYY-MM-DD 07:00:00.000')
    const [productChannels, setProductChannels] = useState([])
    const history = useHistory()
    const [imageUpdate,setImageUpdate]=useState(undefined)
    const [stockQuantity,setStockQuantity]=useState(undefined)
    const [pricePerLottery,setPricePerLottery]=useState(undefined)
    useEffect(() => {
        setProductTitle(props?.lotteryInfo?.productTitle)
        setQuantity(props?.lotteryInfo?.quantity || 1)
        setProductType(props?.lotteryInfo?.productType || "SINGLE")
        setProductChannel(props?.lotteryInfo?.productChannel)
        setProductImage(props?.lotteryInfo?.productImages || [])
        setImageUpdate(handleImageToUpdate(props?.lotteryInfo?.productImages))
        setExpireDate(date)
        setStockQuantity(props?.lotteryInfo?.stockQuantity ||"0")
        setPricePerLottery(parseInt(props?.lotteryInfo?.price) / parseInt(props?.lotteryInfo?.quantity))
    }, [props?.lotteryInfo])

    useEffect(()=>{
        setPricePerLottery(props?.infoPrice?.ticketPrice)
    },[props?.infoPrice?.ticketPrice])
    const handleImageToUpdate=(data)=>{
        const arr=[]
        if (data?.length > 0) {
            data?.forEach(item=>{
                arr.push(item.productImageUrl)
            })
        }
        return arr
    }

    function createLottery (dataCreate) {
        LotteryList.createProduct(dataCreate).then(res => {
            if (res) {
                const { statusCode, message } = res
                if (statusCode === 200) {
                    toast.success('Tạo mới thành công')
                    history.push('/lottery/list')
                } else {
                    toast.warn(message || 'Đã có lỗi xảy ra!')
                }
            } else {}
        })
    }
    const updateLottery = (dataUpdate) => {
        LotteryList.updateProduct(dataUpdate).then(res => {
            if (res) {
                const { statusCode, message } = res
                if (statusCode === 200) {
                    toast.success('Cập nhật vé sô thành công')
                    history.push(`/lottery/detail/${props.id}`)
                } else {
                    toast.warn(message || 'Đã có lỗi xảy ra!')
                }
            } else {}
        })
    }

    const handleChangeChannel = (value) => {
        setProductChannel(value?.value)
    }
    const handleChangeType = (value) => {
        setProductType(value?.value)

        value.value==="SINGLE"? setQuantity(1) : setQuantity(110)
    }
    const handleChangeInput = (e, name) => {
        switch (name) {
            case 'productTitle' :
                setProductTitle(e?.target?.value)
                break
            case 'quantity' :
                setQuantity(e?.target?.value)
                break
            case 'stockQuantity' :
                setStockQuantity(e?.target?.value)
                break
            case 'pricePerLottery' :
                setPricePerLottery(e?.target?.value)
                break
            default:
                break
        }
    }
    const handleChangeDate = (_, date) => {
        setProductChannel(undefined)
        setExpireDate(date)
    }
    const handleSubmit = () => {
        if (!productTitle) {
            toast.warn('Vui lòng nhập bộ số')
            return
        }
        if (!quantity) {
            toast.warn('Vui lòng nhập số lượng vé/ cộc vé')
            return
        }
        if (!productChannel) {
            toast.warn('Vui lòng chọn tên đài')
            return
        }
        if (!productType) {
            toast.warn('Vui lòng chọn loại vé')
            return
        }
        if (!expireDate) {
            toast.warn('Vui lòng chọn ngày xổ')
            return
        }
        if (!stockQuantity) {
            toast.warn('Vui lòng Số lượng vé tồn kho')
            return
        }
        if (!pricePerLottery) {
            toast.warn('Giá tiền 1 vé')
            return
        }
        if (!props?.id) {
            const data = {
                productTitle: productTitle,
                quantity: parseInt(quantity),
                productChannel: productChannel,
                productType: productType,
                // stockQuantity: props.id? imageUpdate?.length: productImage.length,
                stockQuantity:stockQuantity,
                // price: productType === 'SINGLE' ? props?.infoPrice?.ticketPrice : props?.infoPrice?.ticketPrice * parseInt(quantity),
                price:pricePerLottery*parseInt(quantity),
                expireDate: expireDate,
                productImages: productImage || undefined
            }
            if(productType==="SINGLE"){
                if(parseInt(stockQuantity)!==productImage.length){
                    toast.warn("Số lượng ảnh và số lượng vé tồn không khớp")
                }
                else{
                    createLottery(data)
                }
            }
            else{
                if(parseInt(stockQuantity) !==productImage.length){
                    toast.warn("Số lượng ảnh và số lượng vé tồn không khớp")
                }
                else{
                    createLottery(data)

                }
            }


        } else {
            const data = {
                id: parseInt(props?.id),
                data: {
                    productTitle: productTitle,
                    productChannel: productChannel,
                    productType: productType,
                    quantity: parseInt(quantity),
                    // stockQuantity: props.id? imageUpdate?.length: productImage.length,
                    stockQuantity:stockQuantity,
                    // price: productType === 'SINGLE' ? props?.infoPrice?.ticketPrice : props?.infoPrice?.ticketPrice * parseInt(quantity),
                    price:pricePerLottery*parseInt(quantity),
                    expireDate: expireDate,
                    productImages: imageUpdate || undefined
                }
            }
            if(productType==="SINGLE"){
                if(parseInt(stockQuantity)!==imageUpdate.length){
                    toast.warn("Số lượng ảnh và số lượng vé không khớp")
                }
                else{
                    updateLottery(data)
                }
            }
            else{
                if((parseInt(stockQuantity)) !==imageUpdate.length){
                    toast.warn("Số lượng ảnh và số lượng vé tồn không khớp)")
                }
                else{
                    updateLottery(data)
                }
            }

        }
    }
    const readFileData = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result);
            };
            reader.onerror = (err) => {
                reject(err);
            };
            reader.readAsDataURL(file);
        });
    };
    const rotateBase64Image = (base64data) => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const image = new Image();
        image.src = base64data;
        return new Promise(resolve => {
            image.onload = () => {
                canvas.setAttribute('width', image.height);
                canvas.setAttribute('height', image.width);
                ctx.rotate(270 * Math.PI / 180);
                ctx.drawImage(image, image.width * (-1), 0);
                resolve(canvas.toDataURL())
            };
        })
    }
    const onChangeImage = async (e) => {
        const files = e.target.files
        if (files.length !== 0) {
            for (let i = 0; i < files?.length; i++) {
                let type=files[i].type.replace("image/", "")
                if(type === 'jpg'|| type==='png' ||  type==='jpeg')
                {
                    convertFileToBase64(files[i]).then((dataUrl) => {
                        const newData = dataUrl.replace(/,/gi, "").split("base64")
                        if (newData[1]) {
                            const data = {
                                imageData: newData[1],
                                imageFormat: files[i].type.replace("image/", ""),
                            }
                            if (files[i].size > 10048576) {
                                return;
                            }
                            LotteryList.uploadImage(data).then(r => {
                                if (r) {
                                    productImage.push(r)
                                    imageUpdate.push(r)
                                    setProductImage([...productImage])
                                    setImageUpdate([...imageUpdate])
                                    if(!props?.id){
                                        setStockQuantity(productImage?.length)
                                    }
                                }
                            })
                        }
                    })

                }
                else {
                    toast.warn("Có file không là hình ảnh")
                }
            }

        }

    }

    const handleRemoveImage = (index) => {
        productImage.splice(index, 1)
        setProductImage([...productImage])
        imageUpdate.splice(index, 1)
        setImageUpdate([...imageUpdate])
        if(!props?.id){
            setStockQuantity(productImage?.length)
        }

    }

    useEffect(() => {
        getProductChannels()
    }, [expireDate])
    function getProductChannels(){
        switch ((new Date(expireDate ? expireDate : date).getDay())) {
            case 0:
                setProductChannels([
                    {
                        label: "Chọn tên đài",
                        value: undefined
                    },
                    {
                        label: 'TIỀN GIANG',
                        value:  PRODUCT_CHANNEL.TIEN_GIANG
                    },
                    {
                        label: 'KIÊN GIANG',
                        value:  PRODUCT_CHANNEL.KIEN_GIANG
                    },
                    {
                        label: 'ĐÀ LẠT',
                        value:  PRODUCT_CHANNEL.DA_LAT
                    }
                ])
                break
            case 1:
                setProductChannels([
                    {
                        label: "Chọn tên đài",
                        value: undefined
                    },
                    {
                        label: 'TP.HCM',
                        value:  PRODUCT_CHANNEL.TPHCM
                    },
                    {
                        label: 'ĐỒNG THÁP',
                        value:  PRODUCT_CHANNEL.DONG_THAP
                    },
                    {
                        label: 'CÀ MAU',
                        value:  PRODUCT_CHANNEL.CA_MAU
                    }
                ])
                break
            case 2:
                setProductChannels([
                    {
                        label: "Chọn tên đài",
                        value: undefined
                    },
                    {
                        label: 'BẾN TRE',
                        value:  PRODUCT_CHANNEL.BEN_TRE
                    },
                    {
                        label: 'VŨNG TÀU',
                        value:  PRODUCT_CHANNEL.VUNG_TAU
                    },
                    {label: 'BẠC LIÊU',
                        value:  PRODUCT_CHANNEL.BAC_LIEU
                    }
                ])
                break
            case 3:
                setProductChannels([
                    {
                        label: "Chọn tên đài",
                        value: undefined
                    },
                    {
                        label: 'ĐỒNG NAI',
                        value:  PRODUCT_CHANNEL.DONG_NAI
                    },
                    {
                        label: 'CẦN THƠ',
                        value:  PRODUCT_CHANNEL.CAN_THO
                    },
                    {
                        label: 'SÓC TRĂNG',
                        value:  PRODUCT_CHANNEL.SOC_TRANG
                    }
                ])
                break
            case 4:
                setProductChannels([
                    {
                        label: "Chọn tên đài",
                        value: undefined
                    },
                    {
                        label: 'TÂY NINH',
                        value:  PRODUCT_CHANNEL.TAY_NINH
                    },
                    {
                        label: 'AN GIANG',
                        value:  PRODUCT_CHANNEL.AN_GIANG
                    },
                    {
                        label: 'BÌNH THUẬN',
                        value:  PRODUCT_CHANNEL.BINH_THUAN
                    }
                ])
                break
            case 5:
                setProductChannels([
                    {
                        label: "Chọn tên đài",
                        value: undefined
                    },
                    {
                        label: 'VĨNH LONG',
                        value:  PRODUCT_CHANNEL.VINH_LONG
                    },
                    {
                        label: 'BÌNH DƯƠNG',
                        value:  PRODUCT_CHANNEL.BINH_DUONG
                    },
                    {
                        label: 'TRÀ VINH',
                        value:  PRODUCT_CHANNEL.TRA_VINH
                    }
                ])
                break
            case 6:
                setProductChannels([
                    {
                        label: "Chọn tên đài",
                        value: undefined
                    },
                    {
                        label: 'TP.HCM',
                        value:  PRODUCT_CHANNEL.TPHCM
                    },
                    {
                        label: 'LONG AN',
                        value:  PRODUCT_CHANNEL.LONG_AN
                    },
                    {
                        label: 'HẬU GIANG',
                        value:  PRODUCT_CHANNEL.HAU_GIANG
                    },
                    {
                        label: 'BÌNH PHƯỚC',
                        value:  PRODUCT_CHANNEL.BINH_PHUOC
                    }
                ])
                break
            default:
                break
        }
    }

    const onChangePdf=async (e) => {
        const files = e.target.files
        if (files.length !== 0) {
            for (let i = 0; i < files?.length; i++) {
                if (files[i].type === 'application/pdf') {
                    const data = await readFileData(files[i]);
                    const pdf = await pdfjsLib.getDocument(data).promise
                    const canvas = document.createElement("canvas");
                    for (let i = 0; i < pdf.numPages; i++) {
                        const page = await pdf.getPage(i + 1);
                        const viewport = page.getViewport({scale: 1});
                        const context = canvas.getContext("2d");
                        canvas.height = viewport.height;
                        canvas.width = viewport.width;
                        await page.render({canvasContext: context, viewport: viewport}).promise;
                        let newData

                        if (canvas.width < canvas.height) {
                            const rotatedImg = await rotateBase64Image(canvas.toDataURL())
                            newData = rotatedImg.replace(/,/gi, "").split("base64")
                        } else {
                            newData = canvas.toDataURL().replace(/,/gi, "").split("base64")
                        }
                        if (newData[1]) {
                            const params = {
                                imageData: newData[1],
                                imageFormat: "png"
                            }
                            if (data.size > 10048576) {
                                toast.warn("Dung lượng file quá lớn")
                                return;
                            }

                            LotteryList.uploadImage(params).then(r => {
                                if (r) {
                                    productImage.push(r)
                                    imageUpdate.push(r)
                                    setProductImage([...productImage])
                                    setImageUpdate([...imageUpdate])
                                    if(!props?.id){
                                        setStockQuantity(productImage?.length)
                                    }
                                }
                            })
                        }
                    }
                    canvas.remove();
                }
                else {
                    toast.warn("Có file không là pdf")
                }
            }
        }

    }

    return (
        <div className={"lottery-info-custom"}>
            <Card className={'p-2'}>
                <h3 className={"detail-title mb-2"}>{props?.title}</h3>
                <Row className={"detail-input"}>
                    <Col xs={4}>
                        <FormGroup>
                            <Label>
                                Bộ số
                            </Label>
                            <Input
                                className={"custom-input-pj"}
                                type={'text'}
                                placeholder={'Nhập bộ số'}
                                onChange={(e) => handleChangeInput(e, 'productTitle')}
                                value={productTitle || ''}
                                disabled={props?.disabled}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={4}>
                        <FormGroup>
                            <Label>
                                Tên đài
                            </Label>
                            <Select
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={productChannels}
                                placeholder={'Chọn tên đài'}
                                value={productChannels?.find(channel => channel.value === productChannel)}
                                onChange={(value) => handleChangeChannel(value)}
                                isDisabled={props?.disabled}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={4}>
                        <FormGroup>
                            <Label>
                                Ngày Xổ
                            </Label>
                            <Flatpickr
                                defaultValue={date}
                                options={{minDate: date}}
                                id='startDate'
                                className={`form-control ${!props?.disabled ? 'form-control__date' : ''} custom-flatpickr-pj`}
                                onChange={(_, date) => handleChangeDate(_, date)}
                                disabled={props?.disabled}
                            />
                        </FormGroup>
                    </Col>
                    <Col xs={4}>
                        <FormGroup>
                            <Label>
                                Loại vé
                            </Label>
                            <Select
                                isClearable={false}
                                className='react-select'
                                classNamePrefix='select'
                                options={lotteryType}
                                placeholder={'Chọn loại vé'}
                                value={lotteryType?.find(lottery => lottery.value === productType)}
                                onChange={(value) => handleChangeType(value)}
                                isDisabled={props?.disabled}
                            />
                        </FormGroup>
                    </Col>
                    {
                        productType==="BATCH" &&
                        <Col xs={4}>
                            <FormGroup>
                                <Label>
                                    Số lượng vé / cộc vé
                                </Label>
                                <Input
                                    className={"custom-input-pj"}
                                    type={'number'}
                                    onChange={(e) => handleChangeInput(e, 'quantity')}
                                    value={quantity || ''}
                                    disabled={props?.disabled}
                                />
                            </FormGroup>
                        </Col>
                    }
                    {
                        // props.id &&
                        <Col xs={4}>
                            <FormGroup>
                                <Label>
                                    Số lượng vé tồn kho
                                </Label>
                                <Input
                                    className={"custom-input-pj"}
                                    type={'number'}
                                    onChange={(e) => handleChangeInput(e, 'stockQuantity')}
                                    value={stockQuantity || ''}
                                    disabled={props?.id}
                                />
                            </FormGroup>
                        </Col>
                    }
                   <Col xs={4}>
                       <FormGroup>
                           <Label>
                               Giá tiền 1 vé
                           </Label>
                           <Input
                               className={"custom-input-pj"}
                               type={'number'}
                               placeholder={'Giá tiền 1 vé'}
                               onChange={(e) => handleChangeInput(e, 'pricePerLottery')}
                               value={pricePerLottery || ""}
                               disabled={props?.disabled}
                           />
                       </FormGroup>
                   </Col>
                </Row>
                <RenderImage onChangeImage={onChangeImage} onChangePdf={onChangePdf} productImage={productImage} handleRemoveImage={handleRemoveImage} disabled={props?.disabled}/>
            </Card>
            <div className={'d-flex justify-content-end align-items-center'}>
                <Button color={'primary'} className={'mr-2'}
                        // onClick={() => history.push('/lottery/list')}
                        onClick={() => history.go(-1)}
                >
                    Trở lại
                </Button>
                {
                    !props?.disabled &&
                    <Button  color={'primary'} type={'button'} onClick={() => handleSubmit()}>
                        {props?.id ? 'Cập nhật'  :'Lưu'}
                    </Button>
                }
            </div>
        </div>
    )
}
export default LotteryInfo