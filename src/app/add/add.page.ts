import { AlertController, NavController } from "@ionic/angular";
import { CoursesrvService } from "./../coursesrv.service";
import { AuthenticationService } from "./../authentication.service";
import { CoursesService } from "./../courses.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { ThrowStmt } from "@angular/compiler";

@Component({
  selector: "app-add",
  templateUrl: "./add.page.html",
  styleUrls: ["./add.page.scss"],
})
export class AddPage implements OnInit {
  img_c: String =
    "https://accordelectrotechnics.in/img/product/no-preview/no-preview.png";
  img_url: String;
  typee: String;
  courseform: FormGroup;
  usr: any;
  editid: String = null;
  crs: any;
  constructor(
    public formBuilder: FormBuilder,
    public auth: AuthenticationService,
    public coursesService: CoursesService,
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.editid = this.route.snapshot.params.id;
    if (this.editid != null) {
      this.coursesService
        .grab(this.editid)
        .toPromise()
        .then((res) => {
          this.setdata(res["_source"]);
        });
    }
    this.auth.signed().subscribe((res) => (this.usr = res["_source"].mail));
    if (this.editid == null) {
      this.courseform = this.formBuilder.group({
        title: ["", [Validators.required, Validators.minLength(1)]],
        description: ["", [Validators.required, Validators.minLength(1)]],
        imageurl: ["", [Validators.required]],
        type: ["Others", Validators.required],
      });
    } else {
      this.courseform = this.formBuilder.group({
        title: ["", [Validators.required, Validators.minLength(1)]],
        description: ["", [Validators.required, Validators.minLength(1)]],
        imageurl: ["", [Validators.required]],

        type: ["Others", Validators.required],
      });
    }
  }
  onFocusOutURL() {
    if (this.isValidImageURL(this.img_url)) this.img_c = this.img_url;
  }
  isValidImageURL(url) {
    // from stackoverflow
    if (typeof url !== "string") return false;
    return !url.match(/\w+\.(jpg|jpeg|gif|png|tiff|bmp)$/gi); //defined tested regex for image url
  }
  addcourse() {
    if (this.courseform.valid) {
      if (this.isValidImageURL(this.img_url)) {
        //alertcntrl
        let msg = " This not an image url";
        this.showalert(msg, "Warning");
      } else if (this.editid == null) {
        console.log(this.courseform.value.option);
        this.courseform.value.author = localStorage.getItem("mail");
        this.coursesService.add(this.courseform.value).subscribe((Response) => {
          //alertcntrl
          let msg = this.courseform.value.title + " has been added !";
          this.showalert(msg, "Success");
          this.navCtrl.navigateRoot("mycourses");
        });
      } else if (this.editid != null) {
        this.courseform.value.author = localStorage.getItem("mail");
        this.coursesService
          .update(this.courseform.value, this.editid)
          .subscribe((Response) => {
            //alertcntrl
            let msg = this.courseform.value.title + " has been updated !";
            this.showalert(msg, "Success");
            this.navCtrl.navigateRoot("mycourses");
          });
      }
    } else alert("Verify your inputs !");
  }
  setdata(data) {
    this.crs = data;
    this.img_url = this.crs.imageurl;
    this.onFocusOutURL();
    this.courseform = this.formBuilder.group({
      title: [this.crs.title, [Validators.required, Validators.minLength(1)]],
      description: [
        this.crs.description,
        [Validators.required, Validators.minLength(1)],
      ],
      imageurl: [this.crs.imageurl, [Validators.required]],
      type: [this.crs.type, [Validators.required]],
    });
  }
  showalert(msg, type) {
    const alert = this.alertCtrl
      .create({
        header: type,
        message: msg,
        buttons: ["Ok!"],
      })
      .then((alert) => alert.present());
  }
}
