import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  providers:[AdministradorService]
})
export class LoginPage implements OnInit {

  dni;
  password;
  mensaje=false;
  contenido_mensaje="";
  loader=false;
  constructor(
    private router:Router,
    public _administradorService:AdministradorService
  ) { }

  ngOnInit() {
  }

  login(){
    this.loader=true;
    console.log(this.dni);
    console.log(this.password);
    var data_login={
      _dni: this.dni,
      _password: this.password
    };
    this._administradorService.login(data_login).then(data =>{
      var response:any=data;
      if(response.length==2){
        localStorage.setItem('token_admin',response[1]);
        var usuario:any=response[0].body;
        this.contenido_mensaje="";
        this.mensaje=false;
        this.loader=false;
        localStorage.setItem('usuario_admin', JSON.stringify(usuario.data));
        console.log(response);
        this.router.navigate(['/home']);
      }else{
        console.log(response.error);
        this.loader=false;
        this.mensaje=true;
        this.contenido_mensaje=response.error.message;
      }
    })
  }

}
