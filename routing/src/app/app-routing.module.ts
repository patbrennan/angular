// this file is "outsourcing" the routing functionality - a best practice for
// more complex routing structures

import { NgModule } from "@angular/core";
// routes import, and add RouterModule to imports in the @NgModule Decorator
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { ServersComponent } from './servers/servers.component';
import { UserComponent } from './users/user/user.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ErrorPageComponent } from "./error-page/error-page.component";
import { ServerResolver } from "./servers/server/server-resolver.service";

// import AuthGuard for use:
import { AuthGuard } from "./auth-guard.service";
import { CanDeactivateGuard } from "./servers/edit-server/can-deactivate-guard.service";

// nested routes:
const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  { path: "users", component: UsersComponent, children: [
    { path: ":id/:name", component: UserComponent }
  ]},
  { path: "servers",
    // insert code/guards you want to apply to this route; will apply to children
    // canActivate: [AuthGuard], 
    canActivateChild: [
      AuthGuard, // able to do both protect single or all child routes
    ],
    component: ServersComponent, 
    children: [
      { path: ":id", 
        component: ServerComponent,
        resolve: {  // resolvers you want to use
          server: ServerResolver  // name/property is up to you
        }
      },
      { path: ":id/edit",
        component: EditServerComponent,
        canDeactivate: [CanDeactivateGuard] // Ng runs guard whenever leaving path
      }
    ]
  },
  // { path: "not-found", component: PageNotFoundComponent },
  
  { path: "not-found",
    component: ErrorPageComponent,
    data: {
      message: "Page not found!" // using static data you want to pass to a route
    }
  },
  
  // wild-card route: catch all paths you don't know, redirectTo.
  // NOTE: ORDER MATTERS. If it was @ top, you would always be redirected!
  { path: "**", redirectTo: "/not-found"}
];

// NOTE: module declarations still need to exist in app.module.ts, not here
@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
    // for dealing w/location strategies when production app server won't render routes correctly:
    // informs web server to only parse part of URL in front of hash tag
    // RouterModule.forRoot(appRoutes, { useHash: true })
  ],
  // from this module, what should I make available for import?
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  
}