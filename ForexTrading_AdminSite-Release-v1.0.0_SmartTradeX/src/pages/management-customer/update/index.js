import {useParams} from "react-router-dom"
import LotteryList from "../../../services/lotteryList"
import {toast} from "react-toastify"
import {useEffect, useState} from "react"
import CustomerInfo from "../components/customer-info/CustomerInfo";

const Edit = () => {
    const [data, setData] = useState(null)
    const {id} = useParams()
    useEffect(() => {
        detailLottery()
    },[id])
    function detailLottery () {
        LotteryList.detailProduct({id: id}).then(res => {
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
            <CustomerInfo title={'Cập nhật vé'} id={id} lotteryInfo={data}/>
        </div>
    )
}
export default Edit