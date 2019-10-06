import { Component, OnInit } from "@angular/core";
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: "app-inicio-sesion",
  templateUrl: "./inicio-sesion.component.html",
  styleUrls: ["./inicio-sesion.component.css"]
})
export class InicioSesionComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {}

  autenticar(proveedor: string) {
    this.authService.iniciarSesion(proveedor);
  }


}
