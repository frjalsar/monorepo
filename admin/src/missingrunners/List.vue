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
        @click="openThor"
      />
    </CardComponent>
  </div>
</template>

<script>
import agent from 'superagent'
import PageTitle from '../_components/PageTitle.vue'
import CardComponent from '../_components/CardComponent.vue'
import SimpleTable from '../_components/SimpleTable.vue'

export default {
  name: 'MissingRunnersList',
  components: {
    PageTitle,
    CardComponent,
    SimpleTable
  },
  inject: ['FRI_API_URL'],
  data () {
    return {
      missingRunners: [],
      tableDefinition: [
        {
          field: 'meet',
          label: 'Mót',
          display: 'lg'
        },
        {
          field: 'startPosition',
          label: 'Rásnúmer',
          display: 'md'
        },
        {
          field: 'name',
          label: 'Fullt nafn',
          display: 'lg'
        },
        {
          field: 'genderName',
          label: 'Kyn',
          display: 'md'
        },
        {
          field: 'dateOfBirth',
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
