import {
    registerMachine,
    MasterSubject,
} from '../../../../core/models/master.model';

export const DUMMY_MACHINE_LIST: registerMachine[] = [
    {
        id: '9f303dec-17dd-4ec9-acc7-2da687e6527f',
        name: 'KOMATSU#1',
        created_at: '2023-04-11 11:44:14',
    },
    {
        id: '5d67120a-8b29-4788-9ef6-d9166bbc06fb',
        name: 'KOMATSU#2',
        created_at: '2023-04-11 11:44:14',
    },
    {
        id: 'efbdd36d-0f6f-46bf-9776-c498d36b3590',
        name: 'KOMATSU#3',
        created_at: '2023-04-11 11:44:14',
    },
    {
        id: 'fc3a6179-f753-48f1-8435-e3b873b234bf',
        name: 'KOMATSU#4',
        created_at: '2023-04-11 11:44:14',
    },
    {
        id: '53554748-2eb5-4821-892d-0d69ec92c406',
        name: 'KOMATSU#5',
        created_at: '2023-04-11 11:44:14',
    },
];

export const DUMMY_SUBJECT_LIST: MasterSubject[] = [
    {
        id: '5eb8e3c4-1edf-41cc-9712-5f9a0dbec478',
        name: 'Activity Machine MC 1',
        vid: '1350,PEC,PEC3,P3PRB0,Komatsu-1,MC-01,STOP',
        created_at: '2023-05-19 23:53:37',
    },
    {
        id: '5e8b396c-9a83-4dc7-8c35-0e71b305fe78',
        name: 'Activity Machine MC 1',
        vid: '1350,PEC,PEC3,P3PRB0,Komatsu-1,MC-01,IDLE',
        created_at: '2023-05-19 23:53:37',
    },
    {
        id: 'd9e8f7a6-b5c4-4d3e-2f1a-9b0c1d2e3f4a',
        name: 'Activity Machine MC 1',
        vid: '1350,PEC,PEC3,P3PRB0,Komatsu-1,MC-01,AUTO',
        created_at: '2023-05-19 23:53:37',
    },
    {
        id: '3f2e1d0c-9b8a-4f5e-6d7c-8b9a0c1d2e3f',
        name: 'Activity Machine MC 2',
        vid: '1350,PEC,PEC3,P3PRB0,Komatsu-2,MC-02,AUTO',
        created_at: '2023-05-19 23:53:37',
    },
    {
        id: '7834fe2d-af7e-4e46-87d2-7541098a4d92',
        name: 'Activity Machine MC 2',
        vid: '1350,PEC,PEC3,P3PRB0,Komatsu-2,MC-02,IDLE',
        created_at: '2023-05-19 23:53:37',
    },
];
