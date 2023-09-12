import {Badge, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
import {Archive, FileText, MoreVertical} from "react-feather";
import {Link} from "react-router-dom";
import {currencyFormat} from "../../../ultils/currentFormacy";
import {convertDateVN} from "../../../ultils/convertDate"
const statusObj = {
    New: 'light-success',
    Completed:'light-primary'
}
export const columns = (handleChangeNameChannel)=>[
    {
        name: 'ID',
        minWidth: '80px',
        selector: 'productId',
        cell: row => (
            <Link
                to={`/lottery/detail/${row?.productId}`}
                className='user-name text-truncate mb-0'>
                <span>{row?.productId}</span>
            </Link>
        )
    },
    {
        name: 'TÊN ĐÀI',
        minWidth: '170px',
        selector: 'productChannel',
        cell: row => handleChangeNameChannel(row?.productChannel)
    },
    {
        name: 'BỘ SỐ',
        minWidth: '140px',
        selector: 'productTitle',
        cell: row => row?.productTitle||""
    },
    {
        name: 'SL TỒN',
        minWidth: '150px',
        selector: 'stockQuantity',
        center: true,
        cell: row => <div>{currencyFormat(row?.stockQuantity||"")}</div>
    },
    {
        name: 'LOẠI VÉ',
        minWidth: '150px',
        selector: 'productType',
        cell: row => row?.productType === "SINGLE" ? "VÉ THƯỜNG" : "CẶP NGUYÊN"
    },
    {
        name: 'TRẠNG THÁI',
        minWidth: '140px',
        selector: 'productStatus',
        center: true,
        cell: row => <Badge className='text-capitalize' color={statusObj[row?.productStatus==="New" ?"New": row?.productStatus==="Completed" ? "Completed": ""]}>
            {
                ( row?.productStatus === "New" ? 'Mới' : row?.productStatus==="Completed"? 'Hoàn thành':"")}
        </Badge>
    },
    {
        name: 'NGÀY XỔ',
        minWidth: '120px',
        maxWidth:"140px",
        selector: 'expireDate',
        cell: row => convertDateVN(row?.expireDate||"")
    },
    {
        name: 'HÀNH ĐỘNG',
        minWidth: '130px',
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
                                to={`/lottery/detail/${row.productId}`}
                                className='w-100'>
                                <FileText size={14} className='mr-50' />
                                <span className='align-middle'>Chi tiết</span>
                            </DropdownItem>
                        )
                    }
                    <DropdownItem
                      tag={Link}
                      to={`/lottery/update/${row.productId}`}
                      className='w-100'>
                      <Archive size={14} className='mr-50' />
                      <span className='align-middle'>Chỉnh sửa</span>
                    </DropdownItem>
                </DropdownMenu>
            </UncontrolledDropdown>
        )
    }
]