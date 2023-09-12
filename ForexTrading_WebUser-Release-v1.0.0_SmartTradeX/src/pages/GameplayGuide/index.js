/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import Page from '../../components/Page/Page';
import './styles/gameplay-guide.scss';

import guideImg from '../../assets/new-images/im-gameplay-guide.png';

function GameplayGuide() {
  const gameplayGuide = {
    video_url: '',
    img_url: guideImg,
    content1:
      'Xổ số truyền thống là hình thức chơi xổ số có nhiều giải trúng và cơ cấu giải thưởng hấp dẫn,' +
      ' với giải thưởng đặc biệt lên đến 2 tỷ đồng nên được nhiều người chơi yêu thích.',
    content2:
      'Xổ số truyền thống miền Nam có 21 tỉnh và 22 đài (do Hồ Chí Minh xổ 2 ngày thứ hai và thứ bảy)' +
      ' và được quay số mở thưởng vào 16h15 hằng ngày:',
    attention: {
      title: 'Chú ý: Mỗi vé chỉ được nhận 1 phần thưởng cao nhất. Trúng Đặc Biệt+ An ủi + KK không thưởng',
      ad: 'vé số cặp nguyên chính thức có mặt tại ứng dụng VESOONLINE',
      contents: [
        {
          id: 1,
          info: 'Vé số cặp nguyên là 1 lốc vé chỉ khác nhau ở con số đầu tiên.',
        },
        {
          id: 2,
          info:
            'Ví dụ: cặp nguyên miền Nam có 5 số cuối là 12345, thì lần lượt sẽ có 012345 (11 vé) 112345 (11 vé)' +
            ' 212345 (11 vé) ... cho đến 912345 (11 vé), tổng cộng 110 vé.',
        },
      ],
    },
    inforate: {
      title: 'Tỷ lệ trúng thưởng vé số cặp số nguyên',
      introduce: 'Khi mua cặp nguyên số tiền quý khách bỏ ra khá cao nên tỉ lệ trúng cũng được nâng lên rất nhiều:',
      contents: [
        {
          id: 1,
          info: 'Thứ 1: Trúng an ủi (Giải đặc biệt phụ)',
          content: [
            {
              i:
                'Tỷ lệ trúng giải phụ đặc biệt tương đối cao hơn rất nhiều nếu bạn mua cả theo cặp só nguyên. Kết quả mở thưởng' +
                'có 6 chữ số XXXXXX, nếu bạn chỉ trật con số đầu tiên (hàng trăm nghìn) và trúng đủ 5 số cuối cùng theo thứ tự của giải đặc biệt là bạn đã',
            },
            {
              i:
                'Tỷ lệ trúng giải phụ đặc biệt tương đối cao hơn rất nhiều nếu bạn mua cả theo cặp só nguyên. Kết quả mở thưởng' +
                'có 6 chữ số XXXXXX, nếu bạn chỉ trật con số đầu tiên (hàng trăm nghìn) và trúng đủ 5 số cuối cùng theo thứ tự của giải đặc biệt là bạn đã',
            },
          ],
        },
      ],
    },
  };
  return (
    <Page headerTitle={'Hướng dẫn chơi'} isShowNotification={false}>
      <div id="gameplayGuide">
        <div className={'guide-video'}>
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/4qC7EA-OlXY"
            title="YouTube video player"
            style={{ display: 'block' }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="guide-content">
          <div className="guide-content-intro">
            <p className="text">{gameplayGuide.content1}</p>
            <p className="text">{gameplayGuide.content2}</p>
            <div className="guide-content-intro-img">
              <div style={{ backgroundImage: `url(${gameplayGuide.img_url})` }} />
            </div>
          </div>
          <div className="guide-content-attention">
            <p className="text">{gameplayGuide.attention.title}</p>
            <span>{gameplayGuide.attention.ad}</span>
            <ul className="list">
              {gameplayGuide.attention.contents.map(value => (
                <li key={value.id} className="list-item">
                  {value.info}
                </li>
              ))}
            </ul>
          </div>
          <div className="guide-content-info-rate">
            <p className="title text">{gameplayGuide.inforate.title}</p>
            <p className="ad text">{gameplayGuide.inforate.introduce}</p>
            {gameplayGuide.inforate.contents.map(value => (
              <div className="guide-content-info-rate-item" key={value.id}>
                <p className="title-rate text">{value.info}</p>
                <ul className="list">
                  {value.content.map((value2, index) => (
                    <li className="list-item" key={index}>
                      {value2.i}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Page>
  );
}
export default GameplayGuide;
