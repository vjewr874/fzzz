import {Link} from "react-router-dom";
// import {convertTimeDate} from "../../../ultils/convertDate";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import { FileText, MoreVertical} from "react-feather";
import React from "react";
import {currencyFormat} from "../../../ultils/currentFormacy";
import {convertTimeDate} from "../../../ultils/convertDate";

// const statusObj = {
//     active: 'light-success',
//     notActive:'light-danger'
// }
export const columns=(setIsOpenModal,handleDataToDelete)=>[
    {
        name: 'ID',
        minWidth: '80px',
        maxWidth: "120px",
        selector: 'smsMessageId',
        cell: row => (
            <Link
                to={`/MessageSMS/detail/${row?.smsMessageId}`}
                className='user-name text-truncate mb-0'>
                <span>{row?.smsMessageId}</span>
            </Link>
        )
    },
    {
        name: 'ID KHÁCH HÀNG',
        minWidth: '160px',
        selector: 'paymentMethodName',
        cell:row =>
            <Link
                to={`/customer/detail/${row?.smsMessageAppUserId}`}
                className='user-name text-truncate mb-0'>
                <span>{row?.smsMessageAppUserId}</span>
            </Link>
    }
    ,
    {
        name: "SỐ TIỀN",
        minWidth: '200px',
        selector: 'createdAt',
        cell: row => (
            currencyFormat(row?.smsMessageBalanceAmount || "")
        )
    },
    {
        name: "SMS HASH",
        minWidth: '220px',
        selector: 'smsHash',
        cell: row => <div style={{overflow:"hidden"}}><p style={{ whiteSpace:"nowrap",
            WebkitLineClamp:1,
            WebkitBoxOrient:"vertical",
            textOverflow:"ellipsis",
        }}>{row?.smsHash}</p></div>
    }
    ,
    {
        name: 'NỘI DUNG TIN NHẮN',
        minWidth: '300px',
        maxWidth:"600px",
        selector: 'smsMessageContent',
        cell: row => <div style={{overflow:"hidden"}}><p style={{ whiteSpace:"nowrap",
            WebkitLineClamp:1,
            WebkitBoxOrient:"vertical",
            textOverflow:"ellipsis",
        }}>{row?.smsMessageContent}</p></div>
    },
    {
        name: "THÒI GIAN NHẬN",
        minWidth: '160px',
        cell: row => (
            `${row.smsReceiveMessageTime} - ${row.smsReceiveMessageDate}`
        )
    },
    {
        name: "NGÀY TẠO",
        minWidth: '160px',
        cell: row => (
                convertTimeDate(row.createdAt)
            )
    },
    // {
    //     name: 'TRẠNG THÁI',
    //     minWidth: '150px',
    //     selector: 'paymentStatus',
    //     center: true,
    //     cell: row => (
    //         <Badge  className='text-capitalize' color={statusObj[row?.smsMessageStatus==="Completed" ?"active": row?.smsMessageStatus==="Canceled" ? "notActive": ""]}>
    //             {
    //                 ( row?.smsMessageStatus === "Completed" ? 'Đã duyệt' : row?.smsMessageStatus==="Canceled"? 'Từ chối': row?.smsMessageStatus==="New"? "Chưa duyệt":"")}
    //         </Badge>
    //     )
    // },
    {
        name: 'HÀNH ĐỘNG',
        minWidth: '140px',
        maxWidth: '150px',
        right: true,
        cell: row => (
            <UncontrolledDropdown>
                <DropdownToggle tag='div' className='btn btn-sm'>
                    <MoreVertical size={14} className='cursor-pointer' />
                </DropdownToggle>
                <DropdownMenu right>
                    {
                        (
                            <DropdownItem
                                tag={Link}
                                to={`/MessageSMS/detail/${row.smsMessageId}`}
                                className='w-100'>
                                <FileText size={14} className='mr-50' />
                                <span className='align-middle'>Chi tiết</span>
                            </DropdownItem>
                        )
                    }
                    {/*<DropdownItem*/}
                    {/*    tag={Link}*/}
                    {/*    to={`/MessageSMS/update/${row.smsMessageId}`}*/}
                    {/*    className='w-100'>*/}
                    {/*    <Archive size={14} className='mr-50' />*/}
                    {/*    <span className='align-middle'>Chỉnh sửa</span>*/}
                    {/*</DropdownItem>*/}
                    {/*<DropdownItem*/}
                    {/*    onClick={()=> {*/}
                    {/*        setIsOpenModal(true)*/}
                    {/*        handleDataToDelete(row?.paymentMethodId,row?.paymentMethodName)*/}
                    {/*    }}*/}
                    {/*    className='w-100'>*/}
                    {/*    <Archive size={14} className='mr-50' />*/}
                    {/*    <span className='align-middle'>Xoá</span>*/}
                    {/*</DropdownItem>*/}
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
]