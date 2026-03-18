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

	// VAN BANG
	{
		name: 'Văn bằng',
		path: '/van-bang',
		icon: 'BookOutlined',
		routes: [
			{
				name: 'Sổ văn bằng',
				path: 'so-van-bang',
				component: './SoVanBang',
			},
			{
				name: 'Quyết định',
				path: 'quyet-dinh',
				component: './QuyetDinh',
			},
			{
				name: 'Cấu hình biểu mẫu',
				path: 'cau-hinh-bieu-mau',
				component: './CauHinh',
			},
			{
				name: 'Thông tin văn bằng',
				path: 'thong-tin-van-bang',
				component: './VanBang',
			},
		],
	},
	{
		path: '/tra-cuu',
		name: 'Tra cứu văn bằng',
		component: './TraCuu',
		icon: 'SearchOutlined',
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
