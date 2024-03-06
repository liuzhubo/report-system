import { freightPage, importServiceCharge } from '@/services/services';
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
import dayjs from 'dayjs'


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
      title: '主订单编号',
      width: 200,
      dataIndex: 'parentOrderCode',
    },
    {
      title: '子订单编号',
      width: 200,
      dataIndex: 'childOrderCode',
    },
    {
      title: '选购商品',
      width: 160,
      dataIndex: 'goodsName',
    },
    {
      title: '商品规格',
      width: 160,
      dataIndex: 'goodsSpec',
    },
    {
      title: '商品数量',
      width: 80,

      dataIndex: 'goodsNum',
    },
    {
      title: '商品ID',
      width: 180,

      dataIndex: 'goodsId',
    },
    {
      title: '商品编码',
      width: 160,

      dataIndex: 'goodsCode',
    },
    {
      title: '订单应付金额',
      width: 100,

      dataIndex: 'orderPayableAmount',
    },
    {
      title: '流量体裁',
      width: 80,

      dataIndex: 'trafficGenres',
    },
    {
      title: '平台实际承担优惠金额',
      width: 160,

      dataIndex: 'platDiscounts',
    },
    {
      title: '省',
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
      title: '是否修改过地址',
      width: 120,
      dataIndex: 'addrChangeFlag',
    },
    {
      title: '订单提交时间',
      width: 160,
      valueType: 'dateTime',
      dataIndex: 'orderCommitTime',
    },
    {
      title: '商家备注',
      width: 160,

      dataIndex: 'merchantRemark',
    },

    {
      title: '流量来源',
      width: 100,

      dataIndex: 'flowSource',
    },
    {
      title: '订单状态',
      width: 100,

      dataIndex: 'status',
    },
    {
      title: '数据日期',
      width: 160,
      valueType: 'dateTime',
      dataIndex: 'dataDate',
    },
    {
      title: '创建人',
      width: 100,

      dataIndex: 'createUser',
    },
    {
      title: '创建时间',
      width: 160,
      valueType: 'dateTime',
      dataIndex: 'createTime',
    },

    {
      title: '更新人',
      width: 100,

      dataIndex: 'updateUser',
    },
    {
      title: '更新时间',
      width: 160,
      valueType: 'dateTime',
      dataIndex: 'updateTime',
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
        headerTitle={'抖音订单表'}
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
        request={freightPage}
        columns={columns}
        scroll={{ x: 1000 }}
      />
            <ModalForm
        title={'导入团长服务费'}
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
