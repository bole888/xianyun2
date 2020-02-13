<template>
    <div class="filters" >
        <el-row type="flex" class="filters-top" justify="space-between" align="middle"
        >
            <el-col :span="8">
                单程： 
                {{data.info.departCity}} -  {{data.info.destCity}}
                / 
                {{data.info.departDate}}
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airport" placeholder="起飞机场" @change="handleAirport">
                    <el-option v-for="(item,index) in data.options.airport"
                    :key="index"
                    :label="item"
                    :value="item"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="flightTimes"  placeholder="起飞时间" @change="handleFlightTimes">
                    <el-option 
                    v-for="(item,index) in data.options.flightTimes"
                    :key="index"
                    :label="`${item.from}:00 - ${item.to}:00`"
                    :value="`${item.from},${item.to}`"
                    >
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="company"  placeholder="航空公司" @change="handleCompany">
                    <el-option
                    v-for="(item,index) in data.options.company"
                    :key="index"
                    :label="item"
                    :value="item">
                    </el-option>
                </el-select>
            </el-col>
            <el-col :span="4">
                <el-select size="mini" v-model="airSize" placeholder="机型" @change="handleAirSize">
                    <el-option
                   v-for="(item,index) in planeSizes"
                   :key="index"
                    :label="item.name"
                    :value="item.size">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="filter-cancel">
            筛选：
            <el-button 
                       type="primary" 
                       round 
                       plain 
                       size="mini" 
                       @click="handleFiltersCancel">
                撤销
    		</el-button>
        </div>
        <span>{{filter}}</span>
    </div>
</template>



<script>
export default {
    props: {
        data:{
            type:Object,
            default:{}
        }
    },
    data () {
        return {
            planeSizes:[
               {name:'大', size:'L'},
               {name:'中', size:'M'},
               {name:'小', size:'S'}
            ],
            airport:'',
            flightTimes:'',
            company:'',
            airSize:''
        }
    },

      computed: {
          filter(){
                const  newdata=this.data.flights.filter(v=>{
                    let flag=true;
                 if(this.airport&& this.airport!==v.org_airport_name){
                     flag=false;
              }
                 if(this.company&& this.company!==v.airline_name){
                     flag=false;
              }
                 if(this.airSize&& this.airSize!==v.plane_size){
                     flag=false;
              }
                 
                 if(this.flightTimes){
                     let hour= Number(v.dep_time.split(':')[0])
                     const deparr=this.flightTimes.split(',')
                if(hour<Number(deparr[0]) || hour>=Number(deparr[1])){
                     flag=false;
                  }
                 }

                   return flag;        
                })
                this.$emit('getdata',newdata);
                return '';
          }
      },
     methods: {
        // 选择机场时候触发
        handleAirport(value){
            // const temp=this.data.flights.filter(v=>{
            //     return v.org_airport_name===value
            // })
            // this.$emit('getdata',temp)
        },

        // 选择出发时间时候触发
        handleFlightTimes(value){
        //      const temp= value.split(',');
        //   const newdata= this.data.flights.filter(v=>{     
        //       const hour=Number(v.dep_time.split(':')[0]);         
        //   return  Number(temp[0])<=hour&& hour<Number(temp[1])   
        //     })
        //     this.$emit('getdata',newdata)
        },

         // 选择航空公司时候触发
        handleCompany(value){
        //     console.log(value);
        //     this.company=value
        //    const newdata= this.data.flights.filter(v=>{
        //        return v.airline_name===value
        //     })
        //     this.$emit('getdata',newdata)
        },

         // 选择机型时候触发
        handleAirSize(value){
            //  console.log(value);
            //  this.airSize=value
            //  const sizedata= this.data.flights.filter(v=>{
                 
            //       return   v.plane_size===value
            //  })
            //  console.log(sizedata);
             
            // this.$emit('getdata',sizedata)
        },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
           
                      this.airport='';
                      this.flightTimes='';
                      this.company='';
                      this.airSize='';
          
            // this.$emit('getdata',flights)
        },
    }

}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>