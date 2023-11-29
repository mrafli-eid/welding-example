import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SubjectMachine } from '../../../../core/models/register.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs';
import {
    registerMachine,
    MasterSubject,
    registerMachineList,
} from 'src/app/core/models/master.model';
import { PureService } from 'src/app/core/services/pure.service';
import { RegisterService } from 'src/app/core/services/register.service';
import {
    DUMMY_MACHINE_LIST,
    DUMMY_SUBJECT_LIST,
} from '../../register-subject-machine/register-subject-machine-upsert/register-subject-machine-upsert.dummy';

@Component({
    selector: 'ahm-register-subject-machine-upsert',
    templateUrl: './register-subject-machine-upsert.component.html',
    styleUrls: ['./register-subject-machine-upsert.component.scss'],
})
export class RegisterSubjectMachineUpsertComponent {
    @Input() masterData: SubjectMachine;
    @Output() onSubmit = new EventEmitter();

    machineList: registerMachine[] = DUMMY_MACHINE_LIST;
    subjectList: MasterSubject[] = DUMMY_SUBJECT_LIST;

    notSelectedSubjectList: MasterSubject[] = [];
    selectedSubjectList: MasterSubject[] = [];

    filteredNotSelectedSubjectList: MasterSubject[] = [];
    filteredSelectedSubjectList: MasterSubject[] = [];

    notSelectedFormControl = new FormControl();
    selectedFormControl = new FormControl();

    formGroup: FormGroup = new FormGroup({
        machine_id: new FormControl('', [Validators.required]),
        subject_id: new FormControl(),
    });

    constructor(
        private registerService: RegisterService,
        private pureService: PureService
    ) {}

    ngOnInit() {
        this.initList();
        this.notSelectedFormControl.valueChanges.subscribe(text => {
            this.filteredNotSelectedSubjectList =
                this.notSelectedSubjectList.filter(m =>
                    m.name.toLowerCase().includes(text.toLowerCase())
                );
        });
        this.selectedFormControl.valueChanges.subscribe(text => {
            this.filteredSelectedSubjectList = this.selectedSubjectList.filter(
                m => m.name.toLowerCase().includes(text.toLowerCase())
            );
        });
        this.selectedFormControl.setValue('');
        this.notSelectedFormControl.setValue('');
    }

    ngOnChanges() {
        this.patchValue();
    }

    selectOneMachine(subject: MasterSubject) {
        subject.selected = !subject.selected;
        this.notSelectedSubjectList.find(m => m.id == subject.id).selected =
            subject.selected;
    }

    unselectOneMachine(subject: MasterSubject) {
        subject.selected = !subject.selected;
        this.selectedSubjectList.find(m => m.id == subject.id).selected =
            subject.selected;
    }

    unselectBulk() {
        const selected = this.selectedSubjectList.filter(m => m.selected);
        selected.forEach(m => {
            m.selected = false;
            this.notSelectedSubjectList.push(m);
            const index = this.selectedSubjectList.findIndex(
                o => o.id === m.id
            );
            this.selectedSubjectList.splice(index, 1);
        });
        this.refreshData();
    }

    selectBulk() {
        const selected = this.notSelectedSubjectList.filter(m => m.selected);
        selected.forEach(m => {
            m.selected = false;
            this.selectedSubjectList.push(m);
            const index = this.notSelectedSubjectList.findIndex(
                o => o.id === m.id
            );
            this.notSelectedSubjectList.splice(index, 1);
        });
        this.refreshData();
    }

    selectSubject(index: number) {
        const subject = this.notSelectedSubjectList[index];
        subject.selected = false;
        this.selectedSubjectList.push(subject);
        this.notSelectedSubjectList.splice(index, 1);
        this.refreshData();
    }

    unselectSubject(index: number) {
        const subject = this.selectedSubjectList[index];
        subject.selected = false;
        this.notSelectedSubjectList.push(subject);
        this.selectedSubjectList.splice(index, 1);
        this.refreshData();
    }

    refreshData() {
        this.filteredNotSelectedSubjectList =
            this.notSelectedSubjectList.filter(m =>
                m.name
                    .toLowerCase()
                    .includes(this.notSelectedFormControl.value.toLowerCase())
            );
        this.filteredSelectedSubjectList = this.selectedSubjectList.filter(m =>
            m.name
                .toLowerCase()
                .includes(this.selectedFormControl.value.toLowerCase())
        );
    }

    initList() {
        this.notSelectedSubjectList = this.subjectList.filter(m => true);
        this.pureService.getMachineList().subscribe(resp => {
            this.machineList = resp.data;
        });
        this.pureService.getSubjectList().subscribe(resp => {
            this.subjectList = resp.data;
            this.notSelectedSubjectList = this.subjectList.filter(m => true);
            this.refreshData();
        });
    }

    patchValue() {
        if (this.masterData) {
            this.formGroup
                .get('machine_id')
                .setValue(this.masterData.machine_id);
            const subject_id = [];
            this.masterData.subjects.forEach(m => {
                subject_id.push(m.subject_id);
                const subject = this.notSelectedSubjectList.find(
                    o => o.id === m.subject_id
                );
                if (subject) {
                    subject.selected = true;
                }
            });
            this.selectBulk();
            this.formGroup.get('subject_id').setValue(subject_id);
        }
    }

    submit() {
        this.formGroup.markAllAsTouched();
        if (this.formGroup.valid) {
            const body = this.formGroup.value;

            const subject_id = [];
            this.selectedSubjectList.forEach(m => {
                subject_id.push(m.id);
            });
            body.subject_id = subject_id;

            if (this.masterData) {
                this.edit(body);
            } else {
                this.create(body);
            }
        }
    }

    edit(body: registerMachineList) {
        const id = this.masterData.machine_id;
        this.registerService
            .updateSubjectMachine(id, body)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.finish();
                },
                error: () => {
                    this.finish();
                },
            });
    }

    create(body: registerMachineList) {
        this.registerService
            .createSubjectMachine(body)
            .pipe(take(1))
            .subscribe({
                next: () => {
                    this.finish();
                },
                error: () => {
                    this.finish();
                },
            });
    }

    finish() {
        this.onSubmit.emit();
        this.formGroup.reset();
        this.notSelectedSubjectList = this.subjectList.filter(m => true);
        this.selectedSubjectList = [];
        this.refreshData();
    }
}
