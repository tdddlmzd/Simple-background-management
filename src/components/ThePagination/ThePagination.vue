<template>
    <!-- 配置分页的组件 -->
    <section>
        <div class="pagination">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @prev-click="handleCurrentChange"
                @next-click="handleCurrentChange"
                :current-page.sync="page.pageNo"
                :page-size="page.pageSize"
                :page-sizes="[10, 50, 100, 200]"
                :total="page.total"
                layout="total, sizes, prev, slot, next"
                ref="pagination"
            >
                <ul class="pageUl">
                    <li class="pageLi" @click="changeCurrent(item)" v-for="item in showNumList" :key="item" :class="item == page.pageNo ? 'tePageLi' : ''">{{item}}</li>
                </ul>
            </el-pagination>
        </div>
    </section>
</template>
<script>
/**
 * 分页共通组件
 */
export default {
    name: "ThePagination",
    props: {
        /**
         * 定义 ThePagination组件特有的属性
         */
        attribute: {
            handleChange() {}
        },
        pageNumber: {
            type: Number,
        },
        visibilityHeight: {
            type: Number,
            default: 400
        },
        backPosition: {
            type: Number,
            default: 0
        },
    },
    data() {
        return {
            visible: false,
            interval: null,
            page: {
                // 当前页数
                pageNo: 1,
                // 每页默认显示条数
                pageSize: 10,
                // 总条数
                total: 0
            },
            showNumList: [], // 显示的页数
        };
    },
    methods: {
        handleScroll() {
            let scrollTop = document.querySelector('.el-main').pageYOffset || document.querySelector('.el-main').scrollTop
        },
        easeInOutQuad(t, b, c, d) {
            if ((t /= d / 2) < 1) return (c / 2) * t * t + b;
            return (-c / 2) * (--t * (t - 2) - 1) + b;
        },
        backTo(){
            const start = document.querySelector('.el-main').pageYOffset || document.querySelector('.el-main').scrollTop
            let i = 0;
            this.interval = setInterval(() => {
                const next = Math.floor(
                    this.easeInOutQuad(10 * i, start, -start, 500)
                );
                if (next <= this.backPosition) {
                    document.querySelector('.el-main').scrollTo(0, this.backPosition);
                    clearInterval(this.interval);
                } else {
                    document.querySelector('.el-main').scrollTo(0, next);
                }
                i++;
            }, 16.7);
        },
        /**
         * 选择每页多个条事件
         *
         * @param pageSize
         */
        handleSizeChange(pageSize) {
            this.page.pageNo = 1
            this.page.pageSize = pageSize;
            this.attribute.handleChange({
                pageNo: 1,
                pageSize: this.page.pageSize,
                total: this.page.total
            });
            setTimeout(() => {
                this.backTo()
            },500);
        },

        /**
         * 点击页码事件
         *
         * @param pageNo
         */
        changeCurrent(pageNo) {
            if(this.page.pageNo !== pageNo){
                this.page.pageNo = pageNo
                this.attribute.handleChange({
                    pageNo: this.page.pageNo,
                    pageSize: this.page.pageSize,
                    total: this.page.total
                });
            }
            setTimeout(() => {
                this.backTo()
            },500);
        },

        // 点击搜索事件
        handleCurrentChange(pageNo) {
            this.page.pageNo = pageNo
            this.attribute.handleChange({
                pageNo: this.page.pageNo,
                pageSize: this.page.pageSize,
                total: this.page.total
            })
            setTimeout(() => {
                this.backTo()
            },500);
        },

        changeValue() {
            this.$nextTick(()=>{
                this.$refs.pagination.$children[0].$el.innerHTML = '总共' + ' ' + this.page.total + ' ' + '条记录';
                var offsetPaginationWidth = Math.round(this.$refs.pagination.$children[0].$el.offsetWidth) + 10 + 'px';
                this.$refs.pagination.$children[1].$el.style.left =  offsetPaginationWidth;
            })
        },
    },
    computed: {
      pageNN () {
        var pageSize = this.page.pageSize
        var pageNo = this.page.pageNo
        var total = this.page.total
        return {
          pageSize,
          pageNo,
          total
        }
      },
    },    
    watch:{
        'pageNumber':{
            immediate:true,
            handler(newVal,oldVal){
                if(newVal === 1){
                    this.page.pageNo = newVal;
                }
            }
        },
        pageNN:{
            handler: function(val){
                if(val.total > 0){
                    var totalPage = 0
                    this.showNumList = []
                    if(val.total/val.pageSize > parseInt(val.total/val.pageSize)){   
                        totalPage=parseInt(val.total/val.pageSize)+1
                    }else{   
                        totalPage=parseInt(val.total/val.pageSize)
                    }
                    //最多放几个页码
                    var largePage = 7
                    var minNum = 1
                    var maxNum = 1

                    //第一次先判断大小
                    if(totalPage > largePage){
                        maxNum = largePage
                        //第二次根据当前点击判断大小
                        //取中间值
                        if(val.pageNo >= largePage/2){
                            //小
                            if(val.pageNo - parseInt(largePage/2) > 0){
                                minNum = val.pageNo - parseInt(largePage/2)
                            }else{
                                minNum = 1
                            }

                            //大
                            if(totalPage > val.pageNo + parseInt(largePage/2)){
                                maxNum = val.pageNo + parseInt(largePage/2)
                            }else{
                                maxNum = totalPage
                                if(val.pageNo - parseInt(largePage/2) > 0){
                                    minNum = val.pageNo - (largePage - (totalPage - val.pageNo + 1))
                                }else{
                                    minNum = 1
                                }
                            }
                        }else{
                            maxNum = largePage
                        }
                    }else{
                        //当前没有到1/2
                        minNum = 1
                        maxNum = totalPage
                    }
                    //取 minNum 和 maxNum的中间值
                    for (let i = minNum; i <= maxNum; i++) {
                        this.showNumList.push(i)
                    }
                }else{
                    this.showNumList = [1]
                }
            },
            immediate: true
        },
    },
    mounted() {
        document.querySelector('.el-main').addEventListener("scroll", this.handleScroll);
    },
    beforeDestroy() {
        if(document.querySelector('.el-main')){
            document.querySelector('.el-main').removeEventListener("scroll", this.handleScroll);
            if (this.interval) {
                clearInterval(this.interval);
            }
        }
    },
};
</script>

<style scoped>
    .pageUl{
        margin: 0;
        vertical-align: top;
        display: inline-block;
    }
    .pageLi{
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        min-width: 30px;
        border-radius: 2px;
        padding: 0 4px;
        font-size: 13px;
        height: 28px;
        line-height: 28px;
        box-sizing: border-box;
        text-align: center;
        vertical-align: top;
        display: inline-block;
        cursor: pointer;
    }
    .pageLi:hover{
        color: #3bafda;
    }
    .tePageLi{
        background-color: #3bafda!important;
        color: #fff !important;
    }
    .tePageLi:hover{
        background-color: #3bafda!important;
        color: #fff !important;
        cursor: default !important;
    }
</style>
