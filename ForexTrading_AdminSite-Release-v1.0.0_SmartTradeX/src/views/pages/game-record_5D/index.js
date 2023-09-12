import React from "react";
import { Fragment, memo, useState, useEffect } from "react";
import { injectIntl } from "react-intl";
import DataTable from "react-data-table-component";
import { ChevronDown } from "react-feather";
import { Edit } from "react-feather";
import gameService from "../../../services/gameService";
import ReactPaginate from "react-paginate";
import { toast } from "react-toastify";
import _ from "lodash";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import Bonus from "./components/bonus";
import Decrease from "./components/decrease";
import Factory from "./components/factory";
import { FormattedMessage } from 'react-intl'
import { useForm } from 'react-hook-form'
import {
  Card, Input, Label, Row, Col, Modal, ModalHeader, ModalBody,
  Button, FormGroup, Form, Badge
} from 'reactstrap'
import SearchNav from "../../components/searchNav";
import AlertCurrentSection from "../../components/alertCurrentSection";
import { getGame5DType } from "../../../constants/gameTypes";
function GameRecordPage({ intl }) {
  const DefaultFilter = {
    filter: {
      gameRecordType: '5D1'
    },
    skip: 0,
    limit: 20,
    order: {
      key: "createdAt",
      value: "desc",
    },
  };
  const [gameRecordSection, setGameRecordSection] = useState()
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(20);
  const [paramsFilter, setParamsFilter] = useState(DefaultFilter);
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarBonus, setSidebarBonus] = useState(false);
  const [sidebarDecrease, setSidebarDecrease] = useState(false);
  const [sidebarFactory, setSidebarFactory] = useState(false);
  const [tranItem, setTranItem] = useState(null);
  const [modal, setModal] = useState(false)
  const [dataSelected, setDataSelected] = useState({})
  const [lastGameRecord, setLastGameRecord] = useState({})
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {}
  })
  const [gameRecordType, setGameRecordType] = useState("5D1")
  const toggleBonus = () => {
    setSidebarBonus(!sidebarBonus);
  };
  const toggleDecrease = () => {
    setSidebarDecrease(!sidebarDecrease);
  };
  const toggleFactory = () => {
    setSidebarFactory(!sidebarFactory);
  };


  function getData(params, isLoading) {
    const newParams = {
      ...params,
    };
    gameService.getGameRecord(newParams)
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
      name: intl.formatMessage({ id: "game_name" }),
      selector: "gameRecordType",
      maxWidth: "200px",
      cell: () => {
        let currentType = getGame5DType(intl).find(item => item.value === gameRecordType)
        return "5D - " + currentType?.label || intl.formatMessage({ id: "minutes" }, { val: 1 })
      }
    },
    {
      name: intl.formatMessage({ id: "section_name" }),
      selector: "gameRecordSection",
      maxWidth: "150px",
    },
    {
      name: intl.formatMessage({ id: 'result' }),
      selector: "gameRecordValue",
      minWidth: "300px",
      cell: (row) => {
        const { gameRecordValue } = row;
        if (!gameRecordValue) return ''
        let sum = 0
        for (let i = 0; i < gameRecordValue.length; i++) {
          sum += parseInt(gameRecordValue[i]);
        }
        return (
          <>
            <div className="valuediv">
              {
                gameRecordValue.split('').map(item => {
                  return (
                    <div className="gameRecordValue">{item}</div>

                  )
                })
              }
            </div>

            <div className="display-5 font-weight-bold mr-1">{sum}</div>
            <div className="valuediv">
              <Badge
                color={sum <= 25 ? "danger" : "success"}
              >{intl.formatMessage({ id: sum <= 25 ? "small" : "big" })}</Badge>
            </div>
            <div className="valuediv">
              <Badge
                color={sum % 2 === 0 ? "info" : "warning"}
              >{intl.formatMessage({ id: sum % 2 === 0 ? "even" : "odd" })}</Badge>

            </div>
          </>
        )
      },
    },
    // {
    //   name: intl.formatMessage({ id: 'sum_value' }),
    //   selector: "gameRecordValue",
    //   minWidth: "150px",
    //   cell: (row) => {
    //     const { gameRecordValue } = row;
    //     return ;
    //   },
    // },

    // {
    //   name: intl.formatMessage({ id: "big" }) + ' / ' + intl.formatMessage({ id: "small" }),
    //   selector: "gameRecordValue",
    //   minWidth: "150px",
    //   cell: (row) => {
    //     const { gameRecordValue } = row;
    //     let sum = 0;
    //     for (let i = 0; i < gameRecordValue.length; i++) {
    //       sum += parseInt(gameRecordValue[i])
    //     }
    //     return <div>
    //       {
    //         sum < 5 ?
    //           <div>{intl.formatMessage({ id: "small" })}</div>
    //           :
    //           <div>{intl.formatMessage({ id: "big" })}</div>
    //       }
    //     </div>;
    //   },
    // },
    // {
    //   name: intl.formatMessage({ id: "even" }) + ' / ' + intl.formatMessage({ id: "odd" }),
    //   minWidth: "150px",
    //   cell: (row) => {
    //     const { gameRecordValue } = row;
    //     let sum = 0;
    //     for (let i = 0; i < gameRecordValue.length; i++) {
    //       sum += parseInt(gameRecordValue[i])
    //     }
    //     return <div>
    //       {
    //         sum % 2 === 0 ?
    //           <div>{intl.formatMessage({ id: "even" })}</div>
    //           :
    //           <div>{intl.formatMessage({ id: "odd" })}</div>
    //       }
    //     </div>;
    //   },
    // },
    {
      name: intl.formatMessage({ id: 'status' }),
      selector: "gameRecordStatus",
      maxWidth: "150px",
      cell: (row) => {
        return (
          <Badge
            color={row.gameRecordStatus === "New" ? 'secondary' : 'danger'}
          >
            {
              intl.formatMessage({
                id: row.gameRecordStatus === "New" ? "not_dialed" : "dialed"
              })
            }
          </Badge>
        )
      }
    },
    // {
    //   name: intl.formatMessage({ id: 'createdAt' }),
    //   selector: "createdAt",
    //   maxWidth: "150px",
    //   cell: (row) => {
    //     const { createdAt } = row;
    //     return <div>{moment.utc(moment(createdAt)).format("DD/MM/YYYY")}</div>;
    //   },
    // },
    {
      name: intl.formatMessage({ id: 'note' }),
      selector: "gameRecordNote",
      maxWidth: "150px",
    },
    {
      name: '',
      selector: 'action',
      cell: (row) => {
        return (
          // <UncontrolledDropdown className='action-view'>
          //   <div className='flex-row'>

          //     <DropdownToggle className='icon-btn hide-arrow' color='transparent' size='sm' caret>
          //       <MoreVertical size={15} />
          //     </DropdownToggle>
          //   </div>


          //   <DropdownMenu right>
          //     {
          //       <DropdownItem onClick={e => {
          //         setDataSelected(row)
          //         setModal(true)
          //       }}>
          //         <Edit className='mr-50' size={15} /> <span className='align-middle'>
          //           {intl.formatMessage({ id: "edit_game_record" })}
          //         </span>
          //       </DropdownItem>
          //     }
          //   </DropdownMenu>
          // </UncontrolledDropdown>
          <Edit
            className='cursor-pointer'
            size={15} onClick={() => {
              setDataSelected(row)
              setModal(true)
            }}
          />
        )
      }
    }


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

  const onUpdate = async (newData) => {
    const params = newData ? newData : {
      "id": dataSelected.gameRecordId,
      "data": {
        "gameRecordType": dataSelected.gameRecordType,
        "gameRecordSection": dataSelected.gameRecordSection,
        "gameRecordValue": dataSelected.gameRecordValue,
        "gameRecordNote": dataSelected.gameRecordNote,
        "gameRecordStatus": dataSelected.gameRecordStatus
      }
    }

    gameService.gameRecordUpdateById(params)
      .then((result) => {
        if (result === 1) {
          toast.success(intl.formatMessage({ id: "update_success" }))
          if (newData) {
            setLastGameRecord({
              ...lastGameRecord,
              ...newData.data
            })
          } else {
            let updateItemIndex = items.findIndex(i => i.gameRecordId === params.id)
            if (updateItemIndex > -1) {
              setItems(prev => {
                prev[updateItemIndex] = {
                  ...prev[updateItemIndex],
                  ...params.data
                }

                return prev
              })
            }
          }
        }
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

  const onFilter = (newFilter) => {
    setParamsFilter(newFilter)
    getData(newFilter)
  }


  async function getLastestRecord(newValue) {
    const data = await gameService.getLastGameRecord({
      "gameRecordType": newValue ? newValue : gameRecordType
    })
    if (data && !_.isEmpty(data)) {
      setLastGameRecord(data)
      toast.info(intl.formatMessage({ id: "new_record" }))
    } else {
      setLastGameRecord(null)
      // toast.error()
    }
  }

  useEffect(() => {
    getLastestRecord()
  }, [])

  useEffect(() => {
    let intervalId = setInterval(() => {
      getLastestRecord()
    }, 30000)
    return () => clearInterval(intervalId);
  }, [gameRecordType])

  return (
    <Fragment>
      <Card className="p-1">
        <SearchNav
          inputSearchValue={gameRecordSection}
          setInputSearchValue={(value) => setGameRecordSection(value)}
          refId="5d_ref_search"
          placeholder={intl.formatMessage({ id: "search" }) + " " + intl.formatMessage({ id: "section_name" })}
          dropdownValue={getGame5DType(intl)}
          setDropdownValue={(value) => {
            paramsFilter.filter.gameRecordType = value
            setParamsFilter(paramsFilter)
            setGameRecordType(value)
            getData(paramsFilter)
            getLastestRecord(value)
          }}
          currentDropdownValue={gameRecordType}
          onSearch={(lastValueSection) => {
            onFilter({
              ...paramsFilter,
              filter: {
                ...paramsFilter.filter,
                gameRecordSection: lastValueSection
              }
            })
          }}
        />
        <AlertCurrentSection
          data={lastGameRecord}
          onSubmit={onUpdate}
          length={5}
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
      {tranItem && sidebarBonus && <Bonus item={tranItem} open={sidebarBonus} toggleSidebar={toggleBonus} />}
      {tranItem && sidebarDecrease && <Decrease item={tranItem} open={sidebarDecrease} toggleSidebar={toggleDecrease} />}
      {tranItem && sidebarFactory && <Factory item={tranItem} open={sidebarFactory} toggleSidebar={toggleFactory} />}
      <Modal
        isOpen={modal}
        toggle={() => setModal(false)}
        className={`modal-dialog-centered `}
        size="lg"

      >
        <ModalHeader toggle={() => setModal(false)}>
          <FormattedMessage
            id="EDIT_GAME_RECORD"
            defaultMessage="Chỉnh sửa kết quả sổ xố"
          />
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col sm="6">
              <Form onSubmit={handleSubmit((data) => {
                onUpdate()
              })}>

                <FormGroup inline>
                  <Label for='gameRecordType'>
                    {intl.formatMessage({ id: "game_name" })}
                  </Label>
                  <Input
                    disabled={true}
                    id='gameRecordType'
                    name='gameRecordType'
                    innerRef={register({ required: true })}
                    invalid={errors.firstName && true}
                    placeholder={intl.formatMessage({ id: "game_name" })}
                    value={dataSelected?.gameRecordType || ''}
                    onChange={(e) => {
                      const { name, value } = e.target
                      handleOnchange(name, value)
                    }}
                  />
                </FormGroup >

                <FormGroup inline>
                  <Label for='gameRecordSection'>
                    {intl.formatMessage({ id: "section_name" })}
                  </Label>
                  <Input
                    disabled={true}
                    innerRef={register({ required: true })}
                    invalid={errors.lastNameBasic && true}
                    name='gameRecordSection'
                    placeholder={intl.formatMessage({ id: "section_name" })}
                    options={{ phone: true, phoneRegionCode: 'VI' }}
                    value={dataSelected?.gameRecordSection || ''}
                    onChange={(e) => {
                      const { name, value } = e.target
                      handleOnchange(name, value)
                    }}
                  />
                </FormGroup>
                <FormGroup inline>
                  <Label for='gameRecordValue'>
                    {
                      intl.formatMessage({ id: "value" })
                    }</Label>
                  <Input
                    name='gameRecordValue'
                    id='gameRecordValue'
                    innerRef={register({
                      required: true,
                      maxLength: 5,
                      minLength: 5,
                      pattern: /^[0-9]*$/g
                    })}
                    invalid={errors.gameRecordValue && true}
                    value={dataSelected?.gameRecordValue || ""}
                    placeholder={
                      intl.formatMessage({ id: "value" })
                    }
                    onChange={(e) => {
                      const { name, value } = e.target
                      handleOnchange(name, value)
                    }}
                  />
                </FormGroup>

                {/* <FormGroup inline>
                  <Label for='gameRecordNote'>
                  {intl.formatMessage({id: 'note'})}
                  </Label>
                  <Input
                    disabled={true}
                    name='gameRecordNote'
                    id='gameRecordNote'

                    value={dataSelected?.gameRecordNote || ""}
                    placeholder={intl.formatMessage({id: 'note'})}
                    onChange={(e) => {
                      const { name, value } = e.target
                      handleOnchange(name, value)
                    }}
                  />
                </FormGroup> */}
                {/* <FormGroup inline>
                  <Label for='gameRecordStatus'>
                    <FormattedMessage
                      id="GAME_RECORD_STATUS"
                      defaultMessage={intl.formatMessage({id:'status'})}
                    /></Label>
                  <Input
                    disabled={true}
                    name='gameRecordStatus'
                    id='gameRecordStatus'
                    value={dataSelected?.gameRecordStatus || ""}
                    placeholder={intl.formatMessage({id:'status'})}
                    onChange={(e) => {
                      const { name, value } = e.target
                      handleOnchange(name, value)
                    }}
                  />
                </FormGroup> */}
                {
                  <FormGroup className='d-flex mb-0'>
                    <Button.Ripple className='mr-1' color='primary' type='submit'>
                      {intl.formatMessage({ id: 'update' })}
                    </Button.Ripple>
                  </FormGroup>
                }
              </Form>
            </Col>

          </Row>
        </ModalBody>

      </Modal>
    </Fragment>
  );
}

export default injectIntl(memo(GameRecordPage));
