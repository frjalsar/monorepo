<template>
<div>
  <Title text="Dómarar" @addNewItem="openEditModal({})" />

  <Card>
    <SimpleTable
      :data="judges"
      :definition="tableDefinition"
      @click="openEditModal"
    />
  </Card>

  <ModalEdit v-slot="{ confirm, callback }"> 
    <EditJudge
      :judge="selectedModalItem"
      :judgeTypes="judgeTypes"
      :clubs="clubs"
      :confirm="confirm"
      @done="(isDone) => closeEditModal(isDone, callback)"
    />
  </ModalEdit>
</div>
</template>

<script>
import agent from 'superagent'
import Title from '../_components/Title.vue'
import Card from '../_components/Card.vue'
import SimpleTable from '../_components/SimpleTable.vue'
import ModalEdit from '../_components/EditModal.vue'
import ModalEditMixin from '../_mixins/ModalMixin.vue'
import EditJudge from './Edit.vue'

export default {
  name: 'ListJudges',
  mixins: [ModalEditMixin],
  components: {
    Title,
    Card,
    SimpleTable,
    ModalEdit,
    EditJudge
  },
  inject: ['FRI_API_URL'],
  data() {
    return {
      judges: [],
      judgeTypes: [],
      clubs: [],      
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
          field: 'date',
          label: 'Dags. réttinda',
          display: 'md'
        },
        {
          field: 'typeName',
          label: 'Flokkur',
          display: 'md'
        },
        {
          field: 'validLabel',
          label: 'Gild réttindi',
          display: 'md'
        },
        {
          field: 'clubFullName',
          label: 'Félag',
          display: 'md'
        },
      ]
    }
  },
  created() {
    agent
      .get(this.FRI_API_URL + '/judges')
      .withCredentials()
      .then(res => {
        this.judges = res.body.map(item => ({
          ...item,
          clubFullName: item.club?.fullName,
          typeName: item.type?.name,
          validLabel: item.valid ? 'Já' : 'Nei'
        }))
      })

    agent
      .get(this.FRI_API_URL + '/clubs')
      .withCredentials()
      .then(res => {
        this.clubs = res.body
      })

    agent
      .get(this.FRI_API_URL + '/judgetypes')
      .withCredentials()
      .then(res => {
        this.judgeTypes = res.body
      })
  }
}
</script>