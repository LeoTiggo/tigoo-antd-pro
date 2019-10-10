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

// import StandardTable from '@/components/StandardTable';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import EditElderInfoForm from '@/components/EditElderlyInfo';

import styles from './index.less';

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
class EditNoticeInfoForm extends PureComponent {
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

  // modules = {
  //   toolbar: [
  //     ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  //     ['blockquote', 'code-block'],
  //     ['link', 'image'],

  //     [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  //     [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  //     [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  //     [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  //     [{ 'direction': 'rtl' }],                         // text direction

  //     // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  //     [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  //     [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  //     [{ 'font': [] }],
  //     [{ 'align': [] }],

  //     ['clean']                                         // remove formatting button
  //   ]
  // };

  render() {
    const { updateModalVisible, form, handleAdd, handleUpdateModalVisible ,values} = this.props;
    console.log(values);
    // const quillValue = values.releaseContent;
    if(values.releaseContent){
      this.setState({
        value :values.releaseContent
      });
      
    }
    const { value } = this.state

    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        const paramValue = {
          ...fieldsValue,
          releaseContent: value,
          releaseScope:fieldsValue.releaseScope.toString(),
          
        };
        form.resetFields();
        handleAdd(paramValue);
        
        handleUpdateModalVisible();
      });
    };
    const plainOptions = [
      { label: '市级用户', value: '1' },
      { label: '县级用户', value: '2' },
      { label: '街道用户', value: '3' },
      { label: '社区用户', value: '4' },
      { label: '服务机构', value: '5' },
    ]; 
    const defaultCheckedList = values.releaseScope?values.releaseScope.split(",") : []; 
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
        title="编辑通知"
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleUpdateModalVisible(false, values,'edit')}
        maskClosable={false}
      >
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
          {form.getFieldDecorator('title', {
                initialValue: values.title,
              })(<Input placeholder="请输入" />)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="发布日期">
          {form.getFieldDecorator('releaseDate', {
                initialValue:  moment(values.releaseDate),
              })(<DatePicker style={{ width: '100%' }} placeholder="请选择" />)}
        </FormItem>
        <FormItem style={{ height: '300px', marginBottom: '10px' }} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="内容">
          {/* {form.getFieldDecorator('releaseContent')( */}
          <ReactQuill
            style={{ height: '200px' }}
            theme="snow"
            modules={this.modules}
            // formats={this.formats}
            value={value}
            className={styles.editContainer}
            onChange={this.handleChange}
          />
          {/* )} */}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="附件">
          {form.getFieldDecorator('files', {
                initialValue: values.files,
              })(
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> 上传
            </Button>
            </Upload>)}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="发布范围">
          {form.getFieldDecorator('releaseScope', {
                initialValue: defaultCheckedList,
              })(
            <CheckboxGroup
              options={plainOptions}
              // value={this.state.checkedList}
              onChange={this.onChangeCheckbox}
            />
            )}
        </FormItem>
      </Modal>
    );
  }
}
export default EditNoticeInfoForm;