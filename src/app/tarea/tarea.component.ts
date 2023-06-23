import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  FormGroup,
  FormBuilder,
  AbstractControl,
  Validators,
  NgForm,
} from '@angular/forms';
import { User as FirebaseUser } from 'firebase/auth';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
  styleUrls: ['./tarea.component.css'],
})
export class TareaComponent {
  user: FirebaseUser | null = null; // Update the user type
  photoURL: string | null = null;
  email: string | null = null;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    public formbuilder: FormBuilder
  ) {
    this.afAuth.authState.subscribe((user) => {
      this.user = user as FirebaseUser;
      if (user) {
        this.user = user as FirebaseUser;
        this.photoURL = user.photoURL;
        this.email = user.email;
      }
    });
  }
  logout() {
    this.afAuth
      .signOut()
      .then(() => {
        // Cierre de sesión exitoso
        // Realiza las acciones adicionales que desees, como redirigir al usuario a la página de inicio de sesión
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        // Manejo de errores durante el cierre de sesión
        console.log(error);
      });
  }
}
