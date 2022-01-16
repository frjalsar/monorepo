<template>
<div>
  <h2>Iðkendur</h2>
  <hr />

  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <SearchPanel
        :regions="regions"
        :clubs="clubs"
        :legacy="legacy"
        :settings="settings"
        @search="setQueryParams"
    />
    </div>
  </div>

  <div class="card shadow-sm mb-3">
    <div class="card-body">
      <SimpleTable
        :data="athletes"     
        :definition="tableDefinition"   
        :busy="busy"
      />
    </div>
  </div>

</div>
</template>

<script>
import agent from 'superagent'
import { format } from 'date-fns'
import SearchPanel from '../_components/SearchPanel.vue'
import SimpleTable from '../_components/SimpleTable.vue'

export default {
  name: 'AthleteList',
  components: {
    SearchPanel,
    SimpleTable
  },
  inject: ['FRI_API_URL'],
  data() {
    return {
      busy: false,
      athletes: [],
      clubs: [],
      regions: [],
      legacy: [],
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
    onClick (item) {
      this.$router.push('/idkendur/' + item.id)
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
            id: athlete.id,
            fullName: athlete.fullName,
            birthyear: athlete.birthyear,
            clubFullName: athlete.club?.fullName,
            lastCompeted: format(new Date(athlete.lastCompeted), 'dd.MM.yyyy'),
            country: athlete.country
          }))

          this.busy = false
        })
    }
  },
  created() {
    this.search()

    agent
      .get(this.FRI_API_URL + '/clubs')
      .then(res => {
        this.clubs = res.body
      })

    agent
      .get(this.FRI_API_URL + '/regions')
      .then(res => {
        this.regions = res.body
      })

    agent
      .get(this.FRI_API_URL + '/membership/legacy')
      .then(res => {
        this.legacy = res.body
      })
  }
}
</script>

<style scoped>
tr:hover td {
  cursor: pointer;
  background-color: #eee;
}
</style>