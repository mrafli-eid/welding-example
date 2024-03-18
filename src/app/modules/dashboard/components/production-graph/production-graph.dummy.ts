import { DashboardProductionGraph } from '../../../../core/models/dashboard.model';

export const DUMMY_DASHBOARD_PRODUCTION_GRAPH: DashboardProductionGraph = {
    machine_name: 'KOMATSU#1',
    subject_name: 'Production Graph MC 1',
    data: [
        {
            actual: 70,
            plan: 71,
            label: 'Mon',
            date_time: '2023-05-29 00:00:00',
        },
        {
            actual: 80,
            plan: 69,
            label: 'Tue',
            date_time: '2023-05-30 00:00:00',
        },
        {
            actual: 60,
            plan: 43,
            label: 'Wed',
            date_time: '2023-05-30 00:00:00',
        },
        {
            actual: 68,
            plan: 58,
            label: 'Thu',
            date_time: '2023-05-30 00:00:00',
        },
        {
            actual: 62,
            plan: 44,
            label: 'Fri',
            date_time: '2023-05-30 00:00:00',
        },
        {
            actual: 73,
            plan: 71,
            label: 'Sat',
            date_time: '2023-05-30 00:00:00',
        },
        {
            actual: 60,
            plan: 53,
            label: 'Sun',
            date_time: '2023-05-30 00:00:00',
        },
    ],
};
