import swal from 'sweetalert';

import axios from 'axios';
import { CallPayload } from '../TYPES/call';

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

export const callsApi = {
  getCalls: async (): Promise<CallPayload[] | undefined> => {
    try {
      const getCall = await axios.get('/call/all', {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return getCall.data;
    } catch (err: any) {
      handleError(
        'Erro ao buscar chat.',
        'Erro ao buscar chats, tente novamente.',
      );
    }
  },
  getCallsFranchise: async (
    franchiseId: string,
  ): Promise<CallPayload[] | undefined> => {
    try {
      const getCall = await axios.get(`/call/${franchiseId}/all`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return getCall.data;
    } catch (err: any) {
      handleError(
        'Erro ao buscar chats.',
        'Erro ao buscar chats, tente novamente.',
      );
    }
  },

  getCallById: async (callId: string): Promise<CallPayload | undefined> => {
    try {
      const callid = await axios.get(`/call/find/${callId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return callid.data;
    } catch (err) {
      handleError(
        'Chat não foi encontrado.',
        'Não há chat com este id no servidor.',
      );
    }
  },

  createCall: async (call: CallPayload): Promise<CallPayload | undefined> => {
    try {
      const newCall = await axios.post('/call/create', call);
      return newCall.data;
    } catch (err: any) {
      handleError('Erro ao criar chats.', err.response.data.message);
    }
  },

  updateCall: async (call: CallPayload): Promise<CallPayload | undefined> => {
    try {
      const updateCall = await axios.patch('/call/update/', call, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return updateCall.data;
    } catch (err: any) {
      handleError('Erro ao editar o chat', err.response.data.message);
    }
  },

  deleteCall: async (callId: string): Promise<boolean | undefined> => {
    try {
      const deleteCall = await axios.delete(`/call/delete/${callId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      if (deleteCall.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao deletar o chat.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },

  activateCall: async (
    callId: string,
  ): Promise<boolean | undefined> => {
    try {
      const activateCall = await axios.patch(
        `/call/${callId}/activate`,
        null,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );
      if (activateCall.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao ativar o chamado.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },

  deactivateCall: async (
    callId: string,
  ): Promise<boolean | undefined> => {
    try {
      const deactivateCall = await axios.patch(
        `/call/${callId}/deactivate`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      );
      if (deactivateCall.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao desativar o chamado.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },
};
