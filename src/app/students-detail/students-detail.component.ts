import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { StudentService } from "../student.service";
import { Observable } from "rxjs";

@Component({
  selector: 'app-students-detail',
  templateUrl: './students-detail.component.html',
  styleUrls: ['./students-detail.component.css']
})
export class StudentsDetailComponent implements OnInit {

  studentData = null;
  constructor(
    private studentService: StudentService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      let motelId = params.get("motelId");
      let studentId = params.get("studentId");
      this.studentService.getDetailStudent(motelId, studentId).subscribe(data => {
        console.log(data);
        this.studentData = data;
      });
    });
  }
  removeClass() {
    let conf = confirm("Bạn có chắc chắn xóa sinh viên này ?");
    if (conf) {
      this.studentService.removeStudent(this.studentData.motelId, this.studentData.id)
        .subscribe(data => {
          let mtid = this.studentData.motelId;
          this.route.navigate(["/detail", mtid]);
        });
    }
  }

}