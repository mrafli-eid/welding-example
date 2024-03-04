import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { AccountComponent } from './pages/account.component';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
    AccountComponent
  ],
    imports: [
        CommonModule,
        AccountRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule
    ],
})
export class AccountModule {}
