import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogSuccessLoginComponent } from './dialogs/dialog-success-login/dialog-success-login.component';
import { DialogErrorLoginComponent } from './dialogs/dialog-error-login/dialog-error-login.component';

@NgModule({
    declarations: [
        LoginComponent,
        DialogSuccessLoginComponent,
        DialogErrorLoginComponent,
    ],
    imports: [
        CommonModule,
        LoginRoutingModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatDialogModule,
    ],
})
export class LoginModule {}
