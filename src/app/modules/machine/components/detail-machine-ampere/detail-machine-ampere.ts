import { DetailMachineAmpereAndVoltage } from 'src/app/core/models/machine.model';

export const DUMMY_DETAIL_MACHINE_AMPERE: DetailMachineAmpereAndVoltage = {
    machine_name: 'GA',
    subject_name: 'Voltage ROBOT MASTER GA',
    robot_name: 'ROBOT',
    unit: '',
    maximum: 0,
    minimum: 0,
    medium: null,
    lower_limit: 0,
    upper_limit: 0,
    first_data: [
        {
            value: 3432,
        },
        {
            value: 3012,
        },
    ],
    second_data: [
        {
            value: 2032,
        },
        {
            value: 1032,
        },
    ],
    data_label: [
        {
            label: '06:26',
            date_time: '2024-03-15 06:26:15',
        },
        {
            label: '07:26',
            date_time: '2024-03-15 07:26:15',
        },
    ],
};
