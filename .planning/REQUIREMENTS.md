# Yêu cầu tính năng - Quản lý khóa học

## 1. Yêu cầu nghiệp vụ (Business Requirements)
- **Hiển thị danh sách khóa học:**
  - Cột hiển thị: ID khóa học, Tên khóa học, Giảng viên, Số lượng học viên, Trạng thái (Đang mở, Đã kết thúc, Tạm dừng).
  - Hỗ trợ tìm kiếm theo Tên khóa học.
  - Lọc theo Giảng viên và Trạng thái.
  - Sắp xếp (Sort) theo Số lượng học viên.
- **Thêm mới & Chỉnh sửa khóa học:**
  - Tên khóa học: Bắt buộc, tối đa 100 ký tự, không trùng lặp.
  - Giảng viên: Dropdown chọn từ danh sách có sẵn (mock).
  - Số lượng học viên: Số nguyên.
  - Mô tả khóa học: Trình soạn thảo HTML (`TinyEditor`).
  - Trạng thái: Chọn từ `enum`.
- **Xóa khóa học:**
  - Chỉ cho phép xóa khi Số lượng học viên = 0.
  - Yêu cầu xác nhận (confirm) trước khi xóa.
  - Có thông báo thao tác thành công/thất bại.

## 2. Yêu cầu kỹ thuật (Technical Requirements)
- **Cấu trúc thư mục:** Phải tách riêng biệt `pages`, `models` và `components`.
- **Model & Data Flow:**
  - Viết custom model (VD: `useQuanLyKhoaHocModel.ts`) áp dụng **generics type** lấy cảm hứng từ `useInitModel`.
  - Toàn bộ logic lưu/đọc dữ liệu (CRUD) thao tác trực tiếp với `localStorage` thay vì gọi API.
- **Components:**
  - Sử dụng các components sẵn có: `Table`, `TinyEditor` (cho Mô tả), `MyDatepicker` (nếu cần cho ngày tháng), `Descriptions`.
  - Tái sử dụng code hợp lý (Clean Code).
