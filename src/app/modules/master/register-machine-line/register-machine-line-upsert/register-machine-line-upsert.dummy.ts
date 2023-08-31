import { MasterLine, registerMachine} from '../../../../core/models/master.model';

export const DUMMY_LINE_LIST: MasterLine[] = [
    {
        "id": "f744c135-9fd2-43dd-a8e5-56ad9fe20934",
        "name": "LINE 1",
        "created_at": "2023-05-16 09:29:56"
    },
    {
        "id": "3a2954c2-4fb4-4854-93f2-5a69c3f39a12",
        "name": "LINE 2",
        "created_at": "2023-05-16 09:29:56"
    },
    {
        "id": "a2dc825e-7f50-4d89-b8c2-5f4d2fb132ce",
        "name": "LINE 3",
        "created_at": "2023-05-16 09:29:56"
    },
    {
        "id": "18a628f2-356a-4fe7-8823-9f3dbcb3289a",
        "name": "LINE 4",
        "created_at": "2023-05-15 09:29:56"
    }
];

export const DUMMY_MACHINE_LIST: registerMachine[] = [
    {
        "id": "9f303dec-17dd-4ec9-acc7-2da687e6527f",
        "name": "KOMATSU#1",
        "created_at": "2023-04-11 11:44:14"
    },
    {
        "id": "5d67120a-8b29-4788-9ef6-d9166bbc06fb",
        "name": "KOMATSU#2",
        "created_at": "2023-04-11 11:44:14"
    },
    {
        "id": "efbdd36d-0f6f-46bf-9776-c498d36b3590",
        "name": "KOMATSU#3",
        "created_at": "2023-04-11 11:44:14"
    },
    {
        "id": "fc3a6179-f753-48f1-8435-e3b873b234bf",
        "name": "KOMATSU#4",
        "created_at": "2023-04-11 11:44:14"
    },
    {   
        "id": "53554748-2eb5-4821-892d-0d69ec92c406",
        "name": "KOMATSU#5",
        "created_at": "2023-04-11 11:44:14"
    }
];
