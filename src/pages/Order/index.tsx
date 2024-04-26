import { dyOrders, importDyOrders } from '@/services/services';
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
import dayjs from 'dayjs';
import 'moment/locale/zh-cn';

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
      title: '主订单编号',
      width: 200,
      dataIndex: 'parentOrderCode',
      hideInSearch: true,
    },
    {
      title: '子订单编号',
      width: 200,
      dataIndex: 'childOrderCode',
      hideInSearch: true,
    },
    {
      title: '选购商品',
      width: 160,
      dataIndex: 'goodsName',
      hideInSearch: true,
    },
    {
      title: '商品规格',
      width: 160,
      dataIndex: 'goodsSpec',
      hideInSearch: true,
    },
    {
      title: '商品数量',
      width: 80,

      dataIndex: 'goodsNum',
      hideInSearch: true,
    },
    {
      title: '商品ID',
      width: 180,

      dataIndex: 'goodsId',
      hideInSearch: true,
    },
    {
      title: '商品编码',
      width: 160,
      hideInSearch: true,

      dataIndex: 'goodsCode',
    },
    {
      title: '订单应付金额',
      width: 100,

      dataIndex: 'orderPayableAmount',
      hideInSearch: true,
    },
    {
      title: '流量体裁',
      width: 80,

      dataIndex: 'trafficGenres',
      hideInSearch: true,
    },
    {
      title: '平台实际承担优惠金额',
      width: 160,

      dataIndex: 'platDiscounts',
      hideInSearch: true,
    },
    {
      title: '省',
      width: 100,

      dataIndex: 'province',
      hideInSearch: true,
    },
    {
      title: '市',
      width: 100,
      hideInSearch: true,

      dataIndex: 'city',
    },
    {
      title: '区',
      width: 100,
      hideInSearch: true,

      dataIndex: 'county',
    },
    {
      title: '街道',
      width: 160,
      hideInSearch: true,

      dataIndex: 'street',
    },
    {
      title: '是否修改过地址',
      width: 120,
      dataIndex: 'addrChangeFlag',
      hideInSearch: true,
    },
    {
      title: '订单提交时间',
      width: 160,
      valueType: 'date',
      hideInSearch: true,

      dataIndex: 'orderCommitTime',
    },
    {
      title: '商家备注',
      width: 160,
      hideInSearch: true,

      dataIndex: 'merchantRemark',
    },

    {
      title: '流量来源',
      width: 100,
      hideInSearch: true,

      dataIndex: 'flowSource',
    },
    {
      title: '订单状态',
      width: 100,
      hideInSearch: true,

      dataIndex: 'status',
    },
  ];

  const props: UploadProps = {
    name: 'file',
    action: importDyOrders,
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
        request={dyOrders}
        columns={columns}
        scroll={{ x: 1000 }}
      />
      <ModalForm
        title={'导入抖音订单表'}
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
