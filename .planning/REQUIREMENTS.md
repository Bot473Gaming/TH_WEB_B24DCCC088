# Yêu cầu tính năng - Quản lý khóa học

## 1. Yêu cầu nghiệp vụ (Business Requirements)
- [x] **Hiển thị danh sách khóa học:**
  - [x] Cột hiển thị: STT, Tên khóa học, Giảng viên, Số lượng học viên, Trạng thái (Đang mở, Đã kết thúc, Tạm dừng).
  - [x] Hỗ trợ tìm kiếm theo Tên khóa học.
  - [x] Lọc theo Giảng viên và Trạng thái.
  - [x] Sắp xếp (Sort) theo Số lượng học viên.
- [x] **Thêm mới & Chỉnh sửa khóa học:**
  - [x] Tên khóa học: Bắt buộc, tối đa 100 ký tự, không trùng lặp (VAL-01).
  - [x] Giảng viên: Dropdown chọn từ danh sách có sẵn (DANH_SACH_GIANG_VIEN).
  - [x] Số lượng học viên: Số nguyên.
  - [x] Mô tả khóa học: Trình soạn thảo HTML (`TinyEditor`).
  - [x] Trạng thái: Chọn từ `ETrangThai`.
- [x] **Xóa khóa học:**
  - [x] Chỉ cho phép xóa khi Số lượng học viên = 0.
  - [x] Yêu cầu xác nhận (confirm) trước khi xóa.
  - [x] Có thông báo thao tác thành công/thất bại.
- [ ] **Điều hướng & Thống kê (Phase 3):**
  - [ ] Phân chia menu 'Quản lý khóa học' thành submenu 'Danh sách' và 'Thống kê' (MENU-01).
  - [ ] Hiển thị biểu đồ Donut thống kê tỉ lệ trạng thái khóa học (STAT-01).
  - [ ] Hiển thị biểu đồ Cột thống kê số lượng học viên theo khóa học (STAT-02).

## 2. Yêu cầu kỹ thuật (Technical Requirements)
- [x] **Cấu trúc thư mục:** Phải tách riêng biệt `pages`, `models` và `components`.
- [x] **Model & Data Flow:**
  - [x] Viết custom model (`useQuanLyKhoaHocModel.ts`) áp dụng **generics type**.
  - [x] Toàn bộ logic lưu/đọc dữ liệu (CRUD) thao tác trực tiếp với `localStorage`.
- [x] **Components:**
  - [x] Sử dụng các components sẵn có: `TableBase`, `TinyEditor`, `ApexCharts`.
  - [x] Tái sử dụng code hợp lý (Clean Code).
