<template>
  <div>
  <button @click="saveData">儲存</button>
    <vxe-table
    :data="tableData"
    ref="tableRef"
    :row-config="{isCurrent: true, isHover: true}"
    @current-change="currentChangeEvent">
        <vxe-column type="seq" width="70"></vxe-column>
        <vxe-column field="nspItemLocalName" title="nspItemLocalName"></vxe-column>
        <vxe-column field="nspItemEnglishName" title="nspItemEnglishName"></vxe-column>
        <vxe-column field="nspMwitssubcd" title="nspMwitssubcd"></vxe-column>
    </vxe-table>
    <vxe-table
    :data="dataAfter"
    ref="tableAfTER"
    :row-config="{isCurrent: true, isHover: true}"
    @current-change="currentChangeEvent">
        <vxe-column type="seq" width="70"></vxe-column>
        <vxe-column field="nspMwitsstocd" title="nspMwitsstocd"></vxe-column>
        <vxe-column field="newStoreNSP" title="newStoreNSP"></vxe-column>
        <vxe-column field="storeNSP" title="storeNSP"></vxe-column>
    </vxe-table>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'

// 商品數據（nspitem）
const tableData = ref([
  { id: "10001", nspItemLocalName: 'Test1', nspItemEnglishName: 'Develop', nspMwitssubcd: 'Man' },
  { id: "10002", nspItemLocalName: 'Test2', nspItemEnglishName: 'Test', nspMwitssubcd: 'Women' },
  { id: "10003", nspItemLocalName: 'Test3', nspItemEnglishName: 'PM', nspMwitssubcd: 'Man' },
  { id: "10004", nspItemLocalName: 'Test4', nspItemEnglishName: 'Designer', nspMwitssubcd: 'Women' }
])

// 存放所有的 store 資料
const allStoreData = ref([])

// 存放當前選中行的 store 資料
const dataAfter = ref([])

// 當前選中的商品 ID
const selectedItemId = ref(null)

// 組合 API 需要的 JSON
const saveData = () => {
  const formattedData = {
    "applicationFormType": "L",
    "applicationInfo": {  
      "deptcd": "10",
      "priority": "2",
      "creationUser": "admin"
    },
    "nspitem": tableData.value.map(item => ({
      ...item,
      nspstoreVo: allStoreData.value.filter(store => store.nspItmitmcd === item.id)
    }))
  }

  console.log("最終提交的 JSON:", JSON.stringify(formattedData, null, 2))
}

// 初始化時，獲取所有 store 資料
onMounted(async () => {
  allStoreData.value = await fetchStoreDataFromAPI(tableData.value.map(item => item.id))
  console.log("全部的 store 資料:", allStoreData.value)
})

// 點擊某行，篩選對應的 store 資料
const currentChangeEvent = ({ rowIndex }) => {
  console.log(`行选中事件 ${rowIndex}`)

  // 記錄當前選中 ID
  selectedItemId.value = tableData.value[rowIndex]?.id

  // 過濾出該行對應的 store 資料
  dataAfter.value = allStoreData.value.filter(store => store.nspItmitmcd === selectedItemId.value)

  console.log("當前選中的 store 資料:", dataAfter.value)
}

// 模擬 API 請求獲取所有 store 資料
const fetchStoreDataFromAPI = async (ids) => {
  return new Promise(resolve => {
    setTimeout(() => {
      // 模擬 API 回應，回傳多個 store 資料
      const response = [
        { nspMwitsstocd: "999", newStoreNSP: "120", storeNSP: "110", nspItmitmcd: "10001" },
        { nspMwitsstocd: "888", newStoreNSP: "130", storeNSP: "120", nspItmitmcd: "10001" },
        { nspMwitsstocd: "777", newStoreNSP: "140", storeNSP: "130", nspItmitmcd: "10002" },
        { nspMwitsstocd: "666", newStoreNSP: "150", storeNSP: "140", nspItmitmcd: "10003" }
      ]
      resolve(response)
    }, 500) // 模擬 API 延遲
  })
}
</script>



