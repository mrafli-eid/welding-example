export interface MasterLine {
    id: string;
    name: string;
    created_at: string;
}

export interface MasterRobot {
    id: string;
    name: string;
    machine_id: string;
    name_machine: string;
    description: string;
    created_at: string;
    updated_at: string;
}[]

export interface MasterSubject {
    selected?: boolean;    
    id: string;
    name: string;
    vid: string;
    created_at: string;
}

export interface registerMachineList {
    machine_id: string;
    subject_id: string[]
}

export interface MasterMachineRobot {
    id: string;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

export interface MasterMachine {
    id: string;
    name: string;
    created_at: string;
}
export interface registerMachine {
    id: string;
    name: string;
    created_at: string;
}

export interface MasterMachineLine {
    selected?: boolean;
    id: string;
    name: string;
    created_at: string;
}

export interface MasterParams {
    search_term: string;
    page_number: number;
    page_size: number;
    order_by: string;
}

export interface RegisterMachine {
    id: string;
    name: string;
    created_at: string;
}
