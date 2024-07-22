import { POST_CATEGORY } from '@/configs/enum'

export const getPostCategoryTitle = (category?: POST_CATEGORY): string => {
  switch (category) {
    case POST_CATEGORY.GIOI_THIEU:
      return 'Giới thiệu'
    case POST_CATEGORY.SINH_VIEN_5_TOT:
      return 'Sinh viên 5 tốt'
    case POST_CATEGORY.CAU_CHUYEN_DEP:
      return 'Câu chuyện đẹp'
    case POST_CATEGORY.TINH_NGUYEN:
      return 'Tình nguyện'
    case POST_CATEGORY.NCKH:
      return 'NCKH'
    case POST_CATEGORY.HO_TRO_SINH_VIEN:
      return 'Hỗ trợ Sinh viên'
    case POST_CATEGORY.XAY_DUNG_HOI:
      return 'Xây dựng Hội'
    default:
      return 'Chưa phân loại'
  }
}
