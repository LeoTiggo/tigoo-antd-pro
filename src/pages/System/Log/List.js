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
import EditElderInfoForm from '@/components/EditElderlyInfo';

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
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['正常', '运行中', '已上线', '异常'];

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
      title: '时间',
      dataIndex: 'operTime',
    },
    {
      title: '标签',
      dataIndex: 'operType',
    },
    {
      title: '操作内容',
      dataIndex: 'content',
    },
    {
      title: '登陆IP',
      dataIndex: 'ip',
    },
    {
      title: '操作人',
      dataIndex: 'oper',
    },
    
  ];

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'system/fetchLog',
      payload: {
        pageNum:1,
        pageSize:10,
      },
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
      pageNum: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'system/fetchLog',
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
      type: 'system/fetchLog',
      payload: {},
    });
  };

  toggleForm = () => {
    const { expandForm } = this.state;
    this.setState({
      expandForm: !expandForm,
    });
  };



  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;



    form.validateFields((err, fieldsValue) => {
      if (err) return;
      console.log(fieldsValue);
      const startTime = fieldsValue['startTime'];
      const endTime = fieldsValue['endTime'];
      const values = {
        ...fieldsValue,
        startTime: startTime.format('YYYY-MM-DD'),
        endTime: endTime.format('YYYY-MM-DD'),
        // updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
        pageNum:1,
        pageSize:10,
      };
      console.log('Received values of form: ', values);
      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'system/fetchLog',
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

  renderAdvancedForm() {
    const {
      form: { getFieldDecorator },
    } = this.props;
    
    const {RangePicker } = DatePicker;
    const dateConfig = {
      rules: [{ type: 'object', required: false, message: 'Please select time!' }],
    };

    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="开始时间">
              {getFieldDecorator('startTime',dateConfig)(<DatePicker  style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="结束时间">
              {getFieldDecorator('endTime',dateConfig)(<DatePicker  style={{ width: '100%' }} />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="操作人">
              {getFieldDecorator('oper')(
                <Input placeholder="请输入"  />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="标签">
              {getFieldDecorator('operType')(
                <Input placeholder="请输入"  />
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="内容">
              {getFieldDecorator('content')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ marginBottom: 24 }}>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
              重置
            </Button>
          </div>
        </div>
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
       
      </PageHeaderWrapper>
    );
  }
}

export default TableList;
