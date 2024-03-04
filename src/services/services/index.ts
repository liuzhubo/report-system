import { request } from '@umijs/max';

/** 抖音订单表分页 /api/dmp/dy-order-page */
export async function dyOrders(params: any) {
  return request<any>('/api/dmp/dy-order-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...params,
      current: params?.current,
      size: params?.pageSize,
    },
  }).then((res) => {
    return {
      data: res?.data?.records || [],
      success: res?.success,
      total: res?.data?.total,
    };
  });
}

/** 日报表分页 /api/dmp/daily-report-page */
export async function dailyReports(params: any) {
  return request<any>('/api/dmp/daily-report-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...params,
      current: params?.current,
      size: params?.pageSize,
    },
  }).then((res) => {
    return {
      data: res?.data?.records || [],
      success: res?.success,
      total: res?.data?.total,
    };
  });
}

/** 团长服务费表分页 /api/dmp/leader-serv-page */
export async function serviceChange(params: any) {
  return request<any>('/api/dmp/leader-serv-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...params,
      current: params?.current,
      size: params?.pageSize,
    },
  }).then((res) => {
    return {
      data: res?.data?.records || [],
      success: res?.success,
      total: res?.data?.total,
    };
  });
}

/** 达人佣金表分页 /api/dmp/dr-Comm-page */
export async function commissionPage(params: any) {
  return request<any>('/api/dmp/dr-Comm-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...params,
      current: params?.current,
      size: params?.pageSize,
    },
  }).then((res) => {
    return {
      data: res?.data?.records || [],
      success: res?.success,
      total: res?.data?.total,
    };
  });
}

/** 物料价格表分页 /api/dmp/material-price-page */
export async function materialPage(params: any) {
  return request<any>('/api/dmp/material-price-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...params,
      current: params?.current,
      size: params?.pageSize,
    },
  }).then((res) => {
    return {
      data: res?.data?.records || [],
      success: res?.success,
      total: res?.data?.total,
    };
  });
}

/** 邮资表分页 /api/dmp/postage-page */
export async function postagePage(params: any) {
  return request<any>('/api/dmp/postage-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...params,
      current: params?.current,
      size: params?.pageSize,
    },
  }).then((res) => {
    return {
      data: res?.data?.records || [],
      success: res?.success,
      total: res?.data?.total,
    };
  });
}

/** 聚水潭表分页 /api/dmp/jst-logi-page */
export async function jstPage(params: any) {
  return request<any>('/api/dmp/jst-logi-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...params,
      current: params?.current,
      size: params?.pageSize,
    },
  }).then((res) => {
    return {
      data: res?.data?.records || [],
      success: res?.success,
      total: res?.data?.total,
    };
  });
}

/** 库存表分页 /api/dmp/fifo-cost-page */
export async function stockPage(params: any) {
  return request<any>('/api/dmp/fifo-cost-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...params,
      current: params?.current,
      size: params?.pageSize,
    },
  }).then((res) => {
    return {
      data: res?.data?.records || [],
      success: res?.success,
      total: res?.data?.total,
    };
  });
}

/** 运费单表分页 /api/dmp/express-fee-page */
export async function freightPage(params: any) {
  return request<any>('/api/dmp/express-fee-page', {
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    data: {
      ...params,
      current: params?.current,
      size: params?.pageSize,
    },
  }).then((res) => {
    return {
      data: res?.data?.records || [],
      success: res?.success,
      total: res?.data?.total,
    };
  });
}

/** 导入抖音订单 /api/dmp/import-dy-order*/
export const importDyOrders = '/api/dmp/import-dy-order';

/** 导入团长服务费 /api/dmp/import-leader-serv-fee*/
export const importServiceCharge = '/api/dmp/import-leader-serv-fee';

/** 导入达人佣金 /api/dmp/import-dr-comm*/
export const importCommission = '/api/dmp/import-dr-comm';
