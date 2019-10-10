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
  Upload,
  Checkbox,
  notification,
} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import EditReportInfoForm from '@/components/ReportEdit';

import styles from './List.less';

const CheckboxGroup = Checkbox.Group;
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
const modules = {
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

@Form.create()
class CreateForm extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    value: 'test',
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


  render() {
    const { modalVisible, form, handleAdd, handleModalVisible } = this.props;
    const { value } = this.state
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        // const formatDate = fieldsValue
        const {key,label} = fieldsValue.selectValue;
        const paramValue = {
          ...fieldsValue,
          content: value,
          itemId:key,
          itemName:label,
          selectValue:undefined,
        };
        form.resetFields();
        handleAdd(paramValue);
        handleModalVisible();
      });
    };
    const plainOptions = [
      { label: '市级用户', value: '1' },
      { label: '县级用户', value: '2' },
      { label: '街道用户', value: '3' },
      { label: '社区用户', value: '4' },
      { label: '服务机构', value: '5' },
    ];
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
    return (
      <Modal
        width="60%"
        destroyOnClose
        title="发布通知"
        visible={modalVisible}
        onOk={okHandle}
        onCancel={() => handleModalVisible()}
        maskClosable={false}
      >
      <Card bordered={false} style={{marginLeft:'10%',marginRight:'10%'}}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}> 
              <FormItem label="标题" labelCol={{ span: 2}} wrapperCol={{ span: 20 }}>
                {form.getFieldDecorator('title')(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem  label="单位" labelCol={{ span: 4 }} wrapperCol={{ span: 20 }} >
                {form.getFieldDecorator('orgId')(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem label="项目" labelCol={{ span: 4 }} wrapperCol={{ span: 16}}>
                {form.getFieldDecorator('selectValue')(
                  <Select style={{ width: '100%' }} labelInValue={true} placeholder="请选择">
                    <Option value="0">项目一</Option>
                    <Option value="1">项目二</Option>
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
            <FormItem style={{ height: '300px', marginBottom: '10px' }} labelCol={{ span: 2 }} wrapperCol={{ span: 20 }} label="内容">
       
            <ReactQuill
              style={{ height: '200px' }}
              theme="snow"
              modules={this.modules}
              // formats={this.formats}
              value={value}
              className={styles.editContainer}
              onChange={this.handleChange}
            />
        
          </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
            <FormItem labelCol={{span: 5}} wrapperCol={{span: 15}}label="附件">
                {form.getFieldDecorator('files')(
                  <Upload {...uploadProps}>
                    <Button>
                      <Icon type="upload"/>
                      上传
                    </Button>
                  </Upload>
                )}
            </FormItem>
            </Col>
          </Row>
          <div style={{textAlign: 'center'}}>
            <Button key="forward" type="primary" style={{marginRight: '20px'}} onClick={() => okHandle()}>
              保存
            </Button>

          </div>
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
    const { form } = this.props;

    return (
      <div style={{ textAlign: 'center' }}>
        <Card bordered={false}>
          <div className={styles.tableList}>

            <div className={styles.tableListOperator}>
              <p dangerouslySetInnerHTML={{ __html: formVals.content }} />
              <span style={{ color: "red" }}>注：省级用户发布，其它单位查看通知</span>
            </div>

          </div>
        </Card>

      </div >
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
        title=""
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
        {this.renderContent(currentStep, values)}
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
  };

  columns = [
    {
      title: '序号',
      // dataIndex: 'oid',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '单位',
      dataIndex: 'orgId',
    },
    {
      title: '项目',
      dataIndex: 'itemName',
    },
    {
      title: '发布时间',
      dataIndex: 'createTime',
      render:  (text, record, index) => `${moment(record.createTime).format('YYYY-MM-DD')}`,
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handleUpdateModalVisible(true, record)}>查看</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleEditModalVisible(true, record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.showDeleteConfirm(true, record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'workNotice/fetchReportList',
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
            type: 'workNotice/workReportDelete',
            payload: { oid:record.oid },
            callback: (response) => {
              console.log(response);
              if (response.status === true) {
                res(console.log("OK"));
                dispatch({
                  type: 'workNotice/fetchReportList',
                });
              }else{
                rej(message.error(response.msg));
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
      type: 'workNotice/fetchReportList',
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
      type: 'workNotice/fetchReportList',
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
          type: 'workNotice/removeNotice',
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
      const startDate = null;
      const endDate = null;
      if(rangeValue){
        startDate = rangeValue[0].format('YYYY-MM-DD');
        endDate = rangeValue[1].format('YYYY-MM-DD')
      }
      const values = {
        title:fieldsValue.title,
        itemName:fieldsValue.itemName,
        startDate:startDate ,
        endDate:endDate,
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'workNotice/fetchReportList',
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
    console.log(record);
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
    console.log("fields" + JSON.stringify(fields));
    dispatch({
      type: 'workNotice/addWorkReport',
      payload: {
        ...fields,
      },
      callback: (response) => {
        console.log(response);
        if (response.status) {
          console.log("OK");
          dispatch({
            type: 'workNotice/fetchReportList',
          });
        }
      },
    });

    message.success('添加成功');
    // this.handleModalVisible();

    this.handleUpdateModalVisible();
  };

  handleUpdate = fields => {
    const { dispatch } = this.props;
    const { formValues } = this.state;
    dispatch({
      type: 'workNotice/updateNotice',
      payload: {
        query: formValues,
        body: {
          name: fields.name,
          desc: fields.desc,
          key: fields.key,
        },
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
          <Col md={6} sm={24}>
            <FormItem label="标题">
              {getFieldDecorator('title')(<Input />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="项目">
              {getFieldDecorator('itemName')(<Input />)}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
            <FormItem label="发布日期">
              {getFieldDecorator('publishDate')(
                <RangePicker style={{ width: '100%' }} />
              )}
            </FormItem>
          </Col>
          <Col md={6} sm={24}>
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
    // console.log(JSON.stringify({ data }))
    const { selectedRows, modalVisible, updateModalVisible, stepFormValues, editFormValues } = this.state;

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };
    const updateMethods = {
      handleUpdateModalVisible: this.handleUpdateModalVisible,
      handleUpdate: this.handleUpdate,
      handleEditModalVisible: this.handleEditModalVisible,
      handleAdd: this.handleAdd,
    };
    return (
      <PageHeaderWrapper >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <Card bordered={true} title="工作报告" extra={<span style={{ color: "red" }}>备注：查看本级组织和下级组织的工作报告</span>}>
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
            values={stepFormValues}
          />
        ) : null}
        {editFormValues && Object.keys(editFormValues).length ? (
          <EditReportInfoForm
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
