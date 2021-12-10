import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HabitListComponent } from './habit-list/habit-list.component';
import { HabitItemComponent } from './habit-item/habit-item.component';
import { HabitFormComponent } from './habit-form/habit-form.component';
import { OAuthModule } from 'angular-oauth2-oidc';
import { AuthConfigModule } from 'src/config/auth.config.module';

@NgModule({
  imports: [BrowserModule, ReactiveFormsModule,
    HttpClientModule,
    AuthConfigModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls: ['http://localhost:3001/api'],
        sendAccessToken: true
      }
    })],
  declarations: [
    AppComponent,
    HabitListComponent,
    HabitItemComponent,
    HabitFormComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
