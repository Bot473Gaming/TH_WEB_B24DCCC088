# Project State - Quản lý khóa học

**Phase:** Phase 2 Implementation
**Goal:** Build Course List page and Course Form component.

**Progress:**
- [x] Questioning
- [x] Codebase Mapping
- [x] Project Planning (PROJECT.md, REQUIREMENTS.md, ROADMAP.md)
- [x] Phase 1 planning
- [x] Phase 1 implementation
  - [x] 01-01: Setup Types & Constants
  - [x] 01-02: Implement useQuanLyKhoaHocModel
- [x] Phase 2 planning
- [x] Phase 2 implementation
  - [x] 02-01: Build Course List and Course Form (with filtering gap closure)

**Current Focus:** Phase 2.

**Key Decisions:**
- Sử dụng namespace KhoaHoc trong typing.d.ts để quản lý kiểu dữ liệu tập trung.
- Import KhoaHoc type trong constant.ts để giải quyết lỗi namespace không tồn tại khi compile riêng lẻ.
- Sử dụng localStorage với key QUAN_LY_KHOA_HOC_DATA để mô phỏng cơ sở dữ liệu.
- Áp dụng Generics <T extends KhoaHoc.IRecord> để đảm bảo tính linh hoạt và type-safety.
- Mô phỏng phân trang (pagination) và tìm kiếm (searching) trong getModel để tương thích với Table components.
- Sử dụng filterType: 'select' cho cột Giảng viên và Trạng thái để cải thiện trải nghiệm người dùng.
- Logic lọc tập trung tại model useQuanLyKhoaHocModel để đảm bảo tính nhất quán.

**Performance Metrics:**
| Phase | Plan | Duration | Tasks | Files |
|-------|------|----------|-------|-------|
| phase1 | 01-01 | 15m | 2 | 2 |
| phase1 | 01-02 | 15m | 2 | 1 |
| phase2 | 02-01 | 30m | 2 | 2 |

**Last session:** 2025-03-24T11:00:00Z - Completed phase2-01 (including Gap Closure for filtering)
**Stopped At:** None
**Resume File:** None
