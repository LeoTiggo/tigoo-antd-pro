import React, { PureComponent, Fragment } from 'react';
import ReactDOM from 'react-dom';
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
import WangEditor from 'wangeditor';

// import StandardTable from '@/components/StandardTable';
// import PageHeaderWrapper from '@/components/PageHeaderWrapper';
// import EditElderInfoForm from '@/components/EditElderlyInfo';

import styles from './Edit.less';

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

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 3 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 20 }
  }
};
@Form.create()
class NoticeEditForm extends PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      editorHtml: '',
      editorText: '',
      editorContent: ''
    }
  }
  componentDidMount() {
    const elemMenu = this.refs.editorElemMenu;
    const elemBody = this.refs.editorElemBody;
    const editor = new WangEditor(elemMenu, elemBody)
    // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
    editor.customConfig.onchange = html => {
      console.log(editor.txt.html())
      this.setState({
        // editorContent: editor.txt.text()
        editorContent: editor.txt.html()
      })
    }
    editor.customConfig.menus = [
      'head',  // 标题
      'bold',  // 粗体
      'fontSize',  // 字号
      'fontName',  // 字体
      'italic',  // 斜体
      'underline',  // 下划线
      'strikeThrough',  // 删除线
      'foreColor',  // 文字颜色
      'backColor',  // 背景颜色
      'link',  // 插入链接
      'list',  // 列表
      'justify',  // 对齐方式
      'quote',  // 引用
      'emoticon',  // 表情
      'image',  // 插入图片
      'table',  // 表格
      'video',  // 插入视频
      'code',  // 插入代码
      'undo',  // 撤销
      'redo'  // 重复
    ]
    editor.customConfig.uploadImgShowBase64 = true
    editor.create()
  }
  state = {
    checkedList: [],
    indeterminate: true,
    checkAll: false,
    value: 'test',
  };


  render() {
    const { modalVisible, form, handleAdd, handleModalVisible, inputRef } = this.props;
    const { value } = this.state
    const okHandle = () => {
      form.validateFields((err, fieldsValue) => {
        if (err) return;
        form.resetFields();
        handleAdd(fieldsValue);
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
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="标题">
          {form.getFieldDecorator('title')(
          <Input placeholder="请输入" />
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="发布日期">
          {form.getFieldDecorator('releaseDate')(
          <DatePicker style={{ width: '100%' }} placeholder="请选择" />
          )}
        </FormItem>
        <FormItem style={{ height: '300px', marginBottom: '10px' }} labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="内容">
          {form.getFieldDecorator('releaseContent')(
            // <div ref={node => this._div = node}></div>

            // <div ref="divElem" ></div>
            <div className="shop">
              <div className="text-area" >
                <div ref="editorElemMenu"
                  style={{ backgroundColor: '#f1f1f1', border: "1px solid #ccc" }}
                  className="editorElem-menu">

                </div>
                <div
                  style={{
                    padding: "0 10px",
                    overflowY: "scroll",
                    height: 300,
                    border: "1px solid #ccc",
                    borderTop: "none"
                  }}
                  ref="editorElemBody" className="editorElem-body">

                </div>
              </div>
            </div>
          )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="附件">
          {form.getFieldDecorator('files')(
            <Upload {...uploadProps}>
              <Button>
                <Icon type="upload" /> 上传
            </Button>
            </Upload>
            )}
        </FormItem>
        <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="发布范围">
          {/* {form.getFieldDecorator('releaseScope')( */}
            <CheckboxGroup
              options={plainOptions}
              value={this.state.checkedList}
              onChange={this.onChangeCheckbox}
            />
            )}
        </FormItem>
      </Modal>
    );
  }
}


export default NoticeEditForm;