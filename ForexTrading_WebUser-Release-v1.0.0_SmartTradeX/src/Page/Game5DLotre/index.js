/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import { Tabs } from 'antd';
import { useUser } from 'context/UserContext';
import _ from 'lodash';
import { number_to_price, getBalanceByWalletType } from 'helper/common';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { handleChangeAudio } from './../../actions';
import CountDown from 'components/CountDown';
import MaskOverBackground from 'components/MaskOverBackground';
import {
  IconButtonRefresh,
  IconQuestionIcon,
  IconDownGame,
  IconTimeCircle,
  IconTimeCircleGreen,
  IconQuestionIconGreen,
} from './../../assets/icons/index';
import { routes } from './../../App';
import './index.scss';
import Header from '../../components/Header';
import CustomerService from '../../services/customerMessage';
import GameRecordService from '../../services/gameRecordService';
import BetNumber from './betNumber';
import TableGame from './tableGame';
import Loader from 'components/Loader';
import moment from 'moment';
import ModalBet from './modalBet';
import swal from 'sweetalert';
const { TabPane } = Tabs;
const DeaFaultFilter = {
  skip: 0,
  limit: 10,
  order: {
    key: 'createdAt',
    value: 'desc',
  },
};
let myInterval = null;
const GAME_MODE = ['5D1', '5D3', '5D5', '5D10'];
function Game5DLotre(props) {
  const { imageAfterIdentityCard, imageBeforeIdentityCard, wallets } = useSelector(state => state.member || {});
  const history = useHistory();
  const dispatch = useDispatch();
  const [identifyCard, setIdentifyCard] = useState({
    front: '',
    back: '',
  });
  const audio = useSelector(state => state.setting.audio);
  const [indexActive, setIndexActive] = useState(0);
  const [notificationText, setNotifiactionText] = useState([]);
  const [isShowOver, setIsShowOver] = useState(false);
  const [isShowCountDown, setIsShowCountDown] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [secondTime, setSecondTime] = useState(0);
  const [gameRecordValue, setGameRecordValue] = useState();
  const [gameRecordSection, setGameRecordSection] = useState('');
  const [gameRecordValueTmp, setGameRecordValueTmp] = useState('');
  const { _, refresh } = useUser();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [keyActive, setKeyActive] = useState('A');
  const [betRecordAmountIn, setBetRecordAmountIn] = useState(1000);
  const [betRecordValue, setBetRecordValue] = useState([]);
  const [betRecordAmount, setBetRecordAmount] = useState(1);
  useEffect(() => {
    setIdentifyCard({
      front: imageBeforeIdentityCard,
      back: imageAfterIdentityCard,
    });
  }, [imageAfterIdentityCard, imageBeforeIdentityCard]);

  useEffect(() => {
    handleGetNotification();
  }, []);

  function handleGetNotification() {
    CustomerService.getGroupCustomerMessage(DeaFaultFilter).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        if (data?.data && data.data) {
          setNotifiactionText(data.data);
        }
      }
    });
  }

  function handlePlayGame() {
    if (myInterval) {
      clearInterval(myInterval);
    }
    const collection = document.getElementsByClassName('game5D__wheels__content__box__slot__colum');
    myInterval = setInterval(() => {
      if (collection && collection.length) {
        for (let i = 0; i < collection.length; i++) {
          const matrix = window
            .$(collection[i])
            .css('transform')
            .replace(/[^0-9\-.,]/g, '')
            .split(',');
          const y = matrix[13] || matrix[5]; //translate y
          // const x = matrix[12] || matrix[4];//translate x

          if (+y < -450) {
            window.$(collection[i]).css('transform', `translateY(-30px)`);
          } else {
            window.$(collection[i]).css('transform', `translateY(${+y - 30}px)`);
          }
        }
      }
    }, 50);
  }

  function handleStopGame() {
    if (myInterval) {
      clearInterval(myInterval);
    }
    const collection = document.getElementsByClassName('game5D__wheels__content__box__slot__colum');
    if (collection && collection.length) {
      for (let i = 0; i < collection.length; i++) {
        window.$(collection[i]).css('transform', `translateY(-30px)`);
        if (!i) {
          window.$(collection[i]).css('display', 'inline-block');
        }
      }
    }
  }

  useEffect(() => {
    handleFetchData();
  }, [indexActive]);

  function handleFetchData() {
    refresh();
    setIsShowCountDown(false);
    setIsLoading(true);
    GameRecordService.getCurrent({ gameRecordType: GAME_MODE[indexActive] }).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        if (data?.finishTime) {
          const now = moment();
          const then = moment(data?.finishTime, 'YYYYMMDDHHmm');
          const seconds = moment.duration(then.diff(now)).asSeconds();
          setIsShowCountDown(true);
          setSecondTime(seconds);
          setIsLoading(false);
          setGameRecordSection(data?.gameRecordSection);
        }
      }
    });
    GameRecordService.getLast({ gameRecordType: GAME_MODE[indexActive] }).then(result => {
      const { isSuccess, data } = result;
      if (isSuccess) {
        setGameRecordValueTmp(data.gameRecordValue);
      }
    });
  }

  return (
    <div className="profile game5D">
      {isLoading ? <Loader /> : null}
      <div className="header">
        <Header
          goBack={() => {
            history.goBack();
          }}
          title="5D Lotre"
          headerRight={
            <>
              <img
                className="pointer icon_audio me-2"
                onClick={() => {
                  history.push(routes.managementProfileCustomer.path);
                }}
                src="/assets/images/audio.png"
              />
              <img
                onClick={() => {
                  dispatch(handleChangeAudio(!audio));
                }}
                className="pointer icon_audio"
                src={audio ? require(`assets/images/audioTurnOn.png`) : require(`assets/images/audioTurnOff.png`)}
              />
            </>
          }
        />

        <div className="currentAmount">
          <div className="walletMoney d-flex align-items-center ">
            <div className=" d-flex align-items-center">
              <img className="icon_audio" src="/assets/images/Wallet.png" />
              <div className="styleMoney ms-2"> Tổng </div>
            </div>
            <div className="game5D__wallet">Số dư ví</div>
          </div>
          <div className="amountMonney">
            <div className="styleAmount">
              {number_to_price(wallets ? getBalanceByWalletType(wallets, 'PointWallet') : 0)} đ{' '}
            </div>
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
        <div className="game5D__box">
          <div className="rowSlide">
            <div className="ic_loud me-2">
              <img className="icon" src={require('../../assets/icons/ic_loud.png')} />
            </div>

            <marquee className="van-notice-bar__content">
              {notificationText?.map(item => {
                return <span style={{ marginRight: '200px' }}>{item.groupCustomerMessageTitle}</span>;
              })}
            </marquee>
          </div>
        </div>
        <div className="game5D__box game5D__box__second">
          <div
            onClick={() => {
              setIndexActive(0);
            }}
            className={`game5D__box__item ${!indexActive ? 'game5D__box__item__active' : ''}`}
          >
            <div className="game5D__line">{!indexActive ? <IconQuestionIcon /> : <IconQuestionIconGreen />}</div>
            {!indexActive ? (
              <IconTimeCircle className="game5D__box__time" />
            ) : (
              <IconTimeCircleGreen className="game5D__box__time" />
            )}
            <IconDownGame className="game5D__box__down" />1 phút
          </div>
          <div
            onClick={() => {
              setIndexActive(1);
            }}
            className={`game5D__box__item ${indexActive === 1 ? 'game5D__box__item__active' : ''}`}
          >
            <div className="game5D__line">{indexActive === 1 ? <IconQuestionIcon /> : <IconQuestionIconGreen />}</div>
            {indexActive === 1 ? (
              <IconTimeCircle className="game5D__box__time" />
            ) : (
              <IconTimeCircleGreen className="game5D__box__time" />
            )}
            <IconDownGame className="game5D__box__down" />3 phút
          </div>
          <div
            onClick={() => {
              setIndexActive(2);
            }}
            className={`game5D__box__item ${indexActive === 2 ? 'game5D__box__item__active' : ''}`}
          >
            <div className="game5D__line">{indexActive === 2 ? <IconQuestionIcon /> : <IconQuestionIconGreen />}</div>
            {indexActive === 2 ? (
              <IconTimeCircle className="game5D__box__time" />
            ) : (
              <IconTimeCircleGreen className="game5D__box__time" />
            )}
            <IconDownGame className="game5D__box__down" />5 phút
          </div>
          <div
            onClick={() => {
              setIndexActive(3);
            }}
            className={`game5D__box__item ${indexActive === 3 ? 'game5D__box__item__active' : ''}`}
          >
            <div className="game5D__line">{indexActive === 3 ? <IconQuestionIcon /> : <IconQuestionIconGreen />}</div>
            {indexActive === 3 ? (
              <IconTimeCircle className="game5D__box__time" />
            ) : (
              <IconTimeCircleGreen className="game5D__box__time" />
            )}
            <IconDownGame className="game5D__box__down" />
            10 phút
          </div>
        </div>
      </div>

      <div className="game5D__title">Kết quả mở thưởng</div>
      <div className="game5D__result">
        <div className="game5D__result__item">
          <div className="game5D__result__item__circle">{gameRecordValue ? gameRecordValue[0] : 0}</div>A
        </div>
        <div className="game5D__result__item">
          <div className="game5D__result__item__circle">{gameRecordValue ? gameRecordValue[1] : 0}</div>B
        </div>
        <div className="game5D__result__item">
          <div className="game5D__result__item__circle">{gameRecordValue ? gameRecordValue[2] : 0}</div>C
        </div>
        <div className="game5D__result__item">
          <div className="game5D__result__item__circle">{gameRecordValue ? gameRecordValue[3] : 0}</div>D
        </div>
        <div className="game5D__result__item">
          <div className="game5D__result__item__circle">{gameRecordValue ? gameRecordValue[4] : 0}</div>E
        </div>
        <div className="game5D__result__item">
          <div className="game5D__result__item__equal">=</div>
        </div>
        <div className="game5D__result__item">
          <div className="game5D__result__item__circle game5D__result__item__circle__second">
            {gameRecordValue
              ? +gameRecordValue[0] +
                +gameRecordValue[1] +
                +gameRecordValue[2] +
                +gameRecordValue[3] +
                +gameRecordValue[4]
              : 0}
          </div>
        </div>
      </div>
      <div className="game5D__line__small"></div>

      <div className="game5D__box-number">
        <div className="row">
          <div className="col-6 ">
            <div className="game5D__terms"> Kỳ sổ</div>
            <div>
              <strong>{gameRecordSection}</strong>
            </div>
          </div>
          <div className="col-6 ">
            <div className="game5D__terms"> Thời gian còn lại để mua</div>
            {isShowCountDown ? (
              <CountDown
                onTime={() => {
                  setIsShowOver(true);
                  setIsModalVisible(false);
                }}
                seconds={secondTime}
              />
            ) : null}
          </div>
        </div>
        <div className="p-2 mt-2 d-flex align-items-center justify-content-center">
          <div className="game5D__wheels mb-4">
            <div className="game5D__wheels__content">
              <div className="game5D__wheels__content__box">
                <div className="game5D__wheels__content__box__slot">
                  <div className="game5D__wheels__content__box__slot__colum">
                    <div className="game5D__wheels__content__box__slot__colum__number active">1</div>
                    {gameRecordValue && gameRecordValue[0] ? (
                      <div className="game5D__wheels__content__box__slot__colum__number active">
                        {gameRecordValue[0]}
                      </div>
                    ) : null}
                    <div className="game5D__wheels__content__box__slot__colum__number active">2</div>
                    <div className="game5D__wheels__content__box__slot__colum__number active">3</div>
                    <div className="game5D__wheels__content__box__slot__colum__number active">4</div>
                    <div className="game5D__wheels__content__box__slot__colum__number active">5</div>
                    <div className="game5D__wheels__content__box__slot__colum__number active">6</div>
                    <div className="game5D__wheels__content__box__slot__colum__number active">7</div>
                    <div className="game5D__wheels__content__box__slot__colum__number active">8</div>
                    <div className="game5D__wheels__content__box__slot__colum__number active">9</div>
                    <div className="game5D__wheels__content__box__slot__colum__number active">0</div>
                  </div>
                </div>
                <div className="game5D__wheels__content__box__slot">
                  <div className="game5D__wheels__content__box__slot__colum">
                    <div className="game5D__wheels__content__box__slot__colum__number ">1</div>
                    {gameRecordValue && gameRecordValue[1] ? (
                      <div className="game5D__wheels__content__box__slot__colum__number ">{gameRecordValue[1]}</div>
                    ) : null}
                    <div className="game5D__wheels__content__box__slot__colum__number ">2</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">3</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">4</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">5</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">6</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">7</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">8</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">9</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">0</div>
                  </div>
                </div>
                <div className="game5D__wheels__content__box__slot">
                  <div className="game5D__wheels__content__box__slot__colum">
                    <div className="game5D__wheels__content__box__slot__colum__number ">1</div>
                    {gameRecordValue && gameRecordValue[2] ? (
                      <div className="game5D__wheels__content__box__slot__colum__number ">{gameRecordValue[2]}</div>
                    ) : null}
                    <div className="game5D__wheels__content__box__slot__colum__number ">2</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">3</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">4</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">5</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">6</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">7</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">8</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">9</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">0</div>
                  </div>
                </div>
                <div className="game5D__wheels__content__box__slot">
                  <div className="game5D__wheels__content__box__slot__colum">
                    <div className="game5D__wheels__content__box__slot__colum__number ">1</div>
                    {gameRecordValue && gameRecordValue[3] ? (
                      <div className="game5D__wheels__content__box__slot__colum__number ">{gameRecordValue[3]}</div>
                    ) : null}
                    <div className="game5D__wheels__content__box__slot__colum__number ">2</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">3</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">4</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">5</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">6</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">7</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">8</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">9</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">0</div>
                  </div>
                </div>
                <div className="game5D__wheels__content__box__slot">
                  <div className="game5D__wheels__content__box__slot__colum">
                    <div className="game5D__wheels__content__box__slot__colum__number ">1</div>
                    {gameRecordValue && gameRecordValue[4] ? (
                      <div className="game5D__wheels__content__box__slot__colum__number ">{gameRecordValue[4]}</div>
                    ) : null}
                    <div className="game5D__wheels__content__box__slot__colum__number ">2</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">3</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">4</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">5</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">6</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">7</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">8</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">9</div>
                    <div className="game5D__wheels__content__box__slot__colum__number ">0</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative-parent">
          <Tabs
            onChange={key => {
              setKeyActive(key);
            }}
            activeKey={keyActive}
            className="game5D__tab"
            defaultActiveKey="1"
          >
            <TabPane tab="A" key="A">
              <BetNumber
                setKeyActive={setKeyActive}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                betRecordAmountIn={betRecordAmountIn}
                setBetRecordAmountIn={setBetRecordAmountIn}
                betRecordValue={betRecordValue}
                setBetRecordValue={setBetRecordValue}
                betRecordAmount={betRecordAmount}
                setBetRecordAmount={setBetRecordAmount}
              />
            </TabPane>
            <TabPane tab="B" key="B">
              <BetNumber
                setKeyActive={setKeyActive}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                betRecordAmountIn={betRecordAmountIn}
                setBetRecordAmountIn={setBetRecordAmountIn}
                betRecordValue={betRecordValue}
                setBetRecordValue={setBetRecordValue}
                betRecordAmount={betRecordAmount}
                setBetRecordAmount={setBetRecordAmount}
              />
            </TabPane>
            <TabPane tab="C" key="C">
              <BetNumber
                setKeyActive={setKeyActive}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                betRecordAmountIn={betRecordAmountIn}
                setBetRecordAmountIn={setBetRecordAmountIn}
                betRecordValue={betRecordValue}
                setBetRecordValue={setBetRecordValue}
                betRecordAmount={betRecordAmount}
                setBetRecordAmount={setBetRecordAmount}
              />
            </TabPane>
            <TabPane tab="D" key="D">
              <BetNumber
                setKeyActive={setKeyActive}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                betRecordAmountIn={betRecordAmountIn}
                setBetRecordAmountIn={setBetRecordAmountIn}
                betRecordValue={betRecordValue}
                setBetRecordValue={setBetRecordValue}
                betRecordAmount={betRecordAmount}
                setBetRecordAmount={setBetRecordAmount}
              />
            </TabPane>
            <TabPane tab="E" key="E">
              <BetNumber
                setKeyActive={setKeyActive}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                betRecordAmountIn={betRecordAmountIn}
                setBetRecordAmountIn={setBetRecordAmountIn}
                betRecordValue={betRecordValue}
                setBetRecordValue={setBetRecordValue}
                betRecordAmount={betRecordAmount}
                setBetRecordAmount={setBetRecordAmount}
              />
            </TabPane>
            <TabPane tab="Tổng" key="TONG">
              <BetNumber
                setKeyActive={setKeyActive}
                isModalVisible={isModalVisible}
                setIsModalVisible={setIsModalVisible}
                betRecordAmountIn={betRecordAmountIn}
                setBetRecordAmountIn={setBetRecordAmountIn}
                betRecordValue={betRecordValue}
                setBetRecordValue={setBetRecordValue}
                betRecordAmount={betRecordAmount}
                setBetRecordAmount={setBetRecordAmount}
              />
            </TabPane>
          </Tabs>
          {isShowOver ? (
            <MaskOverBackground
              seconds={5}
              onTime={() => {
                handlePlayGame();
                setTimeout(() => {
                  setGameRecordValue(gameRecordValueTmp);
                  handleStopGame();
                  setIsShowOver(false);
                }, 5000);
                setTimeout(() => {
                  handleFetchData();
                }, 10000);
              }}
            />
          ) : null}
        </div>
      </div>
      <TableGame gameRecordSection={gameRecordSection} indexActive={indexActive} />
      <ModalBet
        keyActive={keyActive}
        setKeyActive={setKeyActive}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        betRecordAmountIn={betRecordAmountIn}
        setBetRecordAmountIn={setBetRecordAmountIn}
        betRecordValue={betRecordValue}
        setBetRecordValue={setBetRecordValue}
        betRecordAmount={betRecordAmount}
        setBetRecordAmount={setBetRecordAmount}
        gameRecordSection={gameRecordSection}
        indexActive={indexActive}
      />
    </div>
  );
}
export default Game5DLotre;
