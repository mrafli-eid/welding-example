import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountContainerComponent } from './account-container/account-container.component';
import { AccountProfileComponent } from './account-profile/account-profile.component';
import { AccountChangePasswordComponent } from './account-change-password/account-change-password.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
    declarations: [
        AccountContainerComponent,
        AccountProfileComponent,
        AccountChangePasswordComponent,
    ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
})
export class AccountModule {}
