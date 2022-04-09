<template>
<div>

  <p class="lead mb-4">
    Nú getur þú farið yfir skráninguna. Með því að ýta á staðfesta sendist umsóknin til FRÍ sem fer hana og sendir þér síðan svar.
    Verði umsóknin samþykkt birtist mótið í mótadagatali FRÍ á fri.is
  </p>

  <div class="row mb-3">
    <div class="col-md-4 offset-md-2">
      <h2>Ábyrgðaraðili</h2>
      {{ data.organizerName }}<br />
      {{ data.organizerKt }}
    </div>
    <div class="col-md-4">
      <h2>Mótsstjóri</h2>
      {{ data.contactName }}<br />
      {{ data.contactEmail }}<br />
      {{ data.contactPhone }}
    </div>
  </div>

  <div class="row mb-3">
    <div class="col-md-4 offset-md-2">
      <h2>Mót</h2>
      {{ data.meetName }}<br />
      {{ data.meetVenue && data.meetVenue.fullName }}<br />
      {{ data.meetLocation }}
    </div>
    <div class="col-md-4">
      <h2>Dómari</h2>
      {{ data.judge && data.judge.fullName }}<br />
    </div>
  </div>

  <div class="row mb-3">
    <div class="col-md-4 offset-md-2">
      <h2>Keppni</h2>
      <div v-for="item in data.competition" :key="item">{{ item.event && item.event.name }}, {{ item.ageFrom }} - {{ item.ageTo }} ára, {{ item.gender && item.gender.text }}</div>
    </div>    
  </div>
  

  <div class="row">
    <div class="col mx">
      <button type="button" class="btn btn-secondary btn-lg py-3 my-3" @click="back">
        Til baka
      </button>
      <button type="button" class="btn btn-primary btn-lg py-3 my-3 mx-3" @click="next">
        Staðfesta
      </button>
    </div>    
  </div>
  

</div>
</template>

<script>
import agent from 'superagent'
export default {
  name: 'TrackConfirm',
  props: ['data'],
  emits: ['back', 'next'],
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  methods: {
    back() {
      this.$emit('back')
    },
    next() {
      agent
        .post(this.FRI_API_URL + '/meets')
        .send({
          name: this.data.meetName,
          organizerName: this.data.organizerName,
          organizerKt: this.data.organizerKt,
          contactName: this.data.contactName,
          contactEmail: this.data.contactEmail,
          contactPhone: this.data.contactPhone,
          location: this.data.meetLocation,
          venueId: this.data.meetVenue ? this.data.meetVenue.id : undefined,
          judgeId: this.data.judge ? this.data.judge.id : undefined,
          startDate: this.data.meetStart,
          endDate: this.data.meetEnd,
          competition: this.data.competition.map(item => ({
            eventId: item.event ? item.event.id : undefined,
            ageFrom: item.ageFrom,
            ageTo: item.ageTo,
            gender: item.gender ? item.gender.id : undefined
          })),
          base64Attachment: this.data.base64Attachment
        })
        .auth(this.FRI_API_TOKEN, { type: 'bearer' })
        .then(() => {
          this.$emit('next', { success: true })
        })
        .catch(e => {
          console.log(e)
        })
        
    }
  },  
};
</script>