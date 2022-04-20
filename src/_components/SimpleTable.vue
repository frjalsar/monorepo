<template>
  <table class="table">
    <thead>
      <tr>
        <th
          v-for="header in headers"
          :key="header.field"
          :class="{
            'text-muted': header.field === 'id',
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
          colspan="8"
          align="center"
        >
          <div class="text-center">
            <div class="spinner-border" role="status"></div>
          </div>

        </td>
      </tr>
      <tr        
        v-for="item in filteredData"
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
      type: Boolean,
      default: false,
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
      if (!this.filter) {
        return this.data
      }

      return this.data.filter(item => {
        const filters = Object.keys(this.filter)
        return filters.every(key => this.filter[key] === item[key]        )
      })
    }
  },
  methods: {
    uniqueValues(header) {
      return this.data
        .map(obj => obj[header])
        .filter((val, index, arr) => arr.indexOf(val) === index) // unique list
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

.form-select {
  border: none;
  font-weight: bold;
  padding: 0;  
}

.form-select:focus {
  outline: none;
  box-shadow: none;
}
</style>
