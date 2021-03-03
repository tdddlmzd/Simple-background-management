<template>
  <div class="routeAdd">
    <loading v-show="isLoading"></loading>
    <el-form
      label-position="right"
      label-width="90px"
      :model="ruleForm"
      ref="ruleForm"
      size="mini"
      class="ruleForm"
    >
      <div class="headerContent">
        <label class="headeraddOrEdit">{{ addOrEdit }}</label>
        <i
          class="headeraddOrEditClose el-icon-close lr"
          @click="closeUserDetail"
        ></i>
      </div>
      <div :style="{ maxHeight: heightInner }" class="scrollP">
        <ul class="routeUl">
          <li class="routeLi">
            <!-- <div class="title">
                        <span>船舶信息</span>
                    </div> -->
            <el-row>
              <el-col style="width: 30%">
                <el-form-item
                  label="用户名"
                  prop="clientId"
                  :rules="[
                    {
                      required: true,
                      message: '请输入用户名',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model="ruleForm.clientId"
                    placeholder="请输入"
                    clearable
                    :disabled="addUserText == '修改'"
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col style="width: 30%">
                <el-form-item
                  label="密码"
                  prop="clientSecret"
                  :rules="[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                  ]"
                >
                  <el-input
                    v-model="ruleForm.clientSecret"
                    placeholder="请输入"
                    type="password"
                    disabled
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col style="width: 36%">
                <el-form-item
                  label="角色"
                  prop="typeArry"
                  :rules="[
                    {
                      required: true,
                      message: '请输入用户类型',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select
                    multiple
                    v-model="ruleForm.typeArry"
                    style="width: 100%"
                    placeholder="请选择"
                    @focus="userTypeFocus"
                    @change="userTypeChange"
                  >
                    <el-option
                      v-for="item in typeList"
                      :key="item.roleCode"
                      :label="item.roleName"
                      :value="item.roleCode"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col style="width: 30%">
                <el-form-item
                  label="用户类别"
                  prop="userCategory"
                  :rules="[
                    {
                      required: true,
                      message: '请输入用户类别',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-select
                    v-model="ruleForm.userCategory"
                    style="width: 100%"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in userCateList"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>

              <el-col style="width: 30%">
                <el-form-item label="密钥">
                  <el-input
                     type="textarea"
                     :rows="4"
                    :value="ruleForm.secretKey"
                    style="width: 100%"
                  />
                </el-form-item>
              </el-col>
            </el-row>
          </li>
          <li class="routeLi">
            <div class="title">
              <span>公司信息</span>
            </div>
            <el-row>
              <el-col style="width: 30%">
                <el-form-item
                  label="公司名称"
                  prop="company"
                  :rules="[
                    {
                      required: true,
                      message: '请输入公司名称',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-input
                    v-model="ruleForm.company"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col style="width: 30%">
                <el-form-item label="职位">
                  <el-input
                    v-model="ruleForm.post"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
              <el-col style="width: 36%">
                <el-form-item label="手机号">
                  <el-input
                    v-model="ruleForm.contact"
                    placeholder="请输入"
                    @input="
                      ruleForm.contact = ruleForm.contact.replace(/[^\d]/g, '')
                    "
                    maxlength="11"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </li>
          <li
            class="routeLi"
            v-for="(userper, userIndex) in ruleForm.allPermiss"
            :key="userper.roleId"
            v-show="userper.authorities.length > 0"
          >
            <div class="title">
              <span>{{ userper.resourceName }}</span>
            </div>
            <el-row>
              <el-col style="width: 30%">
                <el-form-item label="客户对接人">
                  <el-input
                    v-model="userper.acrcSeller"
                    placeholder="请输入"
                    clearable
                  ></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-for="(item, index) in userper.authorities" :key="index">
              <el-col style="width: 30%">
                <el-form-item label="">
                  <el-input readonly :value="item.apiName"></el-input>
                  <el-switch
                    v-model="item.state"
                    class="switchClass"
                    active-color="#3bafda"
                    inactive-color="#dcdfe6"
                    @change="openPermiss($event, item)"
                  ></el-switch>
                </el-form-item>
              </el-col>
              <el-col style="width: 24%">
                <el-form-item
                  label="开通日期"
                  :prop="`allPermiss[${userIndex}].authorities[${index}].affectTime`"
                  :rules="[
                    {
                      required: item.state ? true : false,
                      message: '请输入开通日期',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-date-picker
                    v-model="item.affectTime"
                    type="date"
                    style="width: 100%"
                    value-format="yyyy-MM-dd"
                    placeholder="开始日期"
                    :picker-options="item.startScope"
                    @change="changeStart($event, item)"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col style="width: 24%">
                <el-form-item
                  label="截止日期"
                  :prop="`allPermiss[${userIndex}].authorities[${index}].expireTime`"
                  :rules="[
                    {
                      required: item.state ? true : false,
                      message: '请输入截止日期',
                      trigger: 'blur',
                    },
                  ]"
                >
                  <el-date-picker
                    v-model="item.expireTime"
                    type="date"
                    style="width: 100%"
                    value-format="yyyy-MM-dd"
                    placeholder="开始日期"
                    :picker-options="item.endScope"
                    @change="changeEnd($event, item)"
                  >
                  </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col style="width: 18%">
                <el-form-item label="付费">
                  <el-select
                    v-model="item.pay"
                    style="width: 100%"
                    placeholder="请选择"
                  >
                    <el-option
                      v-for="item in isPay"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
          </li>
        </ul>
        <div class="save">
          <el-button class="saveBtn" @click="saveClick('ruleForm')"
            >保存</el-button
          >
        </div>
      </div>
    </el-form>
  </div>
</template>
<script>
import loading from "@/components/Loading/loading.vue";
export default {
  props: ["addUserText", "addUserId"],
  data() {
    return {
      heightInner: "",
      heightScreen: "",
      addOrEdit: "", //新增或者修改
      isLoading: true, //isLoading
      ruleForm: {
        id: "", //
        clientId: "", //登录账号
        clientSecret: 123456, //密码
        company: "",
        post: "",
        contact: "",
        status: 0,
        userCategory: "",
        email: "",
          secretKey: '',
        typeArry: [], //类型变化
        allPermiss: [],
      },
      isDetail: false, //是否是进入详情页的
      //用户类型
      typeList: [],
      isPay: [
        {
          value: 1,
          label: "是",
        },
        {
          value: 0,
          label: "否",
        },
      ],
      //用户类型
      userCateList: [
        {
          value: 0,
          label: "普通用户",
        },
        {
          value: 1,
          label: "付费用户",
        },
      ],
    };
  },
  components: {
    loading,
  },
  methods: {
    //获取详情页
    detailList() {
      this.isLoading = true;
      this.$axios
        .get(
          this.commonJs.localUrl +
            `/schedules/userManager/getApiUserDetails?id=${this.addUserId}`,
          {
            headers: {
              Authorization: `Bearer ${this.getAuthorization()}`,
              AccessToken: this.getCookie("token").replace("Bearer", "Jwt"),
            },
          }
        )
        .then((res) => {
          if (res.data.status == 1) {
            this.ruleForm.id = res.data.content.id;
            this.ruleForm.clientId = res.data.content.clientId; //登录账号
            this.ruleForm.clientSecret = "123456"; //密码
            this.ruleForm.company = res.data.content.company;
            this.ruleForm.post = res.data.content.post;
            this.ruleForm.contact = res.data.content.contact;
            this.ruleForm.status = res.data.content.status;
            this.ruleForm.userCategory = res.data.content.userCategory;
            this.ruleForm.email = res.data.content.email;
            this.ruleForm.secretKey = res.data.content.secretKey;
            this.isDetail = true;

            //下面是处理权限信息
            var apiResources = res.data.content.apiResources;
            if (apiResources.length > 0) {
              apiResources = apiResources.sort(this.compare("resourceId"));
              for (let p = 0; p < apiResources.length; p++) {
                for (let j = 0; j < apiResources[p].authorities.length; j++) {
                  var aut = apiResources[p].authorities[j];
                  this.changeStart(aut.affectTime, aut);
                  this.changeEnd(aut.expireTime, aut);
                }
              }

              //赋值
              this.ruleForm.allPermiss = apiResources;

              //处理类型
              for (let i = 0; i < this.ruleForm.allPermiss.length; i++) {
                this.ruleForm.typeArry.push(
                  this.ruleForm.allPermiss[i].resourceCode
                );
              }
            } else {
              this.ruleForm.allPermiss = [];
            }
            this.isLoading = false;
          } else {
            this.$message({
              type: "error",
              message: "数据加载失败 请重新加载页面",
            });
          }
        });
    },
    //用户类型
    userTypeFocus() {
      this.$axios
        .get(this.commonJs.localUrl + `/schedules/userManager/getRoles`, {
          headers: {
            Authorization: `Bearer ${this.getAuthorization()}`,
            AccessToken: this.getCookie("token"),
          },
        })
        .then((res) => {
          this.typeList = res.data.content.filter((item, index) => {
            if (item.type == 2) {
              //新增只新增API用户
              return true;
            }
          });
        });
    },
    //改变用户类型
    userTypeChange(val) {
      this.isDetail = false;
    },
    //获取对应的API信息
    getApiInfromation(infor) {
      //获取权限内容
      return new Promise((resolve, reject) => {
        this.$axios
          .get(
            this.commonJs.localUrl +
              `/schedules/userManager/getApiInfo?resourceCode=${infor}`,
            {
              headers: {
                Authorization: `Bearer ${this.getAuthorization()}`,
                AccessToken: this.getCookie("token").replace("Bearer", "Jwt"),
              },
            }
          )
          .then((res) => {
            var authorities = [];
            for (let i = 0; i < res.data.content.length; i++) {
              authorities.push({
                apiId: res.data.content[i].id,
                affectTime: "",
                expireTime: "",
                state: false,
                pay: 0,
                apiName: res.data.content[i].apiName,
                startScope: {},
                endScope: {
                  shortcuts: [
                    {
                      text: "7天后",
                      onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                        picker.$emit("pick", date);
                      },
                    },
                    {
                      text: "14天后",
                      onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 14);
                        picker.$emit("pick", date);
                      },
                    },
                    {
                      text: "一个月",
                      onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
                        picker.$emit("pick", date);
                      },
                    },
                    {
                      text: "一年",
                      onClick(picker) {
                        const date = new Date();
                        date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
                        picker.$emit("pick", date);
                      },
                    },
                  ],
                },
              });
            }
            resolve(authorities);
          });
      });
    },

    //关闭事件
    closeUserDetail() {
      this.$emit("closeUserDetail");
    },
    //保存
    async saveClick(ruleForm) {
      try {
        let valid = await this.$refs[ruleForm].validate();
        if (!valid) return;
        this.isLoading = true;

        //验证手机号格式是否正确
        if (this.ruleForm.contact) {
          let reg = /^1[34578]\d{9}$/;
          if (!reg.test(this.ruleForm.contact)) {
            this.$message({
              type: "error",
              message: "请输入正确的手机号",
            });
            this.isLoading = false;
            return;
          }
        }
        var query = {
          clientId: this.ruleForm.clientId, //登录账号
          clientSecret: "", //密码
          company: this.ruleForm.company,
          post: this.ruleForm.post,
          contact: this.ruleForm.contact,
          status: this.ruleForm.status,
          email: this.ruleForm.email,
          userCategory: this.ruleForm.userCategory,
        };
        var apiResources = [];
        for (let p = 0; p < this.ruleForm.allPermiss.length; p++) {
          let item = this.ruleForm.allPermiss[p];
          for (let j = 0; j < item.authorities.length; j++) {
            let autho = item.authorities[j];
            if (autho.affectTime) {
              autho.affectTime = autho.affectTime
                ? autho.affectTime.indexOf("00:00:00") !== -1
                  ? autho.affectTime
                  : autho.affectTime + " " + "00:00:00"
                : "";
            }
            if (autho.expireTime) {
              autho.expireTime = autho.expireTime
                ? autho.expireTime.indexOf("00:00:00") !== -1
                  ? autho.expireTime
                  : autho.expireTime + " " + "00:00:00"
                : "";
            }
          }
          apiResources.push({
            acrcId: item.acrcId,
            acrcSeller: item.acrcSeller,
            resourceCode: item.resourceCode,
            resourceId: item.resourceId,
            authorities: item.authorities,
          });
        }
        query["apiResources"] = apiResources;

        if (this.addUserText == "新增") {
          this.$axios
            .post(
              this.commonJs.localUrl + `/schedules/userManager/addApiUser`,
              query,
              {
                headers: {
                  Authorization: `Bearer ${this.getAuthorization()}`,
                  AccessToken: this.getCookie("token"),
                },
              }
            )
            .then((res) => {
              if (res.data.status == 1) {
                this.$emit("updatUser");
                this.$message({
                  type: "success",
                  message: "保存成功",
                });
                this.closeUserDetail();
              } else if (res.data.status == 5) {
                this.$message({
                  type: "error",
                  message: "当前用户名已注册",
                });
                this.isLoading = false;
              } else {
                this.$message({
                  type: "error",
                  message: "数据保存失败 请重新加载页面",
                });
              }
            });
        } else {
          query["id"] = this.ruleForm.id;
          this.$axios
            .post(
              this.commonJs.localUrl + `/schedules/userManager/updateApiUser`,
              query,
              {
                headers: {
                  Authorization: `Bearer ${this.getAuthorization()}`,
                  AccessToken: this.getCookie("token"),
                },
              }
            )
            .then((res) => {
              if (res.data.status == 1) {
                this.$emit("updatUser");
                this.$message({
                  type: "success",
                  message: "保存成功",
                });
                this.closeUserDetail();
              } else if (res.data.status == 5) {
                this.$message({
                  type: "error",
                  message: "当前用户名已注册",
                });
                this.isLoading = false;
              } else {
                this.$message({
                  type: "error",
                  message: "数据保存失败 请重新加载页面",
                });
              }
            });
        }
      } catch (e) {}
    },
    //开通API权限
    openPermiss(event, item) {
      if (event) {
        if (!item.affectTime && !item.expireTime) {
          //打开权限 若 开通日期与截止日期都没有填日期
          //开通日期默认是当天，截止日期默认是当天+14

          //开始日期 今天
          var day = new Date().getTime();
          var day1 = new Date(day);
          var month = day1.getMonth();
          var date = day1.getDate();
          item.affectTime =
            day1.getFullYear() +
            "-" +
            (day1.getMonth() > 9
              ? day1.getMonth() + 1
              : "0" + (day1.getMonth() + 1)) +
            "-" +
            (day1.getDate() > 9 ? day1.getDate() : "0" + day1.getDate());

          //结束日期 距离今天14天
          var day2 = new Date().getTime() + 24 * 60 * 60 * 1000 * 14;
          var day3 = new Date(day2);
          var month = day3.getMonth();
          var date = day3.getDate();
          item.expireTime =
            day3.getFullYear() +
            "-" +
            (day3.getMonth() > 9
              ? day3.getMonth() + 1
              : "0" + (day3.getMonth() + 1)) +
            "-" +
            (day3.getDate() > 9 ? day3.getDate() : "0" + day3.getDate());
          this.changeEnd(item.expireTime, item);
          this.changeStart(item.affectTime, item);
        }
      }
    },
    //船期API开始时间 控制结束时间
    changeEnd(expireTime, item) {
      item.startScope = {
        disabledDate: (time) => {
          var expireTimes = item.expireTime ? item.expireTime : "";
          return time.getTime() > new Date(expireTimes).getTime();
        },
      };
    },
    //船期API结束时间限制开始时间
    changeStart(affectTime, item) {
      item.endScope = {
        disabledDate: (time) => {
          var affectTimes = item.affectTime ? item.affectTime : "";
          return time.getTime() < new Date(affectTimes).getTime();
        },
        shortcuts: [
          {
            text: "7天后",
            onClick(picker) {
              const date = item.affectTime
                ? new Date(item.affectTime)
                : new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
          {
            text: "14天后",
            onClick(picker) {
              const date = item.affectTime
                ? new Date(item.affectTime)
                : new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 14);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一个月后",
            onClick(picker) {
              const date = item.affectTime
                ? new Date(item.affectTime)
                : new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 30);
              picker.$emit("pick", date);
            },
          },
          {
            text: "一年后",
            onClick(picker) {
              const date = item.affectTime
                ? new Date(item.affectTime)
                : new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 365);
              picker.$emit("pick", date);
            },
          },
        ],
      };
    },
    //排序
    compare(property) {
      return function (a, b) {
        var value1 = a[property];
        var value2 = b[property];
        return value1 - value2;
      };
    },
    //监听窗口变化
    winResize() {
      const that = this;
      that.heightScreen = document.body.clientHeight;
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight;
          that.heightScreen = window.screenHeight;
        })();
      };
    },
  },
  mounted() {
    if (this.addUserText == "新增") {
      this.addOrEdit = "新增";
      this.isLoading = false;
      this.ruleForm.userCategory = 0;
    } else if (this.addUserText == "修改") {
      this.addOrEdit = "修改";
      this.detailList();
    }
    this.winResize();
    this.userTypeFocus();
  },
  watch: {
    heightScreen(val) {
      var height = val - 80;
      this.heightInner = height + "px";
    },
    "ruleForm.typeArry": {
      handler(newVal, oldVal) {
        var that = this;
        if (that.isDetail) {
          return;
        }
        if (newVal.length > 0) {
          var list = []; //记录新跟旧不同的数组
          var role = {
            roleCode: "",
            roleId: "",
            roleName: "",
            type: "",
          };
          if (newVal.length > oldVal.length) {
            //说明当前是增加一条数据
            list = newVal.filter((item) => {
              return oldVal.indexOf(item) === -1;
            });
            for (let i = 0; i < that.typeList.length; i++) {
              if (list[0] == that.typeList[i].roleCode) {
                role = that.typeList[i];
              }
            }
            that.getApiInfromation(role.roleCode).then((res) => {
              that.ruleForm.allPermiss.push({
                acrcSeller: "",
                acrcId: "",
                resourceCode: role.roleCode,
                resourceId: role.roleId,
                authorities: res,
                resourceName: role.roleName,
                type: role.type,
              });
              that.ruleForm.allPermiss = that.ruleForm.allPermiss.sort(
                that.compare("resourceId")
              );
            });
          } else {
            //说明当前是减少一条数据
            list = oldVal.filter((item) => {
              return newVal.indexOf(item) === -1;
            });
            for (let i = 0; i < that.typeList.length; i++) {
              if (list[0] == that.typeList[i].roleCode) {
                role = that.typeList[i];
              }
            }
            for (let p = 0; p < that.ruleForm.allPermiss.length; p++) {
              if (role.roleCode == that.ruleForm.allPermiss[p].resourceCode) {
                that.ruleForm.allPermiss.splice(p, 1);
                return;
              }
            }
            that.ruleForm.allPermiss = that.ruleForm.allPermiss.sort(
              that.compare("roleId")
            );
          }
        } else {
          //说明没有选择任何权限
          that.ruleForm.allPermiss = [];
        }
      },
    },
  },
  destroyed() {
    window.removeEventListener("resize", this.getWidth);
  },
};
</script>
<style lang="scss" scoped>
/deep/ .el-table .warning-row {
  background: rgba(241, 245, 247, 1) !important;
}
/deep/ .el-table .warning-row:hover {
  background: rgba(241, 245, 247, 1);
}
/deep/.el-dialog__body {
  padding: 10px !important;
}
/deep/.el-col {
  margin-right: 0px !important;
}
/deep/.el-row .el-col:nth-last-of-type(1) {
  margin-right: 0;
}
.routeAdd {
  position: relative;
  overflow: hidden;
}
.lf {
  float: left;
}
.lr {
  float: right;
}
.headerContent {
  border-bottom: 1px solid #797979;
  border-bottom: 1px solid #797979;
  padding-bottom: 10px;
  line-height: 1;
}
.headeraddOrEdit {
  margin-left: 10px;
  font-size: 18px;
}
.headeraddOrEditClose {
  margin-right: 10px;
  font-size: 16px;
  cursor: pointer;
}
.routeUl {
  padding-right: 10px;
  .routeLi {
    margin-top: 20px;
  }
}
.title {
  text-align: center;
  margin-bottom: 10px;
  display: inline-block;
  margin-right: 20px;
  span {
    color: #3bafda;
    font-weight: 600;
  }
}
.save {
  width: 100%;
  text-align: center;
  margin-top: 40px;
  margin-bottom: 40px;
  .saveBtn {
    padding: 9px 35px;
    color: #fff;
    background-color: rgba(4, 153, 255, 1);
    margin-bottom: 10px;
    cursor: pointer;
  }
}
.switchClass {
  position: absolute;
  left: -50px;
  top: 5px;
}
.scrollP {
  overflow-y: auto;
  height: "400px";
}
</style>