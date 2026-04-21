# Phase 1: Thiết lập Types & Data Model - Research

**Researched:** 2024-05-24
**Domain:** Quản lý khóa học (Course Management)
**Confidence:** HIGH

## Summary

Phase này tập trung vào việc thiết lập nền tảng dữ liệu cho chức năng Quản lý khóa học. Do yêu cầu sử dụng `localStorage` thay vì gọi API thật, chúng ta cần xây dựng một custom hook `useQuanLyKhoaHocModel` mô phỏng hành vi của `useInitModel` nhưng tương tác với trình duyệt. 

**Primary recommendation:** Sử dụng `localStorage` kết hợp với `useState` trong custom hook để quản lý trạng thái dữ liệu đồng bộ giữa giao diện và bộ nhớ trình duyệt.

## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Định nghĩa Type | TypeScript | — | Đảm bảo type-safe cho toàn bộ ứng dụng |
| Lưu trữ dữ liệu | Browser (localStorage) | — | Yêu cầu dự án không sử dụng backend trong phase này |
| Logic CRUD | Client (Custom Hook) | — | Xử lý thêm, xóa, sửa, đọc trực tiếp trên trình duyệt |
| Dữ liệu mẫu | Client (Static) | — | Danh sách giảng viên phục vụ việc chọn trong Form |

## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| React | 17.0.0 | UI Library | Theo `package.json` [VERIFIED] |
| Ant Design | 4.21.0 | UI Framework | Theo `package.json` [VERIFIED] |
| UmiJS | 3.5.x | Framework | Theo `package.json` [VERIFIED] |
| TypeScript | 4.2.2 | Ngôn ngữ | Theo `package.json` [VERIFIED] |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|--------------|
| moment | 2.29.1 | Xử lý thời gian | Định dạng ngày bắt đầu/kết thúc |
| lodash | 4.17.21 | Tiện ích xử lý mảng/object | Thao tác trên danh sách khóa học |

**Installation:**
Không cần cài đặt thêm vì các thư viện đã có sẵn trong dự án.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── services/
│   └── KhoaHoc/
│       └── typing.d.ts      # Định nghĩa KhoaHoc.Record
├── hooks/
│   └── useQuanLyKhoaHocModel.ts  # Custom hook quản lý logic CRUD
```

### Pattern 1: LocalStorage Service Pattern
Thay vì gọi trực tiếp `localStorage` trong hook, nên gom logic thao tác với `localStorage` vào một đối tượng hoặc các hàm helper để dễ quản lý.

**Example:**
```typescript
const COURSE_STORAGE_KEY = 'quan-ly-khoa-hoc-data';

export const storage = {
  get: () => JSON.parse(localStorage.getItem(COURSE_STORAGE_KEY) || '[]'),
  set: (data: any[]) => localStorage.setItem(COURSE_STORAGE_KEY, JSON.stringify(data)),
};
```

### Anti-Patterns to Avoid
- **Trạng thái không đồng bộ:** Thay đổi dữ liệu trong `localStorage` mà không cập nhật state của React (hoặc ngược lại) dẫn đến UI không render lại.
- **Mã hóa ID thủ công:** Tự tạo ID bằng số thứ tự dễ bị trùng khi xóa/thêm. Nên dùng UUID hoặc hàm `makeId` có sẵn trong `utils.ts`.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Tạo ID ngẫu nhiên | Hàm tạo ID phức tạp | `makeId` từ `src/utils/utils.ts` | Có sẵn và đơn giản |
| Định dạng tiền/số | Hàm format thủ công | `inputFormat` / `currencyFormat` từ `utils.ts` | Thống nhất định dạng toàn dự án |
| Xử lý ngày tháng | Native Date | `moment` | Dự án đang dùng moment rộng rãi |

## Common Pitfalls

### Pitfall 1: Xử lý dữ liệu ban đầu trống
**What goes wrong:** `JSON.parse(null)` hoặc `JSON.parse("")` gây lỗi crash ứng dụng.
**How to avoid:** Luôn cung cấp giá trị mặc định `|| '[]'` khi lấy từ localStorage.

### Pitfall 2: Logic xóa bản ghi
**What goes wrong:** Xóa bản ghi đang có học viên tham gia (theo yêu cầu Phase 3: chỉ xóa khi học viên = 0).
**How to avoid:** Cần kiểm tra field `soLuongHocVien` trước khi thực hiện xóa trong `deleteModel`.

## Code Examples

### KhoaHoc.Record Definition
Dựa trên `src/services/DanhMuc/ChucVu/typing.d.ts` [CITED].

```typescript
declare module KhoaHoc {
  export interface Record {
    _id: string; // ID duy nhất
    ma: string; // Mã khóa học
    ten: string; // Tên khóa học
    moTa?: string; // Mô tả (Rich text từ TinyEditor)
    giangVien: string; // ID giảng viên (liên kết với mock data)
    ngayBatDau: string; // Định dạng ISO/Moment string
    ngayKetThuc: string; // Định dạng ISO/Moment string
    soLuongHocVien: number; // Số lượng học viên hiện tại
    createdAt?: string;
    updatedAt?: string;
  }
}
```

### Mock Teacher Data
```typescript
export const MOCK_GIANG_VIEN = [
  { _id: 'gv1', hoTen: 'Nguyễn Văn A', khoa: 'CNTT' },
  { _id: 'gv2', hoTen: 'Trần Thị B', khoa: 'Điện tử' },
  { _id: 'gv3', hoTen: 'Lê Văn C', khoa: 'Kinh tế' },
];
```

### useQuanLyKhoaHocModel Structure
Tham chiếu phương thức từ `src/hooks/useInitModel.tsx` [CITED].

```typescript
import { useState } from 'react';
import { message } from 'antd';
import { makeId, chuanHoaObject } from '@/utils/utils';

