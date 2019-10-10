import React, {PureComponent, Fragment} from 'react';
import {connect} from 'dva';
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
  notification
} from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// import StandardTable from '@/components/StandardTable'; import
// PageHeaderWrapper from '@/components/PageHeaderWrapper'; import
// EditElderInfoForm from '@/components/EditElderlyInfo';

import styles from './index.less';

const CheckboxGroup = Checkbox.Group;
const {confirm} = Modal;
const FormItem = Form.Item;
const {Step} = Steps;
const {TextArea} = Input;
const {Option} = Select;
const RadioGroup = Radio.Group;
const getValue = obj => Object
  .keys(obj)
  .map(key => obj[key])
  .join(',');
const statusMap = ['default', 'processing', 'success', 'error'];
const status = ['正常', '运行中', '已上线', '异常'];
const  modules = {
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
class EditPolicyFileInfoForm extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    value: 'test'
  };
  handleChange = (value) => {
    console.log(value)
    // message.info(editor);
    this.setState({value});
  };

  prompt = () => {
    notification.open({message: 'We got value:', description: <span dangerouslySetInnerHTML={{
      __html: this.state.value
    }}/>});
  };

  render() {
    const {updateModalVisible, form, handleAdd, handleUpdateModalVisible, values} = this.props;
    console.log(values);
    // const quillValue = values.releaseContent;
    if (values.content) {
      this.setState({value: values.content});

    }
    const {value} = this.state

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) 
          return;
        // const {key,label} = fieldsValue.selectValue;
        const paramValue = {
          ...values,
          ...fieldsValue,
          content: value,
          // itemId:key,
          // itemName:label,
          // selectValue:undefined,
        };
        form.resetFields();
        handleAdd(paramValue);

        handleUpdateModalVisible();
      });
    };

    const uploadProps = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-text'
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
      }
    };
    return (
      <Modal
        width="60%"
        destroyOnClose
        title="编辑工作报告"
        visible={updateModalVisible}
        onOk={okHandle}
        footer={null}
        onCancel={() => handleUpdateModalVisible(false, values, 'edit')}
        maskClosable={false}>
        <Card bordered={false} style={{marginLeft:'10%',marginRight:'10%'}}>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}> 
              <FormItem label="公文标题" labelCol={{ span: 4}} wrapperCol={{ span: 20 }}>
                {form.getFieldDecorator('gwTitle', {
                initialValue: values.gwTitle,
              })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem  label="发文时间" labelCol={{ span: 8}} wrapperCol={{ span: 16 }} >
                {form.getFieldDecorator('gwTime', {
                initialValue: moment(values.gwTime),
              })(<DatePicker style={{ width:'100%'}} placeholder="请选择"/>)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem label="文号" labelCol={{ span: 8 }} wrapperCol={{ span: 16}}>
                {form.getFieldDecorator('gwNo', {
                initialValue: values.gwNo,
              })(<Input placeholder=""/>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={12} sm={24}>
              <FormItem  label="发布机构" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} >
                {form.getFieldDecorator('orgId', {
                initialValue: values.title,
              })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
            <Col md={12} sm={24}>
              <FormItem label="关键字" labelCol={{ span: 8 }} wrapperCol={{ span: 16}}>
                {form.getFieldDecorator('keyWord', {
                initialValue: values.title,
              })(<Input placeholder="请输入"/>)}
              </FormItem>
            </Col>
          </Row>
          <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
            <Col md={24} sm={24}>
            <FormItem style={{ height: '300px', marginBottom: '10px' }} labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} label="内容">
       
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
            <FormItem labelCol={{span: 8}} wrapperCol={{span: 15}}label="附件">
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
export default EditPolicyFileInfoForm ;