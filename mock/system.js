import { parse } from 'url';

// mock tableListDataSource
let tableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  tableListDataSource.push({
    operType: `菜单 ${i}`,
    oper: `操作员 ${i}`,
    ip: `10.11.124.6${i}`,
    content: '管理员查询了保单信息',
    operTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
  });
}

//单位列表
let unitTableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  const orgName = i == 0 ? "安徽省老龄健康处" : "合肥市老龄处";
  const upOrg = i == 0 ? null : "安徽省老龄健康处";
  unitTableListDataSource.push({
    oid: `${i}`,
    orgName: orgName,
    orgCode: `34010100000${i}`,
    upOrg: upOrg,
    status: `启用`,
    operTime: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    leader:`李主任`,
    orgType:`李主任`,
    contactAddr:`开元大道111${i}号`,
    index:`1000${i}`,
  });
}

//用户列表

let userTableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  const orgName = i == 0 ? "安徽省老龄健康处" : "合肥市老龄处";
  const upOrg = i == 0 ? null : "安徽省老龄健康处";
  userTableListDataSource.push({
    oid: `${i}`,
    loginName: `ceshi${i}`,
    name: `测试用户${i}`,
    idno: `34010100000${i}`,
    status: `启用`,
    orgName: '合肥老龄处',
    leader:`李主任`,
    orgType:`李主任`,
    contactAddr:`开元大道111${i}号`,
    index:`1000${i}`,
  });
}

function getSysUnit(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = unitTableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function getSysOperLog(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}

function getUserList(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = userTableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource = [];
    status.forEach(s => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(data => parseInt(data.status, 10) === parseInt(s[0], 10))
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = params.pageSize * 1;
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(params.currentPage, 10) || 1,
    },
  };

  return res.json(result);
}


export default {
  'GET /api/sysUnit': getSysUnit,
  'GET /api/sysLog': getSysOperLog,
  'GET /api/user/list.do':getUserList,
};
