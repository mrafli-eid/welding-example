export interface notification {
    value?: number;
    label: string;
    date_time: string;
    machine_name?: string;
    message: string | null;
}[];