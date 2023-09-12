import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import {
  MoreVertical,
  PlusCircle,
  MinusCircle,
  Edit,
  Lock,
  CornerRightUp,
} from "react-feather";
import { Link } from "react-router-dom";
import { convertTimeDate } from "../../../ultils/convertDate";
import {
  currencyFormat,
  currencyFormatUSD,
} from "../../../ultils/currentFormacy";

const statusObj = {
  active: "light-success",
};
export const columns = (
  handleIsOpenModal,
  handleActiveUser,
  setIsOpenModalUpgradeLevel,
  setUserDataAll
) => [
  {
    name: "ID",
    minWidth: "100px",
    selector: "appUserId",
    cell: (row) => (
      <Link
        to={`/customer/detail/${row?.appUserId}`}
        className="user-name text-truncate mb-0"
      >
        <span>{row?.appUserId}</span>
      </Link>
    ),
  },
  {
    name: "TÀI KHOẢN",
    minWidth: "200px",
    // cell: row => row?.username || row.username
    cell: (row) => (
      <Link
        to={`/customer/detail/${row?.appUserId}`}
        className="user-name text-truncate mb-0"
      >
        <span>{row?.username}</span>
      </Link>
    ),
  },
  // {
  //     name: 'TÊN NGƯỜI DÙNG',
  //     minWidth: '200px',
  //     cell: row =>
  //         <Link
  //             to={`/customer/detail/${row?.appUserId}`}
  //             className='user-name text-truncate mb-0'>
  //             <span>{row?.firstName}</span>
  //         </Link>
  // },
  {
    name: "SỐ ĐIỆN THOẠI",
    minWidth: "150px",
    // cell: row => row?.phoneNumber
    cell: (row) => (
      <Link
        to={`/customer/detail/${row?.appUserId}`}
        className="user-name text-truncate mb-0"
      >
        <span>{row?.phoneNumber}</span>
      </Link>
    ),
  },
  {
    name: "CẤP ĐỘ",
    minWidth: "150px",
    selector: "appUserMembershipTitle",
    cell: (row) => row?.appUserMembershipTitle || "Thành Viên",
  },
  {
    name: "VÍ CHÍNH",
    minWidth: "150px",
    cell: (row) =>
      currencyFormatUSD(
        row?.wallets?.find((wallet) => wallet?.walletType === "PointWallet")
          ?.balance || ""
      ),
  },
  // {
  //     name: 'SỐ TIỀN BÁN RA',
  //     minWidth: '160px',
  //     cell: row => currencyFormat(row?.wallets?.find(wallet => wallet?.walletType === 'RewardWallet')?.balance ||"")
  // },
  // {
  //     name: 'LỢI NHUẬN',
  //     minWidth: '150px',
  //     cell: row => currencyFormat(row?.wallets?.find(wallet => wallet?.walletType === 'BonusWallet')?.balance ||"")
  // },
  {
    name: "HOẠT ĐỘNG",
    minWidth: "150px",
    center: true,
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={statusObj[row?.active === 1 ? "active" : ""]}
      >
        {row?.active === 1 ? "Hoạt động" : row?.active === 0 ? "Đã khoá" : ""}
      </Badge>
    ),
  },
  {
    name: "THỜI GIAN",
    minWidth: "150px",
    maxWidth: "150px",
    selector: "createdAt",
    cell: (row) => convertTimeDate(row?.createdAt || ""),
  },
  {
    name: "NGƯỜI GIỚI THIỆU",
    minWidth: "167px",
    cell: (row) => row?.referUser,
  },
  {
    name: "HÀNH ĐỘNG",
    minWidth: "150px",
    maxWidth: "150px",
    right: true,
    cell: (row) => (
      <>
        <Lock
          color={
            row?.active === 0 ? "#E74160" : row?.active === 1 ? "#18A957" : ""
          }
          size={28}
          style={{ paddingRight: "8px", cursor: "pointer" }}
          onClick={() => handleActiveUser(row.active, row.appUserId)}
        />
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={18} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem
              tag={Link}
              to={`/customer/detail/${row.appUserId}`}
              className="w-100"
            >
              <Edit size={14} className="mr-50" />
              <span className="align-middle">Sửa / Xác thực</span>
            </DropdownItem>
            <DropdownItem
              onClick={() => handleIsOpenModal(true, "increase", row.appUserId)}
            >
              <PlusCircle size={14} className="mr-50" />
              <span className="align-middle">Tăng thưởng cho người chơi</span>
            </DropdownItem>
            <DropdownItem
              onClick={() => handleIsOpenModal(true, "decrease", row.appUserId)}
            >
              <MinusCircle size={14} className="mr-50" />
              <span className="align-middle">Giảm điểm cho người chơi</span>
            </DropdownItem>
            <DropdownItem
              href="/"
              onClick={(e) => {
                e.preventDefault();
                setIsOpenModalUpgradeLevel(true);
                setUserDataAll(row);
              }}
            >
              <CornerRightUp className="mr-50" size={15} />{" "}
              <span className="align-middle">Nâng cấp</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </>
    ),
  },
];
