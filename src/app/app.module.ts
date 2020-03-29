import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { AppComponent } from './app.component';
import { StudentsDetailComponent } from './students-detail/students-detail.component';
import { StudentsListComponent } from './students-list/students-list.component';
import { StudentsFormComponent } from './students-form/students-form.component';
import { MotelsFormComponent } from './motels-form/motels-form.component';
import { MotelsDetailComponent } from './motels-detail/motels-detail.component';
import { MotelsListComponent } from './motels-list/motels-list.component';
import { MotelService } from './motel.service';
import { StudentService } from './student.service';

@NgModule({
  imports: [ 
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: "", component: MotelsListComponent },
      { path: "detail/:motelId", component: MotelsDetailComponent },
      {
        path: "detail/:motelId/student-detail/:studentId",
        component: StudentsDetailComponent
      },
      { path: "add-motel", component: MotelsFormComponent },
      { path: "edit-motel/:motelId", component: MotelsFormComponent },
      { path: "add-student/:motelId", component: StudentsFormComponent },
      { path: "edit-student/:studentId/:motelId", component: StudentsFormComponent }
    ])
   ],
  declarations: [ AppComponent, StudentsDetailComponent, StudentsListComponent, StudentsFormComponent, MotelsFormComponent, MotelsDetailComponent, MotelsListComponent ],
  bootstrap:    [ AppComponent ],
  providers: [MotelService, StudentService]
})
export class AppModule { }

