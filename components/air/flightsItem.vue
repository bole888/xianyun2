<template>
    <div class="flight-item">
        <div @click="isshow=!isshow">
            <!-- 显示的机票信息 -->
            <el-row type="flex" align="middle" class="flight-info">
                <el-col :span="6">
                    <span>{{flyobj.airline_name}} </span> {{flyobj.flight_no}}
                </el-col>
                <el-col :span="12">
                    <el-row type="flex" justify="space-between" class="flight-info-center">
                        <el-col :span="8" class="flight-airport">
                            <strong>{{flyobj.dep_time}}</strong>
                            <span>{{flyobj.org_airport_name}}{{flyobj.org_airport_quay}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-time">
                            <span>{{ranktime}}</span>
                        </el-col>
                        <el-col :span="8" class="flight-airport">
                            <strong>{{flyobj.arr_time}}</strong>
                            <span>{{flyobj.dst_airport_name}}{{flyobj.dst_airport_quay}}</span>
                        </el-col>
                    </el-row>
                </el-col>
                <el-col :span="6" class="flight-info-right">
                    ￥<span class="sell-price">{{flyobj.base_price/2}}</span>起
                </el-col>
            </el-row>
        </div>
        <div class="flight-recommend"  v-show="isshow"
         v-for="(item,index) in flyobj.seat_infos" :key="index">
            <!-- 隐藏的座位信息列表 -->
            <el-row type="flex"  justify="space-between" align="middle">
                <el-col :span="4">低价推荐</el-col>
                <el-col :span="20">
                    <el-row type="flex" justify="space-between" align="middle" class="flight-sell">
                        <el-col :span="16" class="flight-sell-left">
                            <span>{{item.group_name}}</span> | {{item.supplierName}}
                        </el-col>
                        <el-col :span="5" class="price">
                            ￥{{item.par_price}}
                        </el-col>
                        <el-col :span="3" class="choose-button">
                            <el-button 
                            @click="handlechoose(flyobj.id,item.seat_xid)"
                            type="warning" 
                            size="mini">
                            选定
                            </el-button>
                            <p>剩余：{{item.discount}}</p>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        flyobj:{
            type:Object,
            default:{}
        }
    },
    data () {
        return {
            isshow:false,
            // orderinfo:{
            //     id:'',
            //     seat_xid:''
            // }
        }
    },

    computed: {
        ranktime(){
            let endarr=this.flyobj.arr_time.split(':');
           let end= endarr[0]*60 + Number(endarr[1])

           const deparr=this.flyobj.dep_time.split(':');
           let dep= deparr[0]*60 + Number(deparr[1]);

               if(end<dep){
                   end+=24*60;
               }
           const hour= Math.floor((end-dep)/60);
           const min= (end-dep)%60;

           return hour+'小时'+min+'分钟'
        }
    },

    methods: {
        handlechoose(id,seat_xid){
            this.$router.push({
                path:'/air/order',
                query:{
                    id,seat_xid
                }
            })

        }
    }

}
</script>

<style scoped lang="less">
    .flight-item{
        border:1px #ddd solid;
        margin-bottom: 10px;

        .flight-info{
            padding:15px;
            cursor: pointer;

            > div{
                &:first-child, &:last-child{
                    text-align: center;
                }
            }
        }

        .flight-info-center{
            padding:0 30px;
            text-align: center;

            .flight-airport{
                strong{
                    display: block;
                    font-size:24px;
                    font-weight: normal;
                }
                span{
                    font-size: 12px;
                    color:#999;
                }
            }

            .flight-time{
                span{
                    display: inline-block;
                    padding:10px 0;
                    border-bottom: 1px #eee solid;
                    color:#999;
                }
            }
        }

        .flight-info-right{
            
            .sell-price{
                font-size: 24px;
                color:orange;
                margin:0 2px;
            }
        }
    }

    .flight-recommend{
        background: #f6f6f6;
        border-top:1px #eee solid;
        padding:0 20px;

        .flight-sell{
            border-bottom:1px #eee solid;
            padding:10px 0;

            &:last-child{
                border-bottom: none;
            }

            .flight-sell-left{
                font-size: 12px;
                span{
                    color:green;
                }
            } 

            .price{
                font-size: 20px;
                color:orange;
            }

            .choose-button{
                text-align: center;
                color:#666;
                button{
                    display: block;
                    width:100%;
                    margin-bottom:5px;
                }
            }
        }
    }
</style>