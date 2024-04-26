import { serviceChange, importServiceCharge } from '@/services/services';
import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
  ModalForm,
  ProFormDatePicker,
  ProFormUploadButton,
  ProFormDependency,
  ProForm,
} from '@ant-design/pro-components';
import { Button, message, type UploadProps } from 'antd';
import React, { useRef, useState } from 'react';
import 'moment/locale/zh-cn';
import StoreSelect from '@/components/Select';

import dayjs from 'dayjs';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

  // 导入窗口弹窗
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
      valueType: 'date',
      fixed: 'left',
      dataIndex: 'dataDate',
    },
    {
      title: '订单ID',
      width: 200,
      hideInSearch: true,

      dataIndex: 'parentOrderCode',
    },
    {
      title: '商品id',
      width: 200,
      hideInSearch: true,

      dataIndex: 'goodsId',
    },
    {
      title: '订单状态',
      width: 160,
      hideInSearch: true,

      dataIndex: 'status',
    },
    {
      title: '出单机构',
      width: 160,
      hideInSearch: true,

      dataIndex: 'issuingInstitution',
    },
    {
      title: '支付金额',
      width: 80,
      hideInSearch: true,

      dataIndex: 'paymentAmount',
    },
    {
      title: '预估服务费收入',
      width: 180,
      hideInSearch: true,

      dataIndex: 'estimatedServFee',
    },
    {
      title: '付款时间',
      width: 160,
      valueType: 'date',
      hideInSearch: true,

      dataIndex: 'paymentTime',
    },
    {
      title: '订单来源',
      width: 100,
      hideInSearch: true,

      dataIndex: 'orderSource',
    },
  ];
  const props: UploadProps = {
    name: 'file',
    action: importServiceCharge,
    headers: {
      authorization: 'multipart/form-data',
    },
  };
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
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
            导入
          </Button>,
        ]}
        request={serviceChange}
        columns={columns}
        scroll={{ x: 1000 }}
      />
      <ModalForm
        title={'导入团长服务费'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        modalProps={{ destroyOnClose: true }}
        onFinish={async () => {
          actionRef.current?.reload();
          handleModalOpen(false);
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
          <ProFormDependency name={['storeName', 'dataDate']}>
            {({ storeName, dataDate }) => (
              <ProFormUploadButton
                fieldProps={{
                  ...props,
                  data: {
                    storeName,
                    dataDate: dayjs(dataDate).format('YYYY-MM-DD'),
                  },
                  onChange(info) {
                    if (info.file.status === 'done') {
                      message.success(`${info.file.name} 上传成功`);
                      actionRef?.current?.reload();
                    } else if (info.file.status === 'error') {
                      message.error(`${info.file.name} 上传失败`);
                    }
                  },
                }}
                buttonProps={{ type: 'primary' }}
                disabled={!storeName || !dataDate}
                title="单击导入"
              />
            )}
          </ProFormDependency>
        </ProForm.Group>
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
