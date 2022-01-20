<template>
<div>
  <h2>Íþróttahéruð</h2>
  <hr />
  <Card>
    <SimpleTable
      :data="regions"     
      :definition="tableDefinition"
      @click="openModalEdit"
    />
</Card>
</div>
</template>

<script>
import agent from 'superagent'
import Card from '../_components/Card.vue'
import SimpleTable from '../_components/SimpleTable.vue'

export default {
  name: 'RegionList',
  components: {
    Card,
    SimpleTable
  },
  inject: ['FRI_API_URL'],
  data() {
    return {
      busy: false,      
      regions: [],
      tableDefinition: [
        {
          field: 'id',
          label: '#',
          display: 'lg'
        },
        {
          field: 'fullName',
          label: 'Nafn',
          display: 'md'
        },
        {
          field: 'abbreviation',
          label: 'Skammstöfun',
          display: 'lg'
        },        
      ]
    }
  },  
  created() {
    agent
      .get(this.FRI_API_URL + '/regions')
      .withCredentials()
      .then(res => {
        this.regions = res.body.map(region => ({
          id: region.id,
          fullName: region.fullName,
          abbreviation: region.abbreviation,          
        }))
      })   
  }
}
</script>

<style scoped>
tr:hover td {
  cursor: pointer;
  background-color: #eee;
}
</style>