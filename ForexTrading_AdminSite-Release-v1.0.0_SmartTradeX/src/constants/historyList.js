export const HISTORY_LIST = [
  {
    label: "Lịch sử nạp tiền",
    value: "PaymentDepositTransaction",
    api_list: "/PaymentDepositTransaction/find",
    type: "totalDepositRequest",
    permission: "VIEW_DEPOSIT",
  },
  {
    label: "Lịch sử rút tiền",
    value: "PaymentWithdrawTransaction",
    api_list: "/PaymentWithdrawTransaction/find",
    type: "totalWithdrawRequest",
    permission: "VIEW_WITHDRAW",
  },
  // {
  //     label: 'Lịch sử rút hoa hồng',
  //     value: "PaymentBonusTransaction",
  //     api_list: "/PaymentBonusTransaction/find",
  //     type: "totalPaymentBonusRequest",
  //     permission: "VIEW_WITHDRAW"
  // },
  {
    label: "Lịch sử chơi",
    value: "BetRecords",
    api_list: "/BetRecords/find",
  },
  {
    label: "Lịch sử giao dịch",
    value: "WalletRecord",
    api_list: "/WalletRecord/find",
  },
];

export const WALLET_RECORD_TYPES = [
  {
    value: undefined,
    label: "Tất cả",
  },
  {
    reval: "REFER_BONUS",
    value: "REFER_BONUS",
    label: "Thưởng hoa hồng",
  },
  {
    reval: "EVENT_BONUS",
    value: "EVENT_BONUS",
    label: "Thưởng sự kiện",
  },
  {
    reval: "ADMIN_BONUS",
    value: "ADMIN_BONUS",
    label: "Admin thưởng tiền",
  },
  {
    reval: "EARNED",
    value: "EARNED",
    label: "Kiếm tiền",
  },
  {
    reval: "ADMIN_ADJUST",
    value: "ADMIN_ADJUST",
    label: "Admin điều chỉnh",
  },
  {
    reval: "PAYMENT_DEPOSIT",
    value: "PAYMENT_DEPOSIT",
    label: "Nạp tiền",
  },
  {
    reval: "PAYMENT_WITHDRAW",
    value: "PAYMENT_WITHDRAW",
    label: "Rút tiền",
  },
  {
    reval: "DEPOSIT_POINTWALLET",
    value: "DEPOSIT_POINTWALLET",
    label: "Nạp tiền ví chính",
  },
  {
    reval: "WITHDRAW_POINTWALLET",
    value: "WITHDRAW_POINTWALLET",
    label: "Rút tiền ví chính",
  },
  {
    reval: "WITHDRAW_BONUSWALLET",
    value: "WITHDRAW_BONUSWALLET",
    label: "Rút tiền hoa hồng",
  },
  {
    reval: "WITHDRAW_REWARDWALLET",
    value: "WITHDRAW_REWARDWALLET",
    label: "Rút tiền thưởng",
  },
  {
    reval: "WITHDRAW_WINWALLET",
    value: "WITHDRAW_WINWALLET",
    label: "Rút tiền thắng",
  },
  {
    reval: "PAYMENT_WITHDRAW_REFUND",
    value: "PAYMENT_WITHDRAW_REFUND",
    label: "Từ chối rút tiền",
  },
  {
    reval: "PAYMENT_EXCHANGE_SEND",
    value: "PAYMENT_EXCHANGE_SEND",
    label: "Gửi tiền hoán đổi",
  },
  {
    reval: "PAYMENT_EXCHANGE_RECEIVE",
    value: "PAYMENT_EXCHANGE_RECEIVE",
    label: "Nhận tiền hoán đổi",
  },
  {
    reval: "PAYMENT_EXCHANGE_REFUND",
    value: "PAYMENT_EXCHANGE_REFUND",
    label: "Hoàn tiền hoán đổi",
  },
  {
    reval: "EXTERNAL_DEPOSIT",
    value: "EXTERNAL_DEPOSIT",
    label: "Nạp tiền ngoài hệ thống",
  },
  {
    reval: "EXTERNAL_WITHDRAW",
    value: "EXTERNAL_WITHDRAW",
    label: "Rút tiền ngoài hệ thống",
  },
  {
    reval: "REFUND",
    value: "REFUND",
    label: "Hoàn tiền",
  },
  {
    reval: "PLAY_GAME",
    value: "PLAY_GAME",
    label: "Sử dụng tiền",
  },
  {
    reval: "MAKE_PAYMENT",
    value: "MAKE_PAYMENT",
    label: "Thanh toán",
  },
  {
    reval: "BONUS_EXCHANGE_POINT",
    value: "BONUS_EXCHANGE_POINT",
    label: "Chuyển tiền đến ví chính",
  },
];
