export interface MaintenancePreventive {
    id: string;
    name: string;
    plan: string;
    start_date: string;
    actual: string;
    end_date: string;
    machine_id: string;
    machine_name: string;
    ok?: boolean;
}

export interface MaintenancePreventiveChart {
    machine_name: string;
    actual: number;
    plan: number;
    label: string;
    date_time: string;
}
