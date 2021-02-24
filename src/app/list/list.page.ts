import { Component, OnInit } from "@angular/core";
import { NavController, AlertController } from "@ionic/angular";
import { CoursesService } from "../courses.service";

@Component({
  selector: "app-list",
  templateUrl: "./list.page.html",
  styleUrls: ["./list.page.scss"],
})
export class ListPage implements OnInit {
  courses: any;
  curs: any;
  logged: String = "";
  constructor(
    public courseServ: CoursesService,
    public navCtrl: NavController,
    public alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.courseServ.all().subscribe((response) => {
      this.curs = response["hits"]["hits"];
      this.courses = this.curs;
    });

    if (localStorage.getItem("logged") == "true")
      this.logged = localStorage.getItem("username");
    else this.logged = "Login";
  }

  filterCards(type) {
    this.courses = [];
    this.curs.forEach((element) => {
      element._source.type === type && this.courses.push(element);
    });

    if (this.courses.length == 0) {
      this.showalert("No courses available", "Warning");
      this.courses = this.curs;
    }
    // console.log(this.courses.length == 0);
  }

  redirect1() {
    if (localStorage.getItem("logged") == "true")
      this.navCtrl.navigateRoot("panel");
    else this.navCtrl.navigateRoot("home");
  }
  redirect2() {
    if (localStorage.getItem("logged") == "true")
      this.navCtrl.navigateRoot("add");
    else this.navCtrl.navigateRoot("home");
  }
  redirect3() {
    if (localStorage.getItem("logged") == "true")
      this.navCtrl.navigateRoot("mybasket");
  }
  open(course) {
    this.navCtrl.navigateRoot("/course/" + course._id);
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
