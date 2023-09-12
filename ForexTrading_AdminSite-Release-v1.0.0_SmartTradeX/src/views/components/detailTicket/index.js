import React from 'react'
import { Badge, Button, Col, Form, FormGroup, Label, Modal, ModalBody, ModalHeader, Row } from 'reactstrap'
import moment from 'moment'

function DetailTicket({
  modal, setModal, dataSelected,
  intl, gameName
}) {
  return (
    <Modal
      isOpen={modal}
      toggle={() => setModal(false)}
      className={`modal-dialog-centered `}
      size="sm"
    >
      <ModalHeader toggle={() => setModal(false)}>
        {intl.formatMessage({ id: 'detail_ticket' })}
      </ModalHeader>
      <ModalBody>
        <Row>
          <Form>
            <FormGroup inline>
              <Label for='betRecordType' className="h5 text-capitalize border-bottom pb-1">
                {gameName}
              </Label>
            </FormGroup>
            <FormGroup inline>
              <Label for='buyer' className='h5 text-capitalize border-bottom pb-1'>
                {intl.formatMessage({ id: 'buyer' })}<b>{": "}{(dataSelected?.firstName + ' ' + dataSelected?.lastName) || ""}</b>
              </Label>
            </FormGroup>
            <FormGroup inline>
              <Label for='gameRecordSection' className='h5 text-capitalize border-bottom pb-1'>
                {intl.formatMessage({ id: "section_name" })}{": "}<b>{dataSelected?.betRecordSection || ''}</b>
              </Label>
            </FormGroup>
            <FormGroup inline>
              <Label for='betRecordAmountIn' className='h5 text-capitalize border-bottom pb-1'>
                {intl.formatMessage({ id: 'amount_in' })}{": "}{dataSelected?.betRecordAmountIn?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) || "0"}
              </Label>
            </FormGroup>
            <FormGroup inline>
              <Label for='betRecordAmountOut' className='h5 text-capitalize border-bottom pb-1'>
                {intl.formatMessage({ id: 'amount_out' })}{": "}{dataSelected?.betRecordAmountOut?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' }) || "0"}
              </Label>
            </FormGroup>
            <FormGroup inline>
              <Label for='buy_date' className='h5 text-capitalize border-bottom pb-1'>
                {intl.formatMessage({ id: 'buy_date' })}{": "}{moment.utc(moment(dataSelected?.createdAt || new Date())).format("DD/MM/YYYY")}
              </Label>
            </FormGroup>
            <FormGroup inline>
              <Label for='status' className='h5 text-capitalize'>
                {
                  intl.formatMessage({ id: 'status' }) + ": "
                }
                <Badge
                  color={dataSelected.betRecordStatus === "New" ? 'secondary' : 'danger'}
                >
                  {
                    intl.formatMessage({
                      id: dataSelected.betRecordStatus === "New" ? "not_dialed" : "dialed"
                    })
                  }
                </Badge>
              </Label>
            </FormGroup>

            {/* <Button.Ripple className='mr-1' color='secondary' onClick={() => setModal(false)}>
              {intl.formatMessage({ id: 'close' })}
            </Button.Ripple> */}
          </Form>
        </Row>
      </ModalBody>
    </Modal>
  )
}

export default DetailTicket