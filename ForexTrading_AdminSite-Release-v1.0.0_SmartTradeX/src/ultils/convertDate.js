import moment from "moment";

export const convertTimeDate=(value)=>{
    return moment(value?.toString()).format("HH:mm   DD/MM/YYYY")
}
export const convertDateVN=(value)=>{
    return moment(value?.toString()).format("DD/MM/YYYY")
}