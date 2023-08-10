export interface DetailMachine {
    machine_name: string;
    subject_name: string;
    vid: string;
    value_stopline: number;
    value_running: number;
    value_idle: number;
    value_counter: number;
    value_running_type: string;
    label: string;
    date_time: string;
}

export interface DetailMachineAlarm {
    machine_name: string;
    subject_name: string;
    vid: string;
    value: number;
    label: string;
    date_time: string;
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
    vid: string;
    value: number;
    label: string;
    date_time: string;
}

export interface DetailMachineActualMaintenance {
    machine_name: string;
    category: string;
    plan_date: string;
    actual: string;
    act_date: string;
}

export interface DetailMachineActualMaintenanceParams {
    search_term: string;
    page_number: number;
    page_size: number;
    plan_date: any;
    act_date: any;
    actual: string;
}

export interface DetailMachineLubOilPressure {
    machine_name: string;
    subject_name: string;
    message: null,
    vid: string;
    value: number;
    label: string;
    date_time: string;
}

export interface DetailMachineRunningHour {
  machine_name: string,
  subject_name: string,
  robot_name: string,
  maximum: number | null,
  vid?: string,
  data: {
    value: number,
    label: string,
    date_time?: string,
    message?: string | null,
  }[],
}




