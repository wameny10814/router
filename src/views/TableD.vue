<template>
  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Context3</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in data" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.title1 }}</td>
        <td>
          <input
            type="text"
            :value="item.context3"
            @input="editRow(item.id, $event.target.value)"
          />
        </td>
        <td><button @click="saveEdit(item.id)">Save</button></td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    data: Array,
  },
  emits: ["edit-context"],
  setup(props, { emit }) {
    const editRow = (id, newContext) => {
      emit("edit-context", id, newContext);
    };
    return { editRow };
  },
};
</script>
