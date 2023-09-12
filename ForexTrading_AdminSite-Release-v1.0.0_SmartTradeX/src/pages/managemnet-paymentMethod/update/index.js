import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Service from "../../../services/request";
import {toast} from "react-toastify";
import PaymentMethodInfo from "../components/paymentMethodInfo/PaymentMethodInfo";

const Update = ()=>{
    const [dataDetailPayMethod,setDataDetailPayMethod]=useState(null)
    const {id} = useParams()
    useEffect(()=>{
        getDataDetailPayMethod()
    },[])
    const getDataDetailPayMethod=()=>{
        Service.send({
            method:"POST",path:'/PaymentMethod/findById',data:{id:id},headers : {}
        })
            .then(res=>{
                if (res) {
                    const { statusCode, data, message } = res
                    if (statusCode === 200) {
                        setDataDetailPayMethod(data)
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else {}

            })
    }
    return(
        <div className={"update"}>
            <PaymentMethodInfo disabled={false} id={id} data={dataDetailPayMethod} title={"Cập nhật Phương thức thanh toán"}/>
        </div>
    )
}
export default Update