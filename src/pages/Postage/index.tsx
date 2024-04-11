import { postagePage, importPostage } from '@/services/services';
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
      title: '发货仓',
      width: 200,
      dataIndex: 'deliveryWarehouse',
    },
    {
      title: '快递公司',
      width: 200,
      dataIndex: 'expressCompany',
    },
    {
      title: '省份',
      width: 160,
      dataIndex: 'province',
    },
    {
      title: '城市',
      width: 160,
      dataIndex: 'city',
    },
    {
      title: '分区',
      width: 80,
      dataIndex: 'type',
    },
    {
      title: '重量上限',
      width: 180,
      dataIndex: 'highWeight',
    },
    {
      title: '重量下限',
      width: 160,
      dataIndex: 'lowWeight',
    },
    {
      title: '费用',
      width: 100,
      dataIndex: 'fee',
    },
    {
      title: '首重重量',
      width: 80,
      dataIndex: 'firstWeight',
    },
    {
      title: '非首重单价',
      width: 160,
      dataIndex: 'nonFirstPrice',
    },
    {
      title: '是否含物料',
      width: 100,
      dataIndex: 'materialFlag',
    },
    {
      title: '操作费',
      width: 100,
      dataIndex: 'handlingFee',
    },
    {
      title: '状态',
      width: 100,
      dataIndex: 'effectInvalidStatus',
    },
    {
      title: '生效日期',
      width: 160,

      dataIndex: 'effectDate',
    },
    {
      title: '失效日期',
      width: 120,
      dataIndex: 'invalidDate',
    },
  ];
  const props: UploadProps = {
    name: 'file',
    action: importPostage,
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
        request={postagePage}
        columns={columns}
        scroll={{ x: 1000 }}
      />
            <ModalForm
        title={'导入游资'}
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
