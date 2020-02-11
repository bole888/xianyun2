<template>
    <el-form :model='logindata' :rules='rules' ref="loginform">
        <el-form-item prop='username' label='用户名'>
            <el-input v-model="logindata.username" placeholder='请输入用户名/手机号码'></el-input>
        </el-form-item>
        <el-form-item prop='password' label='密码'>
            <el-input v-model="logindata.password" placeholder='请输入密码'></el-input>
        </el-form-item>
        <el-button type='primary' @click="onlogin">登录</el-button>
    </el-form>
</template>

<script>
export default {
    data () {
        return {
            logindata:{
                username:'13813813800',
                password:'123'
            },
            rules:{
                username:  { required: true, message: '请输入用户名/手机号码', trigger: 'blur' },
                password:  { required: true, message: '请输入密码', trigger: 'blur' }
            }
        }
    },

    methods: {
        onlogin(){
             this.$refs['loginform'].validate((valid) => {
          if (valid) {
              this.$store.dispatch('user/login', this.logindata)
              .then(res=>{
                  this.$message.success('登陆成功')
                  this.$router.push('/')
              })
              
          } 
        });
        }
    }

}
</script>

<style>

</style>