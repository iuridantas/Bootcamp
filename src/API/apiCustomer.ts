import swal from 'sweetalert';

import axios from 'axios';
import { CustomerPayload } from '../TYPES/customer';

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

export const customerApi = {
  getCustomer: async (
    franchiseId: string,
  ): Promise<CustomerPayload[] | undefined> => {
    try {
      const getCustomer = await axios.get(`/customer/${franchiseId}/all`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return getCustomer.data;
    } catch (err: any) {
      handleError(
        'Erro ao buscar cliente.',
        'Erro ao buscar clientes, tente novamente.',
      );
    }
  },

  getCustomerById: async (
    customerId: string,
  ): Promise<CustomerPayload | undefined> => {
    try {
      const customerid = await axios.get(`/customer/find/${customerId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return customerid.data;
    } catch (err) {
      handleError(
        'Cliente não foi encontrado.',
        'Não há um cliente com este id no servidor. ',
      );
    }
  },

  createCustumer: async (
    customer: CustomerPayload,
  ): Promise<CustomerPayload | undefined> => {
    try {
      const newCostumer = await axios.post('/customer/create', customer, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return newCostumer.data;
    } catch (err: any) {
      handleError('Erro ao criar o cliente.', err.response.data.message);
    }
  },

  updateCustomer: async (
    customer: CustomerPayload,
  ): Promise<CustomerPayload | undefined> => {
    try {
      const updateUser = await axios.patch('/customer/update/', customer, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return updateUser.data;
    } catch (err: any) {
      handleError('Erro ao editar o cliente.', err.response.data.message);
    }
  },

  deleteCustomer: async (customerId: string): Promise<boolean | undefined> => {
    try {
      const deleteCustomer = await axios.delete(
        `/customer/delete/${customerId}`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      );
      if (deleteCustomer.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao deletar o cliente.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },

  activateCustomer: async (
    customerId: string,
  ): Promise<boolean | undefined> => {
    try {
      const activateCustomer = await axios.patch(
        `/customer/${customerId}/activate`,
        null,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );
      if (activateCustomer.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao ativar o cliente.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },

  deactivateCustomer: async (
    customerId: string,
  ): Promise<boolean | undefined> => {
    try {
      const deactivateCustomer = await axios.patch(
        `/customer/${customerId}/deactivate`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      );
      if (deactivateCustomer.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao desativar o cliente.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },
};
