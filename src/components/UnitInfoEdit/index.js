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
class EditUnitInfoForm extends PureComponent {
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
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="单位名称">
              {form.getFieldDecorator('orgName', {
                initialValue: values.orgName,
              })(<Input placeholder="请输入" defaultValue={values.orgName} />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="单位代码">
              {form.getFieldDecorator('orgCode', {
                initialValue: values.orgCode,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="上级机构">
              {form.getFieldDecorator('upOrgName', {
                initialValue: values.upOrgName,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="排序号">
              {form.getFieldDecorator('orderNo', {
                initialValue: values.orderNo,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="负责人">
              {form.getFieldDecorator('leader', {
                initialValue: values.leader,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="有效性">
              {form.getFieldDecorator('status', {
                initialValue: values.status,
              })(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={12} sm={24}>
            <FormItem labelCol={{ span: 6 }} wrapperCol={{ span: 18 }} label="单位类型">
              {form.getFieldDecorator('orgType', {
                initialValue: values.orgType,
              })(<Select style={{ width: '100%' }}>
              <Option value="0">政府购机</Option>
              <Option value="1">医疗机构</Option>
              <Option value="2">养老机构</Option>
            </Select>)}
            </FormItem>
          </Col>
        </Row> 
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={24} sm={24}>
            <FormItem labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="联系地址">
              {form.getFieldDecorator('contactAddr', {
                initialValue: values.contactAddr,
              })(<TextArea placeholder="请输入" />)}
            </FormItem>
          </Col>
        </Row>
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
        title="单位信息"
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

export default EditUnitInfoForm;