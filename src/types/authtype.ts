export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  errores: string[]; // Array de errores, si existen.
  mensaje: string; // Mensaje de la respuesta, como "Usuario Encontrado".
  statuspass: string; // Estado del password, puede ser "OK" u otro.
  token: string; // El token JWT generado.
  checkacceso: LoginDataUser;
}

export interface LoginDataUser {
  idusuario: number;
  nombre: string;
  usuario: string;
  email: string;
  perfil: string;
  idperfil: number;
  diascambiopassword: number;
  diasexpirapassword: number;
  cantapprivate: number;
  cantappublic: number;
}
