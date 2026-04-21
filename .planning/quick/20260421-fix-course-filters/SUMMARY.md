# Summary: Khắc phục lỗi TypeError bằng cách đổi tên Model

## Các thay đổi đã thực hiện:
1. **Đổi tên file Model:**
   - `src/models/useQuanLyKhoaHocModel.ts` -> `src/models/QuanLyKhoaHocModel.ts`
   - `src/models/useQuanLyGiangVienModel.ts` -> `src/models/QuanLyGiangVienModel.ts`
   - `src/models/useQuanLyHocVienModel.ts` -> `src/models/QuanLyHocVienModel.ts`
   (Loại bỏ tiền tố `use` để tránh xung đột với hook và giúp UmiJS nhận diện Model tốt hơn).

2. **Cập nhật mã nguồn nội bộ Model:**
   - Đổi tên các hàm hook bên trong Model khớp với tên file mới.

3. **Cập nhật tham chiếu:**
   - Thay thế toàn bộ các lời gọi `useModel('useQuanLy...Model')` sang `useModel('QuanLy...Model')` trong tất cả các trang (`DanhSach`, `ThongKe`, `GiangVien`, `HocVien`) và các Form.
   - Cập nhật `modelName` trong các component `TableBase`.

## Kết quả:
- Lỗi `TypeError: Cannot read properties of undefined (reading 'deleteModel')` đã được khắc phục hoàn toàn.
- Hệ thống Model hoạt động ổn định và đúng chuẩn UmiJS.
