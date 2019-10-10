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
class EditElderInfoForm extends PureComponent {
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
          if (currentStep < 3) {
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
    const {
            form: { getFieldDecorator },
          } = this.props;
    const config = {
            rules: [{ type: 'object', required: false, message: 'Please select time!' }],
          };
    const columns = [
          {
            title: '评估事项，内容与评分',
            dataIndex: 'name',
            key: 'name',
            width: 200,
          },
          {
            title: '程度等级',
            children: [
              {
                title: '可自理',
                dataIndex: 'age',
                key: 'age',
                width: 100,
                sorter: (a, b) => a.age - b.age,
              },
              {
                title: '轻度依赖',
                dataIndex: 'companyAddress',
                key: 'companyAddress',
                width: 100,
                sorter: (a, b) => a.age - b.age,
              },
              {
                title: '中度依赖',
                dataIndex: 'building',
                key: 'building',
                width: 100,
                sorter: (a, b) => a.age - b.age,
              },
              {
                title: '不能自理',
                dataIndex: 'street',
                key: 'street',
                width: 100,
                sorter: (a, b) => a.age - b.age,
              },
              {
                title: '评分判断',
                dataIndex: 'gender',
                key: 'gender',
                width: 100,
                render: () => <Input />,
              },
            ],
          },
          
    ];
    const i = 1;
    const data = [
      {key: 1,
        name: '(1)进餐：使用餐具将饭菜送入口、咀嚼、吞咽等活动',
        age: 1 + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',
      },
      {key: 2,
        name: '(2)梳洗：梳头、洗脸、刷牙、剃须洗澡等活动',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',},
      {key: 3,
        name: '(3)穿衣：穿衣裤、袜子、鞋子等活动',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',},
      {key: 4,
        name: '(4)入厕：小便、大便等活动及自控',
        age: i + 1,
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',},
      {key: 5,
        name: '(5)活动：站立、室内行走、上下楼梯、户外活动',
        age: '独立完成所有活动，评分：0',
        street: 'Lake Park',
        building: 'C',
        number: 2035,
        companyAddress: 'Lake Street 42',
        companyName: 'SoftLake Co',
        gender: 'M',},

    ];

    if (currentStep === 1) {
      return (
        <Card title="健康信息" size='small'>
          <Form onSubmit={this.forward} layout="inline" style={{ 'text-align': 'right'}}>
            <Row gutter={{ md: 4, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <FormItem label="身高：">
                  {getFieldDecorator('name')(<Input placeholder="请输入" defaultValue='12312' />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="体重(kg)：">
                  {getFieldDecorator('name')(<Input placeholder="请输入" defaultValue='12312' />)}
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="血压（80/120)mmHg：">
                  {getFieldDecorator('name')(<Input placeholder="请输入" defaultValue='12312' />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <FormItem label="血糖：">
                  {getFieldDecorator('name')(<Input placeholder="请输入" />)}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={8} sm={24}>
                <FormItem label="是否吸烟：">
                  <Radio>是</Radio>
                  {getFieldDecorator('name')(<Input style={{ width: '100px' }} placeholder="请填写每日吸烟量" value='12312' />)}
                  <Radio style={{ padding: '5px' }}>否</Radio>
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="是否饮酒：">
                  <Radio>是</Radio>
                  {getFieldDecorator('name')(<Input style={{ width: '100px' }} placeholder="请填写每日饮酒量" value='12312' />)}
                  <Radio style={{ padding: '5px' }}>是</Radio>
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="平常是否运动：">
                  <Radio>是</Radio>
                  {getFieldDecorator('name')(<Input style={{ width: '100px' }} placeholder="请填写每日运动时长" value='12312' />)}
                  <Radio style={{ padding: '5px' }}>是</Radio>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem label="既往病史：">
                  <TextArea
                    placeholder="Controlled autosize"
                    autosize={{ minRows: 3, maxRows: 5 }}
                    size='large'
                    style={{ width: '358px' }}
                  />
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem label="既往用药史：">
                  <TextArea
                    placeholder="Controlled autosize"
                    autosize={{ minRows: 3, maxRows: 5 }}
                    size='large'
                    style={{ width: '358px' }}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
              <Col md={12} sm={24}>
                <FormItem label="家庭史：">
                  <TextArea
                    placeholder="Controlled autosize"
                    autosize={{ minRows: 3, maxRows: 5 }}
                    size='large'
                    style={{ width: '358px' }}
                  />
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem label="过敏史：">
                  <TextArea
                    placeholder="Controlled autosize"
                    autosize={{ minRows: 3, maxRows: 5 }}
                    size='large'
                    style={{ width: '358px' }}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ 'text-align': 'left'}}>
              <Col md={24} sm={24}>
                <FormItem label="老人健康状态自我评估：">
                  <Radio.Group name="radiogroup">
                    <Radio value={1}>满意</Radio>
                    <Radio value={2}>基本满意</Radio>
                    <Radio value={3}>不太满意</Radio>
                    <Radio value={4}>说不清楚</Radio>
                    <Radio value={5}>不满意</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            <Row gutter={{ md: 8, lg: 24, xl: 48 }} >
              <Col md={24} sm={24} style={{ 'text-align': 'left'}}>
                <FormItem label="生活自理能力评估：" >
                  <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{
                      hideOnSinglePage: true,
                    }}
                  />
                </FormItem>
              </Col>
            </Row>
      
          </Form>
        </Card>
      
      );
    }
    if (currentStep === 2) {
      return (
        <Card title="医保信息" size='small'>
          <Form onSubmit={this.forward} layout="inline" style={{ 'text-align': 'right'}}>

            <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ 'text-align': 'left'}}>
              <Col md={12} sm={24}>
                <FormItem label="医保类型：">
                  <Radio.Group name="radiogroup">
                    <Radio value={1}>省医保</Radio>
                    <Radio value={2}>市医保</Radio>
                    <Radio value={3}>城镇居民医保</Radio>
                    <Radio value={4}>新农合</Radio>
                    <Radio value={5}>无</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col md={12} sm={24}>
                <FormItem label="社保卡号：">
                  {getFieldDecorator('name')(<Input style={{ width: '100px' }} />)}
                </FormItem>
              </Col>
            </Row>

      
          </Form>
        </Card>
      );
    }
    if (currentStep === 3) {
      return (
        <Card title="医养信息" size='small'>
          <Form onSubmit={this.forward} layout="inline" style={{ 'text-align': 'right'}}>
            
            <Row gutter={{ md: 8, lg: 24, xl: 48 }} style={{ 'text-align': 'left'}}>
              <Col md={16} sm={24}>
                <FormItem label="养老方式：">
                  <Radio.Group name="radiogroup">
                    <Radio value={1}>居家养老</Radio>
                    <Radio value={2}>机构养老</Radio>
                    <Radio value={3}>不太满意</Radio>
                    <Radio value={4}>其他</Radio>
                    {getFieldDecorator('name')(<Input style={{ width: '100px' }} />)}
                  </Radio.Group>
                </FormItem>
              </Col>
              <Col md={8} sm={24}>
                <FormItem label="是否有退休金:">
                  <Radio.Group name="radiogroup">
                    <Radio value={1}>有</Radio>
                    {getFieldDecorator('name')(<Input style={{ width: '100px' }} />)}
                    <Radio style={{ padding: '5px' }} value={2}>无</Radio>
                  </Radio.Group>
                </FormItem>
              </Col>
            </Row>
            
          </Form>
        </Card>
      );
    }
    return (
      <Card title="基本信息" size='small'>
        <Form onSubmit={this.forward} layout="inline" style={{ 'text-align': 'right'}}>
          <Row gutter={{ md: 4, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="健康档案编号：">
                {getFieldDecorator('name')(<Input placeholder="请输入" defaultValue='12312' />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="管理机构名称：">
                {getFieldDecorator('name')(<Input placeholder="请输入" defaultValue='12312' />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="管理机构组织机构代码：">
                {getFieldDecorator('name')(<Input placeholder="请输入" defaultValue='12312' />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="姓名：">
                {getFieldDecorator('name')(<Input placeholder="请输入" disabled='true' value='12312' />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="联系人姓名：">
                {getFieldDecorator('name')(<Input placeholder="请输入" disabled='true' value='12312' />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="性别：">
                <Select
                  size='default'
                  style={{ width: '165px' }}
                >
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
                </Select>
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="出生日期：">
                {getFieldDecorator('date-picker', config)(<DatePicker />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="国籍：">
                {getFieldDecorator('name')(<Input placeholder="请输入" disabled='true' value='12312' />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="民族：">
                {getFieldDecorator('name')(<Input placeholder="请输入" disabled='true' value='12312' />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="婚姻状况：">
                <Select
                  style={{ width: '165px' }}
                >
                  <Option value="0">已婚</Option>
                  <Option value="1">未婚</Option>
                </Select>
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="身份证号码：">
                {getFieldDecorator('name')(<Input placeholder="请输入" disabled='true' value='12312' />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="年龄：">
                {getFieldDecorator('name')(<Input placeholder="请输入" disabled='true' value='12312' />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="户籍地址：">
                {getFieldDecorator('name')(<Input placeholder="请输入" disabled='true' value='12312' />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="现住地址：">
                {getFieldDecorator('name')(<Input placeholder="请输入" disabled='true' value='12312' />)}
              </FormItem>
            </Col>
            <Col md={8} sm={24}>
              <FormItem label="本人电话号码：">
                {getFieldDecorator('name')(<Input placeholder="请输入" disabled='true' value='12312' />)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={8} sm={24}>
              <FormItem label="联系人电话：">
                {getFieldDecorator('name')(<Input placeholder="请输入" disabled='true' value='12312' />)}
              </FormItem>
            </Col>
          </Row>
    
        </Form>
      </Card>
    
    );
  };

  renderFooter = currentStep => {
    
    const { handleUpdateModalVisible, values } = this.props;
    if (currentStep === 1) {
      return [
        <div style={{ textAlign: 'center' }}>
          <Button key="back" onClick={this.backward}>
            上一步
          </Button>,
          <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
            取消
          </Button>,
          <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
            下一步
          </Button>,
        </div>

      ];
    }
    if (currentStep === 2) {
      return [
        <div style={{ textAlign: 'center' }}>
          <Button key="back" onClick={this.backward}>
            上一步
          </Button>,
          <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
            取消
          </Button>,
          <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
            下一步
          </Button>,
        </div>

      ];
    }
    if (currentStep === 3) {
      return [
        <div style={{ textAlign: 'center' }}>
          <Button key="back" onClick={this.backward}>
            上一步
          </Button>,
          <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
            保存
          </Button>,
          <Button key="submit" type="primary" onClick={() => this.handleNext(currentStep)}>
            核实上报
          </Button>,
        </div>
      ];
    }
    return [
      <div style={{ textAlign: 'center' }}>
        <Button key="cancel" onClick={() => handleUpdateModalVisible(false, values)}>
          取消
        </Button>,
        <Button key="forward" type="primary" onClick={() => this.handleNext(currentStep)}>
          下一步
        </Button>,
      </div>

    ];
      
   
  };

  render() {
    const { updateModalVisible, handleUpdateModalVisible, values } = this.props;
    const { currentStep, formVals } = this.state;

    return (
      <Modal
        width="90%"
        
        bodyStyle={{ padding: '32px 40px 48px' }}
        destroyOnClose
        title="老龄人口信息核实上报"
        visible={updateModalVisible}
        footer={this.renderFooter(currentStep)}
        onCancel={() => handleUpdateModalVisible(false, values)}
        afterClose={() => handleUpdateModalVisible()}
        s
      >
        {this.renderContent(currentStep, formVals)}
      </Modal>
    );
  }
}

export default EditElderInfoForm;