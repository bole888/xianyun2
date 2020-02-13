<template>
 <section class="contianer">
        <el-row  type="flex" justify="space-between">

            <!-- 顶部过滤列表 -->
            <div class="flights-content">
                <!-- 过滤条件 -->
                <Filters :data='origindata' @getdata='getdata'></Filters>
                
                
                <!-- 航班头部布局 -->
                 <FlightsHead></FlightsHead>
                
                
                <!-- 航班信息 -->
                <FlightsItem :item='item' 
                v-for="(item,index) in flightlist" :key="index"></FlightsItem>
           
            <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination> 
            </div>

            <!-- 侧边栏 -->
            <div class="aside">
                <!-- 侧边栏组件 -->
            </div>
        </el-row>
        
    </section>
   
</template>

<script>
import FlightsHead from '@/components/air/flightsHead.vue'
import FlightsItem from '@/components/air/flightsItem.vue'
import Filters from '@/components/air/filters.vue'
export default {
    components: {
        FlightsHead,FlightsItem,Filters
    },

    data () {
        return {
            // 机票总数据 （有info, flights, total, options这些属性）
            flightsdata:{
                flights:[],
                info:{},
                options:{}
            },
            origindata:{
                  flights:[],
                info:{},
                options:{}
            },
            
            pagesize:5,
            currentPage:1,
            total:0
        }
    },

    mounted () {
        this.$axios({
            url:'/airs',
            params:this.$route.query
        }).then(res=>{
            console.log(res);
            this.flightsdata=res.data
            // this.flightlist=this.flightsdata.flights

            // 备份数据
            this.origindata={...res.data}
            this.total=res.data.total
        })
    },

    methods: {
        handleCurrentChange(val){
            console.log(val);
            this.currentPage=val
        },
        handleSizeChange(val){
             console.log(val);
             this.pagesize=val
        },

        getdata(arr){
            this.flightsdata.flights=arr;
            this.total=arr.length;
        }
    },

    computed: {
        flightlist(){
            if(!this.flightsdata.flights){
                return [];
            }
            let arr=  this.flightsdata.flights.slice(this.pagesize*(this.currentPage-1),
             this.currentPage*this.pagesize);
  
            return arr;
        }
    }

}
</script>

<style scoped lang="less">
    .contianer{
        width:1000px;
        margin:20px auto;
    }

    .flights-content{
        width:745px;
        font-size:14px;
    }

    .aside{
        width:240px;
    } 
</style>