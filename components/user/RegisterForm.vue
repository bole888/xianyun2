<template>
  <el-form :model="registerdata" ref="registerform" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input v-model="registerdata.username" placeholder="用户名手机"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="captcha">
      <el-input v-model="registerdata.captcha" placeholder="验证码">
        <template slot="append">
          <el-button @click="handleSendCaptcha">发送验证码</el-button>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="nickname">
      <el-input v-model="registerdata.nickname" placeholder="你的名字"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input v-model="registerdata.password" placeholder="密码" type="password"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="checkpassword">
      <el-input v-model="registerdata.checkpassword" placeholder="确认密码" type="password"></el-input>
    </el-form-item>

    <el-button class="submit" type="primary" @click="handleRegSubmit">注册</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
      const validateusername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名手机"));
      } else {
        if (!/^[1]([3-9])[0-9]{9}$/.test(value)) {
          callback(new Error("手机号码格式有误，请重填"));
        } else {
          callback();
        }
      }
    };
    const validatepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.registerdata.checkpassword !== "") {
          this.$refs.registerform.validateField("checkpassword");
        }
        callback();
      }
    };

    const validatecheckpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入确认密码"));
      } else if (value !== this.registerdata.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };


    return {
      registerdata: {
        username:"",
        captcha: "",
        nickname: "",
        password: "",
        checkpassword: ""
      },
      rules: {
        username: [{ validator: validateusername, trigger: "blur" }],
        captcha: { required: true, message: "请输入验证码", trigger: "blur" },
        nickname: { required: true, message: "请输入昵称", trigger: "blur" },
        password: [{ validator: validatepassword, trigger: "blur" }],
        checkpassword: [{ validator: validatecheckpassword, trigger: "blur" }]
      }
    };

  
  },

  methods: {
    handleSendCaptcha() {
      if(this.registerdata.username===''){
          return 
      }
       this.$store.dispatch('user/getCaptcha',{tel:this.registerdata.username})
       .then(res=>{
             this.$message.success('验证码是:000000')
          })
    },
    handleRegSubmit() {
      
       this.$refs['registerform'].validate((valid) => {
          if (valid) {
             const {checkpassword,...props} = this.registerdata
      this.$store.dispatch('user/RegSubmit',props)
      this.$message.success('注册成功')
      this.$router.push({path:'/'})
          }
          })
    }
  }
};
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