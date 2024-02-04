<script>
export default {
  data: () => ({
    employee: {},
  }),
  async created() {
    const route = useRoute()
    this.employee = await useFetch("/api/employees", {
      query: { id: route.path },
    }).data
  },
}
</script>
<template>
  <h1>{{ employee.name }}</h1>
  <h1>{{ employee.jobTitle }}</h1>
  <img :src="`${employee.picture}`" />
</template>
