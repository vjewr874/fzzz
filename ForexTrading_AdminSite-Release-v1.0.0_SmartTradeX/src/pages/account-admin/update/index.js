import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Service from "../../../services/request";
import {toast} from "react-toastify";
import AdminDetail from "../component/AdminDetail";

const Update=()=>{
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
        <div className={"update-admin"}>
            <AdminDetail disabled={false} id={id} data={dataDetailAccount} title={"Cập nhật nhân viên"}/>
        </div>
    )
}
export default Update