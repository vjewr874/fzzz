import { Link } from "react-router-dom";
import { convertTimeDate } from "../../../ultils/convertDate";
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";
import { Archive, FileText, MoreVertical } from "react-feather";

export const columns = (setIsOpenModal, handleDataToDelete) => [
    {
        name: 'ID',
        minWidth: '80px',
        maxWidth: "120px",
        selector: 'paymentMethodId',
        cell: row => (
            <Link
                to={`/payment-method/detail/${row?.paymentMethodId}`}
                className='user-name text-truncate mb-0'>
                <span>{row?.paymentMethodId}</span>
            </Link>
        )
    },
    {
        name: 'PHƯƠNG THỨC',
        minWidth: '160px',
        selector: 'paymentMethodName',
        cell: row => (
            row?.paymentMethodName
        )
    }
    ,
    {
        name: "LOẠI",
        minWidth: '220px',
        cell: row => (
            row?.paymentMethodReceiverName
        )
    }
    ,
    {
        name: "TÀI KHOẢN",
        minWidth: '160px',
        selector: 'paymentMethodIdentityNumber',
        cell: row => (
            row?.paymentMethodIdentityNumber
        )
    },
    {
        name: "NGÀY TẠO",
        minWidth: '160px',
        selector: 'createdAt',
        cell: row => (
            convertTimeDate(row?.createdAt || "")
        )
    },
    {
        name: "NGÀY CẬP NHẬT",
        minWidth: '160px',
        selector: 'updatedAt',
        cell: row => (
            convertTimeDate(row?.updatedAt || "")
        )
    },
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
                                to={`/payment-method/detail/${row.paymentMethodId}`}
                                className='w-100'>
                                <FileText size={14} className='mr-50' />
                                <span className='align-middle'>Chi tiết</span>
                            </DropdownItem>
                        )
                    }
                    <DropdownItem
                        tag={Link}
                        to={`/payment-method/update/${row.paymentMethodId}`}
                        className='w-100'>
                        <Archive size={14} className='mr-50' />
                        <span className='align-middle'>Chỉnh sửa</span>
                    </DropdownItem>
                    <DropdownItem
                        onClick={() => {
                            setIsOpenModal(true)
                            handleDataToDelete(row?.paymentMethodId, row?.paymentMethodName)
                        }}
                        className='w-100'>
                        <Archive size={14} className='mr-50' />
                        <span className='align-middle'>Xoá</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
]