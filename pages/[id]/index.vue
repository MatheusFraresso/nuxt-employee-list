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
  <section id="employee">
    <v-skeleton-loader
      type="card"
      v-if="!employee?.name && !employee?.description && employee?.picture"
    ></v-skeleton-loader>
    <v-card v-else variant="tonal">
      <v-card-title>{{ employee?.name }}</v-card-title>
      <v-card-subtitle>{{ employee?.jobTitle }}</v-card-subtitle>

      <v-card-text>
        <v-container>
          <v-row>
            <v-col sm="8">
              {{ employee?.description }}
            </v-col>
            <v-col sm="4">
              <v-img :src="`${employee?.picture}`" :width="200" rounded></v-img>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
    </v-card>
  </section>
</template>

<style>
#employee {
  padding-left: 20lvw;
  padding-right: 20lvw;
  padding-top: 5lvw;
}
</style>
