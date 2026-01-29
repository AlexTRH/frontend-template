import { Department } from '@shared/constants/department'

export const DepartmentConfig: Record<Department, string> = {
    [Department.BE]: 'BackEnd Engineer (BE)',
    [Department.DE]: 'Data Engineer (DE)',
    [Department.FE]: 'Full Stack (FS)',
    [Department.GO]: 'Golang (GO)',
    [Department.FS]: 'FrontEnd Engineer (FE)',
    [Department.AQA]: 'Automatic Quality Assurance (AQA)',
    [Department.DO]: 'DevOps (DO)',
    [Department.BA]: 'Business Analytics (BA)',
    [Department.UU]: 'UI/UX (UU)',
}
