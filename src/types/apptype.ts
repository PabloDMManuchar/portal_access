export interface LinkApp {
  nombre: string;
  descripcion: string;
  grupo: string;
  url: string;
  mostrarimagen: string;
  icon: string;
  src: string;
  type:
    | "public"
    | "private"
    | "powerBiA"
    | "powerBiB"
    | "powerBiC"
    | "desktop"
    | "sugest";
  idaplicaciones: number;
  idusuariogenero: number;
  idusuario: number;
  auth: string;
}

export interface Aplicacion {
  idaplicaciones: number;
  nombre: string;
  descripcion: string;
  grupo: string;
  url: string;
  icon: string;
  src: string; // URL de la imagen
  type: string;
  cantuser: number;
  mostrarimagen: string;
  hab: "SI" | "NO";
  auth: "true" | "false";
  genero: string;
  fechagenero: string;
  modifico: string;
  fechamodifico: string;
  idgrupoaplicaciones: number;
  idusuariogenero: number;
}

export interface CheckUrlApplication {
  url: string;
}

export interface NewAplicacion {
  nombre: string;
  descripcion: string;
  url: string;
  mostrarimagen: string;
  icon: string;
  src: string;
  type: string;
  idgrupoaplicaciones: number;
}

export interface UpAplicacion {
  idaplicaciones: number;
  nombre: string;
  descripcion: string;
  url: string;
  mostrarimagen: string;
  icon: string;
  src: string;
  type: string;
  idgrupoaplicaciones: number;
}

export interface NewAplicacionPrivate {
  nombre: string;
  descripcion: string;
  url: string;
  mostrarimagen: string;
  icon: string;
  src: string;
  type: string;
}

export interface EnabledDisabledApplication {
  idaplicaciones: number;
  nombre: string;
  hab: string;
}

export interface NewGrupo {
  grupo: string;
  descripcion: string;
}

export interface GrupoSelect {
  idgrupoaplicaciones: number;
  grupo: string;
}

export interface Grupo {
  grupo: string;
  descripcion: string;
  hab: string;
  cantapp: number;
  idgrupoaplicaciones: number;
  genero: string;
  fechagenero: string;
  modifico: string;
  fechamodifico: string;
}

export interface GrupoType {}

export interface AuthAppType {
  nombre: string;
  usuario: string;
  auth: string;
  hab: string;
  idaplicaciones: number;
  idusuario: number;
}
