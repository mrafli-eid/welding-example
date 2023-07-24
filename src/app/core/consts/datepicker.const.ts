import { DateFilter } from '../models/date-filter.model';
import { RANGE_PRESET_OPTIONS } from '../../shared/datepicker/date-range-preset/date-range-preset.component';

export function getDefaultDateFilter(): DateFilter {
    return {
        start: null,
        end: null,
        type: RANGE_PRESET_OPTIONS.DEFAULT,
    };
}
