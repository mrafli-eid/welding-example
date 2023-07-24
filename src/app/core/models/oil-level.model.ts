export interface GeneralData {
    machine_name: string;
    subject_name: string;
    vid: string;
    value?: number;
    actual?: number;
    plan?: number;
    label: string;
    date_time: Date;
}

export interface GeneralChartData {
    machine_name: string;
    subject_name: string;
    vid: string;
    data: {
        value?: number;
        actual?: number;
        plan?: number;
        label: string;
        date_time: Date;
    }[];
}
