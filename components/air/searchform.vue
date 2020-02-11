<template>
    <div class="search-form">

        <!-- 头部tab切换 -->
        <el-row type="flex" class="search-tab">
            <span v-for="(item, index) in tabs" :key="index"
            @click="handleSearchTab(item, index)"
            :class="{active: index === currentTab}">
                <i :class="item.icon"></i>{{item.name}}
            </span>
        </el-row>

        <el-form class="search-form-content" ref="form" :model='airdata' label-width="80px">
            <el-form-item label="出发城市">
                <!-- fetch-suggestions 返回输入建议的方法 -->
                <!-- select 点击选中建议项时触发 -->
                <el-autocomplete
                :trigger-on-focus="false"
                v-model="airdata.departCity"
                :fetch-suggestions="queryDepartSearch"
                placeholder="请搜索出发城市"
                @select="handleDepartSelect"
                @blur="handleDepartblur"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
             <el-form-item label="到达城市">
                <el-autocomplete
                :trigger-on-focus="false"
                 v-model="airdata.destCity"
                :fetch-suggestions="queryDestSearch"
                placeholder="请搜索到达城市"
                @select="handleDestSelect"
                @blur="handleDestblur"
                class="el-autocomplete"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item label="出发时间"> 
                <!-- change 用户确认选择日期时触发 -->
                <el-date-picker type="date" 
                 v-model="airdata.departDate"
                placeholder="请选择日期" 
                style="width: 100%;"
                @change="handleDate">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="">
                <el-button style="width:100%;" 
                type="primary" 
                icon="el-icon-search"
                @click="handleSubmit">
                    搜索
                </el-button>
            </el-form-item>
            <div class="reverse">
                <span @click="handleReverse">换</span>
            </div>
        </el-form>  
      </div>
</template>

<script>
import moment from "moment";
export default {
    data () {
        return {
            tabs:[
                {icon: "iconfont icondancheng", name: "单程"},
                 {icon: "iconfont iconshuangxiang", name: "往返"}
            ],
            currentTab:0,
            departdata:[],
            destdata:[],

            airdata:{
                departCity:'',
                departCode:'',
                destCity:'',
                destCode:'',
                departDate:''
        }
    }
},

       methods: {
        handleSearchTab(item, index){
            this.currentTab===index

            if(index===1){
               this.$alert('目前暂不支持往返，请使用单程选票！', '提示', {
          confirmButtonText: '确定',
            type: 'warning'
        
        });
            }
        },

        queryDepartSearch(value,cb){          
              this.$axios({
                  url:'/airs/city',
                  params:{name:value}
              }).then(res=>{
                  console.log(res);

                  const {data}= res.data
                  const newdata=data.map(v=>{
                      v.value=v.name.replace('市','')
                      return v
                  })
                  this.departdata = newdata
                  cb(newdata)              
              })
        },
        queryDestSearch(value,cb){          
              this.$axios({
                  url:'/airs/city',
                  params:{name:value}
              }).then(res=>{
                  console.log(res);

                  const {data}= res.data
                  const newdata=data.map(v=>{
                      v.value=v.name.replace('市','')
                      return v
                  })
                  this.destdata = newdata
                  cb(newdata)              
              })
        },

        handleDepartSelect(item){
            console.log(item);
            this.airdata.departCity=item.value
            this.airdata.departCode=item.sort
            console.log(this.airdata.departCity);
            console.log(this.airdata.departCode);     
        },
        handleDestSelect(each){
            console.log(each);
            this.airdata.destCity=each.value
            this.airdata.destCode=each.sort
            console.log(this.airdata.destCity);
            console.log(this.airdata.destCode);     
        },

        handleDepartblur(data){
            if(this.departdata.length===0){
                return
            }
           this.airdata.departCity= this.departdata[0].value
           this.airdata.departCode= this.departdata[0].sort
        },
        handleDestblur(data){
            if(this.destdata.length===0){
                return
            }
           this.airdata.destCity= this.destdata[0].value
           this.airdata.destCode= this.destdata[0].sort
        },

        handleDate(value){
              this.airdata.departDate=moment(value).format("YYYY-MM-DD")
              console.log(this.airdata.departDate);      
        },

        handleReverse(){
            const {departCity,departCode,destCity,destCode} =this.airdata
             this.airdata.departCity=destCity
             this.airdata.departCode=destCode

             this.airdata.destCity=departCity
             this.airdata.destCode=departCode        
        },

        handleSubmit(){
             if(!this.airdata.departCity){
                 this.$message.error('请输入出发城市');
                 return;
             }
             if(!this.airdata.destCity){
                this.$message.error('请输入到达城市');
                 return;
             }
             if(!this.airdata.departDate){
                 this.$message.error('请选择日期');
                 return;
             }
            
             this.$router.push({
                 path:'/air/flights',
                 query:this.airdata
             })
        }
    }
}               
</script>

<style scoped lang="less">
.search-form{
    border:1px #ddd solid;
    border-top:none;
    width:360px;
    height:350px;
    box-sizing: border-box;
}

.search-tab{
  span{
    display: block;
    flex:1;
    text-align: center;
    height:48px;
    line-height: 42px;
    box-sizing: border-box;
    border-top:3px #eee solid;
    background:#eee;
  }

  .active{
    border-top-color: orange;
    background:#fff;
  }

  i{
    margin-right:5px;
    font-size: 18px;

    &:first-child{
      font-size:16px;
    }
  }
}

.search-form-content{
  padding:15px 50px 15px 15px;
  position: relative;

  .el-autocomplete{
    width: 100%;
  }
}

.reverse{
  position:absolute;
  top: 35px;
  right:15px;

  &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:-35px;
      width:25px;
      height:1px;
      background:#ccc;
  }

  &:after{
      top:0;
    }

    &:before{
      top:60px;
    }

  span{
    display: block;
    position:absolute;
    top: 20px;
    right:0;
    font-size:12px;
    background: #999;
    color:#fff;
    width:20px;
    height:20px;
    line-height: 18px;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:after,&:before{
      display: block;
      content: "";
      position: absolute;
      left:10px;
      width:1px;
      height:20px;
      background:#ccc;
    }

    &:after{
      top:-20px;
    }

    &:before{
      top:20px;
    }
  }
}
</style>