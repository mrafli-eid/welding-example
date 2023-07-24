export interface MasterLine {
    id: string;
    name: string;
    created_at: string;
}

export interface MasterSubject {
    id: string;
    name: string;
    vid: string;
    created_at: string;
}

export interface MasterMachine {
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
