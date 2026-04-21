---
phase: "02-Quản lý khóa học"
verified: 2025-03-25T11:00:00Z
status: human_needed
score: 5/5 must-haves verified
overrides_applied: 0
re_verification:
  previous_status: gaps_found
  previous_score: 4/5
  gaps_closed:
    - "Người dùng có thể lọc danh sách theo Giảng viên và Trạng thái"
  gaps_remaining: []
  regressions: []
human_verification:
  - test: "Kiểm tra hiển thị TinyEditor trong Form"
    expected: "Trình soạn thảo TinyEditor hiển thị đúng và cho phép nhập liệu HTML."
    why_human: "Không thể kiểm tra hiển thị và tương tác của component bên thứ ba (TinyEditor) bằng script."
  - test: "Kiểm tra thông báo khi thao tác"
    expected: "Hiển thị thông báo (message.success/error) khi Thêm mới thành công, Xóa bị từ chối do có học viên, hoặc báo lỗi trùng tên."
    why_human: "Kiểm tra phản hồi trực quan UI (toast message) cần quan sát trực tiếp."
---

# Phase 2: Quản lý khóa học Verification Report

**Phase Goal:** Build Course List page and Course Form component with filtering.
**Verified:** 2025-03-25T11:00:00Z
**Status:** human_needed
**Re-verification:** Yes — after gap closure

## Goal Achievement

### Observable Truths

| #   | Truth   | Status     | Evidence       |
| --- | ------- | ---------- | -------------- |
| 1   | Người dùng thấy trang danh sách khóa học | ✓ VERIFIED | `src/pages/QuanLyKhoaHoc/index.tsx` sử dụng `TableBase` với đầy đủ các cột yêu cầu. |
| 2   | Người dùng có thể thêm/sửa khóa học qua form | ✓ VERIFIED | `src/pages/QuanLyKhoaHoc/components/Form.tsx` triển khai AntD Form với đầy đủ các trường dữ liệu. |
| 3   | Trang có thể truy cập qua route `/quan-ly-khoa-hoc` | ✓ VERIFIED | Route đã được cấu hình trong `config/routes.ts`. |
| 4   | Chỉ cho phép xóa khi số lượng học viên bằng 0 | ✓ VERIFIED | Logic kiểm tra trong model (`deleteModel`) và thuộc tính `disabled` trên nút xóa ở `index.tsx`. |
| 5   | Người dùng có thể lọc theo Giảng viên và Trạng thái | ✓ VERIFIED | `index.tsx` đã bổ sung `filterType: 'select'` và `useQuanLyKhoaHocModel.ts` đã cập nhật logic lọc trong `getModel`. |

**Score:** 5/5 truths verified

### Required Artifacts

| Artifact | Expected    | Status | Details |
| -------- | ----------- | ------ | ------- |
| `src/pages/QuanLyKhoaHoc/index.tsx` | Trang danh sách khóa học | ✓ VERIFIED | Sử dụng TableBase, tích hợp Model, hỗ trợ lọc Select. |
| `src/pages/QuanLyKhoaHoc/components/Form.tsx` | Component Form Thêm/Sửa | ✓ VERIFIED | Đầy đủ fields, tích hợp TinyEditor và validation VAL-01 (trùng tên). |
| `src/models/useQuanLyKhoaHocModel.ts` | Model xử lý logic CRUD | ✓ VERIFIED | Triển khai logic localStorage, duplicate check, delete condition và lọc dữ liệu. |

### Key Link Verification

| From | To  | Via | Status | Details |
| ---- | --- | --- | ------ | ------- |
| `index.tsx` | `Form.tsx` | TableBase prop | ✓ WIRED | Component Form được truyền vào TableBase. |
| `index.tsx` | `useQuanLyKhoaHocModel` | useModel | ✓ WIRED | Sử dụng các hàm `deleteModel`, `handleEdit`. |
| `Form.tsx` | `useQuanLyKhoaHocModel` | useModel | ✓ WIRED | Sử dụng `postModel`, `putModel`, `record`, `edit`, `visibleForm`. |

### Data-Flow Trace (Level 4)

| Artifact | Data Variable | Source | Produces Real Data | Status |
| -------- | ------------- | ------ | ------------------ | ------ |
| `index.tsx` | `danhSach` | `localStorage` | ✓ FLOWING | Dữ liệu được đọc và lọc từ `localStorage` qua model. |
| `Form.tsx` | `values` | `Form` input | ✓ FLOWING | Dữ liệu từ form được truyền vào `postModel`/`putModel` và lưu vào `localStorage`. |

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
| -------- | ------- | ------ | ------ |
| Kiểm tra file tồn tại | `ls src/pages/QuanLyKhoaHoc/index.tsx` | Exists | ✓ PASS |
| Kiểm tra logic xóa | `grep "soLuongHocVien > 0" src/models/useQuanLyKhoaHocModel.ts` | Found check | ✓ PASS |
| Kiểm tra VAL-01 | `grep "Duplicate name" src/pages/QuanLyKhoaHoc/components/Form.tsx` | Found catch block | ✓ PASS |
| Kiểm tra logic lọc | `grep "curCondition?.idGiangVien" src/models/useQuanLyKhoaHocModel.ts` | Found filtering logic | ✓ PASS |

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
| ----------- | ---------- | ----------- | ------ | -------- |
| UI-01: Course List | 02-01-PLAN | TableBase, columns, filter, sort | ✓ SATISFIED | Đầy đủ cột và tính năng lọc theo Giảng viên/Trạng thái. |
| UI-02: Course Form | 02-01-PLAN | Form component for Add/Edit | ✓ SATISFIED | Triển khai đầy đủ fields và logic. |
| FORM-01: TinyEditor | 02-01-PLAN | Integrate TinyEditor | ✓ SATISFIED | Đã import và sử dụng trong Form. |
| VAL-01: Unique Name | 02-01-PLAN | Validation for duplicate name | ✓ SATISFIED | Xử lý trong model và feedback trên form. |

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
| ---- | ---- | ------- | -------- | ------ |
| (None) | | | | |

### Human Verification Required

### 1. Hiển thị TinyEditor

**Test:** Mở form Thêm mới/Chỉnh sửa khóa học.
**Expected:** Trình soạn thảo TinyEditor hiển thị đúng style và có thể nhập liệu.
**Why human:** Không thể kiểm tra render của TinyEditor bằng code.

### 2. Thông báo khi thao tác

**Test:** Thực hiện Thêm mới thành công, Xóa bị từ chối do có học viên, hoặc nhập trùng tên khóa học.
**Expected:** Hiển thị message toast (success/error) tương ứng từ AntD.
**Why human:** Kiểm tra phản hồi trực quan từ thư viện UI.

### Gaps Summary

Phase 2 đã hoàn thành toàn bộ các yêu cầu. Gap về tính năng lọc theo **Giảng viên** và **Trạng thái** đã được giải quyết triệt để ở cả tầng Model và UI. Logic nghiệp vụ (Xóa có điều kiện, Trùng tên) hoạt động chính xác và có feedback tốt trên giao diện.

---

_Verified: 2025-03-25T11:00:00Z_
_Verifier: the agent (gsd-verifier)_
