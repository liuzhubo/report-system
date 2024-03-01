import {dyOrders } from '@/services/dy-order';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  PageContainer,
  ProTable,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef } from 'react';

const TableList: React.FC = () => {

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<API.RuleListItem>[] = [
    {
        dataIndex: "index",
        title: "序号",
        width: 60,
        fixed: "left",
        hideInSearch: true,
        renderText: (text: string, record: any, index: number) => `${index + 1}`,
      },
    {
        title: "主订单编号",
        width: 200,
        dataIndex: 'parentOrderCode',
    },
    {
        title: "子订单编号",
        width: 200,
        dataIndex: 'childOrderCode',
    },
    {
        title: "选购商品",
        width: 160,
        dataIndex: 'goodsName',
    },
    {
        title: "商品规格",
        width: 160,
        dataIndex: 'goodsSpec',
    },
    {
        title: "商品数量",        width: 80,

        dataIndex: 'goodsNum',
    },
    {
        title: "商品ID",        width: 180,

        dataIndex: 'goodsId',
    },
    {
        title: "商品编码",        width: 160,

        dataIndex: 'goodsCode',
    },
    {
        title: "订单应付金额",        width: 100,

        dataIndex: 'orderPayableAmount',
    },
    {
        title: "流量体裁",        width: 80,

        dataIndex: 'trafficGenres',
    },
    {
        title: "平台实际承担优惠金额",        width: 160,

        dataIndex: 'platDiscounts',
    },
    {
        title: "省",        width: 100,

        dataIndex: 'province',
    },
    {
        title: "市",        width: 100,

        dataIndex: 'city',
    },
    {
        title: "区",        width: 100,

        dataIndex: 'county',
    },
    {
        title: "街道",        width: 160,

        dataIndex: 'street',
    },
    {
        title: "是否修改过地址",        width: 120,
        dataIndex: 'addrChangeFlag',
    },
    {
        title: "订单提交时间",        width: 160,
        valueType: 'dateTime',
        dataIndex: 'orderCommitTime',
    },
    {
        title: "商家备注",        width: 160,

        dataIndex: 'merchantRemark',
    },

    {
      title: "流量来源",        width: 100,

      dataIndex: 'flowSource',
    },
    {
        title: "订单状态",        width: 100,

        dataIndex: 'status',
      },
      {
        title: "数据日期",        width: 160,
        valueType: 'dateTime',
        dataIndex: 'dataDate',
      },
      {
        title: "创建人",        width: 100,

        dataIndex: 'createUser',
      },
      {
        title: "创建时间",        width: 160,
        valueType: 'dateTime',
        dataIndex: 'createTime',
      },

      {
        title: "更新人",        width: 100,

        dataIndex: 'updateUser',
      },
    {
      title: "更新时间",        width: 160,
      valueType: 'dateTime',
      dataIndex: 'updateTime',
    },

  ];

  return (
    <PageContainer>
      <ProTable<API.RuleListItem, API.PageParams>
        headerTitle={"抖音订单表"}
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
              console.log('导入')
            }}
          >
            <PlusOutlined /> 导入
          </Button>,
        ]}
        request={dyOrders}
        columns={columns}
        scroll={{ x: 1000}}
      />
    </PageContainer>
  );
};

export default TableList;
