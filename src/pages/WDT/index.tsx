import { wdtPage, importWdt } from '@/services/services';
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
import StoreSelect from '@/components/Select';
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
      dataIndex: 'dataDate',
    },
    {
      title: '内部订单号',
      width: 200,
      hideInSearch: true,

      dataIndex: 'internalOrderCode',
    },
    {
      title: '线上订单号',
      width: 200,
      hideInSearch: true,

      dataIndex: 'parentOrderCode',
    },

    {
      title: '下单时间',
      width: 160,
      hideInSearch: true,

      dataIndex: 'orderTime',
    },
    {
      title: '发货日期',
      width: 200,
      hideInSearch: true,

      dataIndex: 'deliveryTime',
    },
    {
      title: '已付金额',
      width: 180,
      hideInSearch: true,

      dataIndex: 'amountPaid',
    },
    {
      title: '折扣金额',
      width: 160,
      hideInSearch: true,

      dataIndex: 'discountAmount',
    },
    {
      title: '状态',
      width: 80,
      hideInSearch: true,

      dataIndex: 'status',
    },
    {
      title: '快递公司',
      width: 160,
      hideInSearch: true,

      dataIndex: 'expressCompany',
    },
    {
      title: '快递单号',
      width: 100,
      hideInSearch: true,

      dataIndex: 'expressCode',
    },
    {
      title: '订单类型',
      width: 120,
      hideInSearch: true,

      dataIndex: 'orderType',
    },
    {
      title: '订单商品重量',
      width: 160,
      hideInSearch: true,

      dataIndex: 'orderGoodsWeight',
    },

    {
      title: '发货仓',
      width: 100,
      hideInSearch: true,

      dataIndex: 'deliveryWarehouse',
    },
    {
      title: '商品总成交金额',
      width: 100,
      hideInSearch: true,

      dataIndex: 'goodsTotalAmount',
    },
    {
      title: '商品编码',
      width: 160,
      hideInSearch: true,

      dataIndex: 'goodsCode',
    },
    {
      title: '商品名称',
      width: 100,
      hideInSearch: true,

      dataIndex: 'goodsName',
    },
    {
      title: '数量',
      width: 160,
      hideInSearch: true,

      dataIndex: 'goodsQuantity',
    },

    {
      title: '商品金额',
      width: 100,
      hideInSearch: true,

      dataIndex: 'goodsAmount',
    },
    {
      title: '成本价',
      width: 160,
      hideInSearch: true,

      dataIndex: 'costPrice',
    },
  ];
  const props: UploadProps = {
    name: 'file',
    action: importWdt,
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
        request={wdtPage}
        columns={columns}
        scroll={{ x: 1000 }}
      />
      <ModalForm
        title={'导入旺店通数据'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        modalProps={{ destroyOnClose: true }}
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
