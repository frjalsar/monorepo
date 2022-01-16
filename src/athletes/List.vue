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
      <table class="table table-striped">
        <thead class="thead-light">
          <tr>
            <th scope="col" class="d-none d-lg-table-cell"> Númer </th>
            <th scope="col"> Nafn </th>
            <th scope="col" class="d-none d-md-table-cell"> Fæðingarár </th>
            <th scope="col" class="d-none d-md-table-cell"> Félag </th>
            <th scope="col" class="d-none d-lg-table-cell"> Land </th>
          </tr>
        </thead>
        <tbody>
            <tr v-if="busy">
              <td
                colspan="5"
                align="center"
              >
                <div class="text-center">
                  <div class="spinner-border" role="status"></div>
                </div>

              </td>
            </tr>
            <tr
              v-for="athlete in athletes"
              :key="athlete.id"
              @click.prevent="onClick && onClick(athlete)"
            >
              <td class="d-none d-lg-table-cell">
                {{ athlete.id }}
              </td>
              <td>{{ athlete.fullName }}</td>
              <td class="d-none d-md-table-cell">
                {{ athlete.birthyear }}
              </td>
              <td class="d-none d-md-table-cell">
                {{ athlete.club && athlete.club.fullName }}
              </td>
              <td class="d-none d-lg-table-cell">
                {{ athlete.country }}
              </td>
            </tr>
          </tbody>
      </table>
    </div>
  </div>
</div>
</template>

<script>
import agent from 'superagent'
import SearchPanel from './SearchPanel.vue'

export default {
  name: 'AthleteList',
  components: {
    SearchPanel
  },
  inject: ['FRI_API_URL'],
  data() {
    return {
      busy: false,
      athletes: [],
      clubs: [],
      regions: [],
      legacy: []
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
          this.athletes = res.body
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