<template>
  <div class="movie_body" ref="movie">
    <Loading v-if="isLoading"/>
    <Scroller v-else :handleToScroll="handleToScroll" :handleTouchEnd="handleTouchEnd">
      <ul>
        <li class="pullDown">{{ pollDownMsg }}</li>
        <li v-for="item in movieList" :key="item.id">
          <div class="pic_show" @tap="handleToDetail">
            <img :src="item.img | setWH('128.180')" alt />
          </div>
          <div class="info_list">
            <h2>
              {{item.nm}}
              <img v-if="item.version" src="@/assets/maxs.png" alt />
            </h2>
            <p>
              观众评分：
              <span class="grade">{{item.sc}}</span>
            </p>
            <p>主演: {{item.star}}</p>
            <p>{{item.showInfo}}</p>
          </div>
          <div class="btn_mall">购票拉</div>
        </li>
      </ul>
    </Scroller>
  </div>
</template>
<script>
// import Bscroll from "better-scroll";
export default {
  name: "NowPlaying",
  data() {
    return {
      movieList: [],
      pollDownMsg: "",
      isLoading:true,
      prevCityId : -1
    };
  },
  activated() {
    // console.log(123)
 var cityId = this.$store.state.city.id;  //如果prevCityId === cityId 没有切换城市就不用触发return，反之触发向下执行
//  console.log(cityId)
if( this.prevCityId === cityId){return;}  //注意这里是响应式数据 一定得加this.prevCityId
        this.isLoading =true;
console.log(123)
    //   初始的时候触发了，当你切换的时候没有触发
    //当系统缓存存在的时候 keep-alive   mounted生命周期不会在触发的  activated可以
    this.axios.get("/api/movieOnInfoList ? cityId="+cityId).then(res => {
      var msg = res.data.msg;
      if (msg === "ok") {
        this.movieList = res.data.data.movieList;
this.isLoading =false;
        this.prevCityId = cityId;
        // console.log(this.movieList);
        // console.log(res.data.data.movieList)
        // this.$nextTick(() => {
        //   var scroll = new Bscroll(this.$refs.movie, {
        //     tap: true,
        //     probeType: 1
        //   });
        //   scroll.on("scroll", pos => {
        //     if (pos.y > 30) {
        //       //pos.y 拖拽的y轴距离
        //       this.pollDownMsg = "正在更新中";
        //     }
        //     // console.log('scroll')
        //   });
        //   scroll.on("touchEnd", pos => {
        //     // console.log('touchend')
        //     if (pos.y > 30) {
        //       //pos.y 拖拽的y轴距离
        //       this.axios.get("/api/movieOnInfoList ? cityId=11").then(res => {
        //         if (msg === "ok") {
        //           this.pollDownMsg = "更新成功";
        //           setTimeout(() => {
        //             this.movieList = res.data.data.movieList;
        //             this.pollDownMsg = "";
        //           }, 1000);
        //         }
        //       });
        //     }
        //   });
        // });
        //保证数据完全渲染完毕后触发下面这个 this.$nextTick();
      }
    });
  },
  methods: {
    handleToDetail() {
      console.log("handleToDetail");
    },
    handleToScroll(pos) {
      if (pos.y > 30) {
        //pos.y 拖拽的y轴距离
        this.pollDownMsg = "正在更新中";
      }
    },
    handleTouchEnd(pos) {
      if (pos.y > 30) {
        //pos.y 拖拽的y轴距离
        this.axios.get("/api/movieOnInfoList ? cityId=11").then(res => {
          var msg = res.data.msg;
          if (msg === "ok") {
            this.pollDownMsg = "更新成功";
            setTimeout(() => {
              this.movieList = res.data.data.movieList;
              this.pollDownMsg = "";
            }, 1000);
          }
        });
      }
    }
  }
};
</script>
<style  scoped>
#content .movie_body {
  flex: 1;
  overflow: auto;
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
}
.movie_body ul li {
  margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body .pic_show {
  width: 64px;
  height: 90px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
.movie_body .pullDown {
  margin: 0;
  padding: 0;
  border: none;
}
</style>