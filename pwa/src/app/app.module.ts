import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { ServiceWorkerModule } from '@angular/service-worker'; // official ng SW
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, PostComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    // ngsw-worker.js is created in the dist folder during build
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
