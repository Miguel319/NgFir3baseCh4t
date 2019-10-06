import { Component, OnInit } from "@angular/core";
import { ChatService } from "src/app/servicios/chat.service";
import { Mensaje } from "src/app/modelos/mensaje.interface";
import { AuthService } from "src/app/servicios/auth.service";

@Component({
  selector: "app-chat",
  templateUrl: "./chat.component.html",
  styleUrls: ["./chat.component.css"]
})
export class ChatComponent implements OnInit {
  mensaje: string;
  mensajes: Mensaje[];
  elem: any;

  constructor(
    public chatService: ChatService,
    public authService: AuthService
  ) {}

  ngOnInit() {
    this.mensajes = this.chatService.chats;
    this.mensaje = "";
    this.cargarDatos();

    this.elem = document.getElementById("app-mensajes");
  }

  cargarDatos() {
    this.chatService
      .cargarMensajes()
      .subscribe(() =>
        setTimeout(() => (this.elem.scrollTop = this.elem.scrollHeight), 10)
      );
  }

  enviarMensaje() {
    if (this.mensaje.length === 0) return;

    this.chatService
      .agregarMensaje(this.mensaje)
      .then(() => (this.mensaje = ""))
      .catch(err => console.log("Error al enviar ", err + "!"));
  }
}
