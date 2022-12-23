<template>
  <div>
    <PageTitle
      text="Áhöld"
      @add-new-item="openEditModal({})"
    />

    <CardComponent>
      <SimpleTable
        :data="equipment"
        :definition="tableDefinition"
        @click="openEditModal"
      />
    </CardComponent>

    <ModalEdit v-slot="{ confirm, callback }">
      <EditEquipment
        :equipment="selectedModalItem"
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
import EditEquipment from './Edit.vue'

export default {
  name: 'ListEquipment',
  components: {
    PageTitle,
    CardComponent,
    SimpleTable,
    ModalEdit,
    EditEquipment
  },
  mixins: [ModalEditMixin],
  inject: ['FRI_API_URL'],
  data () {
    return {
      equipment: [],
      events: [],
      tableDefinition: [
        {
          field: 'id',
          label: '#',
          display: 'lg'
        },
        {
          field: 'eventName',
          label: 'Heiti greinar',
          display: 'xs'
        },
        {
          field: 'age',
          label: 'Aldur',
          display: 'md'
        },
        {
          field: 'genderName',
          label: 'Kyn',
          display: 'md'
        },
        {
          field: 'valueWithUnit',
          label: 'Gildi',
          display: 'md'
        }
      ],
      genders: [{
        id: 1,
        name: 'Karlar'
      }, {
        id: 2,
        name: 'Konur'
      }]
    }
  },
  created () {
    agent
      .get(this.FRI_API_URL + '/equipment')
      .withCredentials()
      .then(res => {
        this.equipment = res.body.map(item => ({
          ...item,
          genderName: this.genders.find(g => g.id === item.gender)?.name,
          eventName: item.event?.name,
          valueWithUnit: item.value + ' ' + item.unit
        }))
      })

    agent
      .get(this.FRI_API_URL + '/events')
      .withCredentials()
      .then(res => {
        this.events = res.body.filter(event => {
          const isThrow = event.typeId === 9 // Todo: StrId
          const isHurdles = event.typeId === 6

          return isThrow || isHurdles
        })
      })
  }
}
</script>
