/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Page from '../../components/Page/Page';
import React, { useEffect, useState } from 'react';
import { injectIntl, useIntl } from 'react-intl';
import './styles/details.scss';
import img from '../../assets/new-images/img-detail.png';
import { useParams } from 'react-router-dom';
import CustomerService from '../../services/customerMessage';
import Loader from '../../components/Loader';

function Details(props) {
  const { formatMessage: f } = useIntl();
  const { id } = useParams();
  const { intl } = props;
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const data = {
      id: id,
    };
    getDetailMessage(data);
  }, []);
  function getDetailMessage(data) {
    CustomerService.getDetailMessage(data).then(r => {
      const { isSuccess, data } = r;
      if (isSuccess) {
        setData(data);
      }
      setIsLoading(false);
    });
  }
  return (
    <Page isHideItemRight={true} headerTitle={intl.formatMessage({ id: 'Detail' })} showNotify={'1'}>
      {isLoading ? <Loader /> : null}
      <div id="details">
        {data.customerMessageImage && <img alt={''} src={data.customerMessageImage} className={'details-img'} />}

        <h2 className={'details-title'}>{data.customerMessageTitle}</h2>
        <p
          style={{ wordWrap: 'break-word' }}
          dangerouslySetInnerHTML={{
            __html: data.customerMessageContent,
          }}
        ></p>
      </div>
    </Page>
  );
}
export default injectIntl(Details);
