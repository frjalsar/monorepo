<template>
  <div>
    <p class="lead mb-4">
      Frjálsíþróttasamband Íslands býður þér að sækja rafrænt um mót og hlaup. Umsókn er nauðsynleg til að að árangur fáist viðurkenndur.
      Kerfið leiðir þig í gegnum ferlið og skrifstofa FRÍ fer yfir umsóknina og sendir þér svar.
    </p>

    <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
      <button
        type="button"
        class="btn btn-primary btn-lg py-3 px-4 my-3"
        @click="$emit('next', { type: 'mot'})"
      >
        Sækja um mót
      </button>

      <button
        type="button"
        class="btn btn-primary btn-lg py-3 px-4 my-3"
        @click="$emit('next', { type: 'hlaup'})"
      >
        Sækja um hlaup
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SharedIntro',
  emits: ['next']
}
</script>

<style scoped>
button.btn {
  min-width: 160px;

}
</style>
