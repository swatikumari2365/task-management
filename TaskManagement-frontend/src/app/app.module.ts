import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{ HttpClientModule } from "@angular/common/http"
import { ComponentModule } from './components/component/component.module';
import { AppComponent } from './app.component';





@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,   
    BrowserAnimationsModule,
    ComponentModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
