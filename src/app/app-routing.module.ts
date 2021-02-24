import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: "home",
    loadChildren: () =>
      import("./home/home.module").then((m) => m.HomePageModule),
  },
  {
    path: "",
    redirectTo: "home",
    pathMatch: "full",
  },
  {
    path: "list",
    loadChildren: () =>
      import("./list/list.module").then((m) => m.ListPageModule),
  },
  {
    path: "add",
    loadChildren: () => import("./add/add.module").then((m) => m.AddPageModule),
  },
  {
    path: "addoredit/:id",
    loadChildren: () => import("./add/add.module").then((m) => m.AddPageModule),
  },
  {
    path: "panel",
    loadChildren: () =>
      import("./panel/panel.module").then((m) => m.PanelPageModule),
  },
  {
    path: "mycourses",
    loadChildren: () =>
      import("./mycourses/mycourses.module").then((m) => m.MycoursesPageModule),
  },
  {
    path: "course/:id",
    loadChildren: () =>
      import("./course/course.module").then((m) => m.CoursePageModule),
  },
  {
    path: "register",
    loadChildren: () =>
      import("./register/register.module").then((m) => m.RegisterPageModule),
  },
  {
    path: "mybasket",
    loadChildren: () =>
      import("./mybasket/mybasket.module").then((m) => m.MybasketPageModule),
  },
  {
    path: "logout",
    loadChildren: () =>
      import("./logout/logout.module").then((m) => m.LogoutPageModule),
  },
  {
    path: "redirector/:id",
    loadChildren: () =>
      import("./redirector/redirector.module").then(
        (m) => m.RedirectorPageModule
      ),
  },
  {
    path: 'successoperation',
    loadChildren: () => import('./successoperation/successoperation.module').then( m => m.SuccessoperationPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
