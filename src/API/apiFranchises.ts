import swal from 'sweetalert';
import axios from 'axios';
import { FranchisePayload } from '../TYPES/franchise';

axios.defaults.baseURL = 'https://organic-bucket-production.up.railway.app/';

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

export const franchisesApi = {
  getFranchise: async (): Promise<FranchisePayload[] | undefined> => {
    try {
      const getFranchise = await axios.get('/franchise/all', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return getFranchise.data;
    } catch (err: any) {
      handleError(
        'Erro ao buscar franquia.',
        'Erro ao buscar franquias, tente novamente.',
      );
    }
  },

  getFranchiseByUser: async (): Promise<FranchisePayload[] | undefined> => {
    try {
      const getFranchise = await axios.get('/franchise/user', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return getFranchise.data;
    } catch (err: any) {
      handleError(
        'Erro ao buscar franquia.',
        'Erro ao buscar franquias, tente novamente.',
      );
    }
  },

  getFranchiseById: async (
    franchiseId: string,
  ): Promise<FranchisePayload | undefined> => {
    try {
      const franchiseid = await axios.get(`/franchise/find/${franchiseId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return franchiseid.data;
    } catch (err) {
      handleError(
        'Franquia não foi encontrada.',
        'Não há uma franquia com este id no servidor. ',
      );
    }
  },

  creatFranchise: async (
    franchise: FranchisePayload,
  ): Promise<FranchisePayload | undefined> => {
    try {
      const newFranchise = await axios.post('/franchise/create', franchise, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return newFranchise.data;
    } catch (err: any) {
      handleError('Erro ao criar a franquia', err.response.data.message);
    }
  },

  updateFranchise: async (
    franchise: FranchisePayload,
  ): Promise<FranchisePayload | undefined> => {
    try {
      const updateFranchise = await axios.patch(
        '/franchise/update/',
        franchise,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      );
      return updateFranchise.data;
    } catch (err: any) {
      handleError('Erro ao editar a franquia', err.response.data.message);
    }
  },

  deleteFranchise: async (
    franchiseId: string,
  ): Promise<boolean | undefined> => {
    try {
      const deleteFranchise = await axios.delete(
        `/franchise/delete/${franchiseId}`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      );
      if (deleteFranchise.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao deletar a franquia',
        'Ocorreu um erro, tente novamente mais tarde',
      );
    }
  },

  activateFranchise: async (
    franchiseId: string,
  ): Promise<boolean | undefined> => {
    try {
      const activateFranchise = await axios.patch(
        `/franchise/${franchiseId}/activate`,
        null,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );
      if (activateFranchise.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao ativar a franquia.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },

  deactivateFranchise: async (
    franchiseId: string,
  ): Promise<boolean | undefined> => {
    try {
      const deactivateFranchise = await axios.patch(
        `/franchise/${franchiseId}/deactivate`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      );
      if (deactivateFranchise.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao desativar a franquia.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },
};
