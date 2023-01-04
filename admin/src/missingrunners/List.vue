<template>
  <div>
    <PageTitle
      text="Hlauparar án keppnisnúmer"
      @add-new-item="openEditModal({})"
    />

    <CardComponent>
      <SimpleTable
        :data="missingRunners"
        :definition="tableDefinition"
        @click="openEditModal"
      />
    </CardComponent>

    <ModalEdit v-slot="{ confirm, callback }">
      <EditMissingRunners
        :athlete="selectedModalItem"
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
import ModalMixin from '../_mixins/ModalMixin.vue'
import EditMissingRunners from './Edit.vue'

export default {
  name: 'MissingRunnersList',
  components: {
    PageTitle,
    CardComponent,
    SimpleTable,
    ModalEdit,
    EditMissingRunners
  },
  mixins: [ModalMixin],
  inject: ['FRI_API_URL'],
  data () {
    return {
      missingRunners: [],
      tableDefinition: [
        {
          field: 'meetName',
          label: 'Mót',
          display: 'lg'
        },
        {
          field: 'startPosition',
          label: 'Rásnúmer',
          display: 'md'
        },
        {
          field: 'fullName',
          label: 'Fullt nafn',
          display: 'lg'
        },
        {
          field: 'kt',
          label: 'Kennitala',
          display: 'md'
        },
        {
          field: 'genderName',
          label: 'Kyn',
          display: 'md'
        },
        {
          field: 'birthyear',
          label: 'Fæðingarár',
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
      .get(this.FRI_API_URL + '/thor/missingrunners')
      .withCredentials()
      .then(res => {
        this.missingRunners = res.body.map(item => ({
          id: item.meetCode + '-' + item.fullName + '-' + item.birthyear,
          ...item,
          genderName: this.genders.find(g => g.id === item.gender)?.name
        }))
      })
  },
  methods: {
    openThor (missingRunner) {
      const path = 'http://mot.fri.is/MotFRI/SelectedCompetitionResults.aspx?Code='
      window.open(path + missingRunner.meet)
    }
  }
}
</script>
