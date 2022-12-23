<template>
  <div>
    <PageTitle
      text="Flokkun greina"
      @add-new-item="openEditModal({})"
    />

    <CardComponent>
      <SimpleTable
        :data="eventtypes"
        :definition="tableDefinition"
        @click="openEditModal"
      />
    </CardComponent>

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
import PageTitle from '../_components/PageTitle.vue'
import CardComponent from '../_components/CardComponent.vue'
import SimpleTable from '../_components/SimpleTable.vue'
import ModalEdit from '../_components/EditModal.vue'
import ModalEditMixin from '../_mixins/ModalMixin.vue'
import EditEventTypes from './Edit.vue'

export default {
  name: 'ClubList',
  components: {
    PageTitle,
    CardComponent,
    SimpleTable,
    ModalEdit,
    EditEventTypes
  },
  mixins: [ModalEditMixin],
  inject: ['FRI_API_URL'],
  data () {
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
        }

      ]
    }
  },
  created () {
    agent
      .get(this.FRI_API_URL + '/eventtypes')
      .withCredentials()
      .then(res => {
        this.eventtypes = res.body
      })
  }
}
</script>
