<template>
  <div>
    <PageTitle
      text="Flokkun dómara"
      @add-new-item="openEditModal({})"
    />

    <CardComponent>
      <SimpleTable
        :data="judgetypes"
        :definition="tableDefinition"
        @click="openEditModal"
      />
    </CardComponent>

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
import PageTitle from '../_components/PageTitle.vue'
import CardComponent from '../_components/CardComponent.vue'
import SimpleTable from '../_components/SimpleTable.vue'
import ModalEdit from '../_components/EditModal.vue'
import ModalEditMixin from '../_mixins/ModalMixin.vue'
import EditJudgeTypes from './Edit.vue'

export default {
  name: 'JudgeTypeList',
  components: {
    PageTitle,
    CardComponent,
    SimpleTable,
    ModalEdit,
    EditJudgeTypes
  },
  mixins: [ModalEditMixin],
  inject: ['FRI_API_URL'],
  data () {
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
        }

      ]
    }
  },
  created () {
    agent
      .get(this.FRI_API_URL + '/judgetypes')
      .withCredentials()
      .then(res => {
        this.judgetypes = res.body
      })
  }
}
</script>
