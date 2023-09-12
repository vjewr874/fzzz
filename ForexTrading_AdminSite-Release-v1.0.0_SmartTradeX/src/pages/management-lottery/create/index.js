import LotteryInfo from "../components/lottery-info/LotteryInfo"
import {useEffect, useState} from "react";
import SystemConfig from "../../../services/systemConfig";

const Create = () => {
    const [data, setData] = useState(null)
    useEffect(() => {
        getInfoSystem()
    }, [])

    function getInfoSystem () {
        SystemConfig.showSystemConfig().then(r => {
            setData(r?.data?.data[0])
        })
    }
    return (
        <div id={'create-lottery'}>
            <LotteryInfo title={'Nhập vé mới'} infoPrice={data}/>
        </div>
    )
}
export default Create