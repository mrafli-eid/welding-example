export interface Setting {
    id: string;
    machine_name: string;
    subject_name: string;
    unit: string;
    minimum: number | null;
    upper_limit: number | null;
    lower_limit: number | null;
    medium: number | null;
    maximum: number | null;
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
