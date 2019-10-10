import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return localStorage.getItem("currentUser");
}

export async function queryMenu() {
  // return request('/api/menus');
  return request('/amis-web/uaac/getNavData.do', {
    method: 'POST',
  });
}
