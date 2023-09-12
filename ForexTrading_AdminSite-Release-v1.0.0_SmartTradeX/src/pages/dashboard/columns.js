import {currencyFormat} from "../../ultils/currentFormacy";

export const columns=[
    {
        name: 'SỐ THỨ TỰ',
        minWidth: '350px',
        selector: 'index',
        cell: row => (
           row.index+1
        )
    },
    {
        name: 'ĐÀI',
        minWidth: '400px',
        selector: 'index',
        cell: row => (
            row.province
        )
    },
    {
        name: 'TỔNG',
        minWidth: '400px',
        selector: 'index',
        cell: row => (
            currencyFormat(row.data.totalProductOrderAmount)
        )
    },
]
