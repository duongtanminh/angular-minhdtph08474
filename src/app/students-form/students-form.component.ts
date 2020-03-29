import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { StudentService } from "../student.service";
import { MotelService } from "../motel.service";

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnInit {

  studentForm: FormGroup;
  motelData = [];
  constructor(
    private studentService: StudentService,
    private motelService: MotelService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      let motelId = params.get("motelId");
      let studentId = params.get("studentId");
      this.studentForm = new FormGroup({
        id: new FormControl(null),
        motelId: new FormControl(motelId),
        name: new FormControl(""),
        roll_number: new FormControl(null),
        avatar: new FormControl(""),
        address: new FormControl(""),
        room_no: new FormControl(null)
      });
      this.motelService.getMotelById(motelId).subscribe(data => {
        console.log(data);
        this.motelData = data;
      });
      if (studentId == null) {
        this.studentService.getStudentsByMotelId(motelId).subscribe(data => {
          this.studentForm.setValue(data);
        });
      } else {
        this.studentService
          .getStudentByMotelId(motelId, studentId)
          .subscribe(data => {
            this.studentForm.setValue(data);
          });
      }
    });
  }
  saveStudent() {
    if (this.studentForm.value.id == null) {
      //add
      this.studentService.addStudent(this.studentForm.value).subscribe(data => {
        let mtId = this.studentForm.value.motelId;
        this.router.navigate(["/detail", mtId]);
      });
    } else {
      //update
      this.studentService.updateStudent(this.studentForm.value).subscribe(data => {
        let mtId = this.studentForm.value.motelId;
        let stId = this.studentForm.value.id;
        this.router.navigate(["/detail", mtId, "student-detail", stId]);
      });
    }
  }

}