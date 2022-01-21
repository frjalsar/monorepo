<template>
<div>
  <Title text="Iðkendur" @addNewItem="openModalEdit()" />

  <Card>
    <SearchPanel
      :regions="regions"
      :clubs="clubs"
      :legacy="legacy"
      :settings="settings"
      @search="setQueryParams"
    />
  </Card>

  <Card>
    <SimpleTable
      :data="athletes"
      :definition="tableDefinition"
      :busy="busy"
      @click="openModalEdit"
    />
  </Card>

  <ModalEdit v-slot="{ confirm, callback }">
    <EditAthlete
      :athlete="selectedModalItem"
      :clubs="clubs"
      :countries="countries"
      :confirm="confirm"
      @done="callback"
    />
  </ModalEdit>
</div>
</template>

<script>
import agent from 'superagent'
import { format } from 'date-fns'
import Title from '../_components/Title.vue'
import Card from '../_components/Card.vue'
import SearchPanel from '../_components/SearchPanel.vue'
import SimpleTable from '../_components/SimpleTable.vue'
import ModalEdit from '../_components/ModalEdit.vue'
import ModalEditMixin from '../_mixins/ModalEdit.vue'
import EditAthlete from './Edit.vue'

export default {
  name: 'ListAthlete',
  mixins: [ModalEditMixin],
  components: {
    Title,
    Card,
    SearchPanel,
    SimpleTable,
    ModalEdit,
    EditAthlete
  },
  inject: ['FRI_API_URL', 'COUNTRIES_API_URL'],
  data() {
    return {
      busy: false,
      selectedAthlete: {},
      athletes: [],
      clubs: [],
      regions: [],
      legacy: [],
      countries: [],
      tableDefinition: [
        {
          field: 'id',
          label: '#',
          display: 'lg'
        },
        {
          field: 'fullName',
          label: 'Nafn',
          display: 'md'
        },
        {
          field: 'kt',
          label: 'Kennitala',
          display: 'lg'
        },
        {
          field: 'birthyear',
          label: 'Fæðingarár',
          display: 'md'
        },
        {
          field: 'clubFullName',
          label: 'Félag',
          display: 'md'
        },
        {
          field: 'lastCompeted',
          label: 'Keppti seinast',
          display: 'lg'
        },
        {
          field: 'country',
          label: 'Land',
          display: 'lg'
        },
      ]
    }
  },
  computed: {
    settings () {
      return this.$route.query
    }
  },
  methods: {
    setQueryParams (query) {
      this.$router.replace({ query }).then(() => {
        this.search()
      })
    },
    search () {
      this.busy = true
      this.athletes = []
      return agent
        .get(this.FRI_API_URL + '/athletes')
        .withCredentials()
        .query(this.$route.query)
        .then(res => {
          this.athletes = res.body.map(athlete => ({
            ...athlete,
            newMembership: athlete.membership.map(m => ({...m})), // cloning to avoid assign by ref
            clubFullName: athlete.club?.fullName,
            lastCompeted: format(new Date(athlete.lastCompeted), 'dd.MM.yyyy'),
          }))

          this.busy = false
        })
    },
  },
  created() {
    this.search()

    agent
      .get(this.FRI_API_URL + '/clubs')
      .withCredentials()
      .then(res => {
        this.clubs = res.body
      })

    agent
      .get(this.FRI_API_URL + '/regions')
      .withCredentials()
      .then(res => {
        this.regions = res.body
      })

    agent
      .get(this.FRI_API_URL + '/membership/legacy')
      .withCredentials()
      .then(res => {
        this.legacy = res.body
      })
    
    agent
      .get(this.COUNTRIES_API_URL + '/v2/all')
      .withCredentials()
      .then(res => {
        this.countries = res.body.map(country => ({
          value: country.alpha3Code,
          text: country.nativeName
        }))

        this.countries.unshift({
          value: undefined,
          text: 'Velja land'
        })
      })
  }
}
</script>