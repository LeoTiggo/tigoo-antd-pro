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

let noticeTableListDataSource = [];
for (let i = 0; i < 46; i += 1) {
  const orgName = i == 0 ? "安徽省老龄健康处" : "合肥市老龄处";
  const upOrg = i == 0 ? null : "安徽省老龄健康处";
  noticeTableListDataSource.push({
    oid: `${i}`,
    title: `ceshi${i}`,
    releaseDate: `2019-09-30`,
    releaseContent: `<h2 class="ql-align-center"><a href="http://fangjia.2021.cn/fangjiachuxing/1929.html" rel="noopener noreferrer" target="_blank" style="color: rgb(85, 85, 85);"><strong>2019年放假安排时间表（图）</strong></a></h2><p>2019年放假安排时间表（图） 2018放假网为大家带来2019年公休放假时间安排抢先版，亲们可以提前了解下，做好生活出行旅游计划。 具体时间安排（含调休）如下： 2019年元旦时间：2019年1月1日 2019年元旦放假通知：2019年12月30日~1月1日共3天。2019...<a href="http://fangjia.2021.cn/fangjiachuxing/1929.html" rel="noopener noreferrer" target="_blank" style="color: rgb(85, 85, 85);">[查看全文]</a></p>`,
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

function getWorkNotice(req, res, u) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    url = req.url; // eslint-disable-line
  }

  const params = parse(url, true).query;

  let dataSource = noticeTableListDataSource;

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
  // console.log(res.json(result));
  return res.json(result);
}


export default {
  'GET /api/sysUnit': getSysUnit,
  'GET /api/sysLog': getSysOperLog,
  'POST /api/work/notices':getWorkNotice,
};
