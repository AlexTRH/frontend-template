import type { AnalyticsRate, Email } from '@shared/types'
import type { Grade } from '@shared/constants/grade'
import type { Department } from '@shared/constants'

export type GradePercentage = Partial<Record<Grade, AnalyticsRate>>
export type DepartmentPercentage = Partial<Record<Department, AnalyticsRate>>

export type DashboardGroup = 'Dashboard' | 'Department-Analytics' | 'Employee-Analytics'
export type AnalyticsResponse = GeneralAnalytics | DepartmentsAnalytics | EmployeeAnalytics
export type DepartmentsAnalytics = Partial<Record<Department, DepartmentAnalytics>>

export type GeneralAnalytics = {
    canceled_ratio: AnalyticsRate
    suitable_conversion_rate: AnalyticsRate
    monthly_conversion: Record<string, AnalyticsRate>
    to_interview_conversion: AnalyticsRate
    average_duration_days: AnalyticsRate
    request_grade_percentage: GradePercentage
    interview_grade_percentage: GradePercentage
    request_location_percentage: Record<string, AnalyticsRate>
    request_customer_percentage: Record<string, AnalyticsRate>
    request_intermediary_percentage: Record<string, AnalyticsRate>

    conversion_request: AnalyticsRate
    conversion_request_position: AnalyticsRate
    conversion_interviews: AnalyticsRate
    conversion_rate: AnalyticsRate
    skipped_requests: AnalyticsRate
    non_skipped_requests: AnalyticsRate
}

type DepartmentAnalytics = {
    canceled_ratio: AnalyticsRate
    conversion_rate: AnalyticsRate
    suitable_conversion_rate: AnalyticsRate
    monthly_conversion: Record<string, AnalyticsRate>
    to_interview_conversion: AnalyticsRate
    average_rejection_days: AnalyticsRate
    request_location_percentage: Record<string, AnalyticsRate>
    request_customer_percentage: Record<string, AnalyticsRate>
    request_intermediary_percentage: Record<string, AnalyticsRate>
    request_grade_percentage: GradePercentage
    interview_grade_percentage: GradePercentage
    success_rate_by_type: Record<string, AnalyticsRate>
    avg_feedback_days: AnalyticsRate
    no_feedback_ratio: AnalyticsRate
    avg_interview_stages_per_position: AnalyticsRate

    average_duration_days: AnalyticsRate
    conversion_rate_requests: AnalyticsRate
    skipped_requests: AnalyticsRate
    non_skipped_requests: AnalyticsRate
    rejection_reasons: Record<string, AnalyticsRate>
}

export type EmployeeAnalytics = {
    requests: {
        total: AnalyticsRate
        processing: AnalyticsRate
    }
    request_position_by_status: {
        total: AnalyticsRate
        approved: AnalyticsRate
        rejected: AnalyticsRate
        processing: AnalyticsRate
    }
    interviews: {
        total: AnalyticsRate
        scheduled: AnalyticsRate
        going: AnalyticsRate
        canceled: AnalyticsRate
        pending: AnalyticsRate
        approved: AnalyticsRate
        reject: AnalyticsRate
    }
    request_positions_by_verdict: {
        approved: AnalyticsRate
        rejected: AnalyticsRate
    }
}

export type MetricsQueryParams = { group: DashboardGroup; email?: Email; date_from?: string; date_to?: string }
