# Roadmap Phát triển - Quản lý Khóa học

| Phase | Mục tiêu | Chi tiết Công việc |
|---|---|---|
| **Phase 1** | Thiết lập Types & Data Model | - Định nghĩa `KhoaHoc.Record` (interface).<br>- Khởi tạo dữ liệu mẫu (mock data giảng viên).<br>- Xây dựng custom model `useQuanLyKhoaHocModel.ts` xử lý CRUD với `localStorage` có cấu trúc giống `useInitModel`. |
| **Phase 2** | Phát triển UI & Components | - Tạo trang danh sách (`DanhSachKhoaHoc`) với `Table`, Tìm kiếm, Lọc, Sắp xếp.<br>- Tạo component Form `Thêm/Sửa Khóa học` (sử dụng `TinyEditor`, validation rule tên không trùng). |
| **Phase 3** | Tích hợp & Thống kê | - Tái cấu trúc Menu thành submenu (Danh sách, Thống kê).<br>- Triển khai trang Thống kê với biểu đồ Donut và Column.<br>- Kiểm tra E2E toàn bộ hệ thống. |

---

### Phase 1 Plans:
- [x] 01-01-PLAN.md — Setup Types & Constants
- [x] 01-02-PLAN.md — Implement useQuanLyKhoaHocModel

### Phase 2 Plans:
- [x] 02-01-PLAN.md — Build Course List and Course Form (Completed)

### Phase 3 Plans:
- [ ] 03-01-PLAN.md — Refactor Menu and Add Statistics Page
