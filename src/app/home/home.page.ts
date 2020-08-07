import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AdministradorService } from '../services/administrador.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [AdministradorService]
})
export class HomePage {

  distrito="all";
  tipo_usuario="trabajador";
  usuarios:any=[];
  //solicitantes:any=[];
  loader=false;
  change_state:any={};
  empty_mensaje=false;
  constructor(
    private menu: MenuController,
    private router:Router,
    private _administradorService:AdministradorService
  ) {}

  ionViewWillEnter(){
    this.distrito="all";
    this.tipo_usuario="trabajador";
    this.listarTrabajadorAll();
  }

  listar(){
    this.usuarios=[];
    if(this.tipo_usuario=="trabajador"){
      if(this.distrito=="all"){
        this.listarTrabajadorAll();
      }else{
        this.listarTrabajadorPorDistrito();
      }
    }else{
      if(this.distrito=="all"){
        this.listarSolicitanteAll();
      }else{
        this.listarSolicitantesPorDistrito();
      }
    }
  }

  listarTrabajadorAll(){
    this.loader=true;
    this._administradorService.listarTrabajadoresAll().then(
      data=>{
        var response:any=data;
        if(response.code==200){
          console.log(data);
          this.empty_mensaje=false;
          this.usuarios=response.data;
          for (let i = 0; i < this.usuarios.length; i++) {
            this.usuarios[i].nombre=this.usuarios[i].nombre.toLowerCase();
            this.usuarios[i].apellidoPaterno=this.usuarios[i].apellidoPaterno.toLowerCase();
            this.usuarios[i].apellidoMaterno=this.usuarios[i].apellidoMaterno.toLowerCase();
          }
          this.loader=false;
        }else{
          this.empty_mensaje=true;
          localStorage.clear();
          this.loader=false;
          this.router.navigate(['/login']);
        }
      },
      error=>{
        console.log(<any>error);
        localStorage.clear();
        this.loader=false;
        this.router.navigate(['/login']);
      }
    )
  }

  listarTrabajadorPorDistrito(){
    this.loader=true;
    this._administradorService.listarTrabajadoresPorDistrito(this.distrito).then(
      data=>{
        console.log(data);
        var response:any=data;
        if(response.code==200){
          console.log(data);
          this.empty_mensaje=false;
          this.usuarios=response.data;
          for (let i = 0; i < this.usuarios.length; i++) {
            this.usuarios[i].nombre=this.usuarios[i].nombre.toLowerCase();
            this.usuarios[i].apellidoPaterno=this.usuarios[i].apellidoPaterno.toLowerCase();
            this.usuarios[i].apellidoMaterno=this.usuarios[i].apellidoMaterno.toLowerCase();
          }
          this.loader=false;
        }else{
          this.empty_mensaje=true;
          this.loader=false;
        }
      },
      error=>{
        console.log(<any>error);
      }
    )
  }

  listarSolicitanteAll(){
    this.loader=true;
    this._administradorService.listarSolicitantesAll().then(
      data=>{
        var response:any=data;
        if(response.code==200){
          console.log(data);
          this.empty_mensaje=false;
          this.usuarios=response.message;
          for (let i = 0; i < this.usuarios.length; i++) {
            this.usuarios[i].nombre=this.usuarios[i].nombre.toLowerCase();
            this.usuarios[i].apellidoPaterno=this.usuarios[i].apellidoPaterno.toLowerCase();
            this.usuarios[i].apellidoMaterno=this.usuarios[i].apellidoMaterno.toLowerCase();
          }
          this.loader=false;
        }else{
          this.empty_mensaje=true;
          this.loader=false;
        }
      },
      error=>{
        this.loader=false;
        console.log(<any>error);
      }
    )
  }

  listarSolicitantesPorDistrito(){
    this.loader=true;
    console.log("listando");
    this._administradorService.listarSolicitantesPorDistrito(this.distrito).then(
      data=>{
        var response:any=data;
        if(response.code==200){
          console.log(data);
          this.empty_mensaje=false;
          this.usuarios=response.data;
          for (let i = 0; i < this.usuarios.length; i++) {
            this.usuarios[i].nombre=this.usuarios[i].nombre.toLowerCase();
            this.usuarios[i].apellidoPaterno=this.usuarios[i].apellidoPaterno.toLowerCase();
            this.usuarios[i].apellidoMaterno=this.usuarios[i].apellidoMaterno.toLowerCase();
          }
          this.loader=false;
        }else{
          this.empty_mensaje=true;
          this.loader=false;
        }
      },
      error=>{
        this.loader=false;
        console.log(<any>error);
      }
    )
  }

  cambiarEstado(index, dni){
    this.loader=true;
    this.change_state._dni=dni;
    if(this.tipo_usuario=="trabajador"){
      this._administradorService.cambiarEstadoTrabajador(this.change_state).then(
        data=>{
          console.log(data);
          var response:any=data;
          if(response.code==200){
            this.usuarios[index].flag=false;
            this.loader=false;
          }else{
            this.usuarios[index].flag=true;
            this.loader=false;
          }
        },
        error=>{
          this.usuarios[index].flag=true;
          this.loader=false;
          console.log(<any>error);
        }
      )
    }else{
      this._administradorService.cambiarEstadoSolicitante(this.change_state).then(
        data=>{
          var response:any=data;
          if(response.code==200){
            this.usuarios[index].flag=false;
            this.loader=false;
          }else{
            this.usuarios[index].flag=true;
            this.loader=false;
          }
        },
        error=>{
          this.usuarios[index].flag=true;
          this.loader=false;
        }
      )
    }
  } 

  openMenu() {
    this.menu.enable(true, 'adminmenu');
    this.menu.open('adminmenu');
  }

  goCerrarSesion(){
    this.menu.close('adminmenu');
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
