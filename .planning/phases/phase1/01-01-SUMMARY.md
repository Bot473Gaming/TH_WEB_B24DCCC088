---
phase: 01-setup-types-model
plan: 01
subsystem: QuanLyKhoaHoc
tags: [types, mock-data, setup]
requires: []
provides: [KhoaHoc.IRecord, KhoaHoc.IGiangVien, ETrangThai, DANH_SACH_GIANG_VIEN]
affects: [src/services/QuanLyKhoaHoc/*]
tech-stack: [TypeScript, AntD]
key-files: [src/services/QuanLyKhoaHoc/typing.d.ts, src/services/QuanLyKhoaHoc/constant.ts]
decisions:
  - "Sử dụng namespace KhoaHoc trong typing.d.ts để quản lý kiểu dữ liệu tập trung."
  - "Import KhoaHoc type trong constant.ts để giải quyết lỗi namespace không tồn tại khi compile riêng lẻ."
metrics:
  duration: "15m"
  completed_date: "2024-03-24"
---

# Phase 01 Plan 01: Setup Types and Model Summary

Thiết lập thành công các kiểu dữ liệu và hằng số cơ bản cho tính năng Quản lý khóa học, bao gồm định nghĩa interface `IRecord`, `IGiangVien` và dữ liệu mẫu giảng viên.

## Key Changes

- **Typing Definition**: Tạo `src/services/QuanLyKhoaHoc/typing.d.ts` với namespace `KhoaHoc` chứa:
  - `IRecord`: Cấu trúc dữ liệu chính cho Khóa học (tên, giảng viên, số lượng, trạng thái, mô tả).
  - `IGiangVien`: Cấu trúc dữ liệu cho Giảng viên.
- **Constants & Mock Data**: Tạo `src/services/QuanLyKhoaHoc/constant.ts` chứa:
  - `ETrangThai`: Enum cho các trạng thái của khóa học (Đang mở, Đã kết thúc, Tạm dừng).
  - `TRANG_THAI_LABEL`: Map labels tiếng Việt cho trạng thái.
  - `DANH_SACH_GIANG_VIEN`: Danh sách mẫu 3 giảng viên để sử dụng trong dropdown.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking Issue] Missing namespace 'KhoaHoc' in constant.ts**
- **Found during:** Task 2 verification
- **Issue:** `constant.ts` không nhận diện được namespace `KhoaHoc` từ `typing.d.ts` khi chạy `tsc` độc lập.
- **Fix:** Thêm `import type { KhoaHoc } from './typing';` vào đầu file `constant.ts`.
- **Files modified:** `src/services/QuanLyKhoaHoc/constant.ts`
- **Commit:** [GK 10b9323] (gộp vào task 2)

## Self-Check: PASSED

- [x] File `src/services/QuanLyKhoaHoc/typing.d.ts` tồn tại và hợp lệ.
- [x] File `src/services/QuanLyKhoaHoc/constant.ts` tồn tại và hợp lệ.
- [x] Các commit đã được tạo cho mỗi task.
- [x] Lỗi TypeScript đã được khắc phục.
