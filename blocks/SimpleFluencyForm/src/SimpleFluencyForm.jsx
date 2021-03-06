

import React, { Component } from 'react';
import IceCard from '@icedesign/card';
import { Step, Grid, Input, Button } from '@icedesign/base';
import { FormBinderWrapper, FormBinder, FormError } from '@icedesign/form-binder';
import './SimpleFluencyForm.scss';

const { Row, Col } = Grid;
const telPattern = /^(1[\d]{1}[\d]{9})|(((400)-(\d{3})-(\d{4}))|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)$|^([ ]?)$/;

export default class SimpleFluencyForm extends Component {
  static displayName = 'SimpleFluencyForm';

  static propTypes = {
  };

  static defaultProps = {
  };

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      formValue: {
        username: '',
        email: '',
        phone: '',
        address: '',
      },
    };
  }

  // ICE: React Component 的生命周期
  // http://ice.alibaba-inc.com/docs/guide/intro-react#React-组件的生命周期
  componentWillMount() {

  }

  componentDidMount() {

  }

  componentWillReceiveProps() {

  }

  componentWillUnmount() {

  }

  formChange = (newValue) => {
    this.setState({
      formValue: newValue,
    });
  };

  nextStep = () => {
    this.form.validateAll((error, value) => {
      console.log(value);
      if (!error || error.length === 0) {
        this.setState({ step: this.state.step + 1 });
      }
    });
  };

  renderStep = (step) => {
    if (step === 0) {
      const { username, email, phone, address } = this.state.formValue;
      const initValue = {
        username, email, phone, address,
      };
      return (
        <IceCard style={styles.form}>
          <FormBinderWrapper
            ref={(form) => { this.form = form; }}
            value={initValue}
            onChange={this.formChange}
          >
            <div>
              <Row style={styles.formRow}>
                <Col fixedSpan={8} style={styles.formLabel}>
                  <span>姓名：</span>
                </Col>
                <Col span={12}>
                  <FormBinder required message="必填项"><Input name="username" /></FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="username" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col fixedSpan={8} style={styles.formLabel}>
                  邮箱：
                </Col>
                <Col span={12}>
                  <FormBinder type="email" required message="邮箱不合法"><Input name="email" /></FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="email" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col fixedSpan={8} style={styles.formLabel}>
                  电话：
                </Col>
                <Col span={12}>
                  <FormBinder required message="请输入合法的电话号码" pattern={telPattern} triggerType="onBlur"><Input name="phone" /></FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="phone" />
                  </div>
                </Col>
              </Row>
              <Row style={styles.formRow}>
                <Col fixedSpan={8} style={styles.formLabel}>
                  地址：
                </Col>
                <Col span={12}>
                  <FormBinder><Input required message="必填" multiple name="address" /></FormBinder>
                  <div style={styles.formErrorWrapper}>
                    <FormError name="address" />
                  </div>
                </Col>
              </Row>

              <Row>
                <Col fixedOffset={8}>
                  <Button onClick={this.nextStep} type="primary">下一步</Button>
                </Col>
              </Row>
            </div>
          </FormBinderWrapper>
        </IceCard>
      );
    } else if (step === 1) {
      return (
        <IceCard>
          <span>步骤二</span>
        </IceCard>
      );
    } else if (step === 2) {
      return (
        <IceCard>
          <span>步骤三</span>
        </IceCard>
      );
    }
  };

  render() {
    return (
      <div className="simple-fluency-form" style={styles.simpleFluencyForm}>
        <IceCard>
          <Step current={this.state.step} type="dot">
            <Step.Item key={0} title="填写信息" />
            <Step.Item key={1} title="确认信息" />
            <Step.Item key={2} title="完成" />
          </Step>
        </IceCard>
        {this.renderStep(this.state.step)}
      </div>
    );
  }
}

const styles = { formLabel: { textAlign: 'right', lineHeight: '1.7rem', paddingRight: '10px' }, formRow: { marginBottom: '20px' }, form: { padding: '40px 0 20px' }, formErrorWrapper: { marginTop: '5px' }, simpleFluencyForm: {} };
