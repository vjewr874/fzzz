/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React, { useEffect } from 'react';
import IntroImage_1 from '../../assets/icons/intro_img_1.png';
import IntroImage_2 from '../../assets/icons/intro_img_2.png';
import IntroImage_3 from '../../assets/icons/intro_img_3.png';
import IntroImage_4 from '../../assets/icons/intro_img_4.png';

function Introdure(props) {
  useEffect(() => {
    window.AOS.init();
  }, []);
  return (
    <div className="introduce">
      <div className="introduce__wrapper_1" data-aos="fade-up">
        <span className="introduce__title_1">
          Thung lũng Silicon - “Thánh địa” của dân CNTT -{' '}
          <span className="introduce__orang_text">Got IT và MININGCOINT</span>
        </span>
        <span className="introduce__title_2">
          Thung lũng Silicon là cái tên không còn xa lạ với dân IT trên toàn thế giới, bởi đây được xem như “cái nôi”
          của những công nghệ mới hiện đại nhất, đặt nền móng cho sự phát triển của hàng loạt “ông lớn” trong ngành công
          nghệ thông tin như Google, Facebook, Apple hay Intel. Chính vì thế, được làm việc tại Silicon Valley chính là
          niềm mơ ước của hầu hết những người đang học tập và làm việc trong lĩnh vực này.
        </span>
      </div>
      <div className="introduce__wrapper_2" style={{ paddingTop: 50 }}>
        <div>
          <img src={IntroImage_1} alt="" />
        </div>
        <span className="introduce__text_1">Silicon Valley – trung tâm công nghệ lớn nhất toàn cầu</span>
      </div>
      <div className="introduce__wrapper_3" style={{ paddingTop: 50 }}>
        <div data-aos="fade-up">
          <span className="introduce__green_text_bold">Nguồn gốc của cái tên Silicon Valley</span>
          <span className="introduce__text_2">
            Tên gọi của trung tâm công nghệ lớn nhất toàn cầu được ra đời trong loại bài viết của một nhà báo người Mỹ
            được đăng trên tờ báo Electronic News vào ngày 11 tháng 1 năm 1971. “Silicon” là từ ám chỉ sự tập trung cao
            độ của hệ thống các ngành công nghiệp có liên quan đến công nghệ vi tính và công nghệ bán dẫn trong khu vực 
            phía nam vùng vịnh San Francisco, Bắc California (Mỹ). “Valley” tượng trưng cho thung lũng Santa Clara.
            Ngoài ra, cái tên Silicon Valley còn được dùng để chỉ các khu vực có công nghiệp phát triển nhanh nhất trên
            thế giới, do bản thân thung lũng Santa Clara cũng đã có bước chuyển mình vô cùng ấn tượng, khi mà chỉ trong
            vòng 50 năm phát triển, vùng đất này đã “thay da đổi thịt” từ một nơi chỉ toàn rừng cây và dãy đồi trở thành
            nơi cho ra đời những sản phẩm công nghệ tiên tiến bậc nhất hiện nay.
          </span>
        </div>
        <div data-aos="fade-up">
          <span className="introduce__green_text_bold">
            Silicon Valley – nơi tập hợp của những tên tuổi hàng đầu trong giới công nghệ
          </span>
          <span className="introduce__text_2">
            Lịch sử phát triển hàng chục năm của thung lũng Silicon gắn liền với những cái tên vô cùng nổi tiếng trên
            bản đồ công nghệ toàn cầu, có thể kể đến: Facebook, Google, Intel, eBay, Apple Computer, Adobe Systems, AMD,
            Cadence Design Systems,…  Năm 2017, có 11 tập đoàn lớn đã có trụ sở tại địa điểm này, bao gồm: Facebook,
            Apple, Alphabet (Google), Intel, Chevron, Netflix, Cisco Systems, Oracle, Wells Fargo, Nvidia và Visa. Bên
            cạnh đó, rất nhiều startup và nhà đầu tư mạo hiểm cũng đã chọn nơi đây để bắt đầu quá trình kinh doanh và
            tiến hành các thương vụ của mình. 
          </span>
        </div>
      </div>
      <div className="introduce__wrapper_2">
        <img src={IntroImage_2} alt="" />
        <span className="introduce__text_1">Trụ sở của Google tại thung lũng Silicon</span>
      </div>
      <div className="introduce__wrapper_3">
        <div data-aos="fade-up">
          <span className="introduce__text_2">
            Lương chính là thứ có sức hấp dẫn nhất tại Silicon Valley, nó khiến rất nhiều ITer không quản ngại khó khăn
            mà cố gắng để trở thành một phần của mảnh đất công nghệ màu mỡ này. Đặc biệt, kỹ sư phần mềm được xem như
            “miếng mồi ngon” mà bất kỳ công ty nào cũng khao khát có được.
          </span>
        </div>
      </div>
      <div className="introduce__wrapper_2">
        <img src={IntroImage_3} alt="" />
        <span className="introduce__text_1">Kỹ sư phần mềm là nghề “có giá” nhất tại Silicon Valley</span>
      </div>
      <div className="introduce__wrapper_3">
        <div data-aos="fade-up">
          <span className="introduce__text_2">
            Lấy ví dụ của Instagram, ứng dụng chia sẻ hình ảnh được Facebook định giá đến 1 tỷ USD và chính thức thuộc
            về Facebook, được phát triển bởi một nhóm chỉ gồm 13 người, mà phần lớn là các nhà phát triển sản phẩm. Hay
            như WhatsApp, có giá lên đến 19 tỷ USD và “về chung một nhà” với Instagram vào năm 2014 với đội ngũ xây dựng
            chỉ có 32 người, và họ đều là kỹ sư phần mềm. 
          </span>
        </div>
      </div>
      <div className="introduce__wrapper_3">
        <div data-aos="fade-up">
          <span className="introduce__green_text_bold">
            Cơ hội trở thành thành viên startup Got It tại thung lũng Silicon
          </span>
          <span className="introduce__text_2">
            <span className="introduce__green_text">Got It</span> được biết đến như là một biểu tượng của sự thành công
            trong lĩnh vực xây dựng ứng dụng hỏi đáp trên nền tảng di động hàng đầu tại Mỹ. Và  là một trong số cực kỳ
            ít những startup Việt thành công tại thung lũng Silicon, mang niềm tự hào và lan tỏa năng lượng mạnh mẽ đến
            cho giới IT Việt Nam. Ngoài một trụ sở được đặt tại Silicon Valley, Got It hiện đang tập trung xây dựng đội
            ngũ phát triển tại Hà Nội và rất mong chờ sự tham gia của các bạn trẻ hiện đang học tập và làm việc trong
            lĩnh vực này.
          </span>
        </div>
      </div>
      <div data-aos="fade-up">
        <div className="introduce__wrapper_4">
          <span style={{ paddingTop: 50 }} className="introduce__text_3">
            HEY HELLO! We are <span className="introduce__green_text">GOT IT</span> !
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <div style={{ width: 40, height: 2, background: '#384B42' }}></div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <img src={IntroImage_4} alt="" />
          </div>
          <span className="introduce__text_2 introduce__pd_top">
            Với đội ngũ IT dày dặn kinh nghiệm, xuất thân từ các tập đoàn nổi tiếng, lớn mạnh như “GOOGLE”, “FACEBOOK”,
            “APPLE ”, chúng tôi đã và đang dấn thân vào thị trường tiền điện tử. Chúng tôi có trách nhiệm đưa
            MiningCoint tiếp cận thị trường Việt Nam, lan tỏa 1 dự án tuyệt vời đến tay quý khách hàng tương lai !
          </span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
            <div style={{ width: 40, height: 2, background: '#384B42' }}></div>
          </div>
          <span style={{ paddingTop: 50 }} className="introduce__text_3 introduce__white_text">
            OK LET’GO !
          </span>
          <div style={{ marginTop: 24, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <span className="introduce__text_4">Gia nhập gia đình MiningCoint ngay hôm nay!</span>
          </div>
          <div style={{ paddingBottom: 50, alignItems: 'center', justifyContent: 'center', display: 'flex' }}>
            <span className="introduce__text_4">Để cùng chung tay phát triển MiningCoint</span>
          </div>
        </div>
      </div>

      <div className="introduce__wrapper_3">
        <div data-aos="fade-up">
          <div className="introduce__align_center" style={{ paddingTop: 80 }}>
            <span className="introduce__text_5">MiningCoint LÀ GÌ VÀ PHƯƠNG THỨC HOẠT ĐỘNG ?</span>
          </div>
        </div>
        <div>
          <div data-aos="fade-up">
            <div>
              <span className="introduce__text_6">
                MiningCoint là 1 sàn thương mại điện tử, tích hợp đào các đồng coin DEFI, vốn hóa thị trường phi tập
                trung.
              </span>
            </div>
            <div>
              <span className="introduce__text_6">
                Khi bạn tham gia MiningCoint, bạn sẽ dùng chính nguồn tiền, nguồn tài chính của bạn, giúp dòng tiền của
                bạn không bị ngưng đọng 1 chỗ.
              </span>
            </div>
            <div>
              <span className="introduce__text_6">
                MiningCoint giúp mọi người có thể đào coin, trao đổi mua bán coin 1 cách nhanh chóng, hiệu quả, an toàn
                và tiện lợi nhất.
              </span>
            </div>
            <div>
              <span className="introduce__text_6">
                MiningCoint giúp tất cả mọi người, dù là nguồn lực tài chính thấp hay cao đều có thể sở hữu các đồng
                coin 1 cách dễ dàng nhất.
              </span>
            </div>
            <div>
              <span className="introduce__text_6">
                MiningCoint giúp khách hàng có thể tạo ra 1 nguồn thu nhập thụ động.
              </span>
            </div>
            <div>
              <span className="introduce__text_6">
                Chúng ta không có thể đào các đồng coin có giá trị cao, nhưng để có thể đào được chúng thì tốn rất nhiều
                thời gian và tiền bạc.
              </span>
            </div>
          </div>
          <div data-aos="fade-up">
            <div style={{ paddingTop: 50 }}>
              <span className="introduce__midle_title">
                Coin Defi sẽ là xu thế là sự lựa chọn hoàn hảo cho các nền tảng Block Chain trên Smartphone.
              </span>
            </div>
            <div>
              <span className="introduce__text_6">
                Với nền tảng phi tập trung vốn hóa thị trường trên toàn thế giới, thì Coin Defi có thể chạm tay đến bất
                cứ người dùng nào, miễn là họ đang dùng và sở hữu 1 chiếc điện thoại Smartphone (nền tảng iOS or
                Android), dựa vào việc đó, thì MiningCoint sẽ hợp tác với khách hàng, là những người đã và đang sử dụng
                các thiết bị di động thông minh đó. Để hợp tác song phương , 2 bên cùng có lợi. Khách hàng sẽ dùng chính
                các thiết bị di động thông minh của mình để đào ra các đồng coin và sau đó bán lại cho MiningCoint hoặc
                ĐẠI LÝ TRỰC THUỘC HỆ THỐNG.
              </span>
            </div>
          </div>
          <div data-aos="fade-up">
            <div style={{ paddingTop: 50 }}>
              <span className="introduce__midle_title">
                Tại sao MiningCoint không tự đào mà phải nhờ vào khách hàng?
              </span>
            </div>
            <div>
              <span className="introduce__text_6">Vô cùng đơn giản nhưng đó là sự thật:</span>
            </div>
            <div>
              <span className="introduce__text_6">
                - MiningCoint có thể tự đào được nhưng không thể hiệu quả bằng việc kết hợp với người dùng có sử dụng
                các thiết bị di động thông minh (SMARTPHONE).
              </span>
            </div>
            <div>
              <span className="introduce__text_6">
                - Bởi vì căn bản, 1 thiết bị Smart Phone chỉ có thể đào cùng lúc 1 đồng coin cho đến khi quá trình đào
                đó kết thúc.
              </span>
            </div>
            <div>
              <span className="introduce__text_6">- Chính vì vậy MiningCoint đã có 1 bước đi vô cùng thông minh:</span>
            </div>
            <div>
              <ul>
                <li className="introduce__text_6">
                  Thay vì bỏ tiền ra mua 10 chiếc Smart Phone để đào thì MiningCoint sẽ tìm kiếm 10 khách hàng đã và
                  đang sử dụng Smart Phone để đào Coin và bán lại cho mình.
                </li>
                <li className="introduce__text_6">
                  Thay vì bỏ tiền ra mua 100 chiếc Smart Phone để đào thì MiningCoint sẽ tìm kiếm 100 khách hàng đã và
                  đang sử dụng Smart Phone để đào Coin và bán lại cho mình.
                </li>
                <li className="introduce__text_6">
                  Thay vì bỏ tiền ra mua 1000 chiếc Smart Phone để đào thì MiningCoint sẽ tìm kiếm 1000 khách hàng đã và
                  đang sử dụng Smart Phone để đào Coin và bán lại cho mình.
                </li>
                <li className="introduce__text_6">
                  Thay vì bỏ tiền ra mua 10.000 chiếc Smart Phone để đào thì MiningCoint sẽ tìm kiếm 10.000 khách hàng
                  đã và đang sử dụng Smart Phone để đào Coin và bán lại cho mình.
                </li>
                <li className="introduce__text_6">Tương đương 100.000 chiếc Smart Phone và 100.000 KHÁCH HÀNG.</li>
              </ul>
              <div style={{ paddingBottom: 50 }}>
                <span className="introduce__text_6">
                  Chỉ thông qua các ví dụ cụ thể trên thì các bạn có thể thấy GOT IT có 1 phương châm và kế hoạch vô
                  cùng khoa học cho việc phát triển dự án này .
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="introduce__flash"></div>
        <div data-aos="fade-up">
          <div>
            <span className="introduce__midle_text">
              Tham gia vào đại gia đình Got It, bạn sẽ có cơ hội được làm việc trong một môi trường chuyên nghiệp, góp
              sức vào các dự án lớn và tận hưởng niềm tự hào  khi được tự mình tạo ra những sản phẩm phục vụ lợi ích của
              hàng triệu người trên thế giới. Ngoài ra, Got It sẽ là nơi bạn được tự do phát triển, hoàn thiện kỹ năng
              bản thân, hợp tác với các anh tài xuất chúng từ khắp nơi trên thế giới và trở thành những cá nhân xuất sắc
              nhất trong ngành CNTT.
            </span>
          </div>
          <div>
            <span className="introduce__midle_text">
              Với những thành công tại thung lũng Silicon, Got It chính là địa điểm làm việc lý tưởng cho các ITer tài
              năng và dám đương đầu với thử thách. Nếu bạn có đam mê với công nghệ thông tin và đang theo đuổi lĩnh vực
              này thì ngại gì mà không thử sức với những vị trí còn khuyết tại Got It Việt Nam ngay hôm nay thôi nào!
            </span>
          </div>
        </div>
        <span className="introduce__green_text_bold introduce__orang_text" style={{ paddingTop: 40 }}>
          Thank You !
        </span>
      </div>
    </div>
  );
}
export default Introdure;
