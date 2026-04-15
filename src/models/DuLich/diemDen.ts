import { useState } from 'react';
import * as DiemDenService from '@/services/DuLich/diemDen';
import type { IDiemDen } from '@/services/DuLich/diemDen';

export default () => {
  const [data, setData] = useState<IDiemDen[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<IDiemDen | undefined>();

  const getData = () => {
    const list = DiemDenService.getAll();
    setData(list);
  };

  const themMoi = (values: Omit<IDiemDen, 'id' | 'soLuotChon'>) => {
    DiemDenService.create(values);
    getData();
  };

  const capNhat = (id: string, values: Partial<IDiemDen>) => {
    DiemDenService.update(id, values);
    getData();
  };

  const xoa = (id: string) => {
    DiemDenService.remove(id);
    getData();
  };

  const tangLuotChon = (id: string) => {
    DiemDenService.incrementLuotChon(id);
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
    tangLuotChon,
  };
};
