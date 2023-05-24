import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginUsuario!: FormGroup; // Agrega el signo de exclamación para indicar que se inicializará más tarde
  returnUrl: any;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit(): void {
    this.loginUsuario = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(form: any) {
    console.log(form);

    if (!form.email) {
      alert('Ingrese su correo electrónico');
      return;
    }
    if (!form.password) {
      alert('Ingrese su contraseña');
      return;
    }

    this.afAuth
      .signInWithEmailAndPassword(form.email, form.password)
      .then((userCredential) => {
        // Si se inició sesión correctamente, redirecciona al usuario a la página deseada
        this.router.navigate(['/crud']);
        localStorage.setItem('isLoggedin', 'true');
        if (localStorage.getItem('isLoggedin')) {
          this.router.navigate([this.returnUrl]);
        }
      })
      .catch((error) => {
        // Si se produjo un error al iniciar sesión, muestra un mensaje de error al usuario
        console.log(error);
        alert(this.firebaseError(error.code));
      });
  }

  firebaseError(errorCode: string): string {
    // Función para mapear los códigos de error de Firebase a mensajes legibles para el usuario
    // Puedes personalizar los mensajes de acuerdo a tus necesidades
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuario no encontrado';
      case 'auth/wrong-password':
        return 'Contraseña incorrecta';
      case 'auth/invalid-email':
        return 'Dirección de correo electrónico inválida';
      case 'auth/user-disabled':
        return 'La cuenta de usuario está deshabilitada';
      case 'auth/email-already-in-use':
        return 'La dirección de correo electrónico ya está en uso';
      case 'auth/operation-not-allowed':
        return 'La operación no está permitida';
      case 'auth/weak-password':
        return 'La contraseña no es lo suficientemente segura';
      case 'auth/credential-already-in-use':
        return 'Las credenciales de inicio de sesión ya están en uso';
      case 'auth/requires-recent-login':
        return 'Se requiere una autenticación reciente';
      case 'auth/provider-already-linked':
        return 'El proveedor ya está vinculado a otra cuenta';
      case 'auth/invalid-credential':
        return 'La credencial proporcionada no es válida';
      case 'auth/invalid-verification-code':
        return 'El código de verificación no es válido';
      case 'auth/invalid-verification-id':
        return 'El ID de verificación no es válido';
      default:
        return 'Bienvenido';
    }
  }
}
