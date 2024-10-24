export interface LinkApp {
  idaplicaciones: number;
  url: string;
  mostrarimagen: string;
  icon: string;
  text: string;
  nombre: string;
  src: string;
  type: "public" | "private" | "powerBi" | "add";
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
  hab: boolean;
  genero: string;
  fechagenero: string;
  modifico: string;
  fechamodifico: string;
  idgrupoaplicaciones: number;
  idusuariogenero: number;
}

export interface NewAplicacion {
  nombre: string;
  descripcion: string;
  url: string;
  src: string; // URL de la imagen
  type: string;
  idgrupoaplicaciones: number;
}

export interface NewAplicacionPrivate {
  nombre: string;
  descripcion: string;
  url: string;
  mostrarimagen: string;
  icon: string;
  src: string; // URL de la imagen
}

export interface NewGrupo {
  grupo: string;
  descripcion: string;
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
