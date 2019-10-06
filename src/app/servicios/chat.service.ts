import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

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

  constructor(private afs: AngularFirestore) {}

  cargarMensajes() {
    this.itemsCollection = this.afs.collection<Mensaje>("chats");

    return this.itemsCollection.valueChanges().pipe(
      map((mensajes: Mensaje[]) => {
        console.log(mensajes);
        this.chats = mensajes;
      })
    );
  }

  agregarMensaje(text: string) {
    let mensaje : Mensaje = {
      nombre: 'John',
      mensaje: text,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }
}
