import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Form,
  Input,
  Select,
  Icon,
  Button,
  DatePicker,
  Modal,
  message,
  Divider,
  Steps,
  Radio,
  Upload,
  Checkbox,
  notification,
  TreeSelect,
  Row,
  Col,
  Card,
  Table,
  Progress,
} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditTaskInfoForm from '@/components/TaskEdit';
import styles from './List.less';

const { confirm } = Modal;
const FormItem = Form.Item;
const { TextArea } = Input;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const { SHOW_PARENT } = TreeSelect;

@Form.create()
class CreateForm extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    value: '',
    treeValue: undefined,
    treeData: [
      { id: 1, pId: 0, value: '1', title: 'Expand to load' },
      { id: 2, pId: 0, value: '2', title: 'Expand to load' },
      { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
    ],
  };

  genTreeNode = (parentId, isLeaf = false) => {
    const random = Math.random()
      .toString(36)
      .substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? 'Tree Node' : 'Expand to load',
      isLeaf,
    };
  };

  onLoadData = treeNode =>
    new Promise(resolve => {
      const { id } = treeNode.props;
      setTimeout(() => {
        this.setState({
          treeData: this.state.treeData.concat([
            this.genTreeNode(id, false),
            this.genTreeNode(id, true),
          ]),
        });
        resolve();
      }, 300);
    });

  onChange = treeValue => {
    console.log(treeValue);
    this.setState({ treeValue });
  };
  handleChange = (value) => {
    console.log(value)
    // message.info(editor);
    this.setState({
      value,
    });
  };

  prompt = () => {
    notification.open({
      message: 'We got value:',
      description: <span dangerouslySetInnerHTML={{ __html: this.state.value }} />,
    });
  };

  modules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
      ['blockquote', 'code-block'],
      ['link', 'image'],

      [{ 'header': 1 }, { 'header': 2 }],               // custom button values
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
      [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
      [{ 'direction': 'rtl' }],                         // text direction

      // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

      [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
      [{ 'font': [] }],
      [{ 'align': [] }],

      ['clean']                                         // remove formatting button
    ]
  };

  render() {
    const { modalVisible, form, handleAdd, handleModalVisible } = this.props;
    const { value, treeData } = this.state
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
      });
    };
    const plainOptions = ['市级用户', '县级用户', '街道用户', '社区用户', '服务机构'];
    const defaultCheckedList = [];
    const onChangeCheckbox = (checkedList) => {
      this.setState({
        checkedList,
        indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
        checkAll: checkedList.length === plainOptions.length,
      });
    };

    const uploadProps = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };

    const taskNoNew = `T${moment().format('YYYYMMDD') + Math.floor(Math.random() * 1000 + 1)}`;
    return (
      <Modal
        width="60%"
        destroyOnClose
        title="新建工作任务"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        maskClosable={false}
      >
        <Card  bordered={false} >
          
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务编号">
            {form.getFieldDecorator('taskNo', {
              initialValue: taskNoNew,
            })(<span>{taskNoNew}</span>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务标题">
            {form.getFieldDecorator('taskTitle')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem style={{ height: '360px', marginBottom: '10px' }} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="内容">
            {/* {form.getFieldDecorator('releaseContent')( */}
            <ReactQuill
              style={{ height: '250px' }}
              theme="snow"
              modules={this.modules}
              // formats={this.formats}
              value={value}
              className={styles.editContainer}
              onChange={this.handleChange}
              placeholder="请输入"
            />
            {/* )} */}
          </FormItem>

          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="承办单位">
            {form.getFieldDecorator('dealOrg')(
              <TreeSelect
                treeDataSimpleMode
                style={{ width: 300 }}
                // value={this.state.treeValue}
                dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                placeholder="Please select"
                onChange={this.onChange}
                loadData={this.onLoadData}
                treeData={treeData}
                labelInValue
                treeCheckable={true}
                showCheckedStrategy={SHOW_PARENT}
                searchPlaceholder='Please select'
              />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="创建时间">
            {form.getFieldDecorator('createDate')(<DatePicker placeholder="请选择" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="办理时限">
            {form.getFieldDecorator('endDate')(<DatePicker placeholder="请选择" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系电话">
            {form.getFieldDecorator('contactNo')(<Input placeholder="请输入" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="附件">
            {form.getFieldDecorator('files')(
              <Upload {...uploadProps}>
                <Button>
                  <Icon type="upload" /> 上传
            </Button>
              </Upload>)}
          </FormItem>
        </Card>

      </Modal>
    );
  }
}

@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => { },
    handleUpdateModalVisible: () => { },
    values: {},
  };

  constructor(props) {
    super(props);

    this.state = {
      formVals: {
        name: props.values.name,
        desc: props.values.desc,
        key: props.values.key,
        target: '0',
        template: '0',
        type: '1',
        time: '',
        frequency: 'month',
      },
      currentStep: 0,
    };

    this.formLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 13 },
    };
  }

  handleNext = (currentStep,values) => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const {files,note} = fieldsValue;
      const fileList = undefined;
      if (files){
        fileList = files.fileList;
      } 
      const formVals = { ...values, ...oldValue, note,files:fileList };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 2) {
            this.forward();
          } else {
            handleUpdate(formVals);
          }
        }
      );
    });
  };

  backward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep - 1,
    });
  };

  forward = () => {
    const { currentStep } = this.state;
    this.setState({
      currentStep: currentStep + 1,
    });
  };

  renderContent = (currentStep, formVals) => {
    const { form, handleUpdateModalVisible, values, actionFlg } = this.props;
    const { profile = {}, loading } = this.props;
    const { basicGoods = [], basicProgress = [], userInfo = {}, application = {} } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        id: '总计',
        num,
        amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: '办理单位',
        dataIndex: 'orgName',
        key: 'orgName',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: renderContent,
      },
      {
        title: '办理人',
        dataIndex: 'handler',
        key: 'handler',
        render: renderContent,
      },
      {
        title: '办理时间',
        dataIndex: 'handleTime',
        key: 'handleTime',
      },
      {
        title: '说明 ',
        dataIndex: 'note',
        key: 'note',
      },
      {
        title: '附件',
        dataIndex: 'files.',
        key: 'files',
      },
    ];
    const percent = 60;
    return (
      <div>
        <Card bordered={false}>
          <Row>
            <Col span={12} style={{ paddingLeft: 24 }}>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="任务名称">
                <span style={{ width: '100%' }} placeholder="">{values.taskTitle}</span>
              </FormItem>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="任务创建时间">
                <span style={{ width: '100%' }} placeholder="" >{values.createDate}</span>
              </FormItem>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="办理时限">
                <span style={{ width: '100%' }} placeholder="" >{values.endDate}</span>
              </FormItem>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="附件">
                <span style={{ width: '100%' }} placeholder="" >{values.files}</span>
              </FormItem>
            </Col>
            <Col span={1}>
              <Divider type='vertical' style={{ height: '200px', marginBottom: 32 }} />
            </Col>

            <Col span={11}>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务名称">
                <div style={{ width: '100%' }} placeholder="">该任务已进行{values.finishDay}天，距结束时间还剩：<span style={{ fontSize: 24, color: "red" }}>{values.lastDay}</span>天</div>
              </FormItem>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务进度">
                
                <Progress percent={percent} status="active" />
                  
              </FormItem>
            </Col>
          </Row>



          {/* <Divider  orientation="left" style={{ height: 20 }} >退货商品</Divider> */}
          <div className={styles.title} style={{ backgroundColor: "#ccc" }}>任务办理详情</div>

          <div className={styles.title} style={{ marginTop: 20 }}>任务派发给2个单位 ，当前1个单位已办理，1个单位未办理</div>
          <Table
            bordered
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={values.list}
            columns={goodsColumns}
            rowKey="id"
          />

          <div style={{ textAlign: "center" }}>
            <Button type="primary" key="cancel" onClick={() => handleUpdateModalVisible(false, values, "cancel")}>
              返回
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  renderDealContext = (currentStep, formVals) => {
    const { form, handleUpdateModalVisible, values, handleUpdate,actionFlg } = this.props;
    const { profile = {}, loading } = this.props;
    const { basicGoods = [], basicProgress = [], userInfo = {}, application = {} } = profile;

    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const percent = 60;
    const uploadProps = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    return (
      <div>
        <Card bordered={false}>
          <Row>
            <Col span={12} style={{ paddingLeft: 24 }}>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="任务名称">
                <span style={{ width: '100%' }} placeholder="">{values.taskTitle}</span>
              </FormItem>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="任务创建时间">
                <span style={{ width: '100%' }} placeholder="" >{values.createDate}</span>
              </FormItem>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="办理时限">
                <span style={{ width: '100%' }} placeholder="" >{values.endDate}</span>
              </FormItem>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 7 }} wrapperCol={{ span: 15 }} label="附件">
                <span style={{ width: '100%' }} placeholder="" >{values.files}</span>
              </FormItem>
            </Col>
            <Col span={1}>
              <Divider type='vertical' style={{ height: '200px', marginBottom: 32 }} />
            </Col>

            <Col span={11}>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务名称">
                <div style={{ width: '100%' }} placeholder="">该任务已进行{values.finishDay}天，距结束时间还剩：<span style={{ fontSize: 24, color: "red" }}>{values.lastDay}</span>天</div>
              </FormItem>
              <FormItem style={{ marginBottom: 0 }} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务进度">
                
                <Progress percent={percent} status="active" />
                  
              </FormItem>
            </Col>
          </Row>



          {/* <Divider  orientation="left" style={{ height: 20 }} >退货商品</Divider> */}
          <div className={styles.title} style={{ backgroundColor: "#ccc", marginBottom: 32 }}>任务办理</div>
          <FormItem style={{ marginBottom: 32 }} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="说明">
            {form.getFieldDecorator('note')(
              <TextArea
                onChange={this.onChange}
                placeholder="Controlled autosize"
                autosize={{ minRows: 3, maxRows: 5 }}
              />)}
          </FormItem>
          <FormItem style={{ marginBottom: 32 }} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="附件">
            {form.getFieldDecorator('files')(
              <Upload {...uploadProps}>
                <Button>
                  <Icon type="upload" /> 上传
                </Button>
              </Upload>
              )}
          </FormItem>

          <div style={{ textAlign: "center" }}>
            <Button style={{ margin: 20 }} type="primary" key="submit" onClick={() => this.handleNext(currentStep,values)}>
              保存
            </Button>
            <Button style={{ margin: 20 }} key="cancel" onClick={() => handleUpdateModalVisible(false, values, "cancel")}>
              返回
            </Button>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values, actionFlg } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="任务进展"
        visible={updateModalVisible}
        footer={null}
        onCancel={() => handleUpdateModalVisible(false, values, actionFlg)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {/* <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本信息" />
          <Step title="配置规则属性" />
          <Step title="设定调度周期" />
        </Steps> */}
        {actionFlg && actionFlg == "preview" ? this.renderContent(currentStep, formVals) : this.renderDealContext(currentStep, formVals)}

      </Modal>
    );
  }
}

