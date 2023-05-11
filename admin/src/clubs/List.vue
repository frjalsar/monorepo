<template>
  <div>
    <PageTitle
      text="Félög"
      @add-new-item="openEditModal({})"
    />

    <CardComponent>
      <SimpleTable
        :data="clubs"
        :definition="tableDefinition"
        @click="openEditModal"
      />
    </CardComponent>

    <ModalEdit v-slot="{ confirm, alert }">
      <EditClub
        :club="selectedModalItem"
        :regions="regions"
        :confirm="confirm"
        @alert="({ type, message }) => alert(type, message)"
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
import EditClub from './Edit.vue'

export default {
  name: 'ClubList',
  components: {
    PageTitle,
    CardComponent,
    SimpleTable,
    ModalEdit,
    EditClub
  },
  mixins: [ModalEditMixin],
  inject: ['FRI_API_URL'],
  data () {
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
        }
      ]
    }
  },
  created () {
    agent
      .get(this.FRI_API_URL + '/clubs')
      .withCredentials()
      .then(res => {
        this.clubs = res.body.map(item => ({
          ...item,
          regionFullName: item.region && item.region.fullName
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
