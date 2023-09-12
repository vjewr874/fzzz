import {useParams} from "react-router-dom"
import NotificationList from "../../../services/notification";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import NotificationInfo from "../components/notification-info/NotificationInfo";

const Detail = () => {
    const [data, setData] = useState(null)
    const {id} = useParams()
    useEffect(() => {
        detailLottery()
    },[id])
    function detailLottery () {
        NotificationList.detailNotification({id: id}).then(res => {
            if (res) {
                const { statusCode, data, message } = res
                if (statusCode === 200) {
                    setData(data)
                } else {
                    toast.warn(message || 'Đã có lỗi xảy ra!')
                }
            } else {}
        })
    }
    return (
        <div>
            <NotificationInfo title={'Chi tiết thông báo'} disabled={true} id={id} notificationInfo={data}/>
        </div>
    )
}
export default Detail