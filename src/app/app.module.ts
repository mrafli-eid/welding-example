import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import Chart from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import { DatefilterInterceptor } from './core/interceptors/datefilter.interceptor';
import { NgChartsModule } from 'ng2-charts';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { registerLocaleData } from '@angular/common';
import localeId from '@angular/common/locales/id';
import { MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { DatepickerV3Component } from './shared/datepicker-v3/datepicker-v3.component';
import { DatepickerCalendarV3Component } from './shared/datepicker-v3/datepicker-calendar-v3/datepicker-calendar-v3.component';

Chart.register(annotationPlugin);
Chart.register(ChartDataLabels);
Chart.defaults.font.family = 'Roboto';
Chart.defaults.color = '#FFFFFF';
Chart.defaults.scale.grid.tickBorderDash = [5, 5];
Chart.defaults.scale.grid.drawTicks = false;
Chart.defaults.scale.grid.tickBorderDashOffset = 0;
Chart.defaults.responsive = true;
Chart.defaults.maintainAspectRatio = false;
Chart.defaults.layout = {
    padding: {
        top: 15,
    },
};
registerLocaleData(localeId, 'id');

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatMenuModule,
        HttpClientModule,
        BrowserAnimationsModule,
        NgChartsModule.forRoot({
            generateColors: false,
            plugins: [],
            defaults: {
                layout: {
                    padding: {
                        top: 15,
                    },
                },
            },
        }),
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: DatefilterInterceptor,
            multi: true,
        },
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                appearance: 'outline',
                floatLabel: 'always',
                subscriptSizing: 'dynamic',
            },
        },
        {
            provide: LOCALE_ID,
            useValue: 'id-ID',
        },
        {
            provide: MAT_SLIDE_TOGGLE_DEFAULT_OPTIONS,
            useValue: {
                color: 'primary',
                disableRipple: true,
            },
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
