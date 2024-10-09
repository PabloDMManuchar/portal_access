export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  errores: string[]; // Array de errores, si existen.
  mensaje: string; // Mensaje de la respuesta, como "Usuario Encontrado".
  statuspass: string; // Estado del password, puede ser "OK" u otro.
  token: string; // El token JWT generado.
}
