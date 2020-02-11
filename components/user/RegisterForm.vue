<template>
  <el-form :model="registerInfo" :rules="rules" ref="registerForm" label-width="100px" class="form">
    <el-form-item label="账号" prop="username" class="form-item">
      <el-input v-model="registerInfo.username" placeholder="请输入用户名/手机号码"></el-input>
    </el-form-item>
    <el-form-item label="验证码" prop="captcha" class="form-item">
      <el-input v-model="registerInfo.captcha" placeholder="请输入验证码">
        <template slot="append">
          <el-button @click="sendcaptchas">获取验证码</el-button>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nickname" class="form-item">
      <el-input v-model="registerInfo.nickname" placeholder="请输入昵称"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password" class="form-item">
      <el-input v-model="registerInfo.password" placeholder="请输入密码"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkpassword" class="form-item">
      <el-input v-model="registerInfo.checkpassword" placeholder="请输入确认密码"></el-input>
    </el-form-item>

    <el-button type="primary" class="submit" @click="onRegister">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
        var validatepassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.registerInfo.checkpassword !== '') {
            this.$refs.registerForm.validateField('checkpassword');
          }
          callback();
        }
      };
      var validatecheckpassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入确认密码'));
        } else if (value !== this.registerInfo.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
       var validateusername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名/手机号码'));
        } else if(!(/^1[3456789]\d{9}$/.test(value)))  {
          callback(new Error('手机格式有误!请重新填写'));
        } else {
          callback();
        }
      };

    return {
      registerInfo: {
        username: "",
        captcha: "",
        nickname: "",
        password: "",
        checkpassword: ""
      },
      rules: {
        username: [{ validator: validateusername, trigger: "blur" }],
        captcha:{ required: true, message: '请输入验证码', trigger: 'blur' },
        nickname:{ required: true, message: '请输入昵称', trigger: 'blur' },
        password: [{ validator: validatepassword, trigger: "blur" }],
        checkpassword: [{ validator: validatecheckpassword, trigger: "blur" }]
      }
    };
  },

  methods: {
      sendcaptchas(){
         
      this.$store.dispatch('user/getcaptchas',{tel:this.registerInfo.username})
      .then(res=>{
          this.$message.success('验证码是:'+res.data.code)
      })
    },

      onRegister() {
           this.$refs['registerForm'].validate((valid) => {
          if (valid) {
               const  {checkpassword, ...props} = this.registerInfo
             this.$store.dispatch('user/getregisterdata',props)
             .then(res=>{
                 this.$message.success('注册成功')
                 this.$router.push('/')
             })
          } 
          })
       
      }
  }
}
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>