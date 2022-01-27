<template>
<div>
  <Title text="Umsóknir vegna móthalds" @addNewItem="openEditModal({})" />

  <Card>
    <SimpleTable
      :data="meets"
      :definition="tableDefinition"
      @click="openEditModal"
    />
  </Card>

  <ModalEdit v-slot="{ confirm, callback }"> 
    <EditMeet
      :meet="selectedModalItem"
      :venues="venues"
      :judges="judges"
      :statuses="statuses"
      :confirm="confirm"
      @done="(isDone) => closeEditModal(isDone, callback)"
    />
  </ModalEdit>
</div>
</template>

<script>
import agent from 'superagent'
import { format } from 'date-fns'
import Title from '../_components/Title.vue'
import Card from '../_components/Card.vue'
import SimpleTable from '../_components/SimpleTable.vue'
import ModalEdit from '../_components/EditModal.vue'
import ModalEditMixin from '../_mixins/ModalMixin.vue'
import EditMeet from './Edit.vue'

export default {
  name: 'MeetList',
  mixins: [ModalEditMixin],
  components: {
    Title,
    Card,
    SimpleTable,
    ModalEdit,
    EditMeet
  },
  inject: ['FRI_API_URL'],
  data() {
    return {
      meets: [],
      judges: [],
      venues: [],
      statuses: [
        {
          id: 1,
          name: 'Umsókn'
        },
        {
          id: 2,
          name: 'Samþykkt'
        },        
        {
          id: 3,
          name: 'Í gangi'
        },
        {
          id: 4,
          name: 'Lokið'
        },
        {
          id: 5,
          name: 'Staðfest'
        },
      ],
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
          field: 'sentFormatted',
          label: 'Sent inn',
          display: 'md'
        },
        {
          field: 'startDateFormatted',
          label: 'Dagsetning móts',
          display: 'md'
        },
        {
          field: 'organizerName',
          label: 'Ábyrgðaraðili',
          display: 'lg'
        },       
        {
          field: 'contactName',
          label: 'Mótsstjóri',
          display: 'md'
        },
        {
          field: 'judgeName',
          label: 'Dómari',
          display: 'md'
        },
        
      ]
    }
  },
  created() {
    agent
      .get(this.FRI_API_URL + '/meets')
      .query({ status: 1 })
      .withCredentials()
      .then(res => {
        this.meets = res.body.map(meet => ({
          ...meet,
          sentFormatted: format(new Date(meet.sent), 'dd.MM.yyyy'),
          startDateFormatted: format(new Date(meet.startDate), 'dd.MM.yyyy'),
        }))
      })

    agent
      .get(this.FRI_API_URL + '/judges')
      .withCredentials()
      .then(res => {
        this.judges = res.body
      })
    
    agent
      .get(this.FRI_API_URL + '/venues')
      .withCredentials()
      .then(res => {
        console.log('res')
        this.venues = res.body
      })
  }
}
</script>