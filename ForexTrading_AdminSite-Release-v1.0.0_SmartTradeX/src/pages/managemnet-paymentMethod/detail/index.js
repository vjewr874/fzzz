import PaymentMethodInfo from "../components/paymentMethodInfo/PaymentMethodInfo";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom"
import Service from "../../../services/request";
const Detail = ()=>{
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
        <div className={"detail"}>
            <PaymentMethodInfo disabled={true} id data={dataDetailPayMethod} title={"Chi tiết Phương thức thanh toán"}/>
        </div>
    )
}
export default Detail