import { BoughtService } from "./../bought.service";
import { BasketService } from "./../basket.service";
import { CoursesService } from "./../courses.service";
import { NavController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-course",
  templateUrl: "./course.page.html",
  styleUrls: ["./course.page.scss"],
})
export class CoursePage implements OnInit {
  cid: String;
  crs = {
    id: "",
    title: "",
    description: "",
    imageurl: "",
    author: "",
    type: "",
    mailbasket: "",
  };
  logged = false;
  constructor(
    public route: ActivatedRoute,
    public navCtrl: NavController,
    public coursesService: CoursesService,
    public basketsrv: BasketService,
    public bghtsrv: BoughtService
  ) {}

  ngOnInit() {
    console.log(localStorage.getItem("logged"));
    if (localStorage.getItem("logged") === "true") {
      this.logged = true;
    } else this.logged = false;
    this.cid = this.route.snapshot.params.id;
    this.coursesService
      .grab(this.cid)
      .toPromise()
      .then((res) => {
        this.setdata(res);
        console.log(res);
      });
  }

  setdata(data) {
    this.crs.title = data._source.title;
    this.crs.imageurl = data._source.imageurl;
    this.crs.author = data._source.author;
    this.crs.type = data._source.type;
    this.crs.description = data._source.description;
    this.crs.id = data._id;
    let usr = localStorage.getItem("mail");
    this.crs.mailbasket = usr;
  }
  addtobasket() {
    if (localStorage.getItem("mail") != this.crs.author)
      this.basketsrv.add(this.crs).subscribe((res) => {
        alert("Added to your Basket");
        this.navCtrl.navigateRoot("list");
      });
    else
      alert("You can't buy something you already own we don't do that here !");
  }

  buy() {
    if (localStorage.getItem("mail") != this.crs.author) {
      this.bghtsrv.add(this.crs).subscribe((res) => {
        this.navCtrl.navigateRoot("successoperation");
      });
    } else
      alert("You can't buy something you already own we don't do that here !");
  }
}
