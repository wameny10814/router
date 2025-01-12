<template>
  <div>
    <TableA :data="subData" @delete-item="deleteItem('subitems', 'sub', $event)" />
    <TableB :data="subitems" @delete-item="deleteItem('subitems', 'substore', $event)" />
    <TableC :data="npp" @delete-item="deleteItem('nppitems', 'npp', $event)" />
    <TableD :data="nppStore" @edit-context="editContext" />
    <div>
    資料
{{changedData}}
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import TableA from "./TableA.vue";
import TableB from "./TableB.vue";
import TableC from "./TableC.vue";
import TableD from "./TableD.vue";

export default {
  components: { TableA, TableB, TableC, TableD },
  setup() {
    // 主資料
    const mainData = ref([
      // 假設這裡放生成的資料
      {
        id: 1,
        po: "PO1234",
        date: "2025-01-01",
        subitems: [
          {
            substore: [{ id: 1, title1: "Title A", context3: "Context A" }],
            sub: [{ id: 2, title1: "Sub Title A", context3: "Sub Context A" }],
          },
        ],
        nppitems: [
          {
            nppstore: [{ id: 3, title1: "NPP Title A", context3: "NPP Context A" }],
            npp: [{ id: 4, title1: "NPP Sub Title A", context3: "NPP Sub Context A" }],
          },
        ],
      },
    ]);

        const changedData = ref(JSON.parse(JSON.stringify(mainData.value)));

    // 提取資料的方便引用
    const subitems = computed(() => changedData.value[0]?.subitems || []);
    const subData = computed(() => subitems.value[0]?.sub || []);
    const nppitems = computed(() => changedData.value[0]?.nppitems || []);
    const npp = computed(() => nppitems.value[0]?.npp || []);
    const nppStore = computed(() => nppitems.value[0]?.nppstore || []);

    // 刪除功能
    const deleteItem = (groupKey, subKey, id) => {
      changedData.value[0][groupKey][0][subKey] = changedData.value[0][groupKey][0][subKey].filter(
        (item) => item.id !== id
      );
    };

    // 修改功能
    const editContext = (id, newContext) => {
      const target = nppStore.value.find((item) => item.id === id);
      if (target) {
        target.context3 = newContext;
      }
    };

    return {
      subitems,
      subData,
      nppitems,
      npp,
      nppStore,
      deleteItem,
      editContext,
      changedData,
    };
  },
};
</script>
