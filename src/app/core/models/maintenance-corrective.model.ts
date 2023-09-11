export interface MaintenanceCorrective {
    id: string;
    name: string;
    start_date: string;
    actual: string;
    end_date: string;
    machine_id: string;
    machine_name: string;
}

export interface MaintenanceCorrectiveChart {
    machine_name: string;
    actual: number;
    plan: number;
    label: string;
    date_time: string;
}

export interface MaintenanceCorrectiveUpsert {
    "name": "INSTALL_FRONT",
    "start_date": "2023-04-11",
    "actual": "Clean MC",
    "end_date": "2023-04-11",
    "machine_id": "9f303dec-17dd-4ec9-acc7-2da687e6527f"
}

