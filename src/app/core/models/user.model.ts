export interface UserLoginRequest {
    username: string;
    password: string;
}

export interface UserUpsertRequest {
    username: string;
    password: string;
    email: string;
    roles: string[];
}

export interface UserLoginResponse {
    accessToken: string;
    refreshToken: string;
}
