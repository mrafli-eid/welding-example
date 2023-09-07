import {
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    Input,
    OnChanges,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { DatepickerCalendarV2Component } from './datepicker-calendar-v2/datepicker-calendar-v2.component';
import { DateFilter } from '../../core/models/date-filter.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { getDefaultDateFilter } from '../../core/consts/datepicker.const';
import { untilDestroyed } from '../../core/helpers/rxjs.helper';
import { RANGE_PRESET_OPTIONS } from '../datepicker/date-range-preset/date-range-preset.component';

@Component({
    selector: 'ahm-datepicker',
    templateUrl: './datepicker-v2.component.html',
    styleUrls: [ './datepicker-v2.component.scss' ],
    standalone: true,
    imports: [
        CommonModule,
        PortalModule,
        DatepickerCalendarV2Component,
        FormsModule,
        ReactiveFormsModule,
    ]
})
export class DatepickerV2Component implements OnInit, OnChanges {
    untilDestroyed = untilDestroyed();
    private  overlayRef!: OverlayRef;
    @ViewChild(CdkPortal) public  contentTemplate!: CdkPortal;
    @ViewChild('btn') private btn: ElementRef;

    @Input() dateFilter: DateFilter = null;
    @Output() dateChanged = new EventEmitter<DateFilter>();

    formGroup = new FormGroup({
        start: new FormControl(),
        end: new FormControl(),
        startTime: new FormControl(),
        endTime: new FormControl({ value: null, disabled: true}),
        startDate: new FormControl(),
        endDate: new FormControl( { value: null, disabled: true}),
        realtime: new FormControl(true),
        type: new FormControl('default'),
    });
    realtime = true;

    showing = false;

    dateTypeList = ['day', 'week', 'month', 'year'];

    @Input() hideDayPreset = false;


    constructor(private overlay: Overlay,) {}

    ngOnInit() {
        this.addRealtimeListener();
        if (!this.dateFilter) {
            const todayDateFilter = getDefaultDateFilter();
            this.initTemp(todayDateFilter);
        } else {
            if (!this.dateFilter.start) {
                this.dateFilter.start = new Date();
            }
            if (!this.dateFilter.end) {
                this.dateFilter.end = new Date();
            }
            this.initTemp(this.dateFilter);
        }
    }

    ngOnChanges() {
        if (this.hideDayPreset) {
            this.dateTypeList = ['default', 'week', 'month', 'year'];
        } else {
            this.dateTypeList = ['default','day', 'week', 'month', 'year'];
        }
    }

    addRealtimeListener() {
        this.formGroup.get('realtime')
            .valueChanges
            .pipe(this.untilDestroyed())
            .subscribe((val) => {
                this.realtime = val;
                if (val) {
                    this.formGroup.get('endTime').disable();
                    this.formGroup.get('endDate').disable();
                    const dateNow = getDefaultDateFilter();
                    this.formGroup.patchValue({
                        endTime: moment(dateNow.end).format('HH:mm'),
                        endDate: moment(dateNow.end).format('DD/MM/YYYY')
                    });
                } else{
                    this.formGroup.get('endTime').enable();
                    this.formGroup.get('endDate').enable();
                }
            });
    }

    initTemp(dateFilter: DateFilter) {
        const start = dateFilter.start;
        const end = dateFilter.end;
        this.formGroup.patchValue({
            start: dateFilter.start,
            end: dateFilter.end,
            startTime: moment(start).format('HH:mm'),
            endTime: moment(end).format('HH:mm'),
            startDate: moment(start).format('DD/MM/YYYY'),
            endDate: moment(end).format('DD/MM/YYYY'),
            type: dateFilter?.type || 'default'
        })
    }

    openDatepicker() {
        this.overlayRef = this.overlay.create(this.getOverlayConfig());
        this.overlayRef.attach(this.contentTemplate);
        this.overlayRef.backdropClick().subscribe(() => this.hide());
        this.showing = true;
    }

    private getOverlayConfig(): OverlayConfig {
        const positionStrategy = this.overlay
            .position()
            .flexibleConnectedTo(this.btn.nativeElement)
            .withPush(true)
            .withPositions([
                {
                    originX: 'start',
                    originY: 'bottom',
                    overlayX: 'start',
                    overlayY: 'top',
                    offsetY: 4,
                },
                {
                    originX: 'start',
                    originY: 'top',
                    overlayX: 'start',
                    overlayY: 'bottom',
                    offsetY: -4,
                },
            ]);

        const scrollStrategy = this.overlay.scrollStrategies.reposition();
        return new OverlayConfig({
            positionStrategy: positionStrategy,
            scrollStrategy: scrollStrategy,
            hasBackdrop: true,
            backdropClass: 'cdk-overlay-transparent-backdrop',
        });
    }

    private  hide(): void {
        this.overlayRef.detach();
        this.showing = false;
    }

    selectType(type: string) {
        this.formGroup.get('type').setValue(type);
    }

    shortcutToday() {
        if (!this.isDay()) { return; }

        const todayDateFilter = {
            start: moment(new Date()).set('hour', 0).set('minute', 0).set('second', 0).toDate(),
            end: new Date(),
            type: RANGE_PRESET_OPTIONS.DAY,
            realtime: true,
        };
        this.initTemp(todayDateFilter);
    }

    shortcutLast30Days() {
        if (!this.isDay()) { return; }

        const now = moment(new Date()).set('h',0).set('minute',0).set('second',0).toDate();
        const dateFilter: DateFilter = {
            start: moment(now).subtract(30, 'day').toDate(),
            end: moment(now).set('h',23).set('minute',59).set('second',59).toDate(),
            realtime: true,
            type: 'day',
        };
        this.initTemp(dateFilter);
    }

    shortcutLast90Days() {
        if (!this.isDay()) { return; }

        const now = moment(new Date()).set('h',0).set('minute',0).set('second',0).toDate();
        const dateFilter: DateFilter = {
            start: moment(now).subtract(90, 'day').toDate(),
            end: moment(now).set('h',23).set('minute',59).set('second',59).toDate(),
            realtime: true,
            type: 'day',
        };
        this.initTemp(dateFilter);
    }

    shortcutLastYear() {
        if (!this.isDay()) { return; }

        const now = moment(new Date()).set('h',0).set('minute',0).set('second',0).toDate();
        const dateFilter: DateFilter = {
            start: moment(now).subtract(365, 'day').toDate(),
            end: moment(now).set('h',23).set('minute',59).set('second',59).toDate(),
            realtime: true,
            type: 'day',
        };
        this.initTemp(dateFilter);
    }

    onSelectedDate(formControlName: string, value: Date) {
        this.formGroup.get(formControlName).setValue(moment(value).toDate());
        this.formGroup.get(formControlName+'Date').setValue(moment(value).format('DD/MM/YYYY'));
        this.formGroup.get(formControlName+'Time').setValue(moment(value).format('HH:mm'));
    }

    apply() {
        const formValue = this.formGroup.getRawValue();
        const dateFilter: DateFilter = {
            start: moment(formValue.startDate + ' ' +formValue.startTime, 'DD/MM/YYYY hh:mm').toDate(),
            end: moment(formValue.endDate + ' ' +formValue.endTime, 'DD/MM/YYYY hh:mm').toDate(),
            type: formValue.type,
            realtime: formValue.realtime,
        };
        this.dateChanged.emit(dateFilter);
        this.showing = false;
        this.hide();
    }

    cancel() {
        this.hide();
    }

    isDay() {
        return this.formGroup.get('type').value === RANGE_PRESET_OPTIONS.DAY;
    }
}
