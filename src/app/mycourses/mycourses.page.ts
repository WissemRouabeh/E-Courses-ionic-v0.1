import { BoughtService } from "./../bought.service";
import { NavController } from "@ionic/angular";
import { AuthenticationService } from "./../authentication.service";
import { CoursesService } from "./../courses.service";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-mycourses",
  templateUrl: "./mycourses.page.html",
  styleUrls: ["./mycourses.page.scss"],
})
export class MycoursesPage implements OnInit {
  mycourses: any;
  mycurss: any;
  mycurss1: any;
  usr: String = "";
  constructor(
    public auth: AuthenticationService,
    public courseServ: CoursesService,
    public navCtrl: NavController,
    public bghtsrv: BoughtService
  ) {}

  ngOnInit() {
    this.usr = localStorage.getItem("mail");
    console.log(this.usr);
    this.courseServ.all().subscribe((res) => {
      this.retrieve(res["hits"]["hits"], this.usr);
    });
    this.bghtsrv.all().subscribe((res) => {
      this.retrieve2(res["hits"]["hits"], this.usr);
    });
  }
  retrieve(mycourses, usr) {
    this.mycurss = [];
    mycourses.forEach((element) => {
      //element._source.author === usr && this.mycurss.push(element);
      if (element._source.author === usr) {
        element.me = false;
        this.mycurss.push(element);
      }
    });
  }
  retrieve2(mycourses, usr) {
    this.mycurss1 = [];
    mycourses.forEach((element) => {
      //element._source.mailbasket === usr && this.mycurss1.push(element);
      if (element._source.mailbasket === usr) {
        element.me = true;
        this.mycurss1.push(element);
      }
    });
    this.mycurss = this.mycurss.concat(this.mycurss1);
  }
  remove(course) {
    let id = course._id;
    if (localStorage.getItem("mail") == course._source.author) {
      this.courseServ.remove(id).subscribe((res) => {});
      alert("Deleted course where id = " + id);
      this.navCtrl.navigateRoot("list");
    } else alert("You can't delete course that not yours !");
  }
  edit(course) {
    if (localStorage.getItem("mail") == course._source.author)
      this.navCtrl.navigateRoot("/addoredit/" + course._id);
    else alert("You can't modify course that not yours !");
  }
  open(course) {
    this.navCtrl.navigateRoot("/course/" + course._id);
  }
  disabled(string) {
    if (string == true) return true;
    else return false;
  }
}
