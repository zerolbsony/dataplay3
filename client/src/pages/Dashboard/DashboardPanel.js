import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Row, Col, Empty, PageHeader, Tooltip, Button, Modal, message } from 'antd';
import GGChart from '@/components/Visualization/GGChart';

import styles from './DashboardPanel.less';

const confirm = Modal.confirm;

@connect(({ dashboard }) => ({
  dashboard,
}))
class DashboardPanel extends PureComponent {
  render() {
    const { dashboard, grammar, dataSource, title, description, dispatch, height, id } = this.props;
    const grammarUpdate = { ...grammar };
    if (!dataSource) {
      return <Empty />;
    }

    const doDeleteDashboard = () => {
      dispatch({
        type: 'dashboard/deleteSelected',
        payload: id,
      });
      message.info(`chart ${title} has been removed from dashboard!`);
    };

    const handleDelete = () => {
      confirm({
        title: 'Do you want to delete selected chart from dashboard?',
        content: `When clicked the OK button, chart with id ${id} will be removed from dashboard!`,
        onOk: doDeleteDashboard,
        onCancel() {},
      });
    };

    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <span className={styles.dashboardTitle}>{title}</span>
          </Col>
          <Col span={12}>
            <div className={styles.dashboardControl}>
              <Tooltip placement="top" title="Maximize">
                <Button icon="plus" size="small" />
              </Tooltip>
              <Tooltip placement="top" title="Delete">
                <Button icon="delete" size="small" onClick={handleDelete} />
              </Tooltip>
            </div>
          </Col>
        </Row>
        <Row gutter={16}>
          <span className={styles.dashboardSubtitle}>{description}</span>
        </Row>
        <Row gutter={16}>
          <GGChart grammar={grammarUpdate} data={dataSource} height={height} />
        </Row>
      </div>
    );
  }
}

export default DashboardPanel;
