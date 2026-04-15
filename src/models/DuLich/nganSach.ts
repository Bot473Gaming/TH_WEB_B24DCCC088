import { useState } from 'react';
import * as NganSachService from '@/services/DuLich/nganSach';
import type { INganSach } from '@/services/DuLich/nganSach';

export default () => {
  const [data, setData] = useState<INganSach[]>([]);
  const [current, setCurrent] = useState<INganSach | undefined>();

  const getData = () => {
    const list = NganSachService.getAll();
    setData(list);
  };

  const getNganSachByLichTrinh = (lichTrinhId: string): INganSach | undefined => {
    return NganSachService.getByLichTrinhId(lichTrinhId);
  };

  const luuNganSach = (values: Omit<INganSach, 'id'>) => {
    const result = NganSachService.luu(values);
    setCurrent(result);
    getData();
    return result;
  };

  const loadForLichTrinh = (lichTrinhId: string) => {
    const ns = NganSachService.getByLichTrinhId(lichTrinhId);
    setCurrent(ns);
    return ns;
  };

  const xoa = (lichTrinhId: string) => {
    NganSachService.remove(lichTrinhId);
    getData();
  };

  return {
    data,
    current,
    setCurrent,
    getData,
    getNganSachByLichTrinh,
    luuNganSach,
    loadForLichTrinh,
    xoa,
  };
};
