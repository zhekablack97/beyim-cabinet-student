export interface GetBulkAssessmentInfoResponseApiType {
  success: boolean
  message: string
  data: GetBulkAssessmentInfoResponseData
}

export interface GetBulkAssessmentInfoResponseData {
  assessments: AssessmentInfo[]
}

export interface AssessmentInfo {
  info: Assessment
}

export interface Assessment {
  id: number
  section_name: string
  section_type_id: number
  question_count: number
  duration: number
  threshold: number
  progress: Progress
  is_available: boolean
}

export interface Progress {
  id: number
  total_score: number
  score: any
  has_passed: any
  duration: number
  section_name: string
  started_at: string
  due: string
  completed_at: any
  percentage: number
}
