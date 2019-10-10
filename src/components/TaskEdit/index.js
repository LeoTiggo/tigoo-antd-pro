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
  TreeSelect ,
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
const { SHOW_PARENT } = TreeSelect;
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
class EditTaskInfoForm extends PureComponent {
  constructor(props) {
    super(props);
  }
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    value: 'test',
    treeValue: undefined,
    treeData: [
      { id: 1, pId: 0, value: '1', title: 'Expand to load' },
      { id: 2, pId: 0, value: '2', title: 'Expand to load' },
      { id: 3, pId: 0, value: '3', title: 'Tree Node', isLeaf: true },
    ],
  };
  handleChange = (value) => {
    console.log(value)
    // message.info(editor);
    this.setState({
      value,
    });
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
    const { updateModalVisible, form, handleUpdate, handleEditModalVisible ,values} = this.props;
    console.log(values);
    const quillValue = values.taskContent;
    if(quillValue){
      this.setState({
        value:quillValue,
      })

    }

    const { value, treeData } = this.state
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleUpdate(fieldsValue);
        
        handleEditModalVisible();
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
        title="编辑任务"
        visible={updateModalVisible}
        onOk={okHandle}
        onCancel={() => handleEditModalVisible(false, values)}
        maskClosable={false}
      >
        
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务编号">
            {form.getFieldDecorator('taskNo', {
              initialValue: values.taskNo,
            })(<span>{values.taskNo}</span>)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="任务标题">
            {form.getFieldDecorator('taskTitle', {
              initialValue: values.taskTitle,
            })(<Input placeholder="请输入" />)}
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
            {form.getFieldDecorator('dealOrg', {
              initialValue: values.taskNo,
            })(
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
            {form.getFieldDecorator('createDate', {
              initialValue: moment(values.createDate),
            })(<DatePicker placeholder="请选择" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="办理时限">
            {form.getFieldDecorator('endDate', {
              initialValue: moment(values.endDate),
            })(<DatePicker placeholder="请选择" />)}
          </FormItem>
          <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="联系电话">
            {form.getFieldDecorator('contactNo', {
              initialValue: values.contactNo,
            })(<Input placeholder="请输入" />)}
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
      </Modal>
    );
  }
}
export default EditTaskInfoForm;