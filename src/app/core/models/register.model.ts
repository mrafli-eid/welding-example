export interface SubjectMachine {
    machine_id: string;
    machine_name: string;
    created_at: string;
    subjects: {
        subject_id: string;
        subject_name: string;
    }[];
}

export interface MachineLine {
    line_id: string;
    line_name: string;
    created_at: string;
    machines: {
        machine_id: string;
        machine_name: string;
    }[];
}
