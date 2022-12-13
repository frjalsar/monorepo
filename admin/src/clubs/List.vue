<template>
<div>
  <Title text="Félög" @addNewItem="openEditModal({})" />

  <Card>
    <SimpleTable
      :data="clubs"
      :definition="tableDefinition"
      @click="openEditModal"
    />
  </Card>

  <ModalEdit v-slot="{ confirm, callback }"> 
    <EditClub
      :club="selectedModalItem"
      :regions="regions"
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
import EditClub from './Edit.vue'

export default {
  name: 'ClubList',
  mixins: [ModalEditMixin],
  components: {
    Title,
    Card,
    SimpleTable,
    ModalEdit,
    EditClub
  },
  inject: ['FRI_API_URL'],
  data() {
    return {
      clubs: [],
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
          display: 'xs'
        },
        {
          field: 'abbreviation',
          label: 'Skammstöfun',
          display: 'lg'
        },       
        {
          field: 'thorId',
          label: 'Þór',
          display: 'md'
        },
         {
          field: 'regionFullName',
          label: 'Íþróttahérað',
          display: 'md'
        },
      ]
    }
  },
  created() {
    agent
      .get(this.FRI_API_URL + '/clubs')
      .withCredentials()
      .then(res => {
        this.clubs = res.body.map(item => ({
          ...item,
          regionFullName: item.region.fullName
        }))
      })

    agent
      .get(this.FRI_API_URL + '/regions')
      .withCredentials()
      .then(res => {
        this.regions = res.body
      })
  }
}
</script>