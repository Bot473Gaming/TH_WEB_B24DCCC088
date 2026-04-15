const STORAGE_KEY = 'vanbang_quyetdinh_data';

export interface IQuyetDinhTotNghiep {
  id: string;
  soQD: string;
  ngayBanHanh: string;
  trichYeu: string;
  soVanBangId: string;
  soLuotTraCuu: number;
}

export const getAll = (): IQuyetDinhTotNghiep[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const getBySoVanBang = (soVanBangId: string): IQuyetDinhTotNghiep[] => {
  return getAll().filter((item) => item.soVanBangId === soVanBangId);
};

export const create = (data: Omit<IQuyetDinhTotNghiep, 'id' | 'soLuotTraCuu'>): IQuyetDinhTotNghiep => {
  const list = getAll();
  const newItem: IQuyetDinhTotNghiep = {
    ...data,
    id: new Date().getTime().toString(),
    soLuotTraCuu: 0,
  };
  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return newItem;
};

export const update = (id: string, data: Partial<IQuyetDinhTotNghiep>): void => {
  const list = getAll();
  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index] = { ...list[index], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
};

export const remove = (id: string): void => {
  const list = getAll().filter((item) => item.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const incrementLuotTraCuu = (id: string): void => {
  const list = getAll();
  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index].soLuotTraCuu += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
};
