export interface RoleList {
    role: string;
}

export interface RoleListUserManagement {
    id: string;
    name: string;
    last_created: string;
}

export interface UserListUserManagement {
    id: string;
    username: string;
    password: string;
    email: string;
    last_created: string;
    role: Array<string>;
}

export interface PermissionListUserManagement {
    username: string;
    role: string;
    email: string;
    permission: string;
    last_created: string;
}

export interface UserManagementUpsertRequest {
    username: string;
    email: string;
    password: string;
    role: Array<string>;
}

export interface RoleManagementUpsertRequest {
    name: string;
}