export interface DetailMachine {
    machine_name: string;
    subject_name: string;
    value_stopline: number;
    value_running: number;
    value_idle: number;
    date_time: string;
}

export interface DetailMachineAlarm {
    machine_name: string;
    subject_name: string;
    robot_name: string;
    data: {
        value: number;
        label: string;
        date_time: string;
    }[];
}

export interface DetailMachinePressLoad {
    machine_name: string;
    subject_name: string;
    vid: string;
    value_smir: number;
    value_mmr: number;
    label: string;
    date_time: string;
}

export interface DetailMachineActivityMachine {
    machine_name: string;
    subject_name: string;
    data: {
        value_stop: number;
        value_run: number;
        value_idle: number;
        label: string;
    }[];
}

export interface DetailMachineHistoryAlarm {
    machine_name: string;
    robot_name: string;
    vid: string;
    value: string;
    description: string;
    act_date: string;
}

export interface DetailMachineDescription {
    description: string;
}

export interface DetailMachineHistoryAlarmParams {
    search_term: string;
    page_number: number;
    page_size: number;
    description: string;
    act_date: any;
}

export interface DetailMachineCnbLubOilPressure {
    machine_name: string;
    subject_name: string;
    message: string;
    vid: string;
    value: number;
    label: string;
    date_time: string;
}

export interface DetailMachineProductionGraph {
    machine_name: string;
    subject_name: string;
    data: {
        value: number;
        label: string;
        date_time: string;
    }[];
}

export interface DetailMachineActualMaintenance {
    machine_name: string;
    category: string;
    start_date: string;
    end_date: string;
    actual: string;
}

export interface DetailMachineActualMaintenanceParams {
    search_term: string;
    page_number: number;
    page_size: number;
    start_date: any;
    end_date: any;
    actual: string;
}

export interface DetailMachineLubOilPressure {
    machine_name: string;
    subject_name: string;
    message: null;
    vid: string;
    value: number;
    label: string;
    date_time: string;
}

export interface DetailMachineRunningHour {
    machine_name: string;
    subject_name: string;
    robot_name: string;
    maximum: number | null;
    vid?: string;
    data: {
        machine_name?: string;
        value: number;
        label: string;
        date_time: string;
        message: string | null;
    }[];
}

export interface DetailMachineAmpereAndVoltage {
    machine_name: string;
    subject_name?: string;
    robot_name?: string;
    minimum: number | null;
    maximum: number | null;
    data_actual: {
        actual: number;
    }[];
    data_setting: {
        setting?: number;
    }[];
    data_label: {
        label: string;
        message?: string;
        date_time?: string;
    }[];
}

export interface DetailMachineServoLoad {
    machine_name: string;
    subject_name?: string;
    robot_name?: string;
    maximum: number | null;
    medium: number | null;
    minimum: number | null;
    average: number | null;
    vid?: string;
    data: {
        machine_name?: string;
        value: number;
        label: string;
        date_time: string;
        message: string;
    }[];
}

export interface DetailMachineTemperatureMirror {
    machine_name: string;
    subject_name: string;
    unit: null;
    maximum: number | null;
    minimum: number | null;
    medium: number | null;
    lower_limit: number | null;
    upper_limit: number | null;
    label: number | null;
    data_tamp_one: {
        value: number;
    }[];
    data_tamp_two: {
        value: number;
    }[];
    data_label: {
        machine_name?: string;
        label: string;
        message: string | null;
        date_time: string;
    }[];
}

export interface DetailMachineRpmSpindle {
    machine_name: string;
    subject_name: string;
    unit: string;
    maximum: number | null;
    minimum: number | null;
    medium: number | null;
    lower_limit: number | null;
    upper_limit: number | null;
    label: number | null;
    data_rpm_a: {
        value: number;
    }[];
    data_rpm_b: {
        value: number;
    }[];
    data_label: {
        machine_name?: string;
        label: string;
        message: string | null;
        date_time: string;
    }[];
}

export interface DetailMachineDewPoint {
    machine_name: string;
    subject_name: string;
    unit: string | null;
    maximum: number | null;
    minimum: number | null;
    medium: number | null;
    lower_limit: number | null;
    upper_limit: number | null;
    vid: string | null;
    data: {
        machine_name?: string;
        value: number;
        label: string;
        date_time: string;
        message: string | null;
    }[];
}

export interface DetailMachineRurgeCell {
    machine_name: string;
    subject_name: string;
    unit: string | null;
    maximum: number | null;
    minimum: number | null;
    medium: number | null;
    lower_limit: number | null;
    upper_limit: number | null;
    vid: string | null;
    data: {
        machine_name?: string;
        value: number;
        label: string;
        date_time: string;
        message: string | null;
    }[];
}

export interface DetailMachineSansoMatic {
    machine_name: string;
    subject_name: string;
    unit: string | null;
    maximum: number | null;
    minimum: number | null;
    medium: number | null;
    lower_limit: number | null;
    upper_limit: number | null;
    label: string | null;
    data_sanso_matic_a: {
        value: number;
    }[];
    data_sanso_matic_b: {
        value: number;
    }[];
    data_label: {
        machine_name?: string;
        label: string;
        message: string | null;
        date_time: string;
    }[];
}
