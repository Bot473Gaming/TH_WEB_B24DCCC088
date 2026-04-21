# Summary: Sửa lỗi bộ lọc và cập nhật logic Model Khóa học

## Các thay đổi đã thực hiện:
1. **Cập nhật Model `useQuanLyKhoaHocModel.ts`**:
   - Thay đổi chữ ký hàm `getModel` để nhận một object `params` (bao gồm `condition`, `filters`, `page`, `limit`, `sort`) theo đúng chuẩn của `TableBase`.
   - Đảm bảo logic lọc (`filters`) sử dụng giá trị mới nhất được truyền từ `TableBase`.
   - Giữ nguyên logic tính toán `soLuongHocVien` động từ `localStorage`.

## Kết quả:
- Bộ lọc theo **Giảng viên** và **Trạng thái** trên bảng Khóa học hiện đã hoạt động chính xác.
- Khi người dùng chọn một hoặc nhiều giảng viên/trạng thái từ icon bộ lọc, danh sách sẽ được cập nhật tương ứng.
