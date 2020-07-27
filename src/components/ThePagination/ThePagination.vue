<template>
    <!-- 配置分页的组件 -->
    <section>
        <div class="pagination">
            <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page.pageNo"
                :page-size="page.pageSize"
                :page-sizes="[10, 50, 100, 200]"
                :total="page.total"
                layout="total, sizes, prev, pager, next"
                ref="pagination"
            ></el-pagination>
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
                this.backTo();
            },500);
        },

        /**
         * 点击页码事件
         *
         * @param pageNo
         */
        handleCurrentChange(pageNo) {
            this.page.pageNo = pageNo;
            this.attribute.handleChange({
                pageNo: this.page.pageNo,
                pageSize: this.page.pageSize,
                total: this.page.total
            });
            setTimeout(() => {
                this.backTo();
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
    watch:{
        'pageNumber':{
            immediate:true,
            handler(newVal,oldVal){
                // console.log(newVal,'pageNumber')
                if(newVal === 1){
                    this.page.pageNo = newVal;
                }
            }
        }
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

</style>
