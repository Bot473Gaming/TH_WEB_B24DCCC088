import { useState } from 'react';
import * as SoVanBangService from '@/services/VanBang/soVanBang';
import type { ISoVanBang } from '@/services/VanBang/soVanBang';

export default () => {
  const [data, setData] = useState<ISoVanBang[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<ISoVanBang | undefined>();

  const getData = () => {
    const list = SoVanBangService.getAll();
    setData(list);
  };

  const themMoi = (values: Omit<ISoVanBang, 'id' | 'soVaoSoHienTai'>) => {
    SoVanBangService.create(values);
    getData();
  };

  const capNhat = (id: string, values: Partial<ISoVanBang>) => {
    SoVanBangService.update(id, values);
    getData();
  };

  const xoa = (id: string) => {
    SoVanBangService.remove(id);
    getData();
  };

  return {
    data,
    visible,
    setVisible,
    isEdit,
    setIsEdit,
    row,
    setRow,
    getData,
    themMoi,
    capNhat,
    xoa,
  };
};
