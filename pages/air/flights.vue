<template>
  <section class="contianer">
    <el-row type="flex" justify="space-between">
      <!-- 顶部过滤列表 -->
      <div class="flights-content">
        <!-- 过滤条件 -->
        <Filters :data="origindata" @getdata="getdata"></Filters>

        <!-- 航班头部布局 -->
        <FlightsHead></FlightsHead>

        <!-- 航班信息 -->
        <FlightsItem v-for="(item,index) in flylist" :key="index" :flyobj="item"></FlightsItem>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentpage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>

      <!-- 侧边栏 -->
      <div class="aside">
        <!-- 侧边栏组件 -->
        <FlightsAside :historydata="origindata.info"></FlightsAside>
      </div>
    </el-row>
  </section>
</template>

<script>
import FlightsHead from "@/components/air/flightsHead";
import FlightsItem from "@/components/air/flightsItem";
import Filters from "@/components/air/filters";
import FlightsAside from "@/components/air/flightsAside";
export default {
  components: {
    FlightsHead,
    FlightsItem,
    Filters,
    FlightsAside
  },
  data() {
    return {
      flydata: {
        flights: [],
        info: {},
        options: {}
      },
      origindata: {
        flights: [],
        info: {},
        options: {}
      },

      currentpage: 1,
      pagesize: 5,
      total: 0
    };
  },

  //  watch: {
  //        $route(){
  //            this.getflylist();
  //            this.currentpage=1;
  //        }
  //    },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
       this.currentpage = 1;
       next();
      this.getflylist();   
  },

  mounted() {
    this.getflylist();
    
  },

  methods: {
    getflylist() {
      this.$axios({
        url: "/airs",
        params: this.$route.query
      }).then(res => {
        console.log(res);
        this.flydata = res.data;
        this.origindata = { ...res.data };
        this.total = res.data.total;
      });
    },

    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.currentpage = val;
    },
    getdata(arr) {
      this.flydata.flylist = arr;
      this.total = arr.length;
    }
  },

  computed: {
    flylist() {
      if (!this.flydata.flights) {
        return [];
      }
      const arr = this.flydata.flights.slice(
        this.pagesize * (this.currentpage - 1),
        this.pagesize * this.currentpage
      );
      return arr;
    }
  }
};
</script>

<style scoped lang="less">
.contianer {
  width: 1000px;
  margin: 20px auto;
}

.flights-content {
  width: 745px;
  font-size: 14px;
}

.aside {
  width: 240px;
}
</style>

