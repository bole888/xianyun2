<template>
  <div class="search-form">
    <el-row class="search-tab" type="flex" justify="center" align="middle">
      <span
        v-for="(item,index) in ['单程','往返']"
        :key="index"
        :class="{active:current===index}"
        @click="handleclick(index)"
      >{{item}}</span>
    </el-row>

    <el-form class="search-form-content" label-width="80px">
      <el-form-item label="出发城市">
        <el-autocomplete
          class="el-autocomplete"
          v-model="searchInfo.departCity"
          :fetch-suggestions="querydepSearch"
          placeholder="请搜索出发城市"
          
          @select="handledepSelect"
          @blur="handledepBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="到达城市">
        <el-autocomplete
          class="el-autocomplete"
          v-model="searchInfo.destCity"
          :fetch-suggestions="querydestSearch"
          placeholder="请搜索到达城市"
          
          @select="handledestSelect"
           @blur="handledestBlur"
        ></el-autocomplete>
      </el-form-item>
      <el-form-item label="出发时间">
        <!-- <el-col :span="6">
        <el-form-item prop="date1">-->
        <el-date-picker
         @change="handleDate"
          type="date"
          placeholder="选择日期"
          :picker-options="pickerOptions1"
          v-model="searchInfo.departDate" 
          style="width: 100%;"
        ></el-date-picker>
        <!-- </el-form-item>
        </el-col>-->
      </el-form-item>
      <el-button type="primary" style="width:100%;" @click="onsearch">
        <i class="el-icon-search"></i>搜索
      </el-button>
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
             current:0,
             deparr:[],
             destarr:[],

            searchInfo:{
                departCity:'',
                departCode:'',
                destCity:'',
                destCode:'',
                departDate:''
            },

         pickerOptions1: {
            disabledDate(time) {
            return time.getTime()+3600 * 1000 * 24 < Date.now();
          }
        }
        }     
    },


    methods: {
        handleclick(index){
            // this.current=index;
            if(index===1){
             this.$alert('目前暂不支持往返，请使用单程选票！', '提示', {
               confirmButtonText: '确定',
                type: 'warning'
              });
            }
        },
        handleDate(value){
            // console.log(value);
           this.searchInfo.departDate=moment(value).format('YYYY-MM-DD');
            console.log(this.searchInfo.departDate);    
        },
          
        handleReverse(){
            const {destCode,destCity,departCode,departCity}=this.searchInfo;
            this.searchInfo.departCity=destCity;
            this.searchInfo.departCode=destCode;

            this.searchInfo.destCity=departCity;
           this.searchInfo.destCode=departCode;
        },

         handledepSelect(item) {
        console.log(item);
        this.searchInfo.departCity=item.value;
        this.searchInfo.departCode=item.sort
        // console.log(this.searchInfo.departCode);
        
      },
         handledestSelect(item) {
        console.log(item);
        this.searchInfo.destCity=item.value;
        this.searchInfo.destCode=item.sort;
      },
         
         handledepBlur(){
            if(this.deparr.length===0){
                return;
            }          
            this.searchInfo.departCity=this.deparr[0].value;
            this.searchInfo.departCode=this.deparr[0].sort;
         },
         handledestBlur(){
             if(this.destarr.length===0){
                 return;
             }
             this.searchInfo.destCity=this.destarr[0].value;
             this.searchInfo.destCode=this.destarr[0].sort;
         },

         querySearch(value){
      return this.$axios({
              url:"/airs/city",
              params:{name:value}
          }).then(res=>{
              console.log(res);
               let arr= res.data.data.map(v=>{
                   v.value=v.name.replace('市','')
                   return v;
              })     
              return arr;             
            })
         },

      querydepSearch(value,cb){
        console.log(value);
        
          if(!value){
              this.deparr=[];
              cb([]);
              return;
          }
          this.querySearch(value).then(arr=>{
              this.deparr=arr;
               cb(arr);  
          })        
      },
      querydestSearch(value,cb){
          if(!value){
              this.destarr=[];
              cb([]);
              return;
          }
          this.querySearch(value).then(arr=>{
              this.destarr=arr;
                 cb(arr);
          })       
      },

      onsearch(){
          if(!this.searchInfo.departCity){
              this.$message.error('请输入出发城市');
              return;
          }
          if(!this.searchInfo.destCity){
              this.$message.error('请输入到达城市');
              return;
          }
          if(!this.searchInfo.departDate){
              this.$message.error('请选择日期');
              return;
          }

          this.$store.commit('air/sethistory',this.searchInfo)
            console.log(this.searchInfo);
            
          this.$router.push({
              path:'air/flights',
              query:this.searchInfo
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