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
import UnitInfoEdit from '@/components/UnitInfoEdit';

import styles from './List.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');
const statusMap = ['processing', 'default', 'success', 'error'];
const status = ['启用', '停用'];

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
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
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="单位名称">
            {form.getFieldDecorator('desc', {
              rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="单位代码">
            {form.getFieldDecorator('desc', {
              rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="上级机构">
            {form.getFieldDecorator('desc', {
              rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="排序号">
            {form.getFieldDecorator('desc', {
              rules: [{ message: '请输入至少五个字符的规则描述！', min: 5 }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="负责人">
            {form.getFieldDecorator('desc', {
              rules: [{  message: '请输入至少五个字符的规则描述！', min: 5 }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="有效性">
            {form.getFieldDecorator('desc', {
              rules: [{ message: '请输入至少五个字符的规则描述！', min: 5 }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row>
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="单位类型">
            {form.getFieldDecorator('desc', {
              rules: [{ required: true, message: '请输入至少五个字符的规则描述！', min: 5 }],
            })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row> 
      <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={24} sm={24}>
          <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="联系地址">
            {form.getFieldDecorator('desc', {
              rules: [{ message: '请输入至少五个字符的规则描述！', min: 5 }],
            })(<TextArea placeholder="请输入" />)}
          </FormItem>
        </Col>
      </Row>

    </Modal>
  );
});

@Form.create()
class UpdateForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);
    console.log(props);
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
      labelCol: { span: 6 },
      wrapperCol: { span: 6 },
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

    console.log(values);

    
    return (
      <div style={{ 'text-align': 'right'}}>
        <Descriptions
          bordered
          size='small'
        >
          <Descriptions.Item label="单位名称：" span={2}>{values.orgName}</Descriptions.Item>          
          <Descriptions.Item label="单位代码：" span={2}>{values.orgCode}</Descriptions.Item>
          <Descriptions.Item label="上级机构：" span={2}>{values.upOrg}</Descriptions.Item>
          <Descriptions.Item label="排序号：" span={2}>{values.index}</Descriptions.Item>
          <Descriptions.Item label="负责人：" span={2}>{values.leader}</Descriptions.Item>
          <Descriptions.Item label="有效性：" span={2}>{values.status}</Descriptions.Item>
          <Descriptions.Item label="单位类型：" span={2}>{values.orgType}</Descriptions.Item>
          <Descriptions.Item label="单位地址："  span={5}>{values.contactAddr}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  };


  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width="40%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="单位信息"
        visible={updateModalVisible}
        footer={null}
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
  };

  columns = [
    {
      title: '序号',
      dataIndex: 'oid',
    },
    {
      title: '单位名称',
      dataIndex: 'orgName',
    },
    {
      title: '单位编码',
      dataIndex: 'orgCode',
      // render: text => <a onClick={() => this.previewItem(text)}>{text}</a>,
    },
    {
      title: '上级机构',
      dataIndex: 'upOrgName',
    },
    {
      title: '状态',
      dataIndex: 'status',
      filters: [
        {
          text: status[0],
          value: 0,
        },
        {
          text: status[1],
          value: 1,
        },
      ],
      render(val) {
        return <Badge status={statusMap[val]} text={status[val]} />;
      },
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>查看</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleEditModalVisible(true, record)}>编辑</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'system/fetchUnit',
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
      type: 'system/fetchUnit',
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
      type: 'system/fetchUnit',
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
          type: 'system/removeUnit',
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
        type: 'system/fetchUnit',
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
    dispatch({
      type: 'system/addUnit',
      payload: {
        desc: fields.desc,
      },
    });

    message.success('添加成功');
    this.handleModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    console.log("fields"+JSON.stringify(fields));
    dispatch({
      type: 'system/updateUnit',
      payload: {
        ...fields,
      },
      callback: (res) => {
        console.log(res);
        if (res) {
          console.log(res);// 请求完成后返回的结果
        }
      }
    });

    message.success('修改成功');
    this.handleUpdateModalVisible();

    dispatch({
      type: 'system/fetchUnit',
    });
  };

  
  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    
    const {RangePicker } = DatePicker;

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="单位名称">
              {getFieldDecorator('orgName')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="单位编码">
              {getFieldDecorator('orgCode')(<Input placeholder="请输入" />)}
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
      system: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues,editFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      handleEditModalVisible: this.handleEditModalVisible,
    };
    return (
      <PageHeaderWrapper title="">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                添加
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
          <UnitInfoEdit 
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
