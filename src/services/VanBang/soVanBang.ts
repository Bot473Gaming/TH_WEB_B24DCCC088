const STORAGE_KEY = 'vanbang_so_data';

export interface ISoVanBang {
  id: string;
  nam: number;
  tenSo: string;
  soHieuBatDau: string;
  soVaoSoHienTai: number;
}

export const getAll = (): ISoVanBang[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const create = (data: Omit<ISoVanBang, 'id' | 'soVaoSoHienTai'>): ISoVanBang => {
  const list = getAll();
  const newItem: ISoVanBang = {
    ...data,
    id: new Date().getTime().toString(),
    soVaoSoHienTai: 0,
  };
  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return newItem;
};

export const update = (id: string, data: Partial<ISoVanBang>): void => {
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

export const incrementSoVaoSo = (id: string): number => {
  const list = getAll();
  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index].soVaoSoHienTai += 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list[index].soVaoSoHienTai;
  }
  return 1;
};
