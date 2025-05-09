export class UserPayload {
    static createUser({
      nome,
      email,
      password,
      administrador,
    }: {
      nome: string;
      email: string;
      password: string;
      administrador: 'true' | 'false';
    }) {
      return {
        nome,
        email,
        password,
        administrador,
      };
    }
  }
  