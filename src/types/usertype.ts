export interface UserType {
  nombre: string;
  usuario: string;
  avatar: string;
  email: string;
  tipo: "int" | "ext";
  empresa: string;
  sucursal: string;
  area: string;
  perfil: string;
  diasexpirapassword: number;
  feultimocambiopassword: Date;
  feultimoingreso: Date;
  diascambiopassword: number;
  cantapprivate: number;
  cantappublic: number;
  hab: string;
  idperfil: number;
  idempresasucursal: number;
  idarea: number;
  idusuario: number;
  password: string;
}

export interface UsersbyEmpresaSucursal {
  empresa: string;
  sucursal: string;
  cant: number;
  idempresasucursal: number;
}

export interface UsersbyArea {
  area: string;
  cant: number;
  idarea: number;
}

export interface LastEvents {
  fecha: Date;
  usuario: string;
  evento: string;
  idlogseventos: number;
}

export interface CompanyBranchType {
  empresa: string;
  sucursal: string;
  hab: "SI" | "NO";
  idempresasucursal: number;
}

export interface CreateCompanyBranchType {
  empresa: string;
  sucursal: string;
}

export interface UpdateCompanyBranchType {
  idempresasucursal: number;
  empresa: string;
  sucursal: string;
}

export interface AreaType {
  area: string;
  hab: "SI" | "NO";
  idarea: number;
}

export interface CreateAreaType {
  area: string;
}

export interface UpdateAreaType {
  idarea: number;
  area: string;
}

export interface CreateUserType {
  nombre: string;
  usuario: string;
  email: string;
  idempresasucursal: number;
  idarea: number;
  idperfil: number;
  diasexpirapassword: number;
  tipo: string;
}

export interface UpdateUserType {
  idusuario: number;
  email: string;
  idempresasucursal: number;
  idarea: number;
  idperfil: number;
  diasexpirapassword: number;
  tipo: string;
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
