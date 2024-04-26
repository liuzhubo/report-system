import { freightPage, createFreightRequest } from '@/services/services';
import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
  ModalForm,
  ProFormDatePicker,
  ProForm,
} from '@ant-design/pro-components';
import { Button } from 'antd';
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
      valueType: 'dateTime',
      dataIndex: 'dataDate',
    },
    {
      title: '主订单编号',
      width: 200,
      hideInSearch: true,
      dataIndex: 'parentOrderCode',
    },
    {
      title: '子订单编号',
      width: 200,
      hideInSearch: true,
      dataIndex: 'childOrderCode',
    },
    {
      title: '选购商品',
      width: 160,
      hideInSearch: true,
      dataIndex: 'goodsName',
    },
    {
      title: '商品规格',
      width: 160,
      hideInSearch: true,
      dataIndex: 'goodsSpec',
    },
    {
      title: '商品数量',
      width: 80,
      hideInSearch: true,

      dataIndex: 'goodsNum',
    },
    {
      title: '商品ID',
      width: 180,
      hideInSearch: true,

      dataIndex: 'goodsId',
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
      hideInSearch: true,

      dataIndex: 'orderPayableAmount',
    },
    {
      title: '流量体裁',
      width: 80,
      hideInSearch: true,

      dataIndex: 'trafficGenres',
    },
    {
      title: '平台实际承担优惠金额',
      width: 160,
      hideInSearch: true,

      dataIndex: 'platDiscounts',
    },
    {
      title: '省',
      width: 100,
      hideInSearch: true,

      dataIndex: 'province',
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
      hideInSearch: true,

      dataIndex: 'addrChangeFlag',
    },
    {
      title: '订单提交时间',
      width: 160,
      valueType: 'dateTime',
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
  const createFreight: any = (values: any) => {
    console.log(values);
    return createFreightRequest(values);
  };
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'运费单'}
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
            生成运费单
          </Button>,
        ]}
        request={freightPage}
        columns={columns}
        scroll={{ x: 1000 }}
      />
      <ModalForm
        title={'生成运费单'}
        width="400px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        modalProps={{ destroyOnClose: true }}
        onFinish={async (values) => {
          await createFreight(values);
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
