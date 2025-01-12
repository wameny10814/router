<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.title1 }}</td>
        <td><button @click="deleteRow(item.id)">Delete</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  emits: ["delete-item"],
  setup(props, { emit }) {
    const deleteRow = (id) => {
      emit("delete-item", id);
    };
    return { deleteRow };
  },
};
</script>
