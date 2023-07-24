import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

export const RANGE_PRESET_OPTIONS = {
    DEFAULT: 'default',
    DAY: 'day',
    MONTH: 'month',
    YEAR: 'year',
};

@Component({
    selector: 'ahm-date-range-preset',
    templateUrl: './date-range-preset.component.html',
    styleUrls: [ './date-range-preset.component.scss' ],
    standalone: true,
    imports: [ CommonModule ],
})
export class DateRangePresetComponent implements OnInit {

    rangePresetList: string[] = [
        RANGE_PRESET_OPTIONS.DEFAULT,
        RANGE_PRESET_OPTIONS.DAY,
        RANGE_PRESET_OPTIONS.MONTH,
        RANGE_PRESET_OPTIONS.YEAR,
    ];

    @Input() selectedRangePreset = '';
    @Input() hideDayPreset = false;
    @Output('onSelectedRangePreset') onSelectedRangePresetEmitter = new EventEmitter();

    onSelectedRangePreset(selected: string) {
        this.onSelectedRangePresetEmitter.emit(selected);
    }

    ngOnInit() {
        if (this.hideDayPreset) {
            this.rangePresetList.splice(0, 1);
        }
    }
}
