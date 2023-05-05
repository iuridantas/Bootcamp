import swal from 'sweetalert';
import axios from 'axios';
import { LoginResponse, SignIn, UserPayload } from '../TYPES/user';

axios.defaults.baseURL = 'https://organic-bucket-production.up.railway.app/';

https: axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('token');

function handleError(text: string, description: string) {
  swal({
    title: text,
    text: description,
    icon: 'warning',
    timer: 5000,
  });
}

export const loginApi = {
  signIn: async (loginData: SignIn): Promise<LoginResponse | undefined> => {
    try {
      const login = await axios.post('/auth/login', loginData);
      localStorage.setItem('token', login.data.token);
      return login.data;
    } catch (err: any) {
      handleError(
        'Email ou senha incorretos tente novamente',
        err.response.data.message[0],
      );
    }
  },
  auth: async (token: string): Promise<UserPayload | undefined> => {
    try {
      const auth = await axios.get('/auth', {
        headers: { Authorization: 'Bearer ' + token },
      });
      return auth.data;
    } catch (err: any) {
      handleError('token incorreto', err.response.data.message[0]);
    }
  },
};
