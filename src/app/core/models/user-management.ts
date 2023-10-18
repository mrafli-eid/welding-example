export interface RoleList {
    id: string;
    name: string;
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
    id: number;
    user_name: string;
    role_name: string;
    email: string;
    claim_type: string;
    last_created: string;
}

export interface ClaimTypeListUserManagement {
    selected?: boolean;
    id: number;
    claim_type: string;
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

export interface PermissionList {
    role_name: string;
    claim_type: string[];
}