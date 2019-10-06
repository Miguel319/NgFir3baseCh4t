import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class AuthService {
 usuario: any = {};

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log("Estado del usuario ", this.usuario);
      if (!user) return;

      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  iniciarSesion(proeedor: string) {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
  }

  cerrarSesion() {
    this.usuario = {};
    this.afAuth.auth.signOut();
  }
}
