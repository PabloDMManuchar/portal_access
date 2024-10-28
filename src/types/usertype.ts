export interface UserType {
  cantapprivate: number;
  cantappublic: number;
  diascambiopassword: number;
  diasexpirapassword: number;
  email: string;
  feultimocambiopassword: Date;
  feultimoingreso: Date;
  hab: string;
  idperfil: number;
  idusuario: number;
  nombre: string;
  perfil: string;
  usuario: string;
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
