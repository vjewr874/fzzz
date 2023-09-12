import React from 'react'
import { injectIntl } from 'react-intl'
import { Badge, Button, Input } from 'reactstrap'
import { useForm } from 'react-hook-form'

function AlertCurrentSection({ intl, data, length, onSubmit }) {
  return (
    <div className='my-2'>
      <div className='text-uppercase font-weight-bold display-5'>{intl.formatMessage({ id: "current_section" })}</div>
      <Item
        intl={intl}
        onSubmit={onSubmit}
        length={length}
        data={data}
      />

    </div>
  )
}

function Item({ intl, length, onSubmit, data }) {
  const { register, errors, handleSubmit } = useForm({
    defaultValues: {}
  })

  const { gameRecordValue } = data;
  let sum = 0
  if (gameRecordValue) {
    for (let i = 0; i < gameRecordValue.length; i++) {
      sum += parseInt(gameRecordValue[i]);
    }
  }

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit({
        "id": data.gameRecordId,
        "data": {
          "gameRecordValue": values.newGameRecordValue
        }
      }))}
    >
      <div className='my-1 text-capitalize'>{intl.formatMessage({ id: "section_name" })}:{" " + data.gameRecordSection}</div>
      <div className='my-1 d-flex align-items-center'>
        <span>
          {intl.formatMessage({ id: "expect_value" })}:
        </span>
        <div className='d-flex align-items-center ml-1'>
          <div className="valuediv">
            {
              gameRecordValue && gameRecordValue.split('').map(item => {
                return (
                  <div className="gameRecordValue">{item}</div>

                )
              })
            }
          </div>

          <div className="display-5 font-weight-bold mr-1">{sum}</div>
          <div className="valuediv">
            <Badge
              color={sum < 10 ? 'danger' : "success"}
            >{intl.formatMessage({ id: sum <= 10 ? "small" : "big" })}</Badge>
          </div>
          <div className="valuediv">
            <Badge
              color={sum % 2 === 0 ? "info" : "warning"}
            >{intl.formatMessage({ id: sum % 2 === 0 ? "even" : "odd" })}</Badge>

          </div>
        </div>
      </div>
      <div className='d-flex align-items-center m-0'>
        <div>{intl.formatMessage({ id: "new_value" })}</div>:
        <Input
          className="w-auto ml-1"
          name="newGameRecordValue"
          id="newGameRecordValue"
          innerRef={register({
            required: true,
            maxLength: length,
            minLength: length,
            pattern: /^[0-9]*$/g
          })}
          placeholder={'1234...'}
          invalid={errors.newGameRecordValue && true}
        // value={dataSelected?.gameRecordType || ''}
        // onChange={(e) => {
        //   const { name, value } = e.target
        //   handleOnchange(name, value)
        // }}
        />
      </div>
      <Button.Ripple className="mt-1" color='primary' type="submit">
        {intl.formatMessage({ id: 'update' })}
      </Button.Ripple>
    </form>

  )
}

export default injectIntl(AlertCurrentSection)