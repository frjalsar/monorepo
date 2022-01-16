<template>
<div>
  <h2>Félög</h2>
  <hr />
  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <SimpleTable
        :data="clubs"     
        :definition="tableDefinition"   
        :busy="busy"
      />
    </div>
  </div>
</div>
</template>

<script>
import agent from 'superagent'
import SimpleTable from '../_components/SimpleTable.vue'

export default {
  name: 'ClubList',
  components: {
    SimpleTable
  },
  inject: ['FRI_API_URL'],
  data() {
    return {
      busy: false,      
      clubs: [],
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
        {
          field: 'regionFullName',
          label: 'Íþróttahérað',
          display: 'md'
        }
      ]
    }
  },  
  created() {
    agent
      .get(this.FRI_API_URL + '/clubs')
      .then(res => {
        this.clubs = res.body.map(club => ({
          id: club.id,
          fullName: club.fullName,
          abbreviation: club.abbreviation,
          regionFullName: club.region?.fullName
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