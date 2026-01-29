import * as yup from 'yup'
import { VALIDATION } from '@shared/constants/validation'
import type { Grade } from '@shared/constants/grade'
import type { Department } from '@shared/constants/department'
import type { Currency } from '@shared/constants/currency'
import type { Language } from '@shared/constants'

const catalogItemSchema = yup.object({
    uuid: yup.string().required(),
    title: yup.string().required(),
})

export const createRequestSchema = yup
    .object({
        project_name: yup.string().required(VALIDATION.REQUIRED_FIELD).max(50, VALIDATION.MAX_50_CHARACTERS),
        customer_id: catalogItemSchema.nullable().notRequired(),
        intermediary_id: catalogItemSchema.nullable().notRequired(),
        domain: yup.string().required(VALIDATION.REQUIRED_FIELD),
        rate: yup
            .number()
            .typeError(VALIDATION.NUMBER)
            .positive(VALIDATION.POSITIVE_NUMBER)
            .required(VALIDATION.REQUIRED_FIELD),
        rate_currency: yup.string<Currency>().required(VALIDATION.REQUIRED_FIELD),
        expected_duration: yup
            .number()
            .typeError(VALIDATION.NUMBER)
            .positive(VALIDATION.POSITIVE_NUMBER)
            .required(VALIDATION.REQUIRED_FIELD),
        location_id: catalogItemSchema
            .test('check-uuid-title', VALIDATION.REQUIRED_FIELD, function (values) {
                const { uuid, title } = values
                if (!uuid || !title) {
                    return this.createError({ path: 'location_id', message: VALIDATION.REQUIRED_FIELD })
                }
                return true
            })
            .required(VALIDATION.REQUIRED_FIELD),
        language: yup.string<Language>().required(VALIDATION.REQUIRED_FIELD),
        job_requirements: yup.string().notRequired().nullable(),
        grade: yup.string<Grade>().required(VALIDATION.REQUIRED_FIELD),
        department: yup.string<Department>().required(VALIDATION.REQUIRED_FIELD),
        developers_count: yup
            .number()
            .transform((value: number, originalValue: string) => (originalValue === '' ? null : value))
            .typeError(VALIDATION.NUMBER)
            .integer(VALIDATION.INTEGER)
            .min(1, VALIDATION.AT_LEAST_ONE)
            .notRequired()
            .nullable(),
        is_internal_acquisition_channel: yup.boolean().required(VALIDATION.REQUIRED_FIELD),
        description: yup.string().notRequired().nullable(),
        //desired_people: yup.array().of(catalogItemSchema).ensure().required().nullable(),
    })
    .test('customer_id', function (values) {
        const { customer_id, intermediary_id } = values
        if (!customer_id?.uuid && !intermediary_id?.uuid) {
            return this.createError({
                path: 'customer_id',
                message: 'Either "customer" or "intermediary" must be provided.',
            })
        }
        return true
    })
    .required()

export const editRequestSchema = createRequestSchema.shape({
    rate: yup.number().typeError(VALIDATION.NUMBER).positive(VALIDATION.POSITIVE_NUMBER).notRequired(),
    rate_currency: yup.string<Currency>().notRequired(),
})
