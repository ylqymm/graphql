<template>
  <div>
    <v-btn color="primary" @click="handleAdd">增加</v-btn>
    <v-data-table :headers="headers" :items="desserts" :loading="true">
      <v-progress-linear v-slot:progress color="blue" indeterminate></v-progress-linear>
      <template v-slot:items="props">
        <td class="text-xs-center">{{ props.item.name }}</td>
        <td class="text-xs-center">{{ props.item.age }}</td>
        <td class="text-xs-center">
          <v-btn small color="info" @click="handleEdit(props.item)">编辑</v-btn>
          <v-btn small color="info" @click="handleDel(props.item)">删除</v-btn>
        </td>
      </template>
    </v-data-table>
    <!-- 点击增加出现的弹框 -->
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card v-show="addShow">
        <v-card-title>
          <span class="headline">{{formTitle}}</span>
          <!-- <span class="headline">增加内容</span> -->
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout>
              <span class="baseTitle">姓名</span>
              <v-flex xs12 sm6>
                <v-text-field label="请输入产品类别" v-model="editedItem.name"></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout>
              <span class="baseTitle">年龄</span>
              <v-flex xs12 sm6>
                <v-text-field label="请输入产品类别" v-model="editedItem.age"></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="save">确定</v-btn>
        </v-card-actions>
      </v-card>
      <!-- 删除弹框 -->
      <v-card v-show="delShow">
        <v-container grid-list-md class="delcontainer">你确定要删除吗?</v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="close">取消</v-btn>
          <v-btn color="blue darken-1" flat @click="handleDelSave">确定</v-btn>
        </v-card-actions>
        <span class="delSpan" @click="close">X</span>
      </v-card>
    </v-dialog>
    <!-- 弹框 -->
    <v-snackbar :color="color" :top="top" :right="right" v-model="snackbar">
      <v-icon color="white" class="mr-3" size="20">add_alert</v-icon>
      <div>{{titleTip}}</div>
      <v-icon color="white" size="16" @click="snackbar = false">clear</v-icon>
    </v-snackbar>
  </div>
</template>

<script>
// import getDataGql from "../../graphql/getUser.gql";
// import createDataGql from "../../graphql/createUser.gql";
// import deleteDataGql from "../../graphql/deleteUser.gql";
// import updateDataGql from '../../graphql/updateUser.gql';
import { getDataGql } from "../../graphql/queryGraphql";
import {
  createDataGql,
  updateDataGql,
  deleteDataGql
} from "../../graphql/mutationGraphql";
export default {
  data() {
    return {
      dialog: false,
      // 弹框信息
      top: true,
      right: true,
      snackbar: false,
      color: "info",
      titleTip: "",
      editedItem: {
        name: "",
        id: "",
        age: ""
      },
      defaultItem: {
        name: "",
        id: "",
        age: ""
      },
      headers: [
        {
          text: "姓名",
          align: "center",
          sortable: false,
          value: "name"
        },
        { text: "年龄", align: "center", sortable: false, value: "age" },
        { text: "操作", align: "center", sortable: false }
      ],
      editedIndex: -1,
      desserts: [],
      delShow: false,
      addShow: false
    };
  },
  // apollo: {
  //   fetchData() {
  //     const vm = this;
  //     return {
  //       query: getDataGql,
  //       update(data) {
  //         console.log(data.getUser);
  //       }
  //     };
  //   }
  // },
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "增加用户" : "编辑内容";
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$apollo
        .query({
          query: getDataGql,
          variables: {}
        })
        .then(({ data: { getUser } }) => {
          this.desserts = getUser;
          // console.log(this.desserts);
        });
    },
    handleAdd() {
      this.dialog = true;
      this.addShow = true;
      this.delShow = false;
    },
    handleEdit(item) {
      this.dialog = true;
      this.addShow = true;
      this.delShow = false;
      this.editedIndex = this.desserts.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    save() {
      // if编辑else增加
      if (this.editedIndex > -1) {
        this.$apollo.mutate({
          mutation: updateDataGql,
          variables: {
            argsMutify: {
              name: this.editedItem.name,
              age: Number(this.editedItem.age),
              id: this.editedItem.id
            }
          },
          update: (store, { data: { updateUser } }) => {
            if (updateUser.status === "200") {
              this.snackbar = true;
              this.titleTip = updateUser.msg;
              this.desserts.forEach((element, index) => {
                if (element.id === this.editedItem.id)
                  this.desserts.splice(index, 1, this.editedItem);
              });
            }
          }
        });
        this.close();
      } else {
        this.$apollo.mutate({
          mutation: createDataGql,
          variables: {
            argsMutify: {
              name: this.editedItem.name,
              age: Number(this.editedItem.age),
              id: ""
            }
          },
          update: (store, { data: { createUser } }) => {
            if (createUser.status === "200") {
              this.snackbar = true;
              this.titleTip = createUser.msg;
              this.color = "info";
              this.desserts.push(createUser);
            } else {
              this.snackbar = true;
              this.titleTip = createUser.msg;
              this.color = "error";
            }
          }
        });
        this.close();
      }
    },
    handleDel(item) {
      this.dialog = true;
      this.delShow = true;
      this.addShow = false;
      this.editedItem = Object.assign({}, item);
    },
    handleDelSave() {
      this.$apollo.mutate({
        mutation: deleteDataGql,
        variables: {
          id: this.editedItem.id
        },
        update: (store, { data: { deleteUser } }) => {
          console.log(deleteUser);
          if (deleteUser.status === "200") {
            this.snackbar = true;
            this.titleTip = deleteUser.msg;
            this.color = "info";
            var index = this.desserts.indexOf(this.editedItem);
            this.desserts.splice(index, 1);
          } else {
            this.snackbar = true;
            this.titleTip = deleteUser.msg;
            this.color = "error";
          }
          this.close();
        }
      });
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    }
  }
};
</script>

<style  scoped>
.publicClass {
  margin: 16px 20px 0;
}
.baseTitle {
  display: inline-block;
  font-size: 18px;
  margin: 26px 65px 35px 0;
}
.delcontainer {
  padding: 30px;
  font-size: 20px;
  position: relative;
}
.delSpan {
  position: absolute;
  top: 15px;
  right: 25px;
  cursor: pointer;
}
</style>