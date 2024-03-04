import { serviceChange, importServiceCharge } from '@/services/services';
import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Upload, message, type UploadProps } from 'antd';
import React, { useRef } from 'react';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();

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
      title: '订单ID',
      width: 200,
      dataIndex: 'parentOrderCode',
    },
    {
      title: '商品id',
      width: 200,
      dataIndex: 'goodsId',
    },
    {
      title: '订单状态',
      width: 160,
      dataIndex: 'status',
    },
    {
      title: '出单机构',
      width: 160,
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

      dataIndex: 'orderSource',
    },
    {
      title: '数据日期',
      width: 160,
      valueType: 'date',

      dataIndex: 'dataDate',
    },
  ];
  const props: UploadProps = {
    name: 'file',
    action: importServiceCharge,
    headers: {
      authorization: 'multipart/form-data',
    },
    data: {
      dataDate: '2022-01-01',
      storeName: '抖音梓航',
    },
    onChange(info) {
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败`);
      }
    },
    // showUploadList: false,
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
          <Upload {...props} key="import">
            <Button type="primary" icon={<UploadOutlined />}>
              导入
            </Button>
          </Upload>,
        ]}
        request={serviceChange}
        columns={columns}
        scroll={{ x: 1000 }}
      />
    </PageContainer>
  );
};

export default TableList;
