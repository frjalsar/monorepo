<template>
<div>
  <Title text="Flokkun dómara" @addNewItem="openEditModal({})" />

  <Card>
    <SimpleTable
      :data="judgetypes"
      :definition="tableDefinition"
      @click="openEditModal"
    />
  </Card>

  <ModalEdit v-slot="{ confirm, callback }"> 
    <EditJudgeTypes
      :judgetype="selectedModalItem"
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
import EditJudgeTypes from './Edit.vue'

export default {
  name: 'JudgeTypeList',
  mixins: [ModalEditMixin],
  components: {
    Title,
    Card,
    SimpleTable,
    ModalEdit,
    EditJudgeTypes
  },
  inject: ['FRI_API_URL'],
  data() {
    return {
      judgetypes: [],
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
          field: 'stage',
          label: 'Stig',
          display: 'md'
        },

      ]
    }
  },
  created() {
    agent
      .get(this.FRI_API_URL + '/judgetypes')
      .withCredentials()
      .then(res => {
        this.judgetypes = res.body
      })  
  }
}
</script>