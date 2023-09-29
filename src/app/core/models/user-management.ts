export interface UserList {
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

export interface RolesManagementUpsertRequest {
    name: string;
}



export interface RoleList {
    id: string;
    name: string;
    last_created: string;
}