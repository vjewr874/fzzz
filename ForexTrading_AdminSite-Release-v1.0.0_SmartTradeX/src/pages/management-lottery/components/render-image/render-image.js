import React from "react"
import './styles/render-image.scss'
import {Col, CustomInput, FormGroup, Media, Row} from "reactstrap"

import icClose from '../../../../assets/images/ic-close.svg'
import noImage from '../../../../assets/images/img-pictures.png'
import {Plus} from "react-feather"

const RenderImage = (props) => {
    return (
        <div id={'render-image'}>
            {
                !props?.disabled &&
                <Media className="flex-column flex-md-row">
                    <Media body>
                        <div className="d-inline-block input-add-image d-flex justify-content-between align-items-end">
                           <div className={"d-flex"}>
                               <FormGroup className="mb-0 position-relative" style={{marginTop: 50,marginRight:20}}>
                                   <CustomInput
                                       label={'Tải hình'}
                                       type="file"
                                       id="exampleCustomFileBrowser"
                                       name="customFile"
                                       onChange={props.onChangeImage}
                                       multiple={'multiple'}
                                       accept=".jpg, .png, .jpeg"
                                   />
                                   <p className={'content-input'}>
                                       <Plus size={17} style={{marginTop:"-2px",marginRight:"10px"}}/>
                                       Tải hình
                                   </p>
                               </FormGroup>
                               <FormGroup className="mb-0 position-relative" style={{marginTop: 50}}>
                                   <CustomInput
                                       label={'Tải hình'}
                                       type="file"
                                       id="exampleCustomFileBrowser"
                                       name="customFile"
                                       onChange={props.onChangePdf}
                                       multiple={'multiple'}
                                       accept="application/pdf"
                                   />
                                   <p className={'content-input'}>
                                       <Plus size={17} style={{marginTop:"-2px",marginRight:"10px"}}/>
                                       Tải PDF
                                   </p>
                               </FormGroup>
                           </div>
                            <p>Số lượng: {props?.productImage?.length}</p>
                        </div>
                    </Media>
                </Media>
            }
            <div className={'container-image'}>
                <Row className={props.productImage.length === 0 ? 'justify-content-center' : ''}>
                    {
                        props.productImage.length > 0 &&
                        props.productImage.map((image, index) => {
                            return (
                                <Col xs={3} key={index}>
                                    <div className={'image__lottery'}>
                                        {
                                            !props?.disabled &&
                                            <img className={'image-close'} src={icClose} alt="" onClick={() => props?.handleRemoveImage(index)}/>
                                        }
                                        <div className={'image'} style={{backgroundImage: `url('${image?.productImageUrl || image}')`}}/>
                                    </div>
                                </Col>
                            )
                        })
                    }
                    {
                        props.productImage.length === 0 &&
                        <Col xs={3}>
                            <div className={'image__lottery'}>
                                <div className={'image'} style={{backgroundImage: `url('${noImage}')`, backgroundSize: 'contain', backgroundPosition: 'center'}}/>
                            </div>
                        </Col>
                    }
                </Row>
            </div>
        </div>
    )
}
export default RenderImage