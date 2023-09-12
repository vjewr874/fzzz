// import {DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown} from "reactstrap";
// import {Archive, FileText, MoreVertical} from "react-feather";
import {Link} from "react-router-dom";
import {currencyFormat, currencyFormatUSD} from "../../../../ultils/currentFormacy";
import {convertTimeDate} from "../../../../ultils/convertDate";


export const columnsDetail = (typeList)=>[
    {
        name: "ID",
        minWidth: '150px',
        cell: row => (
            typeList === "WalletRecord"?
                row?.[`${typeList}Id`]
                :
                <Link
                    to={`${typeList==="paymentDepositTransaction"? "/history/detail/PaymentDepositTransaction/" : typeList==="paymentWithdrawTransaction" ? "/history/detail/PaymentWithdrawTransaction/": "/purchase-list/detail/"}${row?.[`${typeList}Id`]}`}
                    className='user-name text-truncate mb-0'>
                    <span>{row?.[`${typeList}Id`]}</span>
                </Link>
        )
    },
    typeList==="WalletRecord"?
    {
        name: 'THU',
        minWidth: '250px',
        cell: row => currencyFormatUSD(row?.paymentAmountIn||"")
    }
    :
        typeList==="productOrder" ?
            {
                name: 'Số tiền',
                minWidth: '250px',
                cell: row => currencyFormatUSD(row?.total || 0)
            }
            :
                {
                    name: 'SỐ TIỀN',
                    minWidth: '250px',
                    cell: row => currencyFormatUSD(row?.paymentAmount||"")
                },
    typeList==="WalletRecord"?
        {
            name: 'CHI',
            minWidth: '250px',
            cell: row => currencyFormatUSD(row?.paymentAmountOut||"")

        }:
        typeList==="productOrder" ?
            {
                name: 'THỜI GIAN',
                minWidth: '250px',
                cell: row => convertTimeDate(row?.createdAt||"")
            }
        :
        {
            name: 'THỜI GIAN',
            minWidth: '250px',
            cell: row => convertTimeDate(row?.paymentApproveDate||"")
        },
    typeList==="WalletRecord"?
        {
            name: 'THỜI GIAN',
            minWidth: '250px',
            cell: row => convertTimeDate(row?.createdAt||"")

        }:
        typeList==="productOrder" ?
            {
                name: 'TRẠNG THÁI',
                minWidth: '250px',
                cell: row =>
                        (row?.orderStatus === 'New' ? 'Mới' : row?.orderStatus==="Completed"? "Hoàn thành": "")
            }
        :
        {
            name: 'TRẠNG THÁI',
            minWidth: '250px',
            cell: row => row?.paymentStatus === "Completed" ? 'Đã duyệt' : row?.paymentStatus==="Canceled"? 'Từ chối': row?.paymentStatus==="New"? "Chưa duyệt":""
        },
]