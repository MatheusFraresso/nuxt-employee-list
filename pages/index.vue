<script>
export default {
  data: () => ({
    employees: [],
    filteredEmployees: [],
    nameFilter: "",
    pagination: 1,
    pageSize: 20,
  }),
  async created() {
    this.employees = await useFetch("/api/employees").data
  },

  computed: {
    filteredEmployeeList() {
      return this.employees
        .filter((employee) =>
          employee.name.toUpperCase().includes(this.nameFilter.toUpperCase())
        ).slice((this.pagination-1)*this.pageSize, this.pagination * this.pageSize)
    },
    pages() {
      return this.employees.filter((employee) =>
          employee.name.toUpperCase().includes(this.nameFilter.toUpperCase())
        ).length / this.pageSize
    },
  },
  methods: {
    setPageSize(value) {
      this.pageSize = value
    },
    resetPagination(){
        this.pagination = 1
    }
  },
}
</script>

<template>
  <div id="table-wrapper" class="pt-10">
    <h1 class="ml-10">Lista de Funcionários</h1>
    <v-container>
        <v-row no-gutters>
            <v-col
                sm="6"
            >
                <v-sheet class="ma-2 pa-2 pl-10 pr-10">
                    <v-text-field label="Filtre os funcionários" v-model="nameFilter" @click="()=>{pagination = 1}"></v-text-field>
                </v-sheet>
            </v-col>
            <v-col
                sm="6"
            >
                <v-sheet class="ma-2 pa-2 pl-10 pr-10">
                    <v-select
                        label="Número de itens"
                        v-model="pageSize"
                        :items="[10, 20, 50, 100]"
                    ></v-select>
                </v-sheet>
            </v-col>
        </v-row>
    </v-container>
    <v-table fixed-header hover v-if="filteredEmployeeList.length > 0" class="mt-10">
      <thead>
        <tr>
          <th class="text-left"><h2>Nome</h2></th>
          <th class="text-left"><h2>Detalhes</h2></th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="employee in filteredEmployeeList"
          :key="employee.name"
        >
          <td>{{ employee.name }}</td>
          <td>
            <nuxt-link :to="`${employee.id}`">Ver Dados &#10138</nuxt-link>
          </td>
        </tr>
      </tbody>
    </v-table>
    <v-pagination
        v-model="pagination"
        :length="pages"
      ></v-pagination>
    
  </div>
</template>
<style>
a {
  color: darkcyan !important;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
  font-size: medium;
}

a:hover{
  color: #005555 !important;
  font-weight: bolder;

    
}
table {
  padding-left: 5lvw;
  padding-right: 5lvw;

  tr {
    td {
        cursor: pointer;
        }
    }

}

</style>
