import swal from 'sweetalert';

import axios from 'axios';
import { FinancePayload } from '../TYPES/finance';

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

export const financesApi = {
  getFinance: async (
    franchiseId: string,
  ): Promise<FinancePayload[] | undefined> => {
    try {
      const getFinance = await axios.get(`/finance/${franchiseId}/all`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return getFinance.data;
    } catch (err: any) {
      handleError(
        'Erro ao buscar finanças.',
        'Erro ao buscar finanças, tente novamente.',
      );
    }
  },

  getFinanceById: async (
    financeId: string,
  ): Promise<FinancePayload | undefined> => {
    try {
      const financeid = await axios.get(`/finance/find/${financeId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return financeid.data;
    } catch (err) {
      handleError(
        'Finanças não foram encontradas',
        'Não há finanças com este id no servidor ',
      );
    }
  },

  createFinance: async (
    finance: FinancePayload,
  ): Promise<FinancePayload | undefined> => {
    try {
      const newFinance = await axios.post('/finance/create', finance);
      return newFinance.data;
    } catch (err: any) {
      handleError('Erro ao criar as finanças', err.response.data.message);
    }
  },

  updateFinance: async (
    finance: FinancePayload,
  ): Promise<FinancePayload | undefined> => {
    try {
      const updateFinance = await axios.patch('/finance/update/', finance, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return updateFinance.data;
    } catch (err: any) {
      handleError('Erro ao editar o financeiro', err.response.data.message);
    }
  },

  deleteFinance: async (financeId: string): Promise<boolean | undefined> => {
    try {
      const deleteFinance = await axios.delete(`/finance/delete/${financeId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      if (deleteFinance.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao deletar as finanças',
        'Ocorreu um erro, tente novamente mais tarde',
      );
    }
  },

  activateFinance: async (
    financeId: string,
  ): Promise<boolean | undefined> => {
    try {
      const activateFinance = await axios.patch(
        `/finance/${financeId}/activate`,
        null,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );
      if (activateFinance.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao ativar o financeiro.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },

  deactivateFinance: async (
    financeId: string,
  ): Promise<boolean | undefined> => {
    try {
      const deactivateFinance = await axios.patch(
        `/finance/${financeId}/deactivate`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      );
      if (deactivateFinance.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao desativar o financeiro.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },
};
