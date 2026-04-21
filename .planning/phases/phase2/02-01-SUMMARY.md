---
phase: "02"
plan: "01"
subsystem: "QuanLyKhoaHoc"
tags: [react, antd, umijs, filtering]
dependency_graph:
  requires: ["01-01", "01-02"]
  provides: ["Course Management UI with filtering"]
  affects: ["src/pages/QuanLyKhoaHoc/index.tsx", "src/models/useQuanLyKhoaHocModel.ts"]
tech_stack:
  added: []
  patterns: ["Table filtering with select options", "Model-side filtering logic"]
key_files:
  created: []
  modified: ["src/models/useQuanLyKhoaHocModel.ts", "src/pages/QuanLyKhoaHoc/index.tsx"]
decisions:
  - "Sử dụng filterType: 'select' cho cột Giảng viên và Trạng thái để cải thiện trải nghiệm người dùng so với tìm kiếm text tự do."
  - "Logic lọc được thực hiện tập trung tại hàm getModel của useQuanLyKhoaHocModel để đảm bảo tính nhất quán giữa UI và Data."
metrics:
  duration: "30m"
  completed_date: "2025-03-24"
---

# Phase 02 Plan 01: Quản lý khóa học Summary

Triển khai hoàn thiện giao diện Quản lý khóa học, bao gồm danh sách, form thêm/sửa, và đặc biệt là tính năng lọc theo Giảng viên và Trạng thái (Gap Closure).

## Key Achievements

- **Filtering Capability:** Người dùng hiện có thể lọc danh sách khóa học theo Giảng viên và Trạng thái trực tiếp từ tiêu đề bảng.
- **Model Enhancement:** Cập nhật `useQuanLyKhoaHocModel` để xử lý logic lọc dữ liệu dựa trên các điều kiện từ TableBase.
- **UI Integration:** Cấu hình `TableBase` với `filterType: 'select'` và cung cấp đầy đủ options từ các hằng số hệ thống.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 2 - Missing Functionality] Bổ sung lọc theo Giảng viên và Trạng thái**
- **Found during:** Verification gap check
- **Issue:** `REQUIREMENTS.md` yêu cầu lọc nhưng implementation ban đầu chỉ hỗ trợ tìm kiếm theo tên.
- **Fix:** Cập nhật `getModel` trong model và cấu hình columns trong `index.tsx`.
- **Files modified:** `src/models/useQuanLyKhoaHocModel.ts`, `src/pages/QuanLyKhoaHoc/index.tsx`
- **Commit:** `2bc76a4`, `9a0d885`

## Self-Check: PASSED

- [x] File `src/models/useQuanLyKhoaHocModel.ts` đã hỗ trợ lọc `idGiangVien` và `trangThai`.
- [x] File `src/pages/QuanLyKhoaHoc/index.tsx` đã cấu hình `filterType: 'select'` cho các cột tương ứng.
- [x] Các commit đã được tạo và đẩy lên branch hiện tại.
