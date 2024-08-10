import DOC_CATEGORY from './docCategory'

export interface Category {
  key: string
  name: string
}

export const documentFilterOptions: Category[] = [
  {
    key: 'All',
    name: 'Tất cả',
  },
  {
    key: DOC_CATEGORY.BAO_CAO,
    name: 'Báo cáo',
  },
  {
    key: DOC_CATEGORY.CHUONG_TRINH,
    name: 'Chương trình',
  },
  {
    key: DOC_CATEGORY.CONG_VAN,
    name: 'Công văn',
  },
  {
    key: DOC_CATEGORY.HUONG_DAN,
    name: 'Hướng dẫn',
  },
  {
    key: DOC_CATEGORY.KE_HOACH,
    name: 'Kế hoạch',
  },
  {
    key: DOC_CATEGORY.KE_HOACH_LIEN_TICH,
    name: 'Kế hoạch liên tịch',
  },
  {
    key: DOC_CATEGORY.QUYET_DINH,
    name: 'Quyết định',
  },
  {
    key: DOC_CATEGORY.THONG_BAO,
    name: 'Thông báo',
  },
  {
    key: DOC_CATEGORY.THU_MOI,
    name: 'Thư mời',
  },
]

export const documentSelectOptions: Category[] = [
  {
    key: DOC_CATEGORY.BAO_CAO,
    name: 'Báo cáo',
  },
  {
    key: DOC_CATEGORY.CHUONG_TRINH,
    name: 'Chương trình',
  },
  {
    key: DOC_CATEGORY.CONG_VAN,
    name: 'Công văn',
  },
  {
    key: DOC_CATEGORY.HUONG_DAN,
    name: 'Hướng dẫn',
  },
  {
    key: DOC_CATEGORY.KE_HOACH,
    name: 'Kế hoạch',
  },
  {
    key: DOC_CATEGORY.KE_HOACH_LIEN_TICH,
    name: 'Kế hoạch liên tịch',
  },
  {
    key: DOC_CATEGORY.QUYET_DINH,
    name: 'Quyết định',
  },
  {
    key: DOC_CATEGORY.THONG_BAO,
    name: 'Thông báo',
  },
  {
    key: DOC_CATEGORY.THU_MOI,
    name: 'Thư mời',
  },
]

export const documentNameMap = Object.fromEntries(
  documentSelectOptions.map(({ key, name }) => [key, name]),
)
