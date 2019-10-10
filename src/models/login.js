import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import { fakeAccountLoginOut,fakeAccountLogin, getFakeCaptcha } from '@/services/api';
import { setAuthority } from '@/utils/authority';
import { getPageQuery } from '@/utils/utils';
import { reloadAuthorized } from '@/utils/Authorized';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = JSON.parse(yield call(fakeAccountLogin, payload));
      console.log(response);
      console.log(response.data);
      
      yield put({
        type: 'changeLoginStatus',
        payload: response,
      });
      // Login successfully
      console.log(response.status)
      if (response.status === true) {
        console.log("successfully");
        
        console.log(localStorage.getItem("loginToken"));
        reloadAuthorized();
        const urlParams = new URL(window.location.href);
        const params = getPageQuery();
        let { redirect } = params;
        if (redirect) {
          const redirectUrlParams = new URL(redirect);
          if (redirectUrlParams.origin === urlParams.origin) {
            redirect = redirect.substr(urlParams.origin.length);
            if (redirect.match(/^\/.*#/)) {
              redirect = redirect.substr(redirect.indexOf('#') + 1);
            }
          } else {
            redirect = null;
          }
        }
        yield put(routerRedux.replace(redirect || '/'));
      }
    },

    *getCaptcha({ payload }, { call }) {
      yield call(getFakeCaptcha, payload);
    },

    *logout({ payload }, { call,put }) {
      const response = JSON.parse(yield call(fakeAccountLoginOut,payload));
      console.log(response);
      console.log(response.status);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'guest',
        },
      });
      //退出成功
      if (response.status === true) {
        localStorage.removeItem("loginToken");
      }
      reloadAuthorized();
      // redirect
      if (window.location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: window.location.href,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      setAuthority(payload.data.roles?payload.data.roles:'admin');
      localStorage.setItem("loginToken",payload.data.token);
      localStorage.setItem("currentUser",JSON.stringify(payload.data));
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
