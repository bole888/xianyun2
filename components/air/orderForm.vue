<template>
    <div class="main">
        <div class="air-column">
            <h2>乘机人</h2>
            <el-form class="member-info">
                <div class="member-info-item" v-for="(item,index) in userinfo.users" :key="index">

                    <el-form-item label="乘机人类型">
                        <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
                            <el-select 
                            slot="prepend" 
                            value="1" 
                            placeholder="请选择">
                                <el-option label="成人" value="1"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="证件类型">
                        <el-input 
                        placeholder="证件号码"  class="input-with-select" v-model="item.id">
                            <el-select 
                            slot="prepend" 
                            value="1"           
                            placeholder="请选择">
                                <el-option label="身份证" value="1" :checked="true"></el-option>
                            </el-select>
                        </el-input>
                    </el-form-item>

                    <span class="delete-user" @click="handleDeleteUser(index)">-</span>
                </div>
            </el-form>

            <el-button class="add-member" type='primary' @click="handleAddUsers">添加乘机人</el-button>
        </div>

        <div class="air-column">
            <h2>保险</h2>
            <div v-for="(item,index) in insurance_info" :key="index">
                <div class="insurance-item">
                    <el-checkbox 
                    @change="handleInsurance(item.id)"
                    :label="`${item.type}：￥${item.price}/份×1  最高赔付${item.compensation}`" 
                    border>
                    </el-checkbox> 
                </div>
            </div>
        </div>

        <div class="air-column">
            <h2>联系人</h2>
            <div class="contact">
                <el-form label-width="60px">
                    <el-form-item label="姓名" >
                        <el-input  v-model="userinfo.contactName"></el-input>
                    </el-form-item>

                    <el-form-item label="手机">
                        <el-input placeholder="请输入内容" v-model="userinfo.contactPhone">
                            <template slot="append">
                            <el-button @click="handleSendCaptcha">发送验证码</el-button>
                            </template>
                        </el-input>
                    </el-form-item>

                    <el-form-item label="验证码">
                        <el-input v-model="userinfo.captcha"></el-input>
                    </el-form-item>
                </el-form>   
                <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
            </div>
        </div>
       <span>{{allprice}}</span>
    </div>
</template>

<script>
export default {
    data () {
        return {
       userinfo :{
                users:[{username:'', id:'',}],    
                insurances:[],
                contactName:'',
                contactPhone:'',
                captcha:'',
                invoice:false,
                seat_xid:this.$route.query.seat_xid,
                air:this.$route.query.id
            },
            insurance_info:[],
            infodata:{}
            
        }
    },

    methods: {
        handleAddUsers(username,id){
            this.userinfo.users.push(
                {username:'', id:'',})
        },
        handleDeleteUser(index){
            this.userinfo.users.splice(index,1)
        },
        handleInsurance(id){
            const index= this.userinfo.insurances.indexOf(id)
            if(index<0){
                this.userinfo.insurances.push(id);
            }else{
                this.userinfo.insurances.splice(index,1);
            }
        },
        handleSendCaptcha(){                      
            if(!this.userinfo.contactPhone){
                return;
            }
            this.$store.dispatch('user/getcaptchas',{tel:this.userinfo.contactPhone})
            .then(res=>{
                 this.$message.success('验证码是:'+res.data.code);
            })
        },

        handleSubmit(){

                const rules={
                   users:{
                        errmessage:'乘机人不能空',
                        validator:()=>{
                        let valid=true;
                        this.userinfo.users.forEach(v=>{
                            if(!v.username|| !v.id){
                                valid=false;
                            }                        
                        })
                            return valid;
                    }
                   },
                    contactName:{
                       errmessage:'联系人不能空',
                       validator:()=>{
                           return !! this.userinfo.contactName;
                       }
                    },
                     contactPhone: {
                    errMessage: "手机号码不能为空",
                    validator: () => {
                        return !!this.userinfo.contactPhone;
                    }
                },
                // 校验验证码
                captcha: {
                    errMessage: "验证码不能为空",
                    validator: () => {
                        return !!this.userinfo.captcha;
                    }
                }
            }


           let valid=true;
            Object.keys(rules).forEach(v=>{
                 if(!valid){
                     return;
                 }

                 const item=rules[v];
                 valid=item.validator();
                  if(!valid){
                     this.$message.error(item.errMessage)
                 }          
            })

                     if(!valid){
                     return;
                 }

                 this.$axios({
                     url:'/airorders',
                     method:'POST',
                     data:this.userinfo,
                     headers:{Authorization:`Bearer ` +this.$store.state.user.userInfo.token}
                 }).then(res=>{
                     console.log(res);
                     this.$message.success('订单提交成功');
                 })
          }       
        },

    mounted () {
        const {id,seat_xid} = this.$route.query
        this.$axios({
            url:`/airs/`+id,
            params:{
            seat_xid: seat_xid}
        }).then(res=>{
            console.log(res);
            this.infodata=res.data;
            this.insurance_info=res.data.insurances;

            this.$store.commit('air/setorderDetail',this.infodata)
        })
    },

    computed: {
        allprice(){
             let price=0;
             
             if(!this.infodata.seat_infos){
                 return;
             }
             price+=this.infodata.seat_infos.org_settle_price;
             price+=this.infodata.airport_tax_audlet;
             this.infodata.insurances.forEach(v=>{
                 if(this.userinfo.insurances.indexOf(v.id)>-1){
                     price+=v.price
                 }
             })
             price*=this.userinfo.users.length;
             this.$store.commit('air/setallPrice',price);
             return '';
        }
    }

}
</script>

<style>

</style>