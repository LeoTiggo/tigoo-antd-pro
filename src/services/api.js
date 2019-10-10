import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

//政府机构
export async function queryUnit(params) {
  return request(`/amis-web/age/org/list.do`, {
    method:'POST',
    data: {
      ...params,
    }
  });
}

export async function updateUnitInfo(params) {
  console.log(JSON.stringify(params));
  return request(`/amis-web/age/org/saveOrUpdate.do`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


//用户管理
export async function queryUserList(params) {
  // return request(`?${stringify(params)}`);

  return request('/amis-web/age/user/list.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'post',
    },
  });
}
export async function saveOrUpdateUser(params) {
  return request('/amis-web/age/user/saveOrUpdate.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'post',
    },
  });
}
export async function deleteUser(params) {
  return request('/amis-web/age/user/del.do', {
    method: 'POST',
    data: {
      oid:params.oid,
      // method: 'post',
    },
  });
}


//系统日志
export async function querySystemOperLog(params) {
  return request('/amis-web/age/sys/logs.do', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

//通知公告
export async function queryWorkNotice(params) {
  return request('/amis-web/age/work/notice/list.do', {
  // return request('/api/work/notices', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function saveWorkNotice(params) {
  return request('/amis-web/age/work/notice/save.do', {
  // return request('/api/work/notices', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}


export async function deleteWorkNotice(params) {
  return request('/amis-web/age/work/notice/del.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'delete',
    },
  });
}

//工作任务
export async function queryWorkTask(params) {
  return request('/amis-web/age/work/task/list.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'delete',
    },
  });
}


export async function saveWorkTask(params) {
  return request('/amis-web/age/work/task/save.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'delete',
    },
  });
}


export async function workTaskDetail(params) {
  return request('/amis-web/age/work/task/detail.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'delete',
    },
  });
}


export async function workTaskHandleDetail(params) {
  return request('/amis-web/age/work/task/handledetail.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'delete',
    },
  });
}


export async function deleteWorkTask(params) {
  return request('/amis-web/age/work/task/del.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'delete',
    },
  });
}


//工作报告
export async function queryWorkReportList(params) {
  return request('/amis-web/age/work/report/list.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'delete',
    },
  });
}

export async function saveWorkReport(params) {
  return request('/amis-web/age/work/report/save.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'delete',
    },
  });
}


export async function deleteWorkReport(params) {
  return request('/amis-web/age/work/report/del.do', {
    method: 'POST',
    data: {
      ...params,
      // method: 'delete',
    },
  });
}




export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params = {}) {
  return request(`/api/rule?${stringify(params.query)}`, {
    method: 'POST',
    data: {
      ...params.body,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile(id) {
  return request(`/api/profile/basic?id=${id}`);
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    data: {
      ...restParams,
      method: 'update',
    },
  });
}

updateUnitInfo

export async function fakeAccountLogin(params) {
  return request('/amis-web/uaac/login.do', {
    method: 'POST',
    data: params,
  });
}

export async function fakeAccountLoginOut(params) {
  return request('/amis-web/uaac/logout.do', {
    method: 'POST',
    data: params,
  });
}



export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices(params = {}) {
  return request(`/api/notices?${stringify(params)}`);
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}

export async function getFakeKaptcha() {
  return request(`/uaac/kaptcha.do?version=${Math.random()}`);
}
