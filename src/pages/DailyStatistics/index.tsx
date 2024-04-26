import { dailyStatisticReports, createDailyStatisticsRequest } from '@/services/services';
import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
  ModalForm,
  ProFormDatePicker,
  ProForm,
} from '@ant-design/pro-components';
import { Button, message } from 'antd';
import React, { useRef, useState } from 'react';
import 'moment/locale/zh-cn';
import StoreSelect from '@/components/Select';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);

  const columns: ProColumns<API.RuleListItem>[] = [
    {
      dataIndex: 'index',
      title: '序号',
      width: 60,
      fixed: 'left',
      hideInSearch: true,
      renderText: (text: string, record: any, index: number) => `${index + 1}`,
    },
    {
      title: '店铺名称',
      width: 160,
      fixed: 'left',
      dataIndex: 'storeName',
      renderFormItem: (item: any, options: any, form: any) => {
        return (
          <StoreSelect
            onChange={(v: any) => {
              form.setFieldValue('storeName', v);
            }}
          />
        );
      },
    },
    {
      title: '数据日期',
      width: 160,
      fixed: 'left',
      valueType: 'date',
      dataIndex: 'dataDate',
    },
    {
      title: '订单数量',
      width: 160,
      dataIndex: 'orderNum',
      hideInSearch: true,
    },
    {
      title: '订单应付金额',
      width: 160,
      dataIndex: 'orderPayableAmount',
      hideInSearch: true,
    },
    {
      title: '实际平台补贴',
      width: 160,
      dataIndex: 'platDiscounts',
      hideInSearch: true,
    },
    {
      title: '实销',
      width: 160,
      dataIndex: 'actualSalesAmount',
      hideInSearch: true,
    },
    {
      title: '平台补贴扣费2%',
      width: 160,
      hideInSearch: true,
      dataIndex: 'platSubsidyDeduction',
    },
    {
      title: '平台服务费',
      width: 180,
      hideInSearch: true,
      dataIndex: 'platServFee',
    },
    {
      title: '达人佣金',
      width: 160,
      hideInSearch: true,
      dataIndex: 'drFee',
    },
    {
      title: '团长服务费',
      width: 100,
      hideInSearch: true,
      dataIndex: 'leaderServFee',
    },
    {
      title: '操作费',
      width: 160,
      hideInSearch: true,
      dataIndex: 'handlingFee',
    },
    {
      title: '成本',
      width: 160,
      hideInSearch: true,
      dataIndex: 'cost',
    },
    {
      title: '邮资',
      width: 160,
      hideInSearch: true,
      dataIndex: 'postage',
    },
    {
      title: '利润',
      width: 160,
      hideInSearch: true,
      dataIndex: 'profit',
    },
  ];
  const createDaily: any = (values: any) => {
    return createDailyStatisticsRequest(values);
  };
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'日表统计表'}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            icon={<UploadOutlined />}
            key="import"
            onClick={() => {
              handleModalOpen(true);
            }}
          >
            生成日表统计表
          </Button>,
        ]}
        request={dailyStatisticReports}
        columns={columns}
        scroll={{ x: 1000 }}
      />
      <ModalForm
        title={'生成日表统计表'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        modalProps={{ destroyOnClose: true }}
        onFinish={async (values) => {
          await createDaily(values);
          actionRef.current?.reload();
          message.success('日表统计表生成中，请等待一分钟后再次查询！');
          return true;
        }}
      >
        <ProForm.Group>
          <ProForm.Item
            label="店铺名称"
            name="storeName"
            rules={[
              {
                required: true,
                message: '请填写店铺名称',
              },
            ]}
          >
            <StoreSelect style={{ width: '100%' }} placeholder={'请选择店铺名称'} />
          </ProForm.Item>
          <ProFormDatePicker
            name="dataDate"
            width="md"
            label="数据日期"
            rules={[
              {
                required: true,
                message: '请选择数据日期',
              },
            ]}
          />
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
