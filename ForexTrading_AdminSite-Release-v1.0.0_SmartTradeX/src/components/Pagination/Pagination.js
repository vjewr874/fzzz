import {Label} from "reactstrap"
import ReactPaginate from "react-paginate"
import React from "react"
import './style/pagination.scss'

const Pagination = props => {
    const {handlePagination, currentPage, rowsPerPage, total} = props
    const totalItemPage = () => {
        const totalRecords = total
        if (totalRecords - (currentPage + 1 * rowsPerPage) < 0) {
            return totalRecords
        } else return (currentPage + 1) * rowsPerPage
    }

    const indexStartItem = () => {
        if (currentPage === 0) {
            return 1
        } else return (rowsPerPage * (currentPage)) + 1
    }

    const count = Number(Math.ceil(total / rowsPerPage))

    return count>1?(
        <div className='d-flex align-items-center justify-content-between' id={'pagination'}>
            <div className='d-flex align-items-center w-100 description-desktop'>
                <Label for='rows-per-page' className={'mb-0'}>Hiển thị từ {indexStartItem()} - {totalItemPage()}/{total}</Label>
            </div>
            <ReactPaginate
                previousLabel={''}
                nextLabel={''}
                pageCount={count || 1}
                activeClassName='active'
                forcePage={currentPage !== 0 ? currentPage/rowsPerPage : 0}
                onPageChange={page => handlePagination(page)}
                pageClassName={'page-item'}
                nextLinkClassName={'page-link'}
                nextClassName={'page-item next'}
                previousClassName={'page-item prev'}
                previousLinkClassName={'page-link'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                pageLinkClassName={'page-link'}
                containerClassName={'pagination react-paginate justify-content-end my-2 '}
            />
        </div>
    ):""
}
export default Pagination
