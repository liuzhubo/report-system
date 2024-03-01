import { request } from '@umijs/max';

/** 抖音订单表分页 /api/dmp/dy-order-page */
export async function dyOrders(params: any) {
    console.log(params)
    return request<any>('/api/dmp/dy-order-page', {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data: {
        ...params,
        current: params?.current,
        size: params?.pageSize,
      }
    })
        .then(res => {
            return { 
                data:res?.data?.records || [],
                success: res?.success,
                total: res?.data?.total
            }
        })
  }
