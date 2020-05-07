import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { StudentService } from "../student.service";
import { MotelService } from "../motel.service";

@Component({
  selector: "app-students-form",
  templateUrl: "./students-form.component.html",
  styleUrls: ["./students-form.component.css"]
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
        name: new FormControl("", [
          Validators.required,
          Validators.minLength(4)
        ]),
        roll_number: new FormControl(null, [Validators.required]),
        avatar: new FormControl("", [
          Validators.required,
          Validators.pattern(/\.(gif|jpe?g|tiff|png|webp|bmp)s/i)
        ]),
        address: new FormControl("", [
          Validators.required,
          Validators.minLength(7)
        ]),
        room_no: new FormControl(null, [Validators.required])
      });

      this.motelService.getMotels().subscribe(data => {
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
  get name() {
    return this.studentForm.get("name");
  }
  get roll_number() {
    return this.studentForm.get("roll_number");
  }
  get avatar() {
    return this.studentForm.get("avatar");
  }
  get address() {
    return this.studentForm.get("address");
  }
  get room_no() {
    return this.studentForm.get("room_no");
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
      this.studentService
        .updateStudent(this.studentForm.value)
        .subscribe(data => {
          let mtId = this.studentForm.value.motelId;
          let stId = this.studentForm.value.id;
          this.router.navigate(["/detail", mtId, "student-detail", stId]);
        });
    }
  }
}
