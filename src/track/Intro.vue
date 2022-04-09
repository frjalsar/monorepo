  <template>
<div>

  <p class="lead mb-4">
    Frjálsíþróttasamband Íslands býður þér að sækja rafrænt um mót og hlaup. Umsókn er nauðsynleg til að að árangur fáist viðurkenndur.
    Kerfið leiðir þig í gegnum ferlið og skrifstofa FRÍ fer yfir umsóknina og sendir þér svar.
  </p>  

  <div class="row">
    <div class="col mx">
      <button type="button" class="btn btn-primary btn-lg py-3 my-3" @click="$emit('next', { type: 'track'})">
        Sækja um mót
      </button>
      <button type="button" class="btn btn-primary btn-lg py-3 my-3 mx-3" @click="$emit('next', { type: 'run'})">
        Sækja um hlaup
      </button>
    </div>    
  </div>    

</div>
</template>

<script>
export default {
  name: 'TrackIntro',
  emits: ['track', 'run'],
};
</script>

<style scoped>
button.btn {
  min-width: 160px;

}
</style>