/* eslint react/no-multi-comp:0 */
@connect(({ workNotice, loading }) => ({
  workNotice,
  loading: loading.models.workNotice,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: true,
    selectedRows: [],
    formValues: {},
    stepFormValues: {},
    editFormValues: {},
    handleDetail: {},
  };

  columns = [
    {
      title: '序号',
      // dataIndex: 'oid',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '任务标题',
      dataIndex: 'taskTitle',
      render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '创建单位',
      dataIndex: 'startOrg',
    },
    {
      title: '创建时间',
      dataIndex: 'createDate',
      render: (text, record, index) => `${moment(record.createDate).format('YYYY-MM-DD')}`,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record, "preview")}>查看进度</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleEditModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.showDeleteConfirm(true, record)}>删除</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleUpdateModalVisible(true, record, "deal")}>办理</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'workNotice/fetchWorkTask',
    });
  }

  showDeleteConfirm = (flag, record) => {
    const { dispatch } = this.props;
    let that = this;
    confirm({
      title: '确认是否删除该条记录?',
      content: '',
      okText: '确认删除',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        console.log('OK');
        return new Promise((res, rej) => {
          //点击确认进行删除请求，并且将confirmModal保存在state中，
          console.log(record.oid);
          dispatch({
            type: 'workNotice/workTaskDelete',
            payload: { ...record },
            callback: (response) => {
              console.log(response);
              if (response.status === true) {
                res(console.log("OK"));
                dispatch({
                  type: 'workNotice/fetchWorkTask',
                });
              }
            },
          });
        }).catch((e) => console.warn(e));

      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'workNotice/fetchWorkTask',
      payload: params,
    });
  };

  previewItem = (flag, record) => {
    const title = '任务查看'
    router.push(`/work/task/detail?recode=${record}&title=${title}`);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'workNotice/fetchWorkTask',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (selectedRows.length === 0) return;
    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'workNotice/remove',
          payload: {
            key: selectedRows.map(row => row.key),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;



    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      const rangeValue = fieldsValue['publishDate'];
      const startDate = undefined;
      const endDate = undefined;
      if (rangeValue) {
        startDate = rangeValue[0].format('YYYY-MM-DD');
        endDate = rangeValue[1].format('YYYY-MM-DD')
      }

      const values = {
        // ...fieldsValue,
        // updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        title: fieldsValue.title,
        startDate: startDate,
        endDate: endDate,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'workNotice/fetchWorkTask',
        payload: {
          ...values,
        },
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record, actionFlg) => {
    // console.log(record);
    // router.push(`/elderlyInfo/pending/${record.name}`);
    const { dispatch, form } = this.props;
    if(actionFlg && actionFlg == "preview"){
      dispatch({
        type: 'workNotice/fetchWorkTaskDetail',
        payload: {
          oid:record.oid,
        },
        callback: (response) => {
          console.log(response);
          if (response.status === true) {
            res(console.log("OK"));
            this.setState({
              stepFormValues: response.data || record,
            });

          }
        },
      });

      dispatch({
        type: 'workNotice/fetchWorkTaskHandleDetail',
        payload: {
          oid:record.oid,
        },
        callback: (response) => {
          console.log(response);
          if (response.status === true) {
            res(console.log("OK"));
            this.setState({
              handleDetail: response.data,
            });

          }
        },
      });

    }

    if(actionFlg && actionFlg == "deal"){
      dispatch({
        type: 'workNotice/fetchWorkTaskDetail',
        payload: {
          oid:record.oid,
        },
        callback: (response) => {
          console.log(response);
          if (response.status === true) {
            res(console.log("OK"));
            this.setState({
              stepFormValues: response.data || record,
            });

          }
        },
      });

    }

    
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
      editFormValues: {},
      actionFlg: actionFlg,
    });
  };

  handleEditModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      editFormValues: record || {},
      stepFormValues: {},
    });
  }


  handleAdd = fields => {
    const { dispatch } = this.props;

    const dealOrgs = fields.dealOrg;



    const orgsMap = new Map();
    for (let i = 0; i < dealOrgs.length; i += 1) {
      let obj = dealOrgs[i];
      orgsMap.set(obj.value, obj.label);
    }
    const mapChangeObj = (map) => {
      let obj = {};
      for (let [k, v] of map) {
        obj[k] = v;
      }
      return obj;
    }

    console.log(mapChangeObj(orgsMap));
    dispatch({
      type: 'workNotice/addWorkTask',
      payload: {
        ...fields,
        orgs: mapChangeObj(orgsMap),
        createDate: moment(fields.createDate).format("YYYY-MM-DD"),
        endDate: moment(fields.endDate).format("YYYY-MM-DD"),
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    const dealOrgs = fields.dealOrg;



    const orgsMap = new Map();
    if(dealOrgs){
      for (let i = 0; i < dealOrgs.length; i += 1) {
        let obj = dealOrgs[i];
        orgsMap.set(obj.value, obj.label);
      }
    }
    const mapChangeObj = (map) => {
      let obj = {};
      for (let [k, v] of map) {
        obj[k] = v;
      }
      return obj;
    }

    console.log(mapChangeObj(orgsMap));
    dispatch({
      type: 'workNotice/addWorkTask',
      payload: {
        ...fields,
        orgs: mapChangeObj(orgsMap),
        createDate: moment(fields.createDate).format("YYYY-MM-DD"),
        endDate: moment(fields.endDate).format("YYYY-MM-DD"),
      },
    });

    message.success('上报成功');
    this.handleUpdateModalVisible();
  };
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    const { RangePicker } = DatePicker;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="任务标题">
              {getFieldDecorator('title')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="发布日期">
              {getFieldDecorator('publishDate')(
                <RangePicker style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem>
              <Button type="primary" htmlType="submit">
                搜索
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    const { expandForm } = this.state;
    return expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const {
      workNotice: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues, editFormValues, handleDetail, actionFlg } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      handleEditModalVisible: this.handleEditModalVisible,
    };
    const handleDetailValue = {
      ...stepFormValues,
      ...handleDetail,
    }
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建任务
              </Button>
            </div>
            <Card bordered={true} title="工作任务" extra={<span style={{ color: "red" }}>备注：只能看到本单位接收的任务和本单位发布的任务</span>}>

              <StandardTable
                selectedRows={selectedRows}
                loading={loading}
                data={data}
                columns={this.columns}
                onSelectRow={this.handleSelectRows}
                onChange={this.handleStandardTableChange}
              />
            </Card>
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            actionFlg={actionFlg}
            values={handleDetailValue}
          />
        ) : null}
        {editFormValues && Object.keys(editFormValues).length ? (
          <EditTaskInfoForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={editFormValues}
          />
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
