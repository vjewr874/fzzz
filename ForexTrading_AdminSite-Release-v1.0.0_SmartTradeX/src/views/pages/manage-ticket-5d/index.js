import React from "react";
import { Fragment, memo, useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import { ChevronDown, Eye } from "react-feather";
import betService from "../../../services/betService.js";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import _ from "lodash";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import moment from 'moment'
import {
  Card, UncontrolledTooltip
} from 'reactstrap'
import SearchNav from "../../components/searchNav";
import { getGame5DType } from "../../../constants/gameTypes";
import ModalDetailTicket from '../../components/detailTicket'

function ManageTicket5D({ intl }) {
  const DefaultFilter = {
    filter: {
      betRecordType: '5D1'
    },
    skip: 0,
    limit: 20,
    order: {
      key: "createdAt",
      value: "desc",
    },
  };
  const [searchText, setSearchText] = useState()
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(20);
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false)
  const [dataSelected, setDataSelected] = useState({})
  const [betRecordType, setBetRecordType] = useState("5D1")

  function getData(params) {
    const newParams = {
      ...params,
    };
    betService.find(newParams)
      .then((result) => {
        setItems(result.data);
        setTotal(result.total);
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({ id: "an_error_occurred" }) +
          " " +
          intl.formatMessage({ id: "please_come_back_late" })
        );
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getData(paramsFilter);
  }, []);


  const serverSideColumns = [
    {
      name: "ID",
      selector: "betRecordId",
      maxWidth: "50px"
    },
    {
      name: intl.formatMessage({ id: "ticket_buy" }),
      maxWidth: "150px",
      cell: () => {
        let currentType = getGame5DType(intl).find(item => item.value === betRecordType)
        return "5D - " + currentType?.label || intl.formatMessage({ id: "minutes" }, { val: 1 })
      }
    },
    {
      name: intl.formatMessage({ id: 'section_name' }),
      selector: "betRecordSection"
    },
    {
      name: intl.formatMessage({ id: 'amount_in' }),
      cell: (row) => {
        if (row.betRecordAmountIn) {
          return row.betRecordAmountIn.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        } else {
          return ''
        }
      }
    },
    {
      name: intl.formatMessage({ id: 'amount_out' }),
      cell: (row) => {
        if (row.betRecordAmountOut) {
          return row.betRecordAmountOut.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
        } else {
          return '0'
        }
      }
    },
    {
      name: intl.formatMessage({ id: 'buyer' }),
      maxWidth: "150px",
      cell: (row) => {
        const { firstName, lastName } = row
        return (
          <div>
            {firstName} {lastName}
          </div>
        )
      }
    },
    {
      name: intl.formatMessage({ id: 'buy_date' }),
      selector: "time",
      maxWidth: "150px",
      cell: (row) => {
        const { createdAt } = row;
        return <div>{moment.utc(moment(createdAt)).format("DD/MM/YYYY")}</div>;
      },
    },
    {
      name: "",
      cell: (row) => {
        return (
          <div className="d-flex align-items-center">
            <span
              className="full-width ml-2 cursor-pointer"
              onClick={(event) => {
                event.preventDefault();
                setDataSelected(row)
                setModal(true)
              }}
            >
              <Eye size={15} id={"detail"} />{" "}
              <UncontrolledTooltip placement="top" target={"detail"}>
                {intl.formatMessage({ id: "detail_ticket" })}
              </UncontrolledTooltip>
            </span>
          </div>
        )
      }
    },
    // {
    //   name: '',
    //   selector: 'action',
    //   cell: (row) => {
    //     return (
    //       // <UncontrolledDropdown className='action-view'>
    //       //   <div className='flex-row'>

    //       //     <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
    //       //       <MoreVertical size={15} />
    //       //     </DropdownToggle>
    //       //   </div>


    //       //   <DropdownMenu right>
    //       //     {
    //       //       <DropdownItem onClick={e => {
    //       //         setDataSelected(row)
    //       //         setModal(true)
    //       //       }}>
    //       //         <Edit className='mr-50' size={15} /> <span className='align-middle'>
    //       //           {intl.formatMessage({ id: "edit_game_record" })}
    //       //         </span>
    //       //       </DropdownItem>
    //       //     }
    //       //   </DropdownMenu>
    //       // </UncontrolledDropdown>
    //       <Edit
    //         className='cursor-pointer'
    //         size={15} onClick={() => {
    //           setDataSelected(row)
    //           setModal(true)
    //         }}
    //       />
    //     )
    //   }
    // }


  ];

  const handlePagination = (page) => {
    const newParams = {
      ...paramsFilter,
      skip: page.selected * paramsFilter.limit,
    };
    getData(newParams);
    setParamsFilter(newParams);
  };

  const CustomPagination = () => {
    const count = Number(Math.ceil(total / paramsFilter.limit).toFixed(0));

    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        breakLabel="..."
        pageCount={count || 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        activeClassName="active"
        forcePage={paramsFilter.skip / paramsFilter.limit}
        onPageChange={(page) => handlePagination(page)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName={
          "pagination react-paginate separated-pagination pagination-sm justify-content-end pr-1 mt-1"
        }
      />
    );
  };


  const handleOnchange = (name, value) => {
    setDataSelected(
      {
        ...dataSelected,
        [name]: value
      }
    )
  }

  const onFilter = (newFilter) => {
    setParamsFilter(newFilter)
    getData(newFilter)
  }

  return (
    <Fragment>
      <Card className="p-1">
        <SearchNav
          inputSearchValue={searchText}
          setInputSearchValue={(value) => setSearchText(value)}
          refId="5d_ref_search"
          placeholder={intl.formatMessage({ id: "search" }) + ' ' + intl.formatMessage({ id: "buyer" })}
          dropdownValue={getGame5DType(intl)}
          setDropdownValue={(value) => {
            paramsFilter.filter.betRecordType = value
            setParamsFilter(paramsFilter)
            setBetRecordType(value)
            getData(paramsFilter)
          }}
          currentDropdownValue={betRecordType}
          onSearch={(lastValueSection) => {
            onFilter({
              ...paramsFilter,
              searchText: lastValueSection
            })
          }}
          rangePicker
          onPickDate={(values) => {
            if (values && values.length === 2) {
              onFilter({
                ...paramsFilter,
                startDate: moment(values[0]).toISOString(),
                endDate: moment(values[1]).toISOString()
              })
            }
          }}
        />
        <DataTable
          progressPending={isLoading}
          noHeader
          pagination
          paginationServer
          highlightOnHover
          persistTableHead
          noDataComponent={<span className="mt-2">{intl.formatMessage({ id: "table_empty" })}</span>}
          className="react-dataTable"
          columns={serverSideColumns}
          paginationComponent={CustomPagination}
          sortIcon={<ChevronDown size={10} />}
          data={items}
        />
      </Card>
      <ModalDetailTicket
        modal={modal}
        setModal={setModal}
        dataSelected={dataSelected}
        intl={intl}
        gameName={intl.formatMessage({ id: "game_name" }) + ": 5D - " + getGame5DType(intl).find(item => item.value === betRecordType).label}
      />
    </Fragment >
  );
}

export default injectIntl(memo(ManageTicket5D));
