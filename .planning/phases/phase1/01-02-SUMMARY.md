---
phase: 01-setup-types-model
plan: 02
subsystem: models
tags: [model, crud, localStorage, generics]
requires: ["01-01"]
provides: ["useQuanLyKhoaHocModel"]
tech-stack: [React, AntD, UmiJS, LocalStorage]
key-files: [src/models/useQuanLyKhoaHocModel.ts]
decisions:
  - "Sử dụng localStorage với key QUAN_LY_KHOA_HOC_DATA để mô phỏng cơ sở dữ liệu."
  - "Áp dụng Generics <T extends KhoaHoc.IRecord> để đảm bảo tính linh hoạt và type-safety."
  - "Mô phỏng phân trang (pagination) và tìm kiếm (searching) trong getModel để tương thích với Table components."
metrics:
  duration: 15m
  completed_date: 2024-03-24T12:30:00Z
---

# Phase 1 Plan 02: Build useQuanLyKhoaHocModel Summary

Xây dựng thành công custom model `useQuanLyKhoaHocModel.ts` sử dụng Generics và `localStorage` để quản lý dữ liệu khóa học, tuân thủ đúng pattern của `useInitModel`.

## Key Achievements

- **CRUD Implementation**: Đã triển khai đầy đủ các phương thức `getModel`, `postModel`, `putModel`, `deleteModel` hoạt động với `localStorage`.
- **Validation Logic**:
  - Kiểm tra trùng tên khóa học (`tenKhoaHoc`) khi thêm mới và cập nhật.
  - Chặn xóa khóa học nếu đã có học viên (`soLuongHocVien > 0`).
- **Pattern Matching**: Kế thừa các state và phương thức helper (`handleEdit`, `handleView`) từ `useInitModel` để đảm bảo tính nhất quán trong codebase.
- **Generics**: Hỗ trợ mở rộng kiểu dữ liệu thông qua generic type `T`.

## Files Created/Modified

- `src/models/useQuanLyKhoaHocModel.ts`: Chứa toàn bộ logic quản lý dữ liệu khóa học.

## Deviations from Plan

None - plan executed exactly as written.

## Self-Check: PASSED

- [x] Hook export đầy đủ các hàm CRUD.
- [x] Logic validation tên trùng lặp hoạt động chính xác.
- [x] Logic chặn xóa khi có học viên hoạt động chính xác.
- [x] Dữ liệu được persist trong `localStorage`.
