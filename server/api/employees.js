export default defineCachedEventHandler(async (event) => {
  let employees = []
  let query = getQuery(event)
  let url =
    "https://64e09d8b50713530432c80af.mockapi.io/api/mock/mmmf17/employees"

  if (query.id) url += query.id
  try {
    const data = await fetch(url)
    employees = await data.json()
    return employees
  } catch (error) {
    console.error(error.message)
  } finally {
    return employees
  }
})
