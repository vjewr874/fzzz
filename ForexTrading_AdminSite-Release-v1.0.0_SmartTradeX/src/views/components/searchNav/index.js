import React, { useState } from 'react'
import {
  Input, Row, Col, DropdownMenu, DropdownItem,
  DropdownToggle, InputGroup, InputGroupButtonDropdown
} from 'reactstrap'
import { injectIntl } from 'react-intl'
import './searchNav.scss'
import moment from 'moment'

function SearchNav({
  inputSearchValue, onSearch,
  setInputSearchValue,
  dropdownValue, currentDropdownValue,
  setDropdownValue,
  intl, refId, placeholder, rangePicker,
  onPickDate
}) {
  const [isOpenDropDown, setIsOpenDropDown] = useState(false)
  let label = dropdownValue.find(item => item.value === currentDropdownValue)

  function getMaxDate(value) {
    let endDateEl = value ? value : document.getElementById('endDate')
    if (endDateEl) {
      let maxValue = moment(endDateEl?.value || new Date()).add(1, 'day').toDate().toISOString().split("T")[0];
      document.getElementById("startDate").setAttribute("max", maxValue);
    }
  }

  function getMinDate(value) {
    let startDateEl = value ? value : document.getElementById('startDate')
    if (startDateEl && startDateEl.value) {
      let minValue = moment(startDateEl.value || new Date()).add(1, 'day').toDate().toISOString().split("T")[0];
      document.getElementById("endDate").setAttribute("min", minValue);
    }
  }

  return (
    <Row className='filter-container'>
      <Col md="6" lg="4" className="mb-1">
        <InputGroup>
          <Input
            type='text'
            value={inputSearchValue}
            id={refId}
            placeholder={placeholder ? placeholder : intl.formatMessage({ id: 'search' })}
            onChange={(e) => {
              let { value } = e.target
              setInputSearchValue(value)
              onSearch(value ? value : undefined)

            }}
            onKeyDown={(e) => {
              let value = document.getElementById(refId)?.value
              let lastValueSection = value ? value : undefined
              if (e.key === "Enter") {
                onSearch(lastValueSection)
              }
            }}
          />
          {/* <InputGroupAddon addonType='prepend' style={{ borderRadius: '0 8px 8px 0' }}>
            <Button
              color='primary'
              outline onClick={() => {
                onSearch(inputSearchValue)
              }}>
              <Search size={12} />
            </Button>
          </InputGroupAddon> */}
        </InputGroup>
      </Col>
      <Col md="6" lg="2" className="mb-1">
        <InputGroup>
          <InputGroupButtonDropdown
            addonType='prepend' isOpen={isOpenDropDown}
            toggle={() => setIsOpenDropDown(!isOpenDropDown)}
          >
            <DropdownToggle
              color='primary' caret
              outline className="rounded-0 w-100"
            >{label?.label || ""}</DropdownToggle>
            <DropdownMenu>
              {
                dropdownValue.map(item => {
                  return (
                    <DropdownItem
                      key={item.value}
                      onClick={() => setDropdownValue(item.value)}
                      className='w-100'
                    >{item.label}</DropdownItem>
                  )
                })
              }
            </DropdownMenu>
          </InputGroupButtonDropdown>
        </InputGroup>
      </Col>
      {
        rangePicker && (
          <Col md="6" lg="4" className="mb-1">
            <InputGroup>
              <Input
                id="startDate"
                type='date'
                max={getMaxDate()}
                onChange={(e) => {
                  let { value } = e.target
                  let endDateEl = document.getElementById('endDate')
                  getMinDate({ value })
                  if (endDateEl && endDateEl.value) {
                    onPickDate([value, endDateEl.value])
                  }
                }}
              />
              <Input
                id="endDate"
                type='date'
                min={getMinDate()}
                max={new Date().toISOString().split("T")[0]}
                onChange={(e) => {
                  let { value } = e.target
                  getMaxDate({ value })
                  let startDateEl = document.getElementById('startDate')
                  if (startDateEl && startDateEl.value) {
                    onPickDate([startDateEl.value, value])
                  }
                }}
              />
            </InputGroup>
          </Col>
        )
      }
    </Row>
  )
}

export default injectIntl(SearchNav)