export default () => {
  const [danhSach, setDanhSach] = useState<KhoaHoc.Record[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [visibleForm, setVisibleForm] = useState<boolean>(false);
  const [record, setRecord] = useState<KhoaHoc.Record | undefined>();
  const [edit, setEdit] = useState<boolean>(false);

  // Lấy danh sách từ localStorage
  const getModel = async () => {
    setLoading(true);
    try {
      const data = JSON.parse(localStorage.getItem('khoa-hoc') || '[]');
      setDanhSach(data);
    } finally {
      setLoading(false);
    }
  };

  // Thêm mới
  const postModel = async (payload: KhoaHoc.Record) => {
    const newData = { 
      ...chuanHoaObject(payload), 
      _id: makeId(10),
      createdAt: new Date().toISOString() 
    };
    const currentData = JSON.parse(localStorage.getItem('khoa-hoc') || '[]');
    const updatedData = [...currentData, newData];
    localStorage.setItem('khoa-hoc', JSON.stringify(updatedData));
    setDanhSach(updatedData);
    message.success('Thêm mới thành công');
    setVisibleForm(false);
  };

  // Cập nhật
  const putModel = async (id: string, payload: KhoaHoc.Record) => {
    const currentData = JSON.parse(localStorage.getItem('khoa-hoc') || '[]');
    const updatedData = currentData.map((item: KhoaHoc.Record) => 
      item._id === id ? { ...item, ...chuanHoaObject(payload), updatedAt: new Date().toISOString() } : item
    );
    localStorage.setItem('khoa-hoc', JSON.stringify(updatedData));
    setDanhSach(updatedData);
    message.success('Cập nhật thành công');
    setVisibleForm(false);
  };

  // Xóa (Có kiểm tra điều kiện học viên = 0)
  const deleteModel = async (id: string) => {
    const currentData = JSON.parse(localStorage.getItem('khoa-hoc') || '[]');
    const itemToDelete = currentData.find((item: KhoaHoc.Record) => item._id === id);
    
    if (itemToDelete && itemToDelete.soLuongHocVien > 0) {
      message.error('Không thể xóa khóa học đang có học viên');
      return;
    }

    const updatedData = currentData.filter((item: KhoaHoc.Record) => item._id !== id);
    localStorage.setItem('khoa-hoc', JSON.stringify(updatedData));
    setDanhSach(updatedData);
    message.success('Xóa thành công');
  };

  return {
    danhSach,
    loading,
    visibleForm,
    setVisibleForm,
    record,
    setRecord,
    edit,
    setEdit,
    getModel,
    postModel,
    putModel,
    deleteModel,
  };
};
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Lưu state đơn lẻ | Gom nhóm logic vào Custom Hook | React Hooks Era | Tái sử dụng logic, UI sạch hơn |
| Gọi API trực tiếp | Dùng model/service layer | Luôn luôn | Dễ dàng thay đổi nguồn dữ liệu (mock vs real) |

## Assumptions Log

| # | Claim | Section | Risk if Wrong |
|---|-------|---------|---------------|
| A1 | Sử dụng `makeId(10)` cho ID | Code Examples | Khả năng trùng ID thấp nhưng có thể xảy ra trong môi trường lớn |
| A2 | Định dạng ngày lưu ISO String | KhoaHoc.Record | Cần thống nhất với component hiển thị (DatePicker) |

## Environment Availability

| Dependency | Required By | Available | Version | Fallback |
|------------|------------|-----------|---------|----------|
| Node.js | Build & Dev | ✓ | 22.17.1 | — |
| npm/yarn | Package Management | ✓ | — | — |
| localStorage | Data Persistence | ✓ | — | — |

## Validation Architecture

### Test Framework
| Property | Value |
|----------|-------|
| Framework | Jest (via Umi) |
| Quick run command | `npm run test` |

### Phase Requirements → Test Map
| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| REQ-01 | Định nghĩa đúng interface | Unit (Type check) | `npm run tsc` | ❌ |
| REQ-02 | CRUD hoạt động với localStorage | Unit | `npm run test` | ❌ |

## Sources

### Primary (HIGH confidence)
- `src/hooks/useInitModel.tsx` - Phương thức và cấu trúc model tiêu chuẩn.
- `package.json` - Phiên bản thư viện và cấu hình dự án.
- `src/utils/utils.ts` - Các hàm tiện ích có sẵn.

### Secondary (MEDIUM confidence)
- `src/services/DanhMuc/ChucVu/typing.d.ts` - Mẫu định nghĩa interface.

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Trực tiếp từ codebase.
- Architecture: HIGH - Dựa trên mẫu có sẵn trong dự án.
- Pitfalls: MEDIUM - Dựa trên kinh nghiệm và yêu cầu logic đặc thù.

**Research date:** 2024-05-24
**Valid until:** 2024-06-24
