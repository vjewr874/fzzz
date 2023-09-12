/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Page from '../../components/Page/Page';
import React from 'react';
import { injectIntl } from 'react-intl';
import './styles/lotttery-calendar.scss';

function NextSchedule(props) {
  const { intl } = props;
  const calendar = [
    {
      day: 'Thứ 2',
      local: 'Hồ Chí Minh - Đồng Tháp - Cà Mau',
    },
    {
      day: 'Thứ 3',
      local: 'Bến Tre - Vũng Tàu - Bạc Liêu',
    },
    {
      day: 'Thứ 4',
      local: 'Đồng Nai - Cần Thơ - Sóc Trăng',
    },
    {
      day: 'Thứ 5',
      local: 'Tây Ninh - An Giang - Bình Thuận',
    },
    {
      day: 'Thứ 6',
      local: 'Vĩnh Long - Bình Dương - Trà Vinh',
    },
    {
      day: 'Thứ 7',
      local: 'Hồ Chí Minh - Long An <br/> Bình Phước - Hậu Giang',
    },
    {
      day: 'Chủ Nhật',
      local: 'Tiền Giang - Kiên Giang - Đà Lạt',
    },
  ];
  return (
    <Page isHideItemRight={true} headerTitle={intl.formatMessage({ id: 'next_schedule' })}>
      <div id="next-schedule">
        <table className="container">
          <tbody>
            <tr className="title">
              <th className="column-1">Thứ</th>
              <th className="column-2">
                Miền Nam
                <br />
                <span>Lúc: </span>
                <span className="time">16h15'</span>
              </th>
            </tr>
            {calendar.map((value, index) => (
              <tr key={index}>
                <th className="day">{value.day}</th>
                <th className="local" dangerouslySetInnerHTML={{ __html: value?.local }} />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Page>
  );
}
export default injectIntl(NextSchedule);
