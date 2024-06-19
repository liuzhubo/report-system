import { stockPage } from '@/services/services';
import { UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable, ModalForm, EditableProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import 'moment/locale/zh-cn';

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any>([]);

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
      title: '商品编码',
      width: 200,
      dataIndex: 'goodsCode',
    },
    {
      title: '重量',
      width: 160,
      dataIndex: 'goodsWeight',
    },
    {
      title: '数量',
      width: 80,

      dataIndex: 'goodsQuantity',
    },
    {
      title: '单价',
      width: 180,

      dataIndex: 'goodsPrice',
    },
    {
      title: '剩余库存数量',
      width: 100,
      dataIndex: 'remainQuantity',
    },
  ];

  const formTableColumns: ProColumns<any>[] = [
    {
      title: '商品编码',
      dataIndex: 'product_code',
    },
    {
      title: '重量',
      dataIndex: 'weight',
    },
    {
      title: '进货价',
      dataIndex: 'buying_price',
    },
    {
      title: '箱规',
      dataIndex: 'box_gauge',
    },
    {
      title: '商品数量',
      dataIndex: 'product_quantity',
    },
    {
      title: '品牌方',
      dataIndex: 'brand_side',
    },
    {
      title: '供货方',
      dataIndex: 'supplier',
    },
    {
      title: '箱规',
      dataIndex: 'box_gauge',
    },
    {
      title: '箱规',
      dataIndex: 'box_gauge',
    },
    {
      title: '箱规',
      dataIndex: 'box_gauge',
    },
    {
      title: '箱规',
      dataIndex: 'box_gauge',
    },
    {
      title: '操作',
      valueType: 'option',
      width: 250,
      render: () => {
        return null;
      },
    },
  ];
  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={'库存表'}
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
            入库
          </Button>,
        ]}
        request={stockPage}
        columns={columns}
        scroll={{ x: 1000 }}
      />
      <ModalForm
        title={'入库'}
        width="800px"
        open={createModalOpen}
        onOpenChange={handleModalOpen}
        modalProps={{ destroyOnClose: true }}
      >
        <EditableProTable<any>
          headerTitle="可编辑表格"
          columns={formTableColumns}
          rowKey="id"
          scroll={{
            x: 960,
          }}
          value={dataSource}
          onChange={setDataSource}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              id: Date.now(),
            }),
          }}
          toolBarRender={() => {
            return [
              <Button
                type="primary"
                key="save"
                onClick={() => {
                  // dataSource 就是当前数据，可以调用 api 将其保存
                  console.log(dataSource);
                }}
              >
                保存数据
              </Button>,
            ];
          }}
          editable={{
            type: 'multiple',
            actionRender: (row, config, defaultDoms) => {
              return [defaultDoms.delete];
            },
            onValuesChange: (record, recordList) => {
              setDataSource(recordList);
            },
          }}
        />
      </ModalForm>
    </PageContainer>
  );
};

export default TableList;
