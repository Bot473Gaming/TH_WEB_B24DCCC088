# Roadmap Phát triển - Quản lý Khóa học

| Phase | Mục tiêu | Chi tiết Công việc |
|---|---|---|
| **Phase 1** | Thiết lập Types & Data Model | - Định nghĩa `KhoaHoc.Record` (interface).<br>- Khởi tạo dữ liệu mẫu (mock data giảng viên).<br>- Xây dựng custom model `useQuanLyKhoaHocModel.ts` xử lý CRUD với `localStorage` có cấu trúc giống `useInitModel`. |
| **Phase 2** | Phát triển UI & Components | - Tạo trang danh sách (`DanhSachKhoaHoc`) với `Table`, Tìm kiếm, Lọc, Sắp xếp.<br>- Tạo component Form `Thêm/Sửa Khóa học` (sử dụng `TinyEditor`, validation rule tên không trùng). |
| **Phase 3** | Tích hợp & Kiểm tra | - Tích hợp Form vào Trang danh sách.<br>- Gắn logic Xóa với điều kiện (học viên = 0) và Confirm.<br>- Thêm menu "Quản lý khóa học" vào `config/routes.ts`. |

---

### Phase 1 Plans:
- [x] 01-01-PLAN.md — Setup Types & Constants
- [x] 01-02-PLAN.md — Implement useQuanLyKhoaHocModel

### Phase 2 Plans:
- [ ] 02-01-PLAN.md — Build Course List and Course Form
