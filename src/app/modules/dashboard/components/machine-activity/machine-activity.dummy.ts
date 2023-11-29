import { DashboardMachineActivity } from '../../../../core/models/dashboard.model';

export const DUMMY_MACHINE_ACTIVITY: DashboardMachineActivity = {
    label: [
        '00:10',
        '00:11',
        '00:12',
        '00:13',
        '00:14',
        '00:15',
        '00:16',
        '00:17',
        '00:18',
        '00:19',
        '00:20',
        '00:21',
        '00:22',
        '00:23',
        '00:24',
        '00:25',
        '00:26',
        '00:27',
        '00:28',
        '00:29',
    ],
    machine_list: [
        {
            machine_name: 'FR#1',
            data: [
                -1, 1, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 1, 1, -1, -1, 2, 2, 2, 2,
            ],
        },
        {
            machine_name: 'FR#2',
            data: [1, 2, 1, 0, 1, 1, 2, 0, 2, 2, 2, 2, 1, 2, 2, 1, 1, 0, 0, 2],
        },
        {
            machine_name: 'RR#3',
            data: [2, 2, 2, 2, 1, 0, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 2, 0, 2, 2],
        },
    ],
};
