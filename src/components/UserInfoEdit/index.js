import React, { PureComponent } from 'react';
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
  Table,
} from 'antd';

import styles from './index.less';



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

@Form.create()
class EditUserInfoForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handleUpdateModalVisible: () => {},
    values: {},
  };

  constructor(props) {
    super(props);
    console.log("edit page : "+ JSON.stringify(props));
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
    const { form, handleUpdate,values } = this.props;
    // const { formVals: oldValue } = this.state;
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      const formVals = {...values, ...fieldsValue };
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

  renderContent = (currentStep) => {
    const { form ,values} = this.props;
    const {
            form: { getFieldDecorator },
          } = this.props;
    const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
          };
    console.log(values);
    return (
      <div>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="姓名">
            {form.getFieldDecorator('name', {
                initialValue: values.name,
              })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        <Col md={12} sm={24}>
          <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="身份证号码">
            {form.getFieldDecorator('idNo', {
                initialValue: values.idNo,
              })(<Input placeholder="请输入" />)}
          </FormItem>
        </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="登录名">
              {form.getFieldDecorator('loginName', {
                initialValue: values.loginName,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="所属单位">
              {form.getFieldDecorator('orgId', {
                initialValue: values.orgId,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="手机号">
              {form.getFieldDecorator('mobileNo', {
                initialValue: values.mobileNo,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="有效性">
              {form.getFieldDecorator('status', {
                initialValue: values.status,
              })
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
              {form.getFieldDecorator('birthday', {
                initialValue: values.birthday,
              })(<Input style={{ width: '100%' }} placeholder="请选择" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="学历">
              {form.getFieldDecorator('education', {
                initialValue: values.education,
              })(
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
              {form.getFieldDecorator('political', {
                initialValue: values.political,
              })
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
              {form.getFieldDecorator('sex', {
                initialValue: values.sex,
              })
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


      </div>

    );
  };

  renderFooter = currentStep => {
    
    const { handleUpdateModalVisible, values } = this.props;
    
    return [
      <div style={{ textAlign: 'center' }}>
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          保存
        </Button>,
      </div>

    ];
      
   
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width="60%"
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="用户信息"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
        
      >
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default EditUserInfoForm;