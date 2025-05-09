export class LoginPayload {
    static login({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) {
      return {
        email,
        password,
      };
    }
  }
  