# Kế hoạch: Sửa lỗi bộ lọc Giảng viên và Trạng thái

## 1. Vấn đề
- Bảng Khóa học không lọc được theo Giảng viên và Trạng thái mặc dù đã có icon bộ lọc.
- Nguyên nhân: Logic xử lý `filters` trong `useQuanLyKhoaHocModel.ts` chưa xử lý đúng cấu trúc mảng giá trị từ `TableBase`.

## 2. Giải pháp
- Cập nhật `src/models/useQuanLyKhoaHocModel.ts`:
  - Trong hàm `getModel`, phần xử lý `filters`, thay đổi logic so sánh cho `idGiangVien` và `trangThai`.
  - Sử dụng `.includes()` để kiểm tra giá trị của record có nằm trong mảng `filter.values` hay không.

## 3. Thực hiện
- Task 1: Cập nhật file `src/models/useQuanLyKhoaHocModel.ts`.
- Task 2: Xác minh bộ lọc hoạt động trên giao diện.
