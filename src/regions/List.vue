<template>
<div>
  <Title text="Íþróttahéruð" @addNewItem="openEditModal()" />

  <Card>
    <SimpleTable
      :data="regions"     
      :definition="tableDefinition"
      @click="openEditModal"
    />
  </Card>

  <ModalEdit v-slot="{ confirm, callback }"> 
    <EditRegion
      :region="selectedModalItem"
      :confirm="confirm"
      @done="callback"
    />
  </ModalEdit>
</div>
</template>

<script>
import agent from 'superagent'
import Title from '../_components/Title.vue'
import Card from '../_components/Card.vue'
import SimpleTable from '../_components/SimpleTable.vue'
import ModalEdit from '../_components/EditModal.vue'
import ModalEditMixin from '../_mixins/EditModalMixin.vue'
import EditRegion from './Edit.vue'

export default {
  name: 'RegionList',
  mixins: [ModalEditMixin],
  components: {
    Title,
    Card,
    SimpleTable,
    ModalEdit,
    EditRegion
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