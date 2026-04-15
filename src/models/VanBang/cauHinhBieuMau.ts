import { useState } from 'react';
import * as CauHinhService from '@/services/VanBang/cauHinhBieuMau';
import type { ICauHinhBieuMau } from '@/services/VanBang/cauHinhBieuMau';

export default () => {
  const [data, setData] = useState<ICauHinhBieuMau[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<ICauHinhBieuMau | undefined>();

  const getData = () => {
    setData(CauHinhService.getAll());
  };

  const themMoi = (values: Omit<ICauHinhBieuMau, 'id'>) => {
    CauHinhService.create(values);
    getData();
  };

  const capNhat = (id: string, values: Partial<ICauHinhBieuMau>) => {
    CauHinhService.update(id, values);
    getData();
  };

  const xoa = (id: string) => {
    CauHinhService.remove(id);
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
