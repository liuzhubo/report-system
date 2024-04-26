import React, { useState, useEffect } from 'react';
import { getStoreList } from '@/services/services';
import { Select } from 'antd';

const StoreSelect: React.FC<any> = (props: any) => {
  const [storeList, setStoreList] = useState<any>([]);
  useEffect(() => {
    try {
      getStoreList().then((res) => {
        setStoreList(res?.data);
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <Select {...props}>
      {storeList?.map((item: any) => (
        <Select.Option value={item.name} key={item.name}>
          {item.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default StoreSelect;
