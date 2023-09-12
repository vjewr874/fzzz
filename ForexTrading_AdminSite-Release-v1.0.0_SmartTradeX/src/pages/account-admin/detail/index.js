import AdminDetail from "../component/AdminDetail";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Service from "../../../services/request";
import {toast} from "react-toastify";

const Detail=()=>{
    const [dataDetailAccount,setDataDetailAccount]=useState(null)
    const {id} = useParams()
    useEffect(()=>{
        getDataDetailAccount()
    },[])
    const getDataDetailAccount=()=>{
        Service.send({
            method:"POST",path:'/Staff/getDetailStaff',data:{id:id},headers : {}
        })
            .then(res=>{
                if (res) {
                    const { statusCode, data, message } = res
                    if (statusCode === 200) {
                        setDataDetailAccount(data)
                    } else {
                        toast.warn(message || 'Đã có lỗi xảy ra!')
                    }
                } else {}

            })
    }

    return(
        <div className={"detail-admin"}>
            <AdminDetail disabled={true} id data={dataDetailAccount} title={"Chi tiết nhân viên"}/>
        </div>
    )
}
export default Detail