<template>
  <div>
    <PageTitle
      text="Umsóknir vegna móthalds"
      @add-new-item="openEditModal({})"
    />

    <CardComponent>
      <SimpleTable
        :data="meets"
        :definition="tableDefinition"
        @click="openEditModal"
      />
    </CardComponent>

    <ModalEdit
      v-slot="{ confirm, callback }"
      size="extra-large"
    >
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
import PageTitle from '../_components/PageTitle.vue'
import CardComponent from '../_components/CardComponent.vue'
import SimpleTable from '../_components/SimpleTable.vue'
import ModalEdit from '../_components/EditModal.vue'
import ModalEditMixin from '../_mixins/ModalMixin.vue'
import EditMeet from './Edit.vue'

export default {
  name: 'MeetList',
  components: {
    PageTitle,
    CardComponent,
    SimpleTable,
    ModalEdit,
    EditMeet
  },
  mixins: [ModalEditMixin],
  inject: ['FRI_API_URL'],
  data () {
    return {
      meets: [],
      judges: [],
      venues: [],
      statuses: [
        {
          id: -1,
          name: 'Hafnað'
        },
        {
          id: 0,
          name: 'Umsókn'
        },
        {
          id: 1,
          name: 'Samþykkt'
        },
        {
          id: 2,
          name: 'Í gangi'
        },
        {
          id: 3,
          name: 'Lokið'
        },
        {
          id: 4,
          name: 'Staðfest'
        }
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
        {
          field: 'eventNames',
          label: 'Greinar',
          display: 'lg'
        }

      ]
    }
  },
  created () {
    agent
      .get(this.FRI_API_URL + '/meets')
      .query({ status: 0 })
      .withCredentials()
      .then(res => {
        this.meets = res.body.map(meet => ({
          ...meet,
          sentFormatted: format(new Date(meet.sent), 'dd.MM.yyyy'),
          startDateFormatted: format(new Date(meet.startDate), 'dd.MM.yyyy'),
          eventNames: meet.competition
            .map(c => c.eventName)
            .filter((val, index, arr) => arr.indexOf(val) === index) // unique list
            .join(', ')
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
        this.venues = res.body
      })
  }
}
</script>
