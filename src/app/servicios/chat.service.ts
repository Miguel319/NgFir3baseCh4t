import { Injectable } from "@angular/core";
import { map, filter } from "rxjs/operators";

import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Mensaje } from "../modelos/mensaje.interface";

@Injectable({
  providedIn: "root"
})
export class ChatService {
  chats: Mensaje[] = [];
  private itemsCollection: AngularFirestoreCollection<Mensaje>;

  constructor(private afs: AngularFirestore) {
    
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
      nombre: "John",
      mensaje: text,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }
}
