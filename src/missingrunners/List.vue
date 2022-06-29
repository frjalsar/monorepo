<template>
<div>
  <Title text="Hlauparar án keppnisnúmer" @addNewItem="openEditModal({})" />

  <Card>
    <SimpleTable
      :data="missingRunners"
      :definition="tableDefinition"
      @click="openThor"
    />
  </Card>
    
</div>
</template>

<script>
import agent from 'superagent'
import Title from '../_components/Title.vue'
import Card from '../_components/Card.vue'
import SimpleTable from '../_components/SimpleTable.vue'

export default {
  name: 'MissingRunnersList',  
  components: {
    Title,
    Card,
    SimpleTable,      
  },
  inject: ['FRI_API_URL'],
  data() {
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
        },
      ],
      genders: [{
        id: 1,
        name: 'Karlar'
      }, {
        id: 2,
        name: 'Konur'
      }],
    }
  },
  methods: {
    openThor(missingRunner) {
      const path = 'http://mot.fri.is/MotFRI/SelectedCompetitionResults.aspx?Code='
      window.open(path + missingRunner.meet)
    }
  },
  created() {
    agent
      .get(this.FRI_API_URL + '/thor/missingrunners')
      .withCredentials()
      .then(res => {
        this.missingRunners = res.body.map(item => ({
          ...item,
          genderName: this.genders.find(g => g.id === item.gender)?.name,          
        }))
      })
  }
}
</script>