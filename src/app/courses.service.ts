import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class CoursesService {
  header: HttpHeaders;
  constructor(public http: HttpClient) {}
  all() {
    let url = "/courses/courses/_search/?size=1000";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    return this.http.get(url, { headers: this.header });
  }
  add(course) {
    let url = "/courses/courses";
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    console.log(course);
    return this.http.post(url, course, { headers: this.header });
  }
  remove(id) {
    let url = "/courses/courses/" + id;
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    return this.http.delete(url, { headers: this.header });
  }
  grab(id) {
    let url = "/courses/courses/" + id;
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    return this.http.get(url, { headers: this.header });
  }
  update(course, id) {
    let url = "/courses/courses/" + id;
    this.header = new HttpHeaders();
    this.header.append("Content-type", "application/json");
    console.log(course);
    return this.http.post(url, course, { headers: this.header });
  }
}
