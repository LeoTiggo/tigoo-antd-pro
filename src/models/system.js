import { deleteUser,updateUnitInfo,saveOrUpdateUser,queryUserList,querySystemOperLog, queryUnit,queryRule, removeRule, addRule, updateRule } from '@/services/api';

export default {
  namespace: 'system',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchLog({ payload }, { call, put }) {
      console.log("payload"+payload);
      const response = JSON.parse(yield call(querySystemOperLog, payload));
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *fetchUnit({ payload }, { call, put }) {
      console.log("payload"+payload);
      const response = JSON.parse(yield call(queryUnit, payload));
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *fetchUserList({ payload }, { call, put }) {
      console.log("payload"+payload);
      const response = JSON.parse(yield call(queryUserList, payload));
      yield put({
        type: 'save',
        payload: response.data,
      });
    },
    *add({ payload, callback }, { call, put }) {
      const response = yield call(addRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *addUser({ payload, callback }, { call, put }) {
      const response = JSON.parse(yield call(saveOrUpdateUser, payload));
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *userDelete({ payload, callback }, { call, put }) {
      const response = JSON.parse(yield call(deleteUser, payload));
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *remove({ payload, callback }, { call, put }) {
      const response = yield call(removeRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *update({ payload, callback }, { call, put }) {
      const response = yield call(updateRule, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *updateUnit({ payload, callback }, { call, put }) {
      const response = JSON.parse(yield call(updateUnitInfo, payload));
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },

    
    *userUpdate({ payload, callback }, { call, put }) {
      const response = JSON.parse(yield call(saveOrUpdateUser, payload));
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        data: action.payload,
      };
    },
  },
};
