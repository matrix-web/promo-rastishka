import { defineStore } from 'pinia';
import { useAPIFetch } from '~/composables/useAPIFetch';
import {
  LoginPayload,
  RegistrationPayload,
  User,
  IReceipt,
  IWinnersData,
  Statuses,
} from '~/helpers/interfaces';
import { toast } from 'vue3-toastify';
import Cookies from 'js-cookie';

export const useMainStore = defineStore('main', {
  state: () => ({
    user: null as User | null,
    receipts: null as IReceipt[] | null,
    receiptsTotalCount: 0,
    winners: null as IWinnersData | null,
  }),
  getters: {
    isAuth: (state) => {
      return !!(Cookies.get('token') && state.user !== null);
    },
    isCheckAccept: (state) => {
      return state.receipts?.some(
        (receipt) => receipt.status === Statuses.SUCCESS,
      );
    },
    checkAcceptCount: (state) => {
      return (
        state.receipts?.filter((receipt) => receipt.status === Statuses.SUCCESS)
          .length || 0
      );
    },
  },
  actions: {
    async getUserInfo() {
      const { data, error } = await useAPIFetch<{
        response: {
          user: User;
        };
        success: boolean;
      }>('/user', {
        method: 'GET',
      });

      return new Promise((resolve, reject) => {
        if (data.value) {
          console.log('data', data.value);
          resolve(data.value);
          this.user = data.value.response.user;
        }
        if (error.value) {
          console.log('error', error);
          reject(error);
        }
      });
    },
    async getChecks() {
      const { data, error } = await useAPIFetch<{
        success: boolean;
        response: {
          message: string;
          receipts: IReceipt[];
        };
      }>('/user/receipts', {
        method: 'GET',
      });

      return new Promise((resolve, reject) => {
        if (data.value) {
          console.log('data', data.value);
          resolve(data.value);
          this.receipts = data.value.response.receipts;
          this.receiptsTotalCount = data.value.response.receipts.length || 0;
        }
        if (error.value) {
          console.log('error', error);
          reject(error);
        }
      });
    },
    async login(payload: LoginPayload) {
      const { data, error } = await useAPIFetch('/auth/login', {
        method: 'POST',
        body: payload,
      });

      return new Promise((resolve, reject) => {
        if (data.value) {
          console.log('data', data.value);

          toast('Вход прошел успешно', {
            position: toast.POSITION.BOTTOM_RIGHT,
            type: 'success',
          });

          // @ts-ignore
          Cookies.set('token', data.value.response.token);
          resolve(data.value);
          window.location.reload();
        }
        if (error.value) {
          console.log('error', error);
          toast(error.value?.data.response.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            type: 'error',
          });

          reject(error);
        }
      });
    },
    async logout() {
      Cookies.remove('token');
      window.location.reload();
    },
    async registration(payload: RegistrationPayload) {
      const { data, error } = await useAPIFetch('/auth/register', {
        method: 'POST',
        body: payload,
      });

      return new Promise((resolve, reject) => {
        if (data.value) {
          console.log('data', data.value);

          // @ts-ignore
          toast(data.value.response.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            type: 'success',
          });

          resolve(data.value);
        }
        if (error.value) {
          toast(error.value?.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            type: 'error',
          });

          reject(error);
        }
      });
    },
    async restore(payload: { email: string }) {
      const { data, error } = await useAPIFetch('/forgot', {
        method: 'POST',
        body: payload,
      });

      return new Promise((resolve, reject) => {
        if (data.value) {
          console.log('data', data.value);

          // @ts-ignore
          toast(data.value.response.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            type: 'success',
          });

          resolve(data.value);
        }
        if (error.value) {
          toast(error.value.data.response.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            type: 'error',
          });

          reject(error);
        }
      });
    },
    async checkRegister(payload: FormData) {
      const { data, error } = await useAPIFetch('/user/receipt', {
        method: 'POST',
        body: payload,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return new Promise((resolve, reject) => {
        if (data.value) {
          console.log('data', data.value);

          // @ts-ignore
          toast(data.value.response.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            type: 'success',
          });

          resolve(data.value);
        }
        if (error.value) {
          console.log('error', error);

          toast(error.value.data.message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            type: 'error',
          });

          reject(error);
        }
      });
    },
    async getWinners(page: number, email?: string) {
      const { data, error } = await useAPIFetch<IWinnersData>('/winners', {
        method: 'GET',
        query: email
          ? {
              page,
              email,
            }
          : {
              page,
            },
      });

      return new Promise((resolve, reject) => {
        if (data.value) {
          console.log('data', data.value);
          this.winners = data.value;
          resolve(data.value);
        }
        if (error.value) {
          console.log('error', error);
          reject(error);
        }
      });
    },
  },
});
