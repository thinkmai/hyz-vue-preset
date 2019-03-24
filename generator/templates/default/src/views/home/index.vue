<template>
  <div>
    <div style="margin-bottom: 12px;">
      <Button @click="type = 'list'">列表</Button>
      <Button style="margin: 0 8px;" @click="changeCard(false)">卡片</Button>
      <Button @click="changeCard(true)">自定义卡片</Button>
    </div>

    <hyz-crud ref="crud" :api="api" :type="type" :columns="columns">
      <template #toolbtn>
        <Button>自定义</Button>
      </template>
      <template v-if="useCustomCard" #card="list">
        <Row :gutter="12">
          <i-col v-for="(item, i) in list" :key="i" style="margin-bottom: 12px;" :span="4">
            <div style="height: 80px; background: #efefef;padding: 12px;">{{ item.name }}</div>
          </i-col>
        </Row>
      </template>
    </hyz-crud>
  </div>
</template>
<script>
export default {
  data() {
    return {
      api: "object",
      type: "list",
      useCustomCard: false,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center",
          sortable: "custom",
          isMainField: true,
          isSearchField: true,
          isAddField: true,
          fieldType: "String"
        },
        {
          title: "地点",
          key: "keyName",
          align: "center",
          sortable: "custom",
          isAddField: true,
          isSearchField: true,
          fieldType: "Select",
          fieldDataProvider: {
            type: "api",
            url: "address",
            showField: "name",
            saveField: "id"
          },
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  color: "green"
                }
              },
              params.row.keyName
            );
          }
        },
        {
          title: "更新时间",
          key: "updateTime",
          align: "center",
          sortable: "custom"
        },
        {
          title: "操作",
          key: "operation",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "default",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.$refs.crud.edit(params.row);
                    }
                  }
                },
                "修改"
              ),
              h(
                "Poptip",
                {
                  props: {
                    confirm: true,
                    title: "确认删除？"
                  },
                  style: {
                    textAlign: "left",
                    marginLeft: "8px"
                  },
                  on: {
                    "on-ok": () => {
                      this.$refs.crud.del(params.row);
                    },
                    "on-cancel": () => {}
                  }
                },
                [
                  h(
                    "Button",
                    {
                      props: {
                        type: "error",
                        size: "small"
                      }
                    },
                    "删除"
                  )
                ]
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    changeCard(v) {
      this.type = "card";
      this.useCustomCard = v;
    }
  }
};
</script>
<style></style>
