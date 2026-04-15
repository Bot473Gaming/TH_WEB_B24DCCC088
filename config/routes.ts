export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},
	{
		path: '/random-user',
		name: 'RandomUser',
		component: './RandomUser',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/guess-number',
		name: 'Đoán số',
		component: './GuessNumber',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/todo',
		name: 'Todo List',
		component: './TodoList',
		icon: 'ArrowsAltOutlined',
	},
	{
		path: '/oantuti',
		name: 'Oẳn Tù Tì',
		component: './RockPaperScissors',
		icon: 'ArrowsAltOutlined',
	},
	{
		name: 'Quản lý Đặt Lịch',
		path: '/dat-lich',
		icon: 'CalendarOutlined',
		routes: [
			{
				name: 'Nhân viên',
				path: 'nhan-vien',
				component: './DatLich/NhanVien',
			},
			{
				name: 'Dịch vụ',
				path: 'dich-vu',
				component: './DatLich/DichVu',
			},
			{
				name: 'Lịch hẹn',
				path: 'lich-hen',
				component: './DatLich/LichHen',
			},
			{
				name: 'Đánh giá',
				path: 'danh-gia',
				component: './DatLich/DanhGia',
			},
			{
				name: 'Thống kê',
				path: 'thong-ke',
				component: './DatLich/ThongKe',
			},
		],
	},

	{
		name: 'Quản lý Văn Bằng',
		path: '/van-bang',
		icon: 'SafetyCertificateOutlined',
		routes: [
			{
				name: 'Sổ văn bằng',
				path: 'so-van-bang',
				component: './VanBang/SoVanBang',
			},
			{
				name: 'Quyết định tốt nghiệp',
				path: 'quyet-dinh-tot-nghiep',
				component: './VanBang/QuyetDinhTotNghiep',
			},
			{
				name: 'Cấu hình biểu mẫu',
				path: 'cau-hinh-bieu-mau',
				component: './VanBang/CauHinhBieuMau',
			},
			{
				name: 'Thông tin văn bằng',
				path: 'thong-tin-van-bang',
				component: './VanBang/ThongTinVanBang',
			},
			{
				name: 'Tra cứu văn bằng',
				path: 'tra-cuu-van-bang',
				component: './VanBang/TraCuuVanBang',
			},
		],
	},

	{
		name: 'Quản lý Câu lạc bộ',
		path: '/cau-lac-bo',
		icon: 'TeamOutlined',
		routes: [
			{
				name: 'Danh sách CLB',
				path: 'danh-sach',
				component: './CauLacBo/DanhSachCLB',
			},
			{
				name: 'Đơn đăng ký thành viên',
				path: 'dang-ky',
				component: './CauLacBo/DangKyThanhVien',
			},
			{
				name: 'Thành viên CLB',
				path: 'thanh-vien',
				component: './CauLacBo/ThanhVienCLB',
			},
			{
				name: 'Báo cáo & Thống kê',
				path: 'thong-ke',
				component: './CauLacBo/ThongKe',
			},
		],
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		name: 'Lap Ke Hoach Du Lich',
		path: '/du-lich',
		icon: 'CompassOutlined',
		routes: [
			{
				name: 'Kham pha diem den',
				path: 'kham-pha',
				component: './DuLich/TrangChu',
			},
			{
				name: 'Lich trinh cua toi',
				path: 'lich-trinh',
				component: './DuLich/LichTrinh',
			},
			{
				name: 'Ngan sach',
				path: 'ngan-sach',
				component: './DuLich/NganSach',
			},
			{
				name: 'Quan ly diem den',
				path: 'admin-diem-den',
				component: './DuLich/Admin/DiemDen',
			},
			{
				name: 'Thong ke',
				path: 'admin-thong-ke',
				component: './DuLich/Admin/ThongKe',
			},
		],
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		path: '/hold-on',
		component: './exception/DangCapNhat',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
