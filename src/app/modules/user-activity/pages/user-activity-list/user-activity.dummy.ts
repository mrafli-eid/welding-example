import {
    LogTypeList,
    UserActivity,
    UsernameList,
} from 'src/app/core/models/user-activity.model';

export const DUMMY_USER_ACTIVITY_LIST: UserActivity[] = [
    {
        id: '79d37089-dd26-4f0f-a249-ccee67998622',
        username: 'Ade',
        log_type: 'View',
        date_time: '2023-09-08 08:38:27',
    },
    {
        id: '8c1475fb-8ab1-4cb0-a4a8-4ea639995782',
        username: 'Admin',
        log_type: 'View',
        date_time: '2023-08-30 00:26:35',
    },
    {
        id: '66b8f904-b94e-47ba-8d76-54b7d38f5f83',
        username: 'SuperAdmin1',
        log_type: 'View',
        date_time: '2023-08-24 10:00:55',
    },
    {
        id: 'af946cf3-d6bd-45d4-b192-02f5955bc5fe',
        username: 'SuperAdmin1',
        log_type: 'Create',
        date_time: '2023-08-23 10:01:07',
    },
    {
        id: '222cced7-e855-4726-bde5-45bb3ca666ee',
        username: 'Basic',
        log_type: 'Update',
        date_time: '2023-08-22 10:00:55',
    },
];

export const DUMMY_USERNAME_LIST: UsernameList[] = [
    {
        username: 'Ade',
    },
    {
        username: 'Admin',
    },
    {
        username: 'Basic',
    },
    {
        username: 'SuperAdmin1',
    },
];

export const DUMMY_LOG_TYPE_LIST: LogTypeList[] = [
    {
        log_type: 'Create',
    },
    {
        log_type: 'Update',
    },
    {
        log_type: 'View',
    },
];
