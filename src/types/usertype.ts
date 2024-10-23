export interface UserType {
  nombre: string;
  usuario: string;
  email: string;
  perfil: string;
  diasexpirapassword: number;
  feultimocambiopassword: Date;
  feultimoingreso: Date;
  diascambiopassword: number;
  cantapprivate: number;
  cantappublic: number;
  hab: string;
  idperfil: number;
  idusuario: number;
}

export interface CreateUserType {
  nombre: string;
  usuario: string;
  email: string;
  idperfil: number;
  diasexpirapassword: number;
}

export interface UpdateUserType {
  idusuario: number;
  email: string;
  idperfil: number;
  diasexpirapassword: number;
}

export interface ChangePasswordType {
  idusuario: number;
  oldpassword: string;
  password: string;
}

export interface RefreshPasswordType {
  idusuario: number;
}

export interface DisableUserType {
  idusuario: number;
}

export interface EnableUserType {
  idusuario: number;
}
