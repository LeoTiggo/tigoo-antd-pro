import { stringify } from 'qs';
import request from '@/utils/request';

//政策文件
export async function queryPolicyFiles(params) {
  return request(`/amis-web/age/policy/list.do`, {
    method:'POST',
    data: {
      ...params,
    }
  });
}

export async function savePolicyFile(params) {
  console.log(JSON.stringify(params));
  return request(`/amis-web/age/policy/save.do`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function deletePolicyFile(params) {
  return request('/amis-web/age/policy/del.do', {
    method: 'POST',
    data: {
      oid:params.oid,
      // method: 'post',
    },
  });
}

