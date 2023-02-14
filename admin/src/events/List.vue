<template>
  <div>
    <PageTitle
      text="Greinar"
      @add-new-item="openEditModal({})"
    />

    <CardComponent>
      <SimpleTable
        :data="events"
        :definition="tableDefinition"
        @click="openEditModal"
      />
    </CardComponent>

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
import PageTitle from '../_components/PageTitle.vue'
import CardComponent from '../_components/CardComponent.vue'
import SimpleTable from '../_components/SimpleTable.vue'
import ModalEdit from '../_components/EditModal.vue'
import ModalEditMixin from '../_mixins/ModalMixin.vue'
import EditEvent from './Edit.vue'

export default {
  name: 'ClubList',
  components: {
    PageTitle,
    CardComponent,
    SimpleTable,
    ModalEdit,
    EditEvent
  },
  mixins: [ModalEditMixin],
  inject: ['FRI_API_URL'],
  data () {
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
          field: 'officialLabel',
          label: 'Official grein',
          display: 'lg'
        },
        {
          field: 'typeName',
          label: 'Tegund',
          display: 'md'
        }
      ]
    }
  },
  created () {
    agent
      .get(this.FRI_API_URL + '/events')
      .withCredentials()
      .then(res => {
        this.events = res.body.map(item => ({
          ...item,
          typeName: item.type?.name,
          officialLabel: item.official ? 'Já' : 'Nei',
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
