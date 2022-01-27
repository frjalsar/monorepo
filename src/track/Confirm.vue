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
      {{ data.organizerId }}
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
      {{ data.meetVenue.fullName }}<br />
      {{ data.meetLocation }}
    </div>
    <div class="col-md-4">
      <h2>Dómari</h2>
      {{ data.judge.fullName }}<br />
    </div>
  </div>

  <div class="row mb-3">
    <div class="col-md-4 offset-md-2">
      <h2>Greinar</h2>
      <div v-for="event in data.selectedEvents" :key="event.id">{{ event.name }}</div>
    </div>    
  </div>
  

  <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
    <button type="button" class="btn btn-outline-secondary btn-lg py-3 px-4 my-3" @click="back">Til baka</button>
    <button type="button" class="btn btn-primary btn-lg py-3 px-4 my-3" @click="next">
      Staðfesta
    </button>
    
  </div>

</div>
</template>

<script>
export default {
  props: ['data'],
  emits: ['next'],
  inject: ['FRI_API_URL', 'FRI_API_TOKEN'],
  props: ['data'],
  methods: {
    next() {
      
    }
  },  
};
</script>