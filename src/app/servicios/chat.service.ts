import { Injectable } from "@angular/core";
import { map, filter } from "rxjs/operators";
import { AuthService } from './auth.service'


import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Mensaje } from "../modelos/mensaje.interface";
import { auth } from 'firebase';

@Injectable({
  providedIn: "root"
})
export class ChatService {
  chats: Mensaje[] = [];
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    
  }

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>("chats",
      ref => ref.orderBy('fecha', 'desc').limit(10)
    );

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = [];

        for ( let mensaje of mensajes )  {
          this.chats.unshift(mensaje);
        }

        return this.chats;
      })
    );
  }

  agregarMensaje(text: string) {
    let mensaje: Mensaje = {
      nombre: this.authService.usuario.nombre,
      mensaje: text,
      fecha: new Date().getTime(),
      uid: this.authService.usuario.uid
    };

    return this.itemsCollection.add(mensaje);
  }
}
