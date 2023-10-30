import { DatepickerCalendarV3Component } from './datepicker-calendar-v3/datepicker-calendar-v3.component';
import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkPortal, PortalModule } from '@angular/cdk/portal';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { DateFilter } from '../../core/models/date-filter.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as moment from 'moment';
import { getDefaultDateFilter } from '../../core/consts/datepicker.const';
import { untilDestroyed } from '../../core/helpers/rxjs.helper';
import { RANGE_PRESET_OPTIONS } from '../datepicker/date-range-preset/date-range-preset.component';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'ahm-datepicker-v3',
  templateUrl: './datepicker-v3.component.html',
  styleUrls: ['./datepicker-v3.component.scss'],
  standalone: true,
  imports: [
      CommonModule,
      PortalModule,
      DatepickerCalendarV3Component,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule
  ]
})
export class DatepickerV3Component implements OnInit, OnChanges {
  untilDestroyed = untilDestroyed();
  private  overlayRef!: OverlayRef;
  @ViewChild(CdkPortal) public  contentTemplate!: CdkPortal;
  @ViewChild('btn') private btn: ElementRef;

  @Input() dateFilter: DateFilter = null;
  @Output() dateChanged = new EventEmitter<DateFilter>();

  formGroup = new FormGroup({
      startTime: new FormControl(),
      customRange: new FormControl(),
      type: new FormControl('day'),
  });
  
  isActiveX3 = false;
  isActiveX6 = false;
  isActiveX12 = false;

  showing = false;

  dateTypeList = ['day', 'week', 'month', 'year'];

  @Input() hideDayPreset = false;


  constructor(private overlay: Overlay,) {}

  ngOnInit() {
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
          this.dateTypeList = ['week', 'month', 'year'];
      } else {
          this.dateTypeList = ['day', 'week', 'month', 'year'];
      }
  }

  initTemp(dateFilter: DateFilter) {
      const start = dateFilter.start;
      const end = dateFilter.end;
      this.formGroup.patchValue({
          startTime: moment(start).format('HH:mm'),
          type: dateFilter?.type || 'day'
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

  setActive(activeOption: string) {
    // Reset all active states to false
    this.isActiveX3 = false;
    this.isActiveX6 = false;
    this.isActiveX12 = false;

    if (activeOption === 'X3') {
      this.isActiveX3 = true;
      // Add your logic for X3 here
    } else if (activeOption === 'X6') {
      this.isActiveX6 = true;
      // Add your logic for X6 here
    } else if (activeOption === 'X12') {
      this.isActiveX12 = true;
      // Add your logic for X12 here
    }
  }

  shortcutToday() {
      if (!this.isDay()) { return; }

      const todayDateFilter = {
          start: moment(new Date()).set('hour', 0).set('minute', 0).set('second', 0).toDate(),
          end: new Date(),
          type: RANGE_PRESET_OPTIONS.DAY,
      };
      this.initTemp(todayDateFilter);
  }

  shortcutLast30Days() {
      if (!this.isDay()) { return; }

      const now = moment(new Date()).set('h',0).set('minute',0).set('second',0).toDate();
      const dateFilter: DateFilter = {
          start: moment(now).subtract(30, 'day').toDate(),
          end: moment(now).set('h',23).set('minute',59).set('second',59).toDate(),
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
          type: formValue.type,
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
