import { jstPage, importServiceCharge } from '@/services/services';
import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
  ModalForm,
  ProFormDatePicker,
  ProFormText,
  ProFormUploadButton,
  ProFormDependency,
  ProForm,
} from '@ant-design/pro-components';
import { Button, message, type UploadProps } from 'antd';
import React, { useRef, useState } from 'react';
import 'moment/locale/zh-cn';
import dayjs from 'dayjs';

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
      title: '内部订单号',
      width: 200,
      dataIndex: 'internalOrderCode',
    },
    {
      title: '线上订单号',
      width: 200,
      dataIndex: 'parentOrderCode',
    },
    {
      title: '店铺名称',
      width: 160,
      dataIndex: 'storeName',
    },
    {
      title: '下单时间',
      width: 160,
      dataIndex: 'orderTime',
    },
    {
      title: '发货日期',
      width: 80,

      dataIndex: 'deliveryTime',
    },
    {
      title: '已付金额',
      width: 180,
      dataIndex: 'amountPaid',
    },
    {
      title: '折扣金额',
      width: 160,
      dataIndex: 'discountAmount',
    },
    {
      title: '分销结算金额',
      width: 100,
      dataIndex: 'distributionSettlementAmount',
    },
    {
      title: '状态',
      width: 80,
      dataIndex: 'status',
    },
    {
      title: '快递公司',
      width: 160,
      dataIndex: 'expressCompany',
    },
    {
      title: '快递单号',
      width: 100,
      dataIndex: 'expressCode',
    },
    {
      title: '省份',
      width: 100,

      dataIndex: 'province',
    },
    {
      title: '市',
      width: 100,

      dataIndex: 'city',
    },
    {
      title: '区',
      width: 100,

      dataIndex: 'county',
    },
    {
      title: '街道',
      width: 160,

      dataIndex: 'street',
    },
    {
      title: '订单类型',
      width: 120,
      dataIndex: 'orderType',
    },
    {
      title: '分销商',
      width: 160,
      dataIndex: 'distributor',
    },
    {
      title: '订单商品重量',
      width: 160,
      dataIndex: 'orderGoodsWeight',
    },

    {
      title: '发货仓',
      width: 100,
      dataIndex: 'deliveryWarehouse',
    },
    {
      title: '商品总成交金额',
      width: 100,
      dataIndex: 'goodsTotalAmount',
    },
    {
      title: '商品编码',
      width: 160,
      dataIndex: 'goodsCode',
    },
    {
      title: '商品名称',
      width: 100,
      dataIndex: 'goodsName',
    },
    {
      title: '数量',
      width: 160,
      dataIndex: 'goodsQuantity',
    },

    {
      title: '商品金额',
      width: 100,
      dataIndex: 'goodsAmount',
    },
    {
      title: '成本价',
      width: 160,
      dataIndex: 'costPrice',
    },
    {
      title: '数据日期',
      width: 160,
      dataIndex: 'dataDate',
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
        request={jstPage}
        columns={columns}
        scroll={{ x: 1000 }}
      />
      <ModalForm
        title={'导入聚水潭数据'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        modalProps={{ destroyOnClose: true }}
      >
        <ProForm.Group>
          <ProFormText
            rules={[
              {
                required: true,
                message: '请填写店铺名称',
              },
            ]}
            width="md"
            name="storeName"
            label="店铺名称"
            placeholder={'请输入店铺名称'}
          />
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
