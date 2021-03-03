<template>
    <div>
        <div class="headerContent">
            <label class="headeraddOrEdit">
                共舱船公司（航线）信息
            </label>
            <i class="headeraddOrEditClose el-icon-close lr" @click="handleClickClose"></i>
        </div>
        <div class="checkboxs_warp" v-for="(array,index) in SharedCabinData" :key="index">
            <el-checkbox 
            v-for="(item,index) in array" 
            :key="index" 
            v-model="item.isSelect"
            @change="handleChange($event,item,array)"
            :title="item.carrier + '(' + item.routeCode + ')'">
                {{item.carrier + '(' + item.routeCode + ')'}}
            </el-checkbox>
        </div>
        <div class="save">
            <el-button class="saveBtn" @click="SharedCabinAddOk">保存</el-button>
        </div>
    </div>
</template>

<script>
    import qs from "qs";
    export default {
        props:[
            "AllCabinList"
        ],
        data() {
            return {
                SharedCabinData: [],//共舱数据
            }
        },
        methods: {
            //确定按钮
            SharedCabinAddOk(){
                var AllCabinList = []
                for(let i=0; i<this.SharedCabinData.length; i++){
                    AllCabinList = AllCabinList.concat(this.SharedCabinData[i])
                }
                this.$emit('SharedCabinAddOk', AllCabinList)
                this.handleClickClose()
            },
            //取消按钮
            handleClickClose(){
                this.$emit('SharedCabinAddCancel')
            },
            handleChange(val,value,array){
                var item = value
                for(let i=0; i<array.length; i++){
                    if(array[i].staticId == item.staticId){
                        item.isSelect = val
                        array.splice(i,1,item)
                    }
                }
            },
            //将数组拆分成长度为3的小数组
            group(array) {
                let index = 0;
                let newArray = [];
                while(index < array.length) {
                    newArray.push(array.slice(index, index += 3));
                }
                return newArray;
            }
        },
        mounted() {
            this.SharedCabinData = JSON.parse(JSON.stringify(this.group(this.AllCabinList)))  
        }
    }
</script>

<style lang="scss" scoped>
    /deep/.el-form-item--mini .el-form-item__content{
        margin-left: 100px !important;
    }
    /deep/.el-form-item__content{
        margin-left: 100px !important;
    }
    /deep/.el-radio__input{
        float: right;
    }
    /deep/.el-radio__label{
        padding: 0;
        margin-right: 20px;
    }
    .checkbox /deep/.el-checkbox{
        width: 85px;
    }
    .lf{
        float: left;
    }
    .lr{
        float: right;
    }
    .clicksColor{
        padding: 9px 35px;
        color: #fff;
        background-color: #3bafda;
    }
    .headerContent{
        border-bottom: 1px solid #797979;
        padding-bottom: 10px;
        line-height: 1;
    }
    .headeraddOrEdit{
        margin-left: 10px;
        font-size: 16px;
    }
    .headeraddOrEditClose{
        margin-right: 10px;
        font-size: 16px;
        cursor: pointer;
    }
    .checkboxs_warp{
        margin-top: 30px;
        display: flex;
        /deep/.el-checkbox{
            width: 100px;
            font-size: 14px;
            line-height: 16px;
            display: flex;
            margin-right: 84px;
            /deep/.el-checkbox__input{
                width: 14px;
            }
            /deep/.el-checkbox__label{
                flex: 1;
                line-height: 16px;
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                color: #282828 !important;
            }
        }
        /deep/.el-checkbox:last-of-type{
            margin-right: 0;
        }
    }
    .save {
        width: 100%;
        text-align: center;
        margin: 30px 0 10px;
        .saveBtn {
            padding: 9px 35px;
            color: #fff;
            background-color: rgba(4, 153, 255, 1);
            margin-bottom: 10px;
        }
    }
</style>