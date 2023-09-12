import LotteryInfo from "../components/lottery-info/LotteryInfo"
import {useParams} from "react-router-dom"
import LotteryList from "../../../services/lotteryList"
import {toast} from "react-toastify"
import {useEffect, useState} from "react"
import SystemConfig from "../../../services/systemConfig";

const Edit = () => {
    const [data, setData] = useState(null)
    const [dataInfo, setDataInfo] = useState(null)
    const {id} = useParams()
    useEffect(() => {
        detailLottery()
    },[id])
    useEffect(() => {
        getInfoSystem()
    }, [])
    function getInfoSystem () {
        SystemConfig.showSystemConfig().then(r => {
            setDataInfo(r?.data?.data[0])
        })
    }
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
            <LotteryInfo title={'Cập nhật vé'} id={id} lotteryInfo={data} infoPrice={dataInfo}/>
        </div>
    )
}
export default Edit