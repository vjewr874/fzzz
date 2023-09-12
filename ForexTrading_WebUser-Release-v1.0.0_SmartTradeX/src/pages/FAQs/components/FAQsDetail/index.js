/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import Page from '../../../../components/Page/Page';
import './styles/FAQsDetail.scss';
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ic_next from '../../../../assets/new-icons/ic-next-2.svg';

function FAQsDetail() {
  const [show, setShow] = useState(false);
  const [Item, setItem] = useState(null);
  const { id } = useParams();
  const BookingHistory = {
    name: 'BookingHistory',
    title: 'Hướng dẫn mua vé',
    content: [
      {
        itemTitle: '1. Giới thiệu sản phẩm, cơ cấu giải thưởng',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '2. Hướng dẫn tạo tài khoản',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '3. Hướng dẫn nạp tiền',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '4. Hướng dẫn mua vé, kiểm tra thông tin vé',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '5. Hướng dẫn rút tiền',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
    ],
  };
  const Referral = {
    title: 'Hoa hồng giới thiệu bạn bè',
    content: [
      {
        itemTitle: '1. Hoa hồng giới thiệu là gì?',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '2. Cách lấy mã giới thiệu của mình',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '3. Giới thiệu bạn bè tạo TK và nhập mã',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '4. Hệ thống giới thiệu nhiều cấp',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '5. Cách tính HH giới thiệu và rút tiền HH',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
    ],
  };
  const Rules = {
    title: 'Điều khoản sử dụng',
    content: [
      {
        itemTitle: '1. Giới thiệu sản phẩm, cơ cấu giải thưởng',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '2. Hướng dẫn tạo tài khoản',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '3. Hướng dẫn nạp tiền',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '4. Hướng dẫn mua vé, kiểm tra thông tin vé',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
      {
        itemTitle: '5. Hướng dẫn rút tiền',
        itemContent:
          'Nếu kỳ quay thưởng chưa có khách hàng may mắn trúng thưởng, thì  giải thưởng vẫn như trên, cho đến khi có thông báo thay đổi trên trang thông tin chính thức của công ty chúng tôi.',
      },
    ],
  };

  let render;
  if (id === 'TicketBuyGuide') render = BookingHistory;
  else if (id === 'Referral') render = Referral;
  else render = Rules;

  return (
    <Page isShowMenu={false} headerTitle={render.title} isShowNotification={false}>
      <div id="FAQsDetail">
        <div className="FAQs-detail">
          {/*<Collapse expandIconPosition={"right" || "end"} >*/}
          {/*    {render.content.map((value,index)=>(*/}
          {/*        <Panel  header={value.itemTitle} key={index}>*/}
          {/*            <p>{value.itemContent}</p>*/}
          {/*        </Panel>*/}
          {/*    ))}*/}
          {/*</Collapse>*/}
          {render.content.map((value, index) => (
            <div className="FAQs-detail-item" key={index}>
              <div
                className={`FAQs-detail-item-title ${Item === index && show ? 'active' : ''}`}
                onClick={() => {
                  setShow(!show);
                  setItem(index);
                }}
              >
                <p>{value.itemTitle}</p>
                <div className={'icon'} style={{ backgroundImage: `url(${ic_next})` }} />
              </div>
              <div className={`FAQs-detail-item-content ${Item === index && show ? 'show' : ''}`}>
                <p>{value.itemContent}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
}
export default FAQsDetail;
