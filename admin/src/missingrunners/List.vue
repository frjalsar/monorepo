<template>
  <div>
    <PageTitle
      text="Hlauparar án keppnisnúmers"
      :show-create-button="false"
      @add-new-item="openEditModal({})"
    />

    <CardComponent>
      <SearchPanel
        :meets="meets"
        :settings="settings"
        @search="setQueryParams"
      />
    </CardComponent>

    <CardComponent>
      <SimpleTable
        :data="missingRunners"
        :definition="tableDefinition"
        :busy="busy"
        @click="openEditModal"
      />
    </CardComponent>

    <ModalEdit v-slot="{ confirm, alert }">
      <EditMissingRunners
        :missing-runner="selectedModalItem"
        :confirm="confirm"
        @alert="({ type, message }) => alert(type, message)"
      />
    </ModalEdit>
  </div>
</template>

<script>
import agent from 'superagent'
import PageTitle from '../_components/PageTitle.vue'
import SearchPanel from './SearchPanel.vue'
import CardComponent from '../_components/CardComponent.vue'
import SimpleTable from '../_components/SimpleTable.vue'
import ModalEdit from '../_components/EditModal.vue'
import ModalMixin from '../_mixins/ModalMixin.vue'
import EditMissingRunners from './Edit.vue'

export default {
  name: 'MissingRunnersList',
  components: {
    PageTitle,
    SearchPanel,
    CardComponent,
    SimpleTable,
    ModalEdit,
    EditMissingRunners
  },
  mixins: [ModalMixin],
  inject: ['FRI_API_URL'],
  data () {
    return {
      busy: false,
      missingRunners: [],
      meets: [],
      tableDefinition: [
        {
          field: 'meetCode',
          label: 'Mótakóði',
          display: 'lg'
        },
        {
          field: 'meetName',
          label: 'Mót',
          display: 'lg'
        },
        {
          field: 'fullName',
          label: 'Fullt nafn',
          display: 'lg'
        },
        {
          field: 'birthyear',
          label: 'Fæðingarár',
          display: 'md'
        },
        {
          field: 'bibNo',
          label: 'Rásnúmer',
          display: 'md'
        },
        {
          field: 'kt',
          label: 'Kennitala',
          display: 'md'
        }
      ]
    }
  },
  computed: {
    settings () {
      return this.$route.query
    }
  },
  created () {
    this.search().then(() => {
      this.meets = this.missingRunners
        .map(item => ({
          code: item.meetCode,
          name: item.meetName
        }))
        .filter((value, index, self) => self.findIndex(m => m.code === value.code) === index)
    })
  },
  methods: {
    search () {
      this.busy = true
      this.missingRunners = []
      return agent
        .get(this.FRI_API_URL + '/thor/missingrunners')
        .withCredentials()
        .query(this.$route.query)
        .then(res => {
          this.missingRunners = res.body
          this.busy = false
        })
    },
    setQueryParams (query) {
      this.$router.replace({ query }).then(() => {
        this.search()
      })
    },
    openThor (missingRunner) {
      const path = 'http://mot.fri.is/MotFRI/SelectedCompetitionResults.aspx?Code='
      window.open(path + missingRunner.meet)
    }
  }
}
</script>
