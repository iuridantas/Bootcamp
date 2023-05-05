import swal from 'sweetalert';

import axios from 'axios';
import { ProductPayload } from '../TYPES/product';

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

export const productsApi = {
  getProduct: async (
    franchiseId: string,
  ): Promise<ProductPayload[] | undefined> => {
    try {
      const getProduct = await axios.get(`/product/${franchiseId}/all`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return getProduct.data;
    } catch (err: any) {
      handleError(
        'Erro ao buscar produtos.',
        'Erro ao buscar produtos, tente novamente.',
      );
    }
  },

  getProductById: async (
    productId: string,
  ): Promise<ProductPayload | undefined> => {
    try {
      const productid = await axios.get(`/product/find/${productId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return productid.data;
    } catch (err) {
      handleError(
        'Produto não foi encontrado',
        'Não há um produto com este id no servidor ',
      );
    }
  },

  createProduct: async (
    product: ProductPayload,
  ): Promise<ProductPayload | undefined> => {
    try {
      const newProduct = await axios.post('/product/create', product);
      return newProduct.data;
    } catch (err: any) {
      handleError('Erro ao criar o produto', err.response.data.message);
    }
  },

  updateProduct: async (
    product: ProductPayload,
  ): Promise<ProductPayload | undefined> => {
    try {
      const updateProduct = await axios.patch('/product/update/', product, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      return updateProduct.data;
    } catch (err: any) {
      handleError('Erro ao editar o produto', err.response.data.message);
    }
  },

  deleteProduct: async (productId: string): Promise<boolean | undefined> => {
    try {
      const deleteProduct = await axios.delete(`/product/delete/${productId}`, {
        headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
      });
      if (deleteProduct.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao deletar o produto',
        'Ocorreu um erro, tente novamente mais tarde',
      );
    }
  },

  activateProduct: async (
    productId: string,
  ): Promise<boolean | undefined> => {
    try {
      const activateProduct = await axios.patch(
        `/product/${productId}/activate`,
        null,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        }
      );
      if (activateProduct.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao ativar o produto.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },

  deactivateProduct: async (
    productId: string,
  ): Promise<boolean | undefined> => {
    try {
      const deactivateProduct = await axios.patch(
        `/product/${productId}/deactivate`,
        {
          headers: { Authorization: 'Bearer ' + localStorage.getItem('token') },
        },
      );
      if (deactivateProduct.status === 200) {
        return true;
      }
    } catch (err: any) {
      handleError(
        'Erro ao desativar o produto.',
        'Ocorreu um erro, tente novamente mais tarde.',
      );
    }
  },
};
