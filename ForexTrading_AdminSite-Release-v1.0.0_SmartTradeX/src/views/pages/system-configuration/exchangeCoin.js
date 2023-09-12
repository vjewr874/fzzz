import React, { Fragment, useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
  Card,
  CardBody,
  CustomInput,
} from "reactstrap";
import SystemConfigurationService from "../../../services/systemService";
import { toast } from "react-toastify";
import { injectIntl } from "react-intl";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { EditorState, ContentState } from 'draft-js'
import htmlToDraft from 'html-to-draftjs'
import { convertToHTML } from 'draft-convert';
import { Editor } from 'react-draft-wysiwyg'
import "./style.scss";
import '@styles/react/libs/editor/editor.scss'
import '@styles/base/plugins/forms/form-quill-editor.scss'
import '@styles/react/libs/react-select/_react-select.scss'

function ExChangeCoin({ intl, dataConfig }) {
  const contentBlock = htmlToDraft(dataConfig.introPolicy)
  const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
  const editorState = EditorState.createWithContent(contentState)

  const contentBlock2 = htmlToDraft(dataConfig.introOverview)
  const contentState2 = ContentState.createFromBlockArray(contentBlock2.contentBlocks)
  const editorState2 = EditorState.createWithContent(contentState2)
  const [content, setContent] = useState(editorState)
  const [content2, setContent2] = useState(editorState2)


  const updateInformation = (data) => {
    const params = {

      introPolicy: data.introPolicy,
      introOverview: data.introOverview,

    };
    SystemConfigurationService.updateConfigs(params)
      .then(() => {
        toast.success(
          intl.formatMessage({ id: "update" }) +
          " " +
          intl.formatMessage({ id: "actionSuccess" })
        );
      })
      .catch(() => {
        toast.error(
          intl.formatMessage({ id: "update" }) +
          " " +
          intl.formatMessage({ id: "actionFailed" })
        );
      });
  };


  return (
    <Fragment>
      <Card className="col-12 col-sm-12 col-lg-12">
        <span className="align-middle d-sm-none">
          <h3 className="my-2">
            {intl.formatMessage({ id: "exchange_coin" })}
          </h3>
        </span>
        <CardBody className="mt-1">

          <Row className={"pb-1 align-items-center"}>
            <Col className="" xs={12} sm={12} lg={12}>
              <Label>Chính sách bảo mật</Label>
            </Col>
            <Col xs={12} sm={12} lg={12}>
              <Editor
                editorState={content}
                onEditorStateChange={data => setContent(data)}
                toolbar={{
                  options: ['inline', "fontSize"],
                  inline: {
                    options: ['bold', 'italic', 'underline']
                  }
                }}
              />
            </Col>

          </Row>
          <Row className={"pb-1 align-items-center"}>
            <Col className="" xs={12} sm={12} lg={12}>
              <Label>Thảo luận tiết lộ rủi ro</Label>
            </Col>
            <Col xs={12} sm={12} lg={12}>
              <Editor
                editorState={content2}
                onEditorStateChange={data => setContent2(data)}
                toolbar={{
                  options: ['inline', "fontSize"],
                  inline: {
                    options: ['bold', 'italic', 'underline']
                  }
                }}
              />

            </Col>

          </Row>
          <Row className={"justify-content-end pr-1"}>
            <Button.Ripple onClick={() => {
              updateInformation(
                {
                  introOverview: convertToHTML(content2.getCurrentContent()),
                  introPolicy: convertToHTML(content.getCurrentContent())
                }
              )
            }} color="primary" type="submit">
              {intl.formatMessage({ id: "update" })}
            </Button.Ripple>
          </Row>

        </CardBody>
      </Card>
    </Fragment>
  );
}

export default injectIntl(ExChangeCoin);
