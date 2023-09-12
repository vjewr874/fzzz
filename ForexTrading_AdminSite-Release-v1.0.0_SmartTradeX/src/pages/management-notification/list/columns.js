import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Archive, FileText, MoreVertical, X} from "react-feather";
import {Link} from "react-router-dom";
import { convertTimeDate} from "../../../ultils/convertDate";
import PlaceholderImage from "../../../assets/images/placeholder/placeholder.png";
import React from "react";
const statusObj = {
    active: 'light-success',
    notActive:'light-danger'
}

export const columns = (setIsOpenModal,handleDataToDelete)=>[
    {
        name: 'ID',
        minWidth: '70px',
        maxWidth: "100px",
        cell: row => (
            <Link
                to={`/notification/detail/${row?.groupCustomerMessageId}`}
                className='user-name text-truncate mb-0'>
                <span>{row?.groupCustomerMessageId}</span>
            </Link>
        )
    },
    {
        name: 'HÌNH ẢNH',
        minWidth: '100px',
        maxWidth: "200px",
        center: true,
        cell: row => (
            <div style={{backgroundImage:`url("${row?.groupCustomerMessageImage ? row?.groupCustomerMessageImage : PlaceholderImage}")`,width:"46px",height:"46px",backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center"}}/>
        )
    },
    {
        name: 'TIÊU ĐỀ',
        minWidth: '250px',
        maxWidth: "400px",
        selector: 'groupCustomerMessageTitle',
        cell: row => row?.groupCustomerMessageTitle
    },
    {
        name: 'NỘI DUNG THÔNG BÁO',
        minWidth: '300px',
        maxWidth:"600px",
        selector: 'groupCustomerMessageContent',
        cell: row => <div style={{overflow:"hidden", maxHeight:"18px"}}><p style={{ whiteSpace:"nowrap",
            WebkitLineClamp:1,
            WebkitBoxOrient:"vertical",
            textOverflow:"ellipsis",
        }}
        ><span dangerouslySetInnerHTML={{__html:row?.groupCustomerMessageContent.replace("<br>","")}}></span></p></div>

    },
    {
        name: 'THỜI GIAN',
        minWidth: '100px',
        maxWidth: "140px",
        selector: 'createdAt',
        cell: row => convertTimeDate(row?.createdAt||"")
    },
    {
        name: 'HÀNH ĐỘNG',
        minWidth: '100px',
        maxWidth: "150px",
        selector: 'startDate',
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
                                to={`/notification/detail/${row?.groupCustomerMessageId}`}
                                className='w-100'>
                                <FileText size={14} className='mr-50' />
                                <span className='align-middle'>Chi tiết</span>
                            </DropdownItem>
                        )
                    }
                    <DropdownItem
                      onClick={()=> {
                          setIsOpenModal(true)
                          handleDataToDelete(row?.groupCustomerMessageId,row?.groupCustomerMessageTitle)
                      }}
                      className='w-100'>
                      <X size={14} className='mr-50' />
                      <span className='align-middle'>Xoá</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
]