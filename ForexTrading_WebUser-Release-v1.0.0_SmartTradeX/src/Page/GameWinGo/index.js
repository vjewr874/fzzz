/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Modal, Button, Card, Row, Col, Input, Checkbox, notification } from 'antd';
import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useUser } from 'context/UserContext';
import { routes } from './../../App';
import {
  IconButtonRefresh,
  IconQuestionIcon,
  IconDownGame,
  IconTimeCircle,
  IconTimeCircleGreen,
  IconQuestionIconGreen,
} from './../../assets/icons/index';
import moment from 'moment';
import swal from 'sweetalert';
import { useDispatch, useSelector } from 'react-redux';
import { handleChangeAudio } from './../../actions';
import { useHistory } from 'react-router-dom';
import { number_to_price, getBalanceByWalletType } from 'helper/common';
import { countSecFromMin } from 'helper/dateUtils';
import Header from '../../components/Header';
import Countdown, { zeroPad } from 'react-countdown';
import { useIntl } from 'react-intl';
import TableGame from './tableGame';
import BetRecordsService from 'services/betRecordsService';
import GameRecordService from 'services/gameRecordService';
import Loader from 'components/Loader';

const NATURE_ARR = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const GAME_MODE = ['WINGO1', 'WINGO3', 'WINGO5', 'WINGO10'];
function Game(props) {
  const [isVisible, setIsVisible] = useState(false);
  const [mutilpleBet, setMutilpleBet] = useState(1);
  const [betnum, setBetnum] = useState(0);
  const [betType, setBetType] = useState({});
  const [betAmount, setBetAmount] = useState(0);
  const [gameRecordValueTmp, setGameRecordValueTmp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [secondTime, setSecondTime] = useState(0);
  const [indexActive, setIndexActive] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [agree, setAgree] = useState(true);
  const [currentData, setCurrentData] = useState();
  const [disaleRandom, setDisaleRandom] = useState(false);
  const [disaleBet, setDisaleBet] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const { imageAfterIdentityCard, imageBeforeIdentityCard, wallets } = useSelector(state => state.member || {});
  const balance = wallets ? getBalanceByWalletType(wallets, 'PointWallet') : 0;
  const audio = useSelector(state => state.setting.audio);
  const { refresh } = useUser();

  const intl = useIntl();
  const t = useCallback(id => intl.formatMessage({ id }), [intl]);
  const displayModal = type => {
    setIsVisible(true);
    setBetType(type);
  };

  // Renderer area
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (minutes === 0 && seconds === 5) {
      setIsVisible(false);
      setDisaleBet(true);
    }
    if (minutes === 0 && seconds === 0 && disaleBet) {
      setDisaleBet(false);
      callBackApi(indexActive);
    }
    return (
      <span>
        {zeroPad(minutes)}:{zeroPad(seconds)}
      </span>
    );
  };

  const rendererMask = ({ hours, minutes, seconds, completed }) => {
    return (
      <>
        <span className="item first-item">{zeroPad(seconds).substring(0, 1)}</span>
        <span className="item second-item">{zeroPad(seconds).substring(1, 2)}</span>
      </>
    );
  };

  const callBackApi = async index => {
    const timeCount = chooseMins(index);
    await lastDataApi({ gameRecordType: `WINGO${timeCount}` });
    currentDataApi(index);
  };

  const chooseMins = index => {
    let timeStr;
    switch (index) {
      case 0:
        timeStr = '1';
        break;
      case 1:
        timeStr = '3';
        break;
      case 2:
        timeStr = '5';
        break;
      default:
        timeStr = '10';
        break;
    }
    return timeStr;
  };
  const buildBetvalue = () => {
    const timeCount = chooseMins(indexActive);
    if (betType.type === 'number') {
      return `NUMBER;${timeCount}`;
    } else if (betType.type === 'color') {
      let gameStr;
      switch (betType.value) {
        case 'green':
          gameStr = 'XANH';
          break;
        case 'purple':
          gameStr = 'TIM';
          break;
        default:
          gameStr = 'DO';
          break;
      }
      return gameStr;
    } else {
      return betType.value === 'great' ? 'LON' : 'NHO';
    }
  };
  const shuffle = array => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const renderBall = useMemo(() => {
    const arrBall = { row1: [], row2: [] };
    const arrGr1 = [0, 2, 4, 5, 8];
    const arrGr2 = [1, 3];
    const arrGr3 = [6, 7];
    for (let i = 0; i < 10; i++) {
      const ele = (
        <div
          className={`number ${betnum === i ? 'active' : ''} d-flex align-items-center justify-content-center`}
          onClick={() => displayModal({ type: 'number', value: i })}
          key={i}
        >
          <span
            className={`txt ${arrGr1.includes(i) ? 'red' : ''}${arrGr2.includes(i) ? 'green' : ''}${
              arrGr3.includes(i) ? 'purple' : ''
            }${i === 9 ? 'line-grad' : ''}`}
          >
            {i}
          </span>
        </div>
      );
      if (i < 5) {
        arrBall.row1.push(ele);
      } else {
        arrBall.row2.push(ele);
      }
    }
    return arrBall;
  }, [betnum]);

  const quantityMinus = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const quantityPlus = () => {
    setQuantity(quantity + 1);
  };

  const handlePlaceBet = () => {
    // validation
    if (betAmount < 1) {
      notification['error']({
        message: '',
        description: 'Số dư không đủ',
      });
    }
    if (!agree) {
      notification['error']({
        message: '',
        description: 'bạn chưa đồng ý quy tắc',
      });
    }
    const timeCount = chooseMins(indexActive);
    const betRecordValue = buildBetvalue();
    const betData = {
      betRecordAmountIn: betAmount,
      sectionName: currentData.gameRecordSection,
      betRecordType: `WINGO${timeCount}`,
      betRecordValue,
    };
    placeDataApi(betData);
  };

  const handleClickTime = index => {
    setIndexActive(index);
    callBackApi(index);
  };

  const randomNumber = () => {
    if (disaleRandom) {
      return;
    }
    setDisaleRandom(true);
    const shuffleArr = shuffle(NATURE_ARR);
    const length = shuffleArr.length;
    for (let j = 4; j > 0; j--) {
      setTimeout(function () {
        for (let i = 0; i < length; i++) {
          setTimeout(function () {
            setBetnum(shuffleArr[i]);
            if (j === 1 && i === length - 1) {
              setBetType({ type: 'number', value: shuffleArr[i] });
              setDisaleRandom(false);
            }
          }, i * 100);
        }
      }, j * 1000);
    }
    setTimeout(function () {
      displayModal({ type: 'number', value: shuffleArr[9] });
    }, 5300);
  };

  const renderHeaderModal = () => {
    let timeStr;
    let gameStr;
    timeStr = chooseMins(indexActive);
    if (betType.type === 'number') {
      gameStr = betType.value;
    } else if (betType.type === 'color') {
      switch (betType.value) {
        case 'green':
          gameStr = 'xanh';
          break;
        case 'purple':
          gameStr = 'tím';
          break;
        default:
          gameStr = 'đỏ';
          break;
      }
    } else {
      gameStr = betType.value && betType.value === 'great' ? 'lớn' : 'nhỏ';
    }
    return `${timeStr} Phút - Chọn ${gameStr}`;
  };
  // Call api
  const currentDataApi = index => {
    refresh();
    setIsLoading(true);
    GameRecordService.getCurrent({
      gameRecordType: GAME_MODE[index],
    }).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        if (data?.finishTime) {
          const now = moment(data?.gameRecordSection, 'YYYY/MM/DD HH/mm');
          const then = moment(data?.finishTime, 'YYYY/MM/DD HH/mm');
          const seconds = moment.duration(then.diff(now)).asSeconds();
          setSecondTime(Date.now() + seconds * 1000);
          setIsLoading(false);
          setCurrentData(data);
        }
      }
    });
    // GameRecordService.getLast({ gameRecordType: GAME_MODE[indexActive] }).then(
    //   (result) => {
    //     const { isSuccess, data } = result;
    //     if (isSuccess) {
    //       setGameRecordValueTmp(data.gameRecordValue);
    //     }
    //   }
    // );
  };
  const lastDataApi = data => {
    setIsLoading(true);
    new Promise((resolve, reject) => {
      BetRecordsService.getLast(data).then(result => {
        setIsLoading(false);
        const { isSuccess, message, data } = result;
        // setIsVisible(false);
        if (!isSuccess || !data) {
          notification['error']({
            message: '',
            description: message || t('something_wrong'),
          });
          reject();
        } else {
          resolve();
        }
      });
    });
  };

  const placeDataApi = data => {
    setIsLoading(true);
    BetRecordsService.placeRecord(data).then(result => {
      setIsLoading(false);
      const { isSuccess, message, data } = result;
      // setIsVisible(false);
      if (!isSuccess || !data) {
        notification['error']({
          message: '',
          description: message || t('something_wrong'),
        });
        return;
      } else {
        setIsVisible(false);
        swal('Mua thành công', {
          icon: 'success',
        });
      }
    });
  };
  // init data and screen

  useEffect(() => {
    currentDataApi(indexActive);
  }, []);
  return (
    <div className="profile win-go">
      {isLoading ? <Loader /> : null}
      <div className="header">
        <Header
          goBack={() => {
            history.goBack();
          }}
          title="Win Go"
          headerRight={
            <>
              <img
                className="pointer icon_audio me-2"
                onClick={() => {
                  history.push(routes.managementProfileCustomer.path);
                }}
                src="/assets/images/audio.png"
                alt="audio"
              />
              <img
                onClick={() => {
                  dispatch(handleChangeAudio(!audio));
                }}
                className="pointer icon_audio"
                src={audio ? require(`assets/images/audioTurnOn.png`) : require(`assets/images/audioTurnOff.png`)}
                alt="audio"
              />
            </>
          }
        />

        <div className="currentAmount">
          <div className="walletMoney d-flex align-items-center ">
            <div className=" d-flex align-items-center">
              <img className="icon_audio" src="/assets/images/Wallet.png" alt="audio" />
              <div className="styleMoney ms-2"> Tổng </div>
            </div>
            <div className="win-go__wallet">Số dư ví</div>
          </div>
          <div className="amountMonney">
            <div className="styleAmount">{number_to_price(balance)} đ </div>
            <div className="icon_refresh">
              <IconButtonRefresh
                onClick={() => {
                  refresh();
                  swal('Làm mới thành công', {
                    icon: 'success',
                  });
                }}
                className="icon_refresh__Icon pointer"
              />
            </div>
          </div>
          <div className="button_payment">
            <button
              onClick={() => {
                history.push(routes.managementDeposit.path);
              }}
              className="button_withdraw "
            >
              Rút tiền
            </button>
            <button
              onClick={() => {
                history.push(routes.recharge.path);
              }}
              className="button_deposit"
            >
              Nạp tiền
            </button>
          </div>
        </div>
        <div className="win-go__box">
          <div className="rowSlide">
            <div className="ic_loud me-2">
              <img className="icon" src={require('../../assets/icons/ic_loud.png')} alt="ic_loud" />
            </div>
          </div>
        </div>
        <div className="win-go__box win-go__box__second">
          <div
            onClick={() => {
              handleClickTime(0);
            }}
            className={`win-go__box__item ${!indexActive ? 'win-go__box__item__active' : ''}`}
          >
            <div className="win-go__line">{!indexActive ? <IconQuestionIcon /> : <IconQuestionIconGreen />}</div>
            {!indexActive ? (
              <IconTimeCircle className="win-go__box__time" />
            ) : (
              <IconTimeCircleGreen className="win-go__box__time" />
            )}
            <IconDownGame className="win-go__box__down" />1 phút
          </div>
          <div
            onClick={() => {
              handleClickTime(1);
            }}
            className={`win-go__box__item ${indexActive === 1 ? 'win-go__box__item__active' : ''}`}
          >
            <div className="win-go__line">{indexActive === 1 ? <IconQuestionIcon /> : <IconQuestionIconGreen />}</div>
            {indexActive === 1 ? (
              <IconTimeCircle className="win-go__box__time" />
            ) : (
              <IconTimeCircleGreen className="win-go__box__time" />
            )}
            <IconDownGame className="win-go__box__down" />3 phút
          </div>
          <div
            onClick={() => {
              handleClickTime(2);
            }}
            className={`win-go__box__item ${indexActive === 2 ? 'win-go__box__item__active' : ''}`}
          >
            <div className="win-go__line">{indexActive === 2 ? <IconQuestionIcon /> : <IconQuestionIconGreen />}</div>
            {indexActive === 2 ? (
              <IconTimeCircle className="win-go__box__time" />
            ) : (
              <IconTimeCircleGreen className="win-go__box__time" />
            )}
            <IconDownGame className="win-go__box__down" />5 phút
          </div>
          <div
            onClick={() => {
              handleClickTime(3);
            }}
            className={`win-go__box__item ${indexActive === 3 ? 'win-go__box__item__active' : ''}`}
          >
            <div className="win-go__line">{indexActive === 3 ? <IconQuestionIcon /> : <IconQuestionIconGreen />}</div>
            {indexActive === 3 ? (
              <IconTimeCircle className="win-go__box__time" />
            ) : (
              <IconTimeCircleGreen className="win-go__box__time" />
            )}
            <IconDownGame className="win-go__box__down" />
            10 phút
          </div>
        </div>
      </div>
      <Row className="time-box p-2">
        <Col span={12} className="d-flex flex-column align-items-start first-box p-2">
          <Row className="time-set time-text-top mb-2">{chooseMins(indexActive)} phút</Row>
          <Row className="time-text-bottom">{currentData?.gameRecordSection}</Row>
        </Col>
        <Col span={12} className="d-flex flex-column align-items-end p-2 last-box">
          <Row className="time-label time-text-top mb-2">Thời gian còn lại để mua</Row>
          <Row className="time-text-bottom">
            <Countdown
              date={secondTime}
              key={secondTime}
              // overtime={true}
              onComplete={() => setSecondTime(secondTime)}
              renderer={renderer}
            />
          </Row>
        </Col>
      </Row>
      <Card className="color-btn__card p-2 mb-2">
        {disaleBet && (
          <div className="mask-box">
            <Countdown
              date={secondTime}
              key={secondTime}
              // overtime={true}
              onComplete={() => setSecondTime(secondTime)}
              renderer={rendererMask}
            />
          </div>
        )}
        <Row className="color-btn__card--group p-2 mb-2" gutter={16}>
          <Col span={8}>
            <Button
              type="primary"
              className="green-btn"
              onClick={() => displayModal({ type: 'color', value: 'green' })}
            >
              Xanh
            </Button>
          </Col>
          <Col span={8}>
            <Button
              type="primary"
              className="purp-btn"
              onClick={() => displayModal({ type: 'color', value: 'purple' })}
            >
              Tím
            </Button>
          </Col>
          <Col span={8}>
            <Button type="primary" className="red-btn" onClick={() => displayModal({ type: 'color', value: 'red' })}>
              Đỏ
            </Button>
          </Col>
        </Row>
        <Card className="color-ball p-2 mb-2">
          <div className="d-flex justify-content-around mb-2">{renderBall.row1.map(ele => ele)}</div>
          <div className="d-flex justify-content-around mb-2">{renderBall.row2.map(ele => ele)}</div>
        </Card>
        <div className="mutilple-number d-flex mb-4">
          <div className={`bet-mutilple mx-1`} onClick={randomNumber}>
            Ngẫu nhiên
          </div>
          <div className={`bet-mutilple ${mutilpleBet === 1 ? 'active' : ''} mx-1`} onClick={() => setMutilpleBet(1)}>
            X1
          </div>
          <div className={`bet-mutilple ${mutilpleBet === 5 ? 'active' : ''} mx-1`} onClick={() => setMutilpleBet(5)}>
            X5
          </div>
          <div className={`bet-mutilple ${mutilpleBet === 10 ? 'active' : ''} mx-1`} onClick={() => setMutilpleBet(10)}>
            X10
          </div>
          <div className={`bet-mutilple ${mutilpleBet === 20 ? 'active' : ''} mx-1`} onClick={() => setMutilpleBet(20)}>
            X20
          </div>
          <div className={`bet-mutilple ${mutilpleBet === 50 ? 'active' : ''} mx-1`} onClick={() => setMutilpleBet(50)}>
            X50
          </div>
          <div
            className={`bet-mutilple ${mutilpleBet === 100 ? 'active' : ''} mx-1`}
            onClick={() => setMutilpleBet(100)}
          >
            X100
          </div>
        </div>
        <div className="bet-size d-flex align-items-center">
          <div
            className="bet-big text-white text-center"
            onClick={() => displayModal({ type: 'size', value: 'great' })}
          >
            Lớn
          </div>
          <div
            className="bet-small text-white text-center"
            onClick={() => displayModal({ type: 'size', value: 'less' })}
          >
            Nhỏ
          </div>
        </div>
      </Card>
      <TableGame />
      <Modal visible={isVisible} wrapClassName="modal-game" closable={false} maskClosable={true} footer={null}>
        <div className={`modal-bet-head ${betType.type === 'color' && betType.value}`}>
          <div>{renderHeaderModal()}</div>
        </div>
        <div className="modal-bet-content mx-2">
          <div className="bet-amount-grp d-flex my-4">
            <div>Số tiền </div>
            <div className="bet-number-grp d-flex">
              <div
                className={`bet-number ${betAmount === 1000 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setBetAmount(1000)}
              >
                1000
              </div>
              <div
                className={`bet-number ${betAmount === 10000 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setBetAmount(10000)}
              >
                10,000
              </div>
              <div
                className={`bet-number ${betAmount === 100000 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setBetAmount(100000)}
              >
                100,000
              </div>
              <div
                className={`bet-number ${betAmount === 1000000 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setBetAmount(1000000)}
              >
                1,000,000
              </div>
            </div>
          </div>
          <div className="bet-quantity my-4 d-flex">
            <div>Số lượng </div>
            <div className="d-flex">
              <div>
                <div className="bet-subtract d-flex align-items-center justify-content-center" onClick={quantityMinus}>
                  <span>-</span>
                </div>
              </div>
              <Input className="mx-2" value={quantity} />
              <div className="bet-plus d-flex align-items-center justify-content-center" onClick={quantityPlus}>
                <span>+</span>
              </div>
            </div>
          </div>
          <div className="bet-amount-grp d-flex justify-content-end mb-4">
            <div className="bet-number-grp d-flex">
              <div
                className={`bet-number ${mutilpleBet === 0 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setMutilpleBet(0)}
              >
                Ngẫu nhiên
              </div>
              <div
                className={`bet-number ${mutilpleBet === 1 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setMutilpleBet(1)}
              >
                X1
              </div>
              <div
                className={`bet-number ${mutilpleBet === 5 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setMutilpleBet(5)}
              >
                X5
              </div>
              <div
                className={`bet-number ${mutilpleBet === 10 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setMutilpleBet(10)}
              >
                X10
              </div>
              <div
                className={`bet-number ${mutilpleBet === 20 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setMutilpleBet(20)}
              >
                X20
              </div>
              <div
                className={`bet-number ${mutilpleBet === 50 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setMutilpleBet(50)}
              >
                X50
              </div>
              <div
                className={`bet-number ${mutilpleBet === 100 ? 'active' : ''}${
                  betType.type === 'color' ? `-${betType.value}` : ''
                } mx-1`}
                onClick={() => setMutilpleBet(100)}
              >
                X100
              </div>
            </div>
          </div>
          <div className="mb-4">
            <Checkbox defaultChecked={true}>Tôi đồng ý </Checkbox>{' '}
            <span
              className="game5D__text__active"
              onClick={() => {
                agree ? setAgree(false) : setAgree(true);
              }}
            >
              Quy tắc bán trước
            </span>
          </div>
        </div>
        <div className="modal-bet-footer d-flex">
          <div
            className="modal-bet-cancel-btn d-flex justify-content-center align-items-center"
            onClick={() => setIsVisible(false)}
          >
            Hủy
          </div>
          <div
            className={`modal-bet-total d-flex justify-content-center align-items-center ${
              betType.type === 'color' && betType.value
            }`}
            onClick={handlePlaceBet}
          >
            Tổng số tiền {number_to_price(betAmount * quantity)}
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default Game;
