<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header.field"
          :class="{
            'text-secondary': header.field === 'id',
            'd-none d-lg-table-cell': header.display === 'lg',
            'd-none d-md-table-cell': header.display === 'md'
          }"
        >
        {{ header.label }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="busy">
        <td
          colspan="5"
          align="center"
        >
          <div class="text-center">
            <div class="spinner-border" role="status"></div>
          </div>

        </td>
      </tr>
      <tr        
        v-for="item in data"
        :key="item.id"
        @click="$emit('click', item)"
      >
        <td          
          v-for="header in headers"
          :key="header.field"
          :class="{
            'text-secondary': header.field === 'id',
            'd-none d-lg-table-cell': header.display === 'lg',
            'd-none d-md-table-cell': header.display === 'md'
          }"
        >
          {{ item[header.field] }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'SimpleTable', 
  emits: ['click'],
  props: {
    definition: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    filter: {
      type: String | Number,
      default: undefined
    },
    busy: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    headers () {
      if (this.definition.length) {
        return this.definition
      }

      if (this.data.length) {
        return Object.keys(this.data[0]).map(key => {
          return {
            label: key,
            field: key
          }
        })
      }

      return []
    },
    filteredData () {
      return this.data.filter(item => {
        return this.definition.reduce((acc, def) => {
          const value = item[def.field]
          const valueType = typeof value

          if (valueType === 'string') {
            return acc || value.toUpperCase().includes(this.query.toUpperCase())
          }

          if (valueType === 'number') {
            return acc || Number(value).toString().includes(this.query)
          }

          return acc
        }, false)
      })
    }
  }
}
</script>

<style scoped>
tr:hover td {
  cursor: pointer;
  background-color: #fa5c34;
  color: #fff;
}
</style>
