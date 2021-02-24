import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class BasketService {
  header: HttpHeaders;
  constructor(public http: HttpClient) {}
  add(course) {
    let url = "/basket/listrayen/";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    course.mailbasket = localStorage.getItem("mail");
    console.log(course);

    return this.http.post(url, course, { headers: this.header });
  }
  all() {
    let url = "/basket/listrayen/_search/?size=1000";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    return this.http.get(url, { headers: this.header });
  }
  grab(data, uname) {
    let filtred = [];
    data["hits"]["hits"].forEach((element) => {
      element._source.mailbasket == uname && filtred.push(element._source);
    });
    return filtred;
  }
  grabid(id) {
    this.all().subscribe((data) => {
      data["hits"]["hits"].forEach((element) => {
        if (element._source.id == id) return element._id;
      });
    });
  }
  remove(ids) {
    let body = {
      query: {
        match: {
          id: ids,
        },
      },
    };
    let url = "/basket/listrayen/_delete_by_query";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    return this.http.post(url, body, { headers: this.header });
  }
}
