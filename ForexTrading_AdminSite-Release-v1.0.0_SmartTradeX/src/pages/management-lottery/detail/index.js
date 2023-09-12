import LotteryInfo from "../components/lottery-info/LotteryInfo"
import {useParams} from "react-router-dom"
import LotteryList from "../../../services/lotteryList";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";

const Detail = () => {
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
            <LotteryInfo title={'Chi tiết vé'} disabled={true} id={id} lotteryInfo={data}/>
        </div>
    )
}
export default Detail