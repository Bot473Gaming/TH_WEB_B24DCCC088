import { useState } from 'react';
import * as LichTrinhService from '@/services/DuLich/lichTrinh';
import type { ILichTrinh } from '@/services/DuLich/lichTrinh';

export default () => {
  const [data, setData] = useState<ILichTrinh[]>([]);
  const [visible, setVisible] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [row, setRow] = useState<ILichTrinh | undefined>();
  const [selectedId, setSelectedId] = useState<string | undefined>();

  const getData = () => {
    const list = LichTrinhService.getAll();
    setData(list);
  };

  const getSelected = (): ILichTrinh | undefined => {
    if (!selectedId) return undefined;
    return data.find((lt) => lt.id === selectedId);
  };

  const themMoi = (values: Omit<ILichTrinh, 'id' | 'ngayTao' | 'diemDens'>) => {
    const newLt = LichTrinhService.create(values);
    getData();
    return newLt;
  };

  const capNhat = (id: string, values: Partial<ILichTrinh>) => {
    LichTrinhService.update(id, values);
    getData();
  };

  const xoa = (id: string) => {
    LichTrinhService.remove(id);
    getData();
  };

  const themDiemDen = (lichTrinhId: string, diemDenId: string, ngay: number) => {
    LichTrinhService.addDiemDenVaoNgay(lichTrinhId, diemDenId, ngay);
    getData();
  };

  const xoaDiemDen = (lichTrinhId: string, diemDenEntryId: string) => {
    LichTrinhService.removeDiemDenKhoiNgay(lichTrinhId, diemDenEntryId);
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
    selectedId,
    setSelectedId,
    getSelected,
    getData,
    themMoi,
    capNhat,
    xoa,
    themDiemDen,
    xoaDiemDen,
  };
};
