import { DashboardMachineActivity } from '../../../../core/models/dashboard.model';

export const DUMMY_MACHINE_ACTIVITY: DashboardMachineActivity = {
    label: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00'],
    machine_list: [
        {
            machine_name: 'Front 3',
            data: [
                -1, 1, 2, 2, 2, 1, 0, 1, 2
            ],
        },
        {
            machine_name: 'Front 1, 2',
            data: [1, 2, 1, 0, 1, 1, 2, 0, 2],
        },
        {
            machine_name: 'Rear 3',
            data: [2, 2, 2, 2, 1, 0, 1, 1, 2,],
        },
        {
            machine_name: 'Rear 4',
            data: [
                -1, 1, 2, 2, 2, 1, 0, 1, 2
            ],
        },
        {
            machine_name: 'GA',
            data: [1, 2, 1, 0, 1, 1, 2, 0, 2],
        },
        {
            machine_name: 'Rear 2',
            data: [2, 2, 2, 2, 1, 0, 1, 1, 2],
        },
        {
            machine_name: 'Laser',
            data: [
                -1, 1, 2, 2, 2, 1, 0, 1, 2,
            ],
        },
        {
            machine_name: 'BORRING',
            data: [1, 2, 1, 0, 1, 1, 2, 0, 2],
        },
        {
            machine_name: 'Permanent Handling',
            data: [2, 2, 2, 2, 1, 0, 1, 1, 2],
        },
    ],
};
