import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from '../services/global'

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {

  token=localStorage.getItem('token_admin');
  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  header_token=new HttpHeaders({
    'Content-Type': 'application/json',
    'auth-token': this.token
  });
  url=GLOBAL.url_servidor;
  constructor(
    public http:HttpClient
  ) {}

  login(datos){
    return new Promise(resolve=>{
      this.http.post(this.url+"login-administrador",datos, {headers:this.headers, observe:'response'}).subscribe(data=>{
        if(data.headers.get('Auth-Token')){
          resolve([data ,data.headers.get('Auth-Token')]);
        }else{
          resolve(data);
        }
      },error=>{
        resolve(error);
      }
      )
    })
  }

  listarTrabajadoresAll(){
    return new Promise(resolve=>{
      this.http.get(this.url+"listar-trabajadores",{headers:this.header_token}).subscribe(
        data=>{
          resolve(data);
        },
        error=>{
          resolve(error);
        }
      )
    })
  }

  listarTrabajadoresPorDistrito(distrito){
    return new Promise(resolve=>{
      this.http.get(this.url+"listar-trabajadores-por-distrito/"+distrito,{headers:this.header_token}).subscribe(
        data=>{
          resolve(data);
        },
        error=>{
          resolve(error);
        }
      )
    })
  }

  listarSolicitantesAll(){
    return new Promise(resolve=>{
      this.http.get(this.url+"listar-solicitantes",{headers:this.header_token}).subscribe(
        data=>{
          resolve(data);
        },
        error=>{
          resolve(error);
        }
      )
    })
  }

  listarSolicitantesPorDistrito(distrito){
    return new Promise(resolve=>{
      this.http.get(this.url+"listar-solicitantes-por-distrito/"+distrito,{headers:this.header_token}).subscribe(
        data=>{
          resolve(data);
        },
        error=>{
          resolve(error);
        }
      )
    })
  }

  cambiarEstadoTrabajador(dni){
    return new Promise(resolve=>{
      this.http.put(this.url+"deshabilitar-habilitar-trabajador",dni, {headers:this.header_token}).subscribe(
        data=>{
          resolve(data);
        },
        error=>{
          resolve(error);
        }
    )})
  }

  cambiarEstadoSolicitante(dni){
    return new Promise(resolve=>{
      this.http.put(this.url+"deshabilitar-habilitar-solicitante",dni, {headers:this.header_token}).subscribe(
        data=>{
          resolve(data);
        },
        error=>{
          resolve(error);
        }
    )})
  }

}
