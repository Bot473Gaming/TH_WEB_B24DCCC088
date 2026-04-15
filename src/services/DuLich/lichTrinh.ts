const STORAGE_KEY = 'dulich_lich_trinh_data';

export interface IDiemDenTrongNgay {
  id: string;
  diemDenId: string;
  ngay: number; // 1, 2, 3...
  thuTu: number;
}

export interface ILichTrinh {
  id: string;
  tieuDe: string;
  ngayBatDau: string; // ISO date string
  soNgay: number;
  nganSachToiBa: number;
  diemDens: IDiemDenTrongNgay[];
  ngayTao: string;
}

export const getAll = (): ILichTrinh[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const getById = (id: string): ILichTrinh | undefined => {
  return getAll().find((item) => item.id === id);
};

export const create = (data: Omit<ILichTrinh, 'id' | 'ngayTao' | 'diemDens'>): ILichTrinh => {
  const list = getAll();
  const newItem: ILichTrinh = {
    ...data,
    id: `lt-${Date.now()}`,
    diemDens: [],
    ngayTao: new Date().toISOString(),
  };
  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return newItem;
};

export const update = (id: string, data: Partial<ILichTrinh>): void => {
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

export const addDiemDenVaoNgay = (
  lichTrinhId: string,
  diemDenId: string,
  ngay: number,
): void => {
  const list = getAll();
  const index = list.findIndex((item) => item.id === lichTrinhId);
  if (index !== -1) {
    const existing = list[index].diemDens.filter((d) => d.ngay === ngay);
    const newEntry: IDiemDenTrongNgay = {
      id: `ddn-${Date.now()}`,
      diemDenId,
      ngay,
      thuTu: existing.length + 1,
    };
    list[index].diemDens.push(newEntry);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
};

export const removeDiemDenKhoiNgay = (lichTrinhId: string, diemDenEntryId: string): void => {
  const list = getAll();
  const index = list.findIndex((item) => item.id === lichTrinhId);
  if (index !== -1) {
    list[index].diemDens = list[index].diemDens.filter((d) => d.id !== diemDenEntryId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
};

export const thongKeTheoThang = (): { thang: string; soLuong: number }[] => {
  const list = getAll();
  const stats: Record<string, number> = {};
  list.forEach((lt) => {
    const thang = lt.ngayTao.slice(0, 7); // YYYY-MM
    stats[thang] = (stats[thang] || 0) + 1;
  });
  return Object.entries(stats)
    .map(([thang, soLuong]) => ({ thang, soLuong }))
    .sort((a, b) => a.thang.localeCompare(b.thang));
};
