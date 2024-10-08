export interface TimeMachineDetail {
    machine_name: string;
    subject_name: string;
    value_stopline: number;
    value_idle: number;
    value_running: number;
    date_time: Date;
}

export interface DashboardMachineActivity {
    label: string[];
    machine_list: {
        machine_name: string;
        data: number[];
        backgroundColor?: string[];
    }[];
}

export interface DashboardOilLevel {
    machine_name: string;
    subject_name: string;
    vid: string;
    data: { value: number; label: string; date_time: string }[];
}

export interface DashboardCycleTime {
    machine_name: string;
    subject_name: string;
    vid: string;
    data: { value: number; label: string; date_time: string }[];
}

export interface DashboardProductionGraph {
    machine_name: string;
    subject_name: string;
    data: { actual: number; plan: number; label: string; date_time: string }[];
}

export interface DashboardGrafikMtbf {
    subject_name: string;
    machine_name: string;
    data: {
        value: number;
        label: string;
        date_time: string;
    }[];
}

export interface DashboardGrafikMttr {
    subject_name: string;
    machine_name: string;
    data: {
        value: number;
        label: string;
        date_time: string;
    }[];
}

export interface DashboardMachineAlarm {
    subject_name: string;
    vid: string | null;
    value: number;
    label: string;
    date_time: string;
    date: string | null;
}

export interface DashboardMttr {
    subject_name: string;
    value: number;
    label: string;
    date_time: string;
}

export interface DashboardMtbf {
    subject_name: string;
    value: number;
    label: string;
    date_time: string;
}

export interface MttrMtbfList {
    id: string;
    mttr: number;
    mtbf: number;
    date_time: string;
    created_at: string;
}
