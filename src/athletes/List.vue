<template>
<div>
  <h2>Iðkendur</h2>
  <hr />

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
      @click="goToEdit"
    />
  </Card>    

  <ModalPopup>
    <EditAthlete :athlete="selectedAthlete" :countries="countries"/>
  </ModalPopup>
</div>
</template>

<script>
import agent from 'superagent'
import { format } from 'date-fns'
import Card from '../_components/Card.vue'
import SearchPanel from '../_components/SearchPanel.vue'
import SimpleTable from '../_components/SimpleTable.vue'
import ModalPopup from '../_components/ModalPopup.vue'
import EditAthlete from './Edit.vue'

export default {
  name: 'AthleteList',
  components: {
    Card,
    SearchPanel,
    SimpleTable,
    ModalPopup,
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
    goToEdit (item) {
      this.selectedAthlete = item
      const el = document.getElementById('myModal')      
      const myModal = new bootstrap.Modal(el)
      
      myModal.show()
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
            country: athlete.country,
            gender: athlete.gender
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
    
    agent
      .get(this.COUNTRIES_API_URL + '/v2/all')
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

<style scoped>
tr:hover td {
  cursor: pointer;
  background-color: #eee;
}
</style>