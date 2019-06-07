import React, { Component } from 'react'
import Title from '../SimpleTitle'
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  StatusBar,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native'

import {IP as ip} from '../serverConfig.json'

let reg = /^1[3|4|5|7|8][0-9]{9}$/
let pswReg = /^(?![a-z]+$)(?![A-Z]+$)(?![0-9]+$)(?![.@_]+$)[a-zA-Z0-9.@_]{8,16}$/
export default class Login extends Component {
  constructor(props) {
    super(props) 
    this.state = {
      viewStatus: 0,
      text: '',
      password: '',
      rePassword: '',
      textCheck: '',
      passwordCheck: '',
      rePasswordCheck: '',
    }
    this.changeView = this.changeView.bind(this)
    this.changeText = this.changeText.bind(this)
    this.login = this.login.bind(this)
  }
  static navigationOptions = ({ navigation }) => {
    return {
      headerTitle: <View style={styles.title}>
        <Text style={styles.titleName}>登录与注册</Text>
      </View>,
      gesturesEnabled: true,
    };
  };
  changeText(e) {
    let text = e.nativeEvent.text
    this.setState({
      text
    })
    if (!reg.test(text)) {
      this.setState({
        textCheck: '手机号格式错误'
      })
    } else {
      this.setState({
        textCheck: '格式正确'
      })
    }
  }
  changePassword(e) {
    let password = e.nativeEvent.text
    this.setState({
      password
    })
    if (password.length < 8 || password.length > 16) {
      this.setState({
        passwordCheck: '密码长度为8-16位'
      })
    } else {
      if (!pswReg.test(password)) {
        this.setState({
          passwordCheck: '至少包含数字、字母、特殊符号(@._)两种'
        })
      } else {
        this.setState({
          passwordCheck: '格式正确'
        })
      }
    }
  }
  changeRePassword(e) {
    let rePassword = e.nativeEvent.text
    this.setState({
      rePassword
    })
    if (this.state.password.length === rePassword.length) {
      if (this.state.passwordCheck === '格式正确') {
        this.setState({
          rePasswordCheck: '密码确认成功'
        })
      }
    } else {
      this.setState({
        rePasswordCheck: '与原密码不同'
      })
    }
  }
  changeView() {
    this.setState({
      viewStatus: this.state.viewStatus === 0 ? 1 : 0,
    })
  }
  login() {
    let text = this.state.text
    let password = this.state.password
    let body = {
      text: text,
      password: password
    }
    if (this.state.textCheck === '格式正确' && this.state.passwordCheck === '格式正确') {
      fetch(`${ip}/post/login`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }).then((response) => response.json()).then((responseJson) => {
        if (responseJson.status === 200) {
          this.setState({
            passwordCheck: responseJson.message
          })
          AsyncStorage.setItem('user', JSON.stringify(responseJson.user))
          let appThis = this.props.navigation.getParam('appThis');
          appThis.setState({
            user: responseJson.user
          })
          this.props.navigation.goBack()
        } else {
          this.setState({
            passwordCheck: responseJson.message
          })
        }
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent={false}
          backgroundColor={'white'}
          barStyle={'dark-content'}
        />
        <View style={{display: this.state.viewStatus === 0 ? 'flex' : 'none'}}>
          <TextInput
            style={styles.text}
            placeholder={'手机号'}
            textContentType={'telephoneNumber'}
            onChange={(text) => this.changeText(text)}
          />
          <Text 
            style={[styles.check, this.state.textCheck === '格式正确' ? styles.right : styles.wrong]}
          >{this.state.textCheck}</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.password}
            placeholder={'密码'}
            value={this.state.password}
            onChange={(text) => this.changePassword(text)}
          />
          <Text
            style={[styles.check, this.state.passwordCheck === '格式正确' ? styles.right : styles.wrong]}
          >{this.state.passwordCheck}</Text>
          <TouchableHighlight
            style={styles.login}
            underlayColor={'rgb(247, 64, 26)'}
            onPress={this.login}
          >
            <Text style={styles.loginText}>登录</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.return}
            onPress={this.changeView}
            underlayColor={'#eee'}
          >
            <Text style={styles.returnText}>注册</Text>
          </TouchableHighlight>
        </View>
        <View style={{display: this.state.viewStatus === 1 ? 'flex' : 'none'}}>
          <TextInput
            style={styles.text}
            placeholder={'手机号'}
            value={this.state.text}
            onChange={(text) => this.changeText(text)}
          />
          <Text 
            style={[styles.check, this.state.textCheck === '格式正确' ? styles.right : styles.wrong]}
          >{this.state.textCheck}</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.password}
            placeholder={'密码'}
            value={this.state.password}
            onChange={(text) => this.changePassword(text)}
          />
          <Text
            style={[styles.check, this.state.passwordCheck === '格式正确' ? styles.right : styles.wrong]}
          >{this.state.passwordCheck}</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.password}
            placeholder={'确认密码'}
            value={this.state.rePassword}
            onChange={(text) => this.changeRePassword(text)}
          />
          <Text
            style={[styles.check, this.state.rePasswordCheck === '密码确认成功' ? styles.right : styles.wrong]}
          >{this.state.rePasswordCheck}</Text>
          <TouchableHighlight
            style={styles.reg}
            underlayColor={'rgb(237, 54, 16)'}
          >
            <Text style={styles.regText}>注册</Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={this.changeView}
            style={styles.return}
            underlayColor={'#eee'}
          >
            <Text style={styles.returnText}>返回</Text>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 15,
    paddingRight: 15,
  },
  check: {
    marginLeft: 11,
    fontSize: 14,
  },
  password: {
    fontSize: 16,
    height: 45,
    paddingBottom: 3,
    margin: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#aaa'
  },
  login: {
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    borderRadius: 5,
    backgroundColor: 'rgb(237, 54, 16)',
    marginTop: 40,
  }, 
  loginText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  return: {
    paddingTop: 9,
    paddingBottom: 9,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#bbb'
  },
  reg: {
    paddingTop: 9,
    paddingBottom: 9,
    margin: 10,
    borderRadius: 5,
    borderColor: 'rgb(237, 54, 16)',
    borderWidth: 1,
    backgroundColor: 'white',
    marginTop: 40,
  },
  regText: {
    color: 'rgb(237, 54, 16)',
    fontSize: 16,
    textAlign: 'center',
  },
  returnText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
  },
  right: {
    color: 'rgb(54, 237, 16)',
  },
  text: {
    fontSize: 16,
    height: 45,
    paddingBottom: 3,
    margin: 11,
    borderBottomWidth: 1,
    borderBottomColor: '#999'
  },
  title: {
    height: 25,
    paddingLeft: 15,
  },
  titleName: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  wrong: {
    color: 'rgb(237, 54, 16)',
  }
})