import swal from 'sweetalert';
import { UserPayload } from '../TYPES/user';
import axios from 'axios';

axios.defaults.baseURL = 'https://organic-bucket-Userion.up.railway.app/';

https: axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] =
  'Bearer ' + localStorage.getItem('token');

axios.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer  ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (config) {
    return config;
  },
  function (error) {
    if (error.response.status === 401) {
      if (localStorage.getItem('token')) localStorage.removeItem('token');
    }
  },
);

function handleError(text: string, description: string) {
  swal({
    title: text,
    text: description,
    icon: 'warning',
    timer: 5000,
  });
}

export const userApi = {
  getUser: async (): Promise<UserPayload[] | undefined> => {
    try {
      const getUser = await axios.get('/user/all', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return getUser.data;
    } catch (err: any) {
      handleError(
        'Erro ao buscar usuários.',
        'Erro ao buscar usuários, tente novamente.',
      );
    }
  },

  getUserById: async (userId: string): Promise<UserPayload | undefined> => {
    try {
      const userid = await axios.get(`/user/find/${userId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return userid.data;
    } catch (err) {
      handleError(
        'Usuário não foi encontrado',
        'Não há um usuário com este id no servidor ',
      );
    }
  },

  createUser: async (user: UserPayload): Promise<UserPayload | undefined> => {
    try {
      const newUser = await axios.post('/user/create', user);
      return newUser.data;
    } catch (err: any) {
      handleError('Erro ao criar o usuário', err.response.data.message);
    }
  },

  updateUser: async (user: UserPayload): Promise<UserPayload | undefined> => {
    try {
      const updateUser = await axios.patch('/user/update/', user, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return updateUser.data;
    } catch (err: any) {
      handleError('Erro ao editar o usuário', err.response.data.message);
    }
  },

  deleteUser: async (userId: string): Promise<boolean | undefined> => {
    try {
      const deleteUser = await axios.delete(`/user/delete/${userId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      if (deleteUser.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao deletar o usuário',
        'Ocorreu um erro, tente novamente mais tarde',
      );
    }
  },

  activateUser: async (
    userId: string,
  ): Promise<boolean | undefined> => {
    try {
      const activateUser = await axios.patch(
        `/user/${userId}/activate`,
        null,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );
      if (activateUser.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao ativar o usuário.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },

  deactivateUser: async (
    userId: string,
  ): Promise<boolean | undefined> => {
    try {
      const deactivateUser = await axios.patch(
        `/user/${userId}/deactivate`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      );
      if (deactivateUser.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao desativar o usuário.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },
};
