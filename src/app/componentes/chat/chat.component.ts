import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/servicios/chat.service";
import { Mensaje } from "src/app/modelos/mensaje.interface";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  mensaje: string;
  mensajes: Mensaje[];

  constructor(public chatService: ChatService) {}

  ngOnInit() {
    this.mensajes = this.chatService.chats;
    this.mensaje = "";
    this.cargarDatos();
  }

  cargarDatos() {
    this.chatService.cargarMensajes().subscribe();
  }

  enviarMensaje() {
    if (this.mensaje.length === 0) return;

    this.chatService
      .agregarMensaje(this.mensaje)
      .then(() => (this.mensaje = ""))
      .catch(err => console.log("¡Error al enviar", err));

    ;
  }
}
