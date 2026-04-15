const STORAGE_KEY = 'vanbang_cauhinh_data';

export type KieuDuLieu = 'String' | 'Number' | 'Date';

export interface ICauHinhBieuMau {
  id: string;
  tenTruong: string;
  kieu: KieuDuLieu;
  batBuoc: boolean;
}

export const getAll = (): ICauHinhBieuMau[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const create = (data: Omit<ICauHinhBieuMau, 'id'>): ICauHinhBieuMau => {
  const list = getAll();
  const newItem: ICauHinhBieuMau = {
    ...data,
    id: new Date().getTime().toString(),
  };
  list.push(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return newItem;
};

export const update = (id: string, data: Partial<ICauHinhBieuMau>): void => {
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
