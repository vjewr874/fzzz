/* Copyright (c) 2022 Toriti Tech Team https://t.me/ToritiTech */

import React from 'react';
import './index.scss';
import { ACTIVITY_STATUS } from 'hooks/package.hook';

function StatusRender(props) {
  const { enableTextColor, status } = props;
  function renderStatus() {
    switch (status) {
      case ACTIVITY_STATUS.COMPLETED:
        return (
          <div className="d-flex align-items-center">
            <div style={{ background: '#02BB6B' }} className="status__dot_status"></div>
            <span style={{ marginLeft: 8, color: enableTextColor ? '#141432' : '#FFFFFF' }}>Đã thu hồi</span>
          </div>
        );
      case ACTIVITY_STATUS.STANDBY:
        return (
          <div className="d-flex align-items-center">
            <div style={{ background: '#FF647C' }} className="status__dot_status"></div>
            <span style={{ marginLeft: 8, color: enableTextColor ? '#141432' : '#FFFFFF' }}>Đã chờ</span>
          </div>
        );
      case ACTIVITY_STATUS.CANCELED:
        return (
          <div className="d-flex align-items-center">
            <div style={{ background: '#FF647C' }} className="status__dot_status"></div>
            <span style={{ marginLeft: 8, color: enableTextColor ? '#141432' : '#FFFFFF' }}>Đã thanh lý</span>
          </div>
        );
      case ACTIVITY_STATUS.COMPLETING:
        return (
          <div className="d-flex align-items-center">
            <div style={{ background: '#FF647C' }} className="status__dot_status"></div>
            <span style={{ marginLeft: 8, color: enableTextColor ? '#141432' : '#FFFFFF' }}>Đã thanh lý</span>
          </div>
        );
      case ACTIVITY_STATUS.WORKING:
      default:
        return (
          <div className="d-flex align-items-center">
            <div style={{ background: '#02BB6B' }} className="status__dot_status"></div>
            <span style={{ marginLeft: 8, color: enableTextColor ? '#141432' : '#FFFFFF' }}>Đang khai thác</span>
          </div>
        );
    }
  }
  return <>{renderStatus()}</>;
}

export default StatusRender;
