import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Link} from "react-router-dom";
import {FileText, MoreVertical} from "react-feather";
import {convertTimeDate} from "../../../ultils/convertDate"
import {currencyFormat} from "../../../ultils/currentFormacy";

const statusObj = {
    New: 'light-success',
    Completed:"light-primary"
}

function sumQuantityTicket(arr){
    let total=0
    if (arr?.length>0){
        arr.forEach(element=>{
            total+=element.orderItemQuantity
        })
    }
    return total
}
export const columns = [
    {
        name: 'ID',
        minWidth: '100px',
        selector: 'productOrderId',
        cell: row => (
            <Link
                to={`/purchase-list/detail/${row?.productOrderId}`}
                className='user-name text-truncate mb-0'>
                <span>{row?.productOrderId}</span>
            </Link>
        )
    },
    {
        name: 'TÀI KHOẢN',
        minWidth: '150px',
        // cell: row => row?.customerPhone
        cell: row =>
            <Link
                to={`/customer/detail/${row?.appUserId}`}
                className='user-name text-truncate mb-0'>
                <span>{row?.username}</span>
            </Link>
    },
    {
        name: 'TÊN NGƯỜI DÙNG',
        minWidth: '200px',
        cell: row =>
            <Link
                to={`/customer/detail/${row?.appUserId}`}
                className='user-name text-truncate mb-0'>
                <span>{row?.firstName}</span>
            </Link>
    },
    {
        name: 'ĐIỆN THOẠI',
        minWidth: '150px',
        selector: 'customerPhone',
        // cell: row => row?.customerPhone
        cell: row =>
            <Link
                to={`/customer/detail/${row?.appUserId}`}
                className='user-name text-truncate mb-0'>
                <span>{row?.customerPhone}</span>
            </Link>
    },
    {
        name: 'lOẠI',
        minWidth: '150px',

        cell: row => row?.orderType==="SELL" ?"Bán" : row?.orderType==="BUY" ?"Mua" :""
    },
    {
        name: 'SỐ LƯỢNG',
        minWidth: '150px',
        center: true,
        cell: row => currencyFormat(sumQuantityTicket(row.productOrderItems) ||"")
    },
    {
        name: 'TỔNG TIỀN',
        minWidth: '150px',
        selector: 'total',
        cell: row => currencyFormat(row?.total||"")
    },

    // {
    //     name: 'TỔNG TIỀN',
    //     minWidth: '150px',
    //     selector: 'total',
    //     cell: row => currencyFormat(row?.total ||"")
    // },
    {
        name: 'TRẠNG THÁI',
        minWidth: '150px',
        center: true,
        cell: row => (
            <Badge className='text-capitalize' color={statusObj[row.orderStatus]}>
                {
                    row?.orderStatus.length >0 ?
                        (row?.orderStatus === 'New' ? 'Mới' : row?.orderStatus==="Completed"? "Hoàn thành": ""):""}
            </Badge>
        )
    },
    {
        name: 'THỜI GIAN',
        minWidth: '150px',
        selector: 'createdAt',
        cell: row => row?.createdAt.length>0?
            convertTimeDate(row?.createdAt) : ""
    },
    {
        name: 'HÀNH ĐỘNG',
        minWidth: '150px',
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
                                to={`/purchase-list/detail/${row.productOrderId}`}
                                className='w-100'>
                                <FileText size={14} className='mr-50' />
                                <span className='align-middle'>Chi tiết</span>
                            </DropdownItem>
                        )
                    }
                    {/*<DropdownItem*/}
                    {/*  tag={Link}*/}
                    {/*  to={`/customer/edit/${row.id}`}*/}
                    {/*  className='w-100'>*/}
                    {/*  <Archive size={14} className='mr-50' />*/}
                    {/*  <span className='align-middle'>Chỉnh sửa</span>*/}
                    {/*</DropdownItem>*/}
                    {/*<DropdownItem className='w-100' >*/}
                    {/*  <Trash2 size={14} className='mr-50' />*/}
                    {/*  <span className='align-middle'>Xóa</span>*/}
                    {/*</DropdownItem>*/}
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    },
]