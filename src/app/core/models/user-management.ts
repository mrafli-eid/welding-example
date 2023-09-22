export interface UserManagement {
    id: string;
    username: string;
    password: string;
    email: string;
    last_created: string;
    role: Array<string>;
}

export interface UserManagementUpsertRequest {
    username: string;
    email: string;
    password: string;
    role: Array<string>;
}

export interface RolesList {
    id: string;
    name: string;
    last_created: string;
}