import { request } from '@umijs/max';

/** 抖音订单表分页 /api/dmp/dy-order-page */
export async function dyOrders(params: any) {
  return request<any>('/api/dmp/dy-order-page', {
    method: 'GET',
    params: {
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

/** 日报表分页  */
export async function dailyReports(params: any) {
  return request<any>('/api/dmp/daily-report-page', {
    method: 'GET',
    params: {
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
/** 日报表统计表分页  */
export async function dailyStatisticReports(params: any) {
  return request<any>('/api/dmp/daily-statistics-report-page', {
    method: 'GET',
    params: {
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
    method: 'GET',
    params: {
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
    method: 'GET',
    params: {
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
    method: 'GET',
    params: {
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
    method: 'GET',
    params: {
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
    method: 'GET',
    params: {
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

/** 旺店通表分页  */
export async function wdtPage(params: any) {
  return request<any>('/api/dmp/wdt-page', {
    method: 'GET',
    params: {
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
    method: 'GET',
    params: {
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
    method: 'GET',
    params: {
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

/** 店铺列表  */
export async function getStoreList() {
  return request<any>('/api/taskinDmpDictStore/dict-store-page', {
    method: 'GET',
    params: {
      current: 0,
      size: 50,
    },
  }).then((res) => {
    return {
      data: res?.data?.records || [],
      success: res?.success,
      total: res?.data?.total,
    };
  });
}

/** 生成运费单 */
export async function createFreightRequest(params: any) {
  return request<any>('/api/dmp/cal-daily-express-fee-wdt', {
    method: 'POST',
    params,
  });
}

/** 生成日表 */
export async function createDailyRequest(params: any) {
  return request<any>('/api/dmp/cal-daily-report-dy', {
    method: 'POST',
    params,
  });
}
/** 生成日表统计表 */
export async function createDailyStatisticsRequest(params: any) {
  return request<any>('/api/dmp/cal-daily-statistics-report', {
    method: 'POST',
    params,
  });
}

/** 导入抖音订单 /api/dmp/import-dy-order*/
export const importDyOrders = '/api/dmp/import-dy-order';

/** 导入团长服务费 /api/dmp/import-leader-serv-fee*/
export const importServiceCharge = '/api/dmp/import-leader-serv-fee';

/** 导入达人佣金 /api/dmp/import-dr-comm*/
export const importCommission = '/api/dmp/import-dr-comm';

/** 导入游资规则 /api/dmp/import-postage*/
export const importPostage = '/api/dmp/import-postage';

/** 导入聚水潭 /api/dmp/update-express-fee*/
export const importJST = '/api/dmp/update-express-fee';

/** 导入库存 /api/dmp/import-fifo-cost*/
export const importStock = '/api/dmp/import-fifo-cost';

/** 导入旺店通 /api/dmp/import-wdt-logi*/
export const importWdt = '/api/dmp/import-wdt-logi';
