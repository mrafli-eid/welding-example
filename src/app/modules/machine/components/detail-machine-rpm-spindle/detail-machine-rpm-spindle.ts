import { DetailMachineRpmSpindle } from '../../../../core/models/machine.model';

export const DUMMY_DETAIL_MACHINE_RPM_SPINDLE: DetailMachineRpmSpindle = {
    machine_name: 'BORING',
    subject_name: 'RPM A Borring',
    unit: null,
    maximum: null,
    minimum: null,
    medium: null,
    lower_limit: null,
    upper_limit: null,
    label: null,
    data_rpm_a: [
        {
            value: 24,
        },
        {
            value: 3,
        },
        {
            value: 40,
        },
        {
            value: 15,
        },
        {
            value: 50,
        },
        {
            value: 30,
        },
        {
            value: 55,
        },
    ],
    data_rpm_b: [
        {
            value: 70,
        },
        {
            value: 50,
        },
        {
            value: 75,
        },
        {
            value: 55,
        },
        {
            value: 80,
        },
        {
            value: 70,
        },
        {
            value: 90,
        },
    ],
    data_label: [
        {
            label: 'Mon',
            message: null,
            date_time: '2023-08-15 20:27:46',
        },
        {
            label: 'Tue',
            message: null,
            date_time: '2023-08-15 20:27:46',
        },
        {
            label: 'Wed',
            message: null,
            date_time: '2023-08-15 20:27:46',
        },
        {
            label: 'Thu',
            message: null,
            date_time: '2023-08-15 20:27:46',
        },
        {
            label: 'Fri',
            message: 'Maximum Rpm Spindle(A1 & B1)',
            date_time: '2023-08-15 20:27:46',
        },
        {
            label: 'Sat',
            message: 'Maximum Rpm Spindle(A1 & B1)',
            date_time: '2023-08-15 20:27:46',
        },
        {
            label: 'Sun',
            message: null,
            date_time: '2023-08-15 20:27:46',
        },
    ],
};
