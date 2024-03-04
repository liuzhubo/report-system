import { dailyReports } from '@/services/services';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';
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
      title: '状态',
      width: 160,
      dataIndex: 'status',
    },
    {
      title: '发货仓',
      width: 160,
      dataIndex: 'deliveryWarehouse',
    },
    {
      title: '快递公司',
      width: 80,

      dataIndex: 'expressCompany',
    },
    {
      title: '店铺名称',
      width: 180,

      dataIndex: 'storeName',
    },
    {
      title: '交易日期',
      width: 160,

      dataIndex: 'orderCommitTime',
    },
    {
      title: '商品ID',
      width: 100,

      dataIndex: 'goodsId',
    },
    {
      title: '商品编码',
      width: 80,

      dataIndex: 'goodsCode',
    },
    {
      title: '商品数量',
      width: 160,

      dataIndex: 'goodsNum',
    },
    {
      title: '订单应付金额',
      width: 100,

      dataIndex: 'orderPayableAmount',
    },
    {
      title: '实际平台补贴',
      width: 100,

      dataIndex: 'platDiscounts',
    },
    {
      title: '流量体裁',
      width: 100,

      dataIndex: 'trafficGenres',
    },
    {
      title: '连接商品编码',
      width: 160,

      dataIndex: 'costGoodsCode',
    },
    {
      title: '最小单位商品数量',
      width: 120,
      dataIndex: 'orderGoodsNum',
    },
    {
      title: 'actualSalesAmount',
      width: 160,
      dataIndex: '实销',
    },
    {
      title: '平台补贴扣费2%',
      width: 160,

      dataIndex: 'platSubsidyDeduction',
    },

    {
      title: '平台服务费',
      width: 100,

      dataIndex: 'platServFee',
    },
    {
      title: '达人佣金',
      width: 100,

      dataIndex: 'drFee',
    },
    {
      title: '团长服务费',
      width: 160,
      dataIndex: 'leaderServFee',
    },
    {
      title: '成本',
      width: 100,

      dataIndex: 'cost',
    },
    {
      title: '操作费',
      width: 160,
      dataIndex: 'handlingFee',
    },

    {
      title: '邮资',
      width: 100,

      dataIndex: 'postage',
    },
    {
      title: '利润',
      width: 160,
      dataIndex: 'profit',
    },
    {
      title: '数据日期',
      width: 160,
      dataIndex: 'dataDate',
    },
    {
      title: '创建人',
      width: 160,
      dataIndex: 'createUser',
    },
    {
      title: '创建时间',
      width: 160,
      dataIndex: 'createTime',
    },
  ];

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
            key="primary"
            onClick={() => {
              console.log('导入');
            }}
          >
            <PlusOutlined /> 导入
          </Button>,
        ]}
        request={dailyReports}
        columns={columns}
        scroll={{ x: 1000 }}
      />
    </PageContainer>
  );
};

export default TableList;
