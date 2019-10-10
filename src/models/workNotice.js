import { deleteWorkReport,saveWorkReport,queryWorkReportList,workTaskHandleDetail,workTaskDetail,saveWorkTask,deleteWorkTask,queryWorkTask,deleteWorkNotice,saveWorkNotice,updateUnitInfo,saveOrUpdateUser,queryUserList,queryWorkNotice, queryUnit,queryRule, removeRule, addRule, updateRule } from '@/services/api';

export default {
  namespace: 'workNotice',

  state: {
    data: {
      list: [],
      pagination: {},
    },
  },

  effects: {
    *fetchNotice({ payload }, { call, put }) {
      console.log("fetchNotice"+payload);
      const response = JSON.parse(yield call(queryWorkNotice, payload));
      console.log(response);
      yield put({
        type: 'queryListsave',
        payload: response.data,
      });
    },
    *fetchWorkTask({ payload }, { call, put }) {
      console.log("payload"+JSON.stringify(payload));
      const response = JSON.parse(yield call(queryWorkTask, payload));
      yield put({
        type: 'queryListsave',
        payload: response.data,
      });
    },
    *fetchWorkTaskDetail({ payload }, { call, put }) {
      console.log("payload"+JSON.stringify(payload));
      const response = JSON.parse(yield call(workTaskDetail, payload));
      yield put({
        type: 'queryListsave',
        payload: response.data,

      });
      if (callback) callback(response);
    },
    *fetchWorkTaskHandleDetail({ payload }, { call, put }) {
      console.log("payload"+JSON.stringify(payload));
      const response = JSON.parse(yield call(workTaskHandleDetail, payload));
      yield put({
        type: 'save',
        payload: response.data,
      });
      if (callback) callback(response);
    }, 
    *fetchReportList({ payload }, { call, put }) {
      console.log("payload"+payload);
      const response = JSON.parse(yield call(queryWorkReportList, payload));
      yield put({
        type: 'queryListsave',
        payload: response.data,
      });
    },
    *addWorkReport({ payload, callback }, { call, put }) {
      const response = yield call(saveWorkReport, payload);
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback();
    },
    *addWorkNotice({ payload, callback }, { call, put }) {
      const response = JSON.parse(yield call(saveWorkNotice, payload));
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *addWorkTask({ payload, callback }, { call, put }) {
      const response = JSON.parse(yield call(saveWorkTask, payload));
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *workNoticeDelete({ payload, callback }, { call, put }) {
      const response = JSON.parse(yield call(deleteWorkNotice, payload));
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *workTaskDelete({ payload, callback }, { call, put }) {
      const response = JSON.parse(yield call(deleteWorkTask, payload));
      yield put({
        type: 'save',
        payload: response,
      });
      if (callback) callback(response);
    },
    *workReportDelete({ payload, callback }, { call, put }) {
      const response = JSON.parse(yield call(deleteWorkReport, payload));
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
