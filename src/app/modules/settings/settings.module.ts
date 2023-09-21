import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingListComponent } from './setting-list/setting-list.component';
import { SettingContainerComponent } from './setting-container/setting-container.component';
import { SettingUpsertComponent } from './setting-upsert/setting-upsert.component';
import { BreadcrumbsComponent } from "../../shared/breadcrumbs/breadcrumbs.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatSortModule } from "@angular/material/sort";
import { PaginatorComponent } from "../../shared/paginator/paginator.component";
import { MatSelectModule } from "@angular/material/select";
import { MatInputModule } from "@angular/material/input";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { StringPipe } from "../../shared/pipes/string.pipe";


@NgModule({
    declarations: [
        SettingListComponent,
        SettingContainerComponent,
        SettingUpsertComponent
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BreadcrumbsComponent,
        MatSortModule,
        PaginatorComponent,
        NgOptimizedImage,
        MatSelectModule,
        MatInputModule,
        MatSlideToggleModule,
        StringPipe,
    ],
})
export class SettingsModule {
    
}
