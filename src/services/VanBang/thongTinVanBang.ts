import { incrementSoVaoSo } from './soVanBang';

const STORAGE_KEY = 'vanbang_thongtin_data';

export interface IThongTinVanBang {
  id: string;
  soVaoSo: number;
  soHieuVanBang: string;
  maSinhVien: string;
  hoTen: string;
  ngaySinh: string;
  quyetDinhId: string;
  soVanBangId: string;
  truongBoSung: Record<string, any>;
}

export const getAll = (): IThongTinVanBang[] => {
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const getByQuyetDinh = (quyetDinhId: string): IThongTinVanBang[] => {
  return getAll().filter((item) => item.quyetDinhId === quyetDinhId);
};

export const getBySoVanBang = (soVanBangId: string): IThongTinVanBang[] => {
  return getAll().filter((item) => item.soVanBangId === soVanBangId);
};

export const create = (
  data: Omit<IThongTinVanBang, 'id' | 'soVaoSo'>,
): IThongTinVanBang => {
  const list = getAll();
  const soVaoSo = incrementSoVaoSo(data.soVanBangId);
  const newItem: IThongTinVanBang = {
    ...data,
    id: new Date().getTime().toString(),
    soVaoSo,
  };
  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return newItem;
};

export const update = (id: string, data: Partial<IThongTinVanBang>): void => {
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

export interface ITraCuuParams {
  soHieuVanBang?: string;
  soVaoSo?: string;
  maSinhVien?: string;
  hoTen?: string;
  ngaySinh?: string;
}

export const traCuu = (params: ITraCuuParams): IThongTinVanBang[] => {
  const list = getAll();
  return list.filter((item) => {
    const checks: boolean[] = [];
    if (params.soHieuVanBang) {
      checks.push(item.soHieuVanBang.toLowerCase().includes(params.soHieuVanBang.toLowerCase()));
    }
    if (params.soVaoSo) {
      checks.push(String(item.soVaoSo).includes(params.soVaoSo));
    }
    if (params.maSinhVien) {
      checks.push(item.maSinhVien.toLowerCase().includes(params.maSinhVien.toLowerCase()));
    }
    if (params.hoTen) {
      checks.push(item.hoTen.toLowerCase().includes(params.hoTen.toLowerCase()));
    }
    if (params.ngaySinh) {
      checks.push(item.ngaySinh === params.ngaySinh);
    }
    return checks.length > 0 && checks.every(Boolean);
  });
};
