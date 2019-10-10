import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import router from 'umi/router';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
  Descriptions,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditUserInfoForm from '@/components/UserInfoEdit';

import styles from './List.less';

const { confirm } = Modal;
const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['正常', '运行中', '已上线', '异常'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      console.log("fieldsValue:"+ JSON.stringify(fieldsValue));
      if (err) return;
      // form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      width="50%"
      destroyOnClose
      title="添加单位"
      visible={modalVisible}
      onOk={okHandle}
      okText= '保存'
      cancelText="返回"
      onCancel={() => handleModalVisible()}
    >
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="姓名">
            {form.getFieldDecorator('name')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="身份证号码">
            {form.getFieldDecorator('idNo')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="登录名">
            {form.getFieldDecorator('loginName')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="所属单位">
            {form.getFieldDecorator('orgId')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="手机号">
            {form.getFieldDecorator('mobileNo')(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="有效性">
            {form.getFieldDecorator('status')
            (<Select style={{ width: '100%' }}>
              <Option value="0">禁用</Option>
              <Option value="1">启用</Option>
            </Select>)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="出生日期">
            {form.getFieldDecorator('birthday')(<DatePicker style={{ width: '100%' }} placeholder="请选择" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="学历">
            {form.getFieldDecorator('education')(
            <Select style={{ width: '100%' }}>
              <Option value="20/30 ">大学本科/专科教育</Option>
              <Option value="21">大学本科毕业</Option>
              <Option value="22">大学本科结业</Option>
              <Option value="23">大学本科肄业</Option>
              
            </Select>)}
          </FormItem>
        </Col>
      </Row> 
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="政治面貌">
            {form.getFieldDecorator('political')
            (<Select style={{ width: '100%' }}>
              <Option value="01">中共党员</Option>
              <Option value="02">中共预备党员</Option>
              <Option value="03">共青团员</Option>
              <Option value="04">民革会员</Option>
              <Option value="05">民盟盟员</Option>
              <Option value="06">民建盟员</Option>
              <Option value="07">民进盟员</Option>
              <Option value="08">农工党党员</Option>
              <Option value="09">致工党党员</Option>
              <Option value="10">九三学社社员</Option>
              <Option value="11">台盟盟员</Option>
              <Option value="12">无党派民主人士</Option>
              <Option value="13">群众</Option>
              
            </Select>
            )}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="性别">
            {form.getFieldDecorator('sex')
            (<Select style={{ width: '100%' }}>
              <Option value="0">未知</Option>
              <Option value="1">男性</Option>
              <Option value="2">女性</Option>
              <Option value="9">未说明</Option>
            </Select>)}
          </FormItem>
        </Col>
      </Row>
      
      <div>
        注：默认密码为：111111
      </div>


    </Modal>
  );
});

@Form.create()
class UpdatePasswordForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
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

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
      this.setState(
        {
          formVals,
        },
        () => {
          if (currentStep < 0) {
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
    const { form: { getFieldDecorator },values } = this.props;
    return [
      <FormItem key="pwd" label="设置密码" {...this.formLayout} >
         {getFieldDecorator('pwd')(<Input placeholder="请输入" />)}
      </FormItem>,
      <FormItem key="repwd" label="确认密码" {...this.formLayout} >
         {getFieldDecorator('repwd')(<Input type='password' placeholder="请输入" />)}
      </FormItem>,
    ];
  };
  renderFooter = currentStep => {
    const { handleUpdateModalVisible, values } = this.props;
    return [
      <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
        取消
      </Button>,
      <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
        保存
      </Button>,
    ];
  };
  
  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        // width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="重置密码"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >
        {/* <Steps style={{ marginBottom: 28 }} size="small" current={currentStep}>
          <Step title="基本信息" />
          <Step title="配置规则属性" />
          <Step title="设定调度周期" />
        </Steps> */}
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

//重置密码

@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
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

  handleNext = currentStep => {
    const { form, handleUpdate } = this.props;
    const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = { ...oldValue, ...fieldsValue };
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
    const { form,values } = this.props;
    
    return (
      <div style={{ 'text-align': 'right'}}>
        <Descriptions
          bordered
          size='small'
        >
          <Descriptions.Item label="姓名：" span={2}>{values.name}</Descriptions.Item>
          <Descriptions.Item label="身份证号码：" span={2}>{values.idNo}</Descriptions.Item>
          <Descriptions.Item label="登录名：" span={2}>{values.loginName}</Descriptions.Item>
          <Descriptions.Item label="所属单位：" span={2}>{values.orgName} </Descriptions.Item>
          <Descriptions.Item label="手机号：" span={2}>{values.mobileNo}</Descriptions.Item>
          <Descriptions.Item label="有效性：" span={2}>{values.status}</Descriptions.Item>
          <Descriptions.Item label="出生日期：" span={2}>{values.birthday}</Descriptions.Item>
          <Descriptions.Item label="学历：" span={2}>{values.education}</Descriptions.Item>
          <Descriptions.Item label="政治面貌：" span={2}>{values.political}</Descriptions.Item>
          <Descriptions.Item label="性别：" span={2}>{values.sex}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  
  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="基本信息"
        visible={updateModalVisible}
        footer={null}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
      >

        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}


/* eslint react/no-multi-comp:0 */
@connect(({ system, loading }) => ({
  system,
  loading: loading.models.system,
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
    pwdFormValues: {},
    confirmState:false,
    confimModal:null 
  };

  columns = [
    {
      title: '序号',
      // dataIndex: 'index',
      render:(text,record,index)=>`${index+1}`,
    },
    {
      title: '身份证号码',
      dataIndex: 'idNo',
      // render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '登录名',
      dataIndex: 'loginName',
    },
    {
      title: '所属单位',
      dataIndex: 'orgName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>查看</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleEditModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.handlePwdModalVisible(true, record)}>重置密码</a>
          <Divider type="vertical" />
          <a onClick={() => this.showDeleteConfirm(true, record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/fetchUserList',
    });
  }
  
  showDeleteConfirm = (flag, record) =>  {
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
              type: 'system/userDelete', 
              payload: {...record},
              callback: (response) => {
                console.log(response);
                if(response.status === true){
                  res(console.log("OK"));
                  dispatch({
                    type: 'system/fetchUserList',
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
  
  handleDeleteUserInfo = (record) => {
    const { dispatch } = this.props;
    console.log(JSON.stringify(record));
    dispatch({
      type: 'system/userDelete',
    });
  }

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
      type: 'system/fetchUserList',
      payload: params,
    });
  };

  previewItem = id => {
    router.push(`/elderlyInfo/pending/detail/${id}`);
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'system/fetchUserList',
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
          type: 'syetem/remove',
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
      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'system/fetchUserList',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleUpdateModalVisible = (flag, record) => {
    // console.log(record);
    // router.push(`/elderlyInfo/pending/${record.name}`);
    this.setState({
      updateModalVisible: !!flag,
      stepFormValues: record || {},
      editFormValues: {},
      pwdFormValues:{},
    });
  };
  
  handleEditModalVisible = (flag, record) => { 

    this.setState({
      updateModalVisible: !!flag,
      editFormValues: record || {},
      stepFormValues: {},
      pwdFormValues:{},
    });
  }
  handlePwdModalVisible = (flag, record) => { 

    this.setState({
      updateModalVisible: !!flag,
      pwdFormValues: record || {},
      stepFormValues: {},
      editFormValues:{},
    });
  }

  handleAdd = fields => {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/addUser',
      payload: {
        ...fields,
      },
    });
    const {
      system: { data },
      loading,
    } = this.props;
    console.log(system);
    if(data.status === true){
      message.success('添加成功');
      this.handleModalVisible();
    }else{
      message.error(data.msg);
    }

  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'system/userUpdate',
      payload: {
        ...fields,
      },
    });

    message.success('更新成功');
    this.handleUpdateModalVisible();
  };


  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    
    const {RangePicker } = DatePicker;

    return (
      <Form onSubmit={this.handleSearch} layout="inline" >
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="姓名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="身份证号码">
              {getFieldDecorator('idNo')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="登录名">
              {getFieldDecorator('loginName')(
                <Input placeholder="请输入" />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="所属社区">
              {getFieldDecorator('orgName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
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
      system: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues,editFormValues,pwdFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      handleEditModalVisible: this.handleEditModalVisible,
      handlePwdModalVisible:this.handlePwdModalVisible,
    };
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
        {editFormValues && Object.keys(editFormValues).length ? (
          <EditUserInfoForm 
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={editFormValues} 
          />            
        ) : null}
        {pwdFormValues && Object.keys(pwdFormValues).length ? (
          <UpdatePasswordForm 
            {...updateMethods}
            updateModalVisible={updateModalVisible}
            values={pwdFormValues} 
          />            
        ) : null}
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
