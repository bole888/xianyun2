<template>
    <el-form  label-width="80px" :model="userdata" :rules='rules' ref="loginform">
  <el-form-item label="用户名" prop='username'>
    <el-input v-model="userdata.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop='password'>
    <el-input v-model="userdata.password"></el-input>
  </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data () {
    return {
      userdata:{
        username:'13800138000',
        password:'123456'
      },

      rules:{
        username:[ { required: true, message: '请输入用户名', trigger: 'blur' }],
        password:[ { required: true, message: '请输入密码', trigger: 'blur' }]         
      }
    }
  },

  methods: {
    onSubmit(){
          this.$refs['loginform'].validate((valid) => {
          if (valid) {
                // this.$axios({
                //     url:'/accounts/login',
                //     method:'POST',
                //     data:this.userdata
                // }).then(res=>{
                //   console.log(res);
                //   const {data} =res 
                  
                //   this.$store.commit('user/setuserinfo',data)
                // })
                this.$store.dispatch('user/onSubmit',this.userdata)
                .then(res=>{
                   
                   this.$message.success('登录成功')
                   this.$router.push({path:'/'})

                })
               
          } 
        });
          

            
    }
  }

}
</script>

<style>

</style>