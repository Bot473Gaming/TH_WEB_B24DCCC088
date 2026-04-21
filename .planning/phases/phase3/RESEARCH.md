# Phase 3: Tích hợp & Kiểm tra - Research

**Researched:** 2024-05-23
**Domain:** Chart Integration & Menu Refactoring
**Confidence:** HIGH

## Summary
Phase 3 tập trung vào việc hoàn thiện module Quản lý khóa học bằng cách bổ sung biểu đồ thống kê và sắp xếp lại cấu trúc menu theo dạng submenu để đảm bảo tính tổ chức và dễ mở rộng. Hệ thống đã có sẵn các component biểu đồ dựa trên ApexCharts (`src/components/Chart/`), cần tích hợp dữ liệu từ `useQuanLyKhoaHocModel` vào các biểu đồ này.

## Architectural Responsibility Map
| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| Data Visualization | Client (React) | — | Biểu đồ được render tại client sử dụng dữ liệu từ localStorage |
| Menu Navigation | Frontend Server (Config) | — | Cấu trúc menu được định nghĩa trong `config/routes.ts` |

## Standard Stack
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `react-apexcharts` | ^1.4.1 | Render biểu đồ | Thư viện chuẩn trong base project |
| `antd` | 4.21.0 | UI Components | Framework UI chính của dự án |

## Architecture Patterns
### Cấu trúc menu đề xuất (config/routes.ts)
Để đạt tiêu chí "Chia menu, submenu rõ ràng", cần chuyển route `QuanLyKhoaHoc` từ đơn lẻ sang có `routes` con:
- `/quan-ly-khoa-hoc/danh-sach`: Danh sách khóa học.
- `/quan-ly-khoa-hoc/thong-ke`: Thống kê biểu đồ.

### Tổ chức File
- Di chuyển `src/pages/QuanLyKhoaHoc/index.tsx` hiện tại sang `src/pages/QuanLyKhoaHoc/DanhSach.tsx`.
- Tạo mới `src/pages/QuanLyKhoaHoc/ThongKe.tsx` để chứa các biểu đồ.

## Don't Hand-Roll
- Sử dụng `DonutChart` và `ColumnChart` có sẵn trong `src/components/Chart/`.
