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
    created_at: string;
}

export interface SettingUpsertRequest {
    machine_name: string;
    subject_name: string;
    unit: string;
    minimum: number;
    medium: number;
    maximum: number;
}
