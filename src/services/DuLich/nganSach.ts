const STORAGE_KEY = 'dulich_ngan_sach_data';

export interface INganSach {
  id: string;
  lichTrinhId: string;
  anUong: number;
  luuTru: number;
  diChuyen: number;
  khac: number;
  nganSachToiBa: number;
}

export const getAll = (): INganSach[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const getByLichTrinhId = (lichTrinhId: string): INganSach | undefined => {
  return getAll().find((item) => item.lichTrinhId === lichTrinhId);
};

export const luu = (data: Omit<INganSach, 'id'>): INganSach => {
  const list = getAll();
  const existing = list.findIndex((item) => item.lichTrinhId === data.lichTrinhId);
  if (existing !== -1) {
    list[existing] = { ...list[existing], ...data };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    return list[existing];
  }
  const newItem: INganSach = { ...data, id: `ns-${Date.now()}` };
  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return newItem;
};

export const remove = (lichTrinhId: string): void => {
  const list = getAll().filter((item) => item.lichTrinhId !== lichTrinhId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};

export const getTongChiTieu = (ns: INganSach): number => {
  return (ns.anUong || 0) + (ns.luuTru || 0) + (ns.diChuyen || 0) + (ns.khac || 0);
};
