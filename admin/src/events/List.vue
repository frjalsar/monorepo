<template>
<div>
  <Title text="Greinar" @addNewItem="openEditModal({})" />

  <Card>
    <SimpleTable
      :data="events"
      :definition="tableDefinition"
      @click="openEditModal"
    />
  </Card>

  <ModalEdit v-slot="{ confirm, callback }"> 
    <EditEvent
      :event="selectedModalItem"
      :types="eventtypes"
      :events="events"
      :confirm="confirm"
      @done="(isDone) => closeEditModal(isDone, callback)"
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
import ModalEditMixin from '../_mixins/ModalMixin.vue'
import EditEvent from './Edit.vue'

export default {
  name: 'ClubList',
  mixins: [ModalEditMixin],
  components: {
    Title,
    Card,
    SimpleTable,
    ModalEdit,
    EditEvent
  },
  inject: ['FRI_API_URL'],
  data() {
    return {
      events: [],
      eventtypes: [],
      tableDefinition: [
        {
          field: 'id',
          label: '#',
          display: 'lg'
        },
        {
          field: 'name',
          label: 'Nafn',
          display: 'xs'
        },
        {
          field: 'iaafLabel',
          label: 'IAAF grein',
          display: 'lg'
        },               
         {
          field: 'typeName',
          label: 'Tegund',
          display: 'md'
        },
      ]
    }
  }, 
  created() {
    agent
      .get(this.FRI_API_URL + '/events')
      .withCredentials()
      .then(res => {
        this.events = res.body.map(item => ({
          ...item,
          typeName: item.type?.name,
          iaafLabel: item.iaaf ? 'Já' : 'Nei',
          worldRecordLabel: item.worldRecord ? 'Já' : 'Nei'
        }))        
      })

    agent
      .get(this.FRI_API_URL + '/eventtypes')
      .withCredentials()
      .then(res => {
        this.eventtypes = res.body
      })  
  }
}
</script>