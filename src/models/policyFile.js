import { queryPolicyFiles, savePolicyFile,deletePolicyFile} from '@/services/policyFile';

export default {
  namespace: 'policyFile',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchPolicyFiles({ payload }, { call, put }) {
      console.log("fetchNotice"+payload);
      const response = JSON.parse(yield call(queryPolicyFiles, payload));
      console.log(response);
      yield put({
        type: 'queryListsave',
        payload: response.data,
      });
    },
     
    *addPolicyFile({ payload, callback }, { call, put }) {
      const response = yield call(savePolicyFile, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    
    *policyFileDelete({ payload, callback }, { call, put }) {
      const response = JSON.parse(yield call(deletePolicyFile, payload));
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
    queryListsave(state, action) {
      return {
        ...state,
        data: {
          list:action.payload.list,
          pagination: {
            total: action.payload.total,
            pageSize:action.payload.pageSize,
            current: parseInt(action.payload.pageNum) || 1,
          },
        },

      };
    },
  },
};
