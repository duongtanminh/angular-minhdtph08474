import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { StudentService } from "../student.service";

@Component({
  selector: 'app-students-list',
  templateUrl: './students-list.component.html',
  styleUrls: ['./students-list.component.css']
})
export class StudentsListComponent implements OnInit {

  constructor(
    private studentService: StudentService,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {}
  studentsData = [];
  mtId = null;
  ngOnInit() {
    this.activeRoute.paramMap.subscribe(params => {
      let motelId = params.get("motelId");
      this.mtId = motelId;
      this.studentService.getStudentsByMotelId(motelId).subscribe(data => {
        console.log(data);
        this.studentsData = data;
      });
    });
  }

}