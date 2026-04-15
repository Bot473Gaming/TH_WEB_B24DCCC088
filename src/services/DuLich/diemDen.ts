const STORAGE_KEY = 'dulich_diem_den_data';

export type LoaiDiemDen = 'bien' | 'nui' | 'thanhpho' | 'langque' | 'disantichsu';

export interface IDiemDen {
  id: string;
  ten: string;
  loai: LoaiDiemDen;
  moTa: string;
  hinhAnh: string;
  diaChi: string;
  chiPhiAnUong: number;
  chiPhiLuuTru: number;
  chiPhiDiChuyen: number;
  thoiGianThamQuan: number; // so gio
  rating: number; // 1-5
  soLuotChon: number;
}

const SEED_DATA: IDiemDen[] = [
  {
    id: 'seed-1',
    ten: 'Vịnh Hạ Long',
    loai: 'bien',
    moTa: 'Di sản thiên nhiên thế giới với hàng nghìn hòn đảo đá vôi nổi trên mặt nước xanh biếc.',
    hinhAnh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Halong_bay_Cat_Ba_Island_National_Park_Vietnam.jpg/1280px-Halong_bay_Cat_Ba_Island_National_Park_Vietnam.jpg',
    diaChi: 'Quảng Ninh',
    chiPhiAnUong: 300000,
    chiPhiLuuTru: 800000,
    chiPhiDiChuyen: 400000,
    thoiGianThamQuan: 8,
    rating: 5,
    soLuotChon: 0,
  },
  {
    id: 'seed-2',
    ten: 'Phố cổ Hội An',
    loai: 'thanhpho',
    moTa: 'Đô thị cổ được UNESCO công nhận với kiến trúc độc đáo pha trộn các nền văn hóa.',
    hinhAnh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Hoi_an_night.jpg/1280px-Hoi_an_night.jpg',
    diaChi: 'Quảng Nam',
    chiPhiAnUong: 250000,
    chiPhiLuuTru: 600000,
    chiPhiDiChuyen: 200000,
    thoiGianThamQuan: 6,
    rating: 5,
    soLuotChon: 0,
  },
  {
    id: 'seed-3',
    ten: 'Sapa',
    loai: 'nui',
    moTa: 'Thị trấn trên cao nguyên nổi tiếng với ruộng bậc thang và đỉnh Fansipan hùng vĩ.',
    hinhAnh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/SaPa_Hoang_Lien_National_Park_Vietnam.jpg/640px-SaPa_Hoang_Lien_National_Park_Vietnam.jpg',
    diaChi: 'Lào Cai',
    chiPhiAnUong: 200000,
    chiPhiLuuTru: 500000,
    chiPhiDiChuyen: 500000,
    thoiGianThamQuan: 10,
    rating: 5,
    soLuotChon: 0,
  },
  {
    id: 'seed-4',
    ten: 'Đà Nẵng',
    loai: 'bien',
    moTa: 'Thành phố biển hiện đại với bãi biển Mỹ Khê tuyệt đẹp và cầu Rồng nổi tiếng.',
    hinhAnh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Da-nang-beach.jpg/1280px-Da-nang-beach.jpg',
    diaChi: 'Đà Nẵng',
    chiPhiAnUong: 280000,
    chiPhiLuuTru: 700000,
    chiPhiDiChuyen: 300000,
    thoiGianThamQuan: 8,
    rating: 4,
    soLuotChon: 0,
  },
  {
    id: 'seed-5',
    ten: 'Hà Nội',
    loai: 'thanhpho',
    moTa: 'Thủ đô ngàn năm văn hiến với Hồ Hoàn Kiếm, Phố cổ và các di tích lịch sử phong phú.',
    hinhAnh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Hoan-Kiem-Lake.jpg/1280px-Hoan-Kiem-Lake.jpg',
    diaChi: 'Hà Nội',
    chiPhiAnUong: 250000,
    chiPhiLuuTru: 800000,
    chiPhiDiChuyen: 150000,
    thoiGianThamQuan: 12,
    rating: 4,
    soLuotChon: 0,
  },
  {
    id: 'seed-6',
    ten: 'Phú Quốc',
    loai: 'bien',
    moTa: 'Đảo ngọc với bãi biển cát trắng, nước biển trong xanh và rừng nguyên sinh.',
    hinhAnh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Phu_Quoc_island_beach.jpg/1280px-Phu_Quoc_island_beach.jpg',
    diaChi: 'Kiên Giang',
    chiPhiAnUong: 350000,
    chiPhiLuuTru: 1200000,
    chiPhiDiChuyen: 800000,
    thoiGianThamQuan: 10,
    rating: 5,
    soLuotChon: 0,
  },
  {
    id: 'seed-7',
    ten: 'Đà Lạt',
    loai: 'nui',
    moTa: 'Thành phố sương mù với khí hậu mát mẻ, vườn hoa và thác nước lãng mạn quanh năm.',
    hinhAnh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/Xuan_Huong_Lake_Dalat.jpg/1280px-Xuan_Huong_Lake_Dalat.jpg',
    diaChi: 'Lâm Đồng',
    chiPhiAnUong: 200000,
    chiPhiLuuTru: 600000,
    chiPhiDiChuyen: 400000,
    thoiGianThamQuan: 8,
    rating: 4,
    soLuotChon: 0,
  },
  {
    id: 'seed-8',
    ten: 'Ninh Bình',
    loai: 'langque',
    moTa: 'Vùng đất cố đô với hang động Tràng An, Tam Cốc - Bích Động và đồng lúa bát ngát.',
    hinhAnh: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Trang_An_Ninh_Binh_Vietnam.jpg/1280px-Trang_An_Ninh_Binh_Vietnam.jpg',
    diaChi: 'Ninh Bình',
    chiPhiAnUong: 180000,
    chiPhiLuuTru: 400000,
    chiPhiDiChuyen: 200000,
    thoiGianThamQuan: 8,
    rating: 4,
    soLuotChon: 0,
  },
];

const initSeedData = () => {
  const existing = localStorage.getItem(STORAGE_KEY);
  if (!existing) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_DATA));
  }
};

export const getAll = (): IDiemDen[] => {
  initSeedData();
  return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
};

export const getById = (id: string): IDiemDen | undefined => {
  return getAll().find((item) => item.id === id);
};

export const create = (data: Omit<IDiemDen, 'id' | 'soLuotChon'>): IDiemDen => {
  const list = getAll();
  const newItem: IDiemDen = {
    ...data,
    id: `dd-${Date.now()}`,
    soLuotChon: 0,
  };
  list.unshift(newItem);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  return newItem;
};

export const update = (id: string, data: Partial<IDiemDen>): void => {
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

export const incrementLuotChon = (id: string): void => {
  const list = getAll();
  const index = list.findIndex((item) => item.id === id);
  if (index !== -1) {
    list[index].soLuotChon = (list[index].soLuotChon || 0) + 1;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }
};
