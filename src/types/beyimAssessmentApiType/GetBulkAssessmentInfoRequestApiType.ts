import { Locale } from '../common'

export interface GetBulkAssessmentInfoRequestApiType {
  locale: Locale
  sectionIds: number[]
  subjectId: number
}
