import PaymentMethodInfo from "../components/paymentMethodInfo/PaymentMethodInfo";


const Create = ()=>{
    return(
        <div className={"contentInfo"}>
            <PaymentMethodInfo
                disabled={false} title={"Tạo mới Phương thức thanh toán"}
            />
        </div>
    )
}
export default Create