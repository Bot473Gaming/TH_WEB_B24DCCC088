---
phase: "03"
plan: "01"
subsystem: "QuanLyKhoaHoc"
tags: ["menu", "submenu", "statistics", "charts"]
requires: ["MENU-01", "STAT-01", "STAT-02"]
provides: ["submenu structure", "statistics page"]
affects: ["config/routes.ts", "src/pages/QuanLyKhoaHoc"]
tech-stack: ["React", "Ant Design", "UmiJS", "ApexCharts"]
key-files: ["src/pages/QuanLyKhoaHoc/DanhSach.tsx", "src/pages/QuanLyKhoaHoc/ThongKe.tsx", "config/routes.ts"]
decisions:
  - "Tái cấu trúc menu sử dụng thuộc tính 'routes' trong config/routes.ts để tạo submenu."
  - "Sử dụng useModel('useQuanLyKhoaHocModel') để lấy dữ liệu tập trung cho cả trang Danh sách và Thống kê."
  - "Tính toán dữ liệu thống kê bằng useMemo để tối ưu hóa hiệu năng render."
metrics:
  duration: "4m"
  completed_date: "2026-04-21T18:52:30Z"
---

# Phase 03 Plan 01: Refactor Menu to submenu and add Statistics page Summary

Tái cấu trúc menu 'Quản lý khóa học' thành submenu và bổ sung trang Thống kê với biểu đồ trực quan (Donut và Column).

## Key Changes

### 1. Menu & Submenu Refactoring
- Đổi tên `src/pages/QuanLyKhoaHoc/index.tsx` thành `src/pages/QuanLyKhoaHoc/DanhSach.tsx`.
- Cập nhật `config/routes.ts` để định nghĩa cấu trúc submenu mới cho 'Quản lý khóa học'.
- Thêm cơ chế redirect từ `/quan-ly-khoa-hoc` sang `/quan-ly-khoa-hoc/danh-sach` để đảm bảo trải nghiệm người dùng không bị gián đoạn.
- Cập nhật bản dịch đa ngôn ngữ trong `src/locales/vi-VN/menu.ts`.

### 2. Statistics Page Implementation
- Tạo mới trang `src/pages/QuanLyKhoaHoc/ThongKe.tsx`.
- Tích hợp `DonutChart` để hiển thị tỉ lệ phân bổ trạng thái khóa học (Đang mở, Đã kết thúc, Tạm dừng).
- Tích hợp `ColumnChart` để so sánh số lượng học viên giữa các khóa học khác nhau.
- Dữ liệu được lấy trực tiếp từ `useQuanLyKhoaHocModel` để đảm bảo tính nhất quán với dữ liệu thực tế.

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- [x] Menu 'Quản lý khóa học' hiển thị 2 submenu: 'Danh sách' và 'Thống kê'.
- [x] Truy cập `/quan-ly-khoa-hoc/danh-sach` hiển thị bảng danh sách khóa học hoạt động bình thường.
- [x] Truy cập `/quan-ly-khoa-hoc/thong-ke` hiển thị 2 biểu đồ thống kê với dữ liệu thực tế.
- [x] Biểu đồ Donut hiển thị đúng tỉ lệ trạng thái.
- [x] Biểu đồ Cột hiển thị đúng số lượng học viên theo khóa học.

## Self-Check: PASSED

1. Check created files exist:
   - `src/pages/QuanLyKhoaHoc/DanhSach.tsx`: FOUND
   - `src/pages/QuanLyKhoaHoc/ThongKe.tsx`: FOUND
2. Check commits exist:
   - `a2674ca`: FOUND (Refactor menu)
   - `9dcad1d`: FOUND (Implement Statistics page)
