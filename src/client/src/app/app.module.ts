import { ApolloModule } from 'apollo-angular';

import { NgModule, Pipe } from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';

import { getClient } from './client';

ApolloModule['decorators'][0].type = NgModule;
ApolloModule['decorators'][0].args[0].declarations[0].decorators[0].type = Pipe;

// Create the client as outlined above


@NgModule({
  imports: [
    BrowserModule,
    ApolloModule.forRoot(getClient)
  ],
  declarations: [ AppComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
