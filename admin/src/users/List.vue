<template>
  <div>
    <PageTitle
      text="Notendur"
      @add-new-item="openEditModal({})"
    />

    <CardComponent>
      <SimpleTable
        :data="users"
        :definition="tableDefinition"
        @click="openEditModal"
      />
    </CardComponent>

    <ModalEdit v-slot="{ confirm, callback }">
      <EditUser
        :user="selectedModalItem"
        :clubs="clubs"
        :regions="regions"
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
import EditUser from './Edit.vue'

export default {
  name: 'ListUsers',
  components: {
    PageTitle,
    CardComponent,
    SimpleTable,
    ModalEdit,
    EditUser
  },
  mixins: [ModalEditMixin],
  inject: ['FRI_API_URL'],
  data () {
    return {
      users: [],
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
          field: 'adminLabel',
          label: 'Stjórnandi',
          display: 'lg'
        },
        {
          field: 'clubAbbreviation',
          label: 'Félag',
          display: 'md'
        },
        {
          field: 'regionAbbreviation',
          label: 'Íþróttahérað',
          display: 'md'
        }
      ]
    }
  },
  created () {
    agent
      .get(this.FRI_API_URL + '/users')
      .withCredentials()
      .then(res => {
        this.users = res.body.map(item => ({
          ...item,
          adminLabel: item.admin ? 'Já' : ''
        }))
      })

    agent
      .get(this.FRI_API_URL + '/regions')
      .withCredentials()
      .then(res => {
        this.regions = res.body
      })

    agent
      .get(this.FRI_API_URL + '/clubs')
      .withCredentials()
      .then(res => {
        this.clubs = res.body
      })
  }
}
</script>
