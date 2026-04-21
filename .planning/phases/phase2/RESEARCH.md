# Phase 2: Phát triển UI & Components - Research

**Researched:** 2024-05-23
**Domain:** Frontend UI / Ant Design / TinyMCE
**Confidence:** HIGH

## Summary
Nghiên cứu tập trung vào việc áp dụng các component dùng chung (`TableBase`, `TinyEditor`, `MyDatePicker`) vào module Quản lý khóa học. Cấu trúc trang sẽ tuân thủ pattern của các trang hiện có như `ChucVu` và `RandomUser`.

## Architectural Responsibility Map
| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Hiển thị danh sách | Browser | - | Sử dụng `TableBase` để render dữ liệu từ localStorage |
| Soạn thảo nội dung | Browser | - | Tích hợp `TinyEditor` (TinyMCE) |
| Validation dữ liệu | Browser | - | Sử dụng rules của Ant Design Form |

## Standard Stack
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| antd | 4.21.0 | UI Components | Thư viện chính của dự án |
| @tinymce/tinymce-react | 4.2.0 | HTML Editor | Hỗ trợ soạn thảo mô tả khóa học |
| moment | 2.29.1 | Date handling | Dùng cho MyDatePicker |

## Architecture Patterns
- **TableBase Pattern:** Sử dụng `TableBase` để tự động hóa việc hiển thị, phân trang và lọc dữ liệu.
- **Custom Model Integration:** Model `useQuanLyKhoaHocModel` sẽ được truy cập thông qua `useModel('useQuanLyKhoaHocModel')` của Umi.

## Common Pitfalls
- **TinyEditor Reset:** Giá trị của TinyEditor đôi khi không tự reset khi Form reset. Cần đảm bảo `destroyOnClose` trong Modal hoặc xử lý thủ công trong `useEffect`.
- **LocalStorage Sync:** Vì dữ liệu lưu ở localStorage, cần gọi lại `getModel` sau mỗi thao tác CRUD để đảm bảo UI đồng bộ.
