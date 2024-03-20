export interface Setting {
    id: string;
    machine_name: string;
    subject_name: string;
    unit: string;
    minimum: number;
    upper_limit: number;
    lower_limit: number;
    medium: number;
    maximum: number;
    standard_mttr: number;
    standard_mtbf: number;
    created_at: string;
}

export interface SettingUpsertRequest {
    machine_name: string;
    subject_name: string;
    unit: string | null;
    minimum: number | null;
    medium: number | null;
    maximum: number | null;
}
