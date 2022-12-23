<template>
  <div>
    <PageTitle
      text="Mannvirki"
      @add-new-item="openEditModal({})"
    />

    <CardComponent>
      <SimpleTable
        :data="venues"
        :definition="tableDefinition"
        @click="openEditModal"
      />
    </CardComponent>

    <ModalEdit v-slot="{ confirm, callback }">
      <EditVenue
        :venue="selectedModalItem"
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
import EditVenue from './Edit.vue'

export default {
  name: 'ClubList',
  components: {
    PageTitle,
    CardComponent,
    SimpleTable,
    ModalEdit,
    EditVenue
  },
  mixins: [ModalEditMixin],
  inject: ['FRI_API_URL'],
  data () {
    return {
      venues: [],
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
          field: 'indoorText',
          label: 'Innanhús',
          display: 'lg'
        },
        {
          field: 'straightLanes',
          label: 'Beinar brauta',
          display: 'md'
        },
        {
          field: 'ovalLanes',
          label: 'Hringbrautir',
          display: 'md'
        }
      ]
    }
  },
  created () {
    agent
      .get(this.FRI_API_URL + '/venues')
      .withCredentials()
      .then(res => {
        this.venues = res.body.map(item => ({
          ...item,
          indoorText: item.indoor ? 'Já' : 'Nei'
        }))
      })
  }
}
</script>
