<template>
<div>
  <Title text="Flokkun greina" @addNewItem="openEditModal({})" />

  <Card>
    <SimpleTable
      :data="eventtypes"
      :definition="tableDefinition"
      @click="openEditModal"
    />
  </Card>

  <ModalEdit v-slot="{ confirm, callback }"> 
    <EditEventTypes
      :eventtype="selectedModalItem"
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
import EditEventTypes from './Edit.vue'

export default {
  name: 'ClubList',
  mixins: [ModalEditMixin],
  components: {
    Title,
    Card,
    SimpleTable,
    ModalEdit,
    EditEventTypes
  },
  inject: ['FRI_API_URL'],
  data() {
    return {
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
          field: 'ordering',
          label: 'Röðun',
          display: 'md'
        },

      ]
    }
  },
  created() {
    agent
      .get(this.FRI_API_URL + '/eventtypes')
      .withCredentials()
      .then(res => {
        this.eventtypes = res.body
      })  
  }
}
</script>