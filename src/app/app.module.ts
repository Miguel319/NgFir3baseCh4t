import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { ChatComponent } from './componentes/chat/chat.component';
import { ChatService } from './servicios/chat.service';
import { InicioSesionComponent } from './componentes/inicio-sesion/inicio-sesion.component';
import { AuthService } from './servicios/auth.service';

@NgModule({
  declarations: [AppComponent, ChatComponent, InicioSesionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, 
    AngularFireAuthModule, 
    FormsModule
  ],
  providers: [ChatService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule {}
