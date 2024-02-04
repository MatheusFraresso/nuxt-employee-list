<script>
export default {
  data: () => ({
    employees: [],
    nameFilter: "",
  }),
  async created() {
    this.employees = await useFetch("/api/employees").data
  },

  computed: {
    filteredEmployeeList() {
      return this.employees.filter((employee) =>
        employee.name.toUpperCase().includes(this.nameFilter.toUpperCase())
      )
    },
  },
}
</script>

<template>
  <h1>Lista de Funcionários</h1>

  <input v-model="nameFilter" />
  <table v-if="employees.length > 0">
    <tr>
      <th>Nome</th>
      <th>Ações</th>
    </tr>

    <tr v-for="employee in filteredEmployeeList">
      <td>{{ employee.name }}</td>
      <td>
        <nuxt-link :to="`${employee.id}`"> detalhes </nuxt-link>
      </td>
    </tr>
  </table>
</template>
