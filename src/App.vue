<template>
  <main class="container">
    <div class="py-5 my-sm-5 text-center">
      <img
        class="d-block mx-auto mb-4"
        src="./assets/logo.png"
        alt="FRI"
        width="100"
        height="90"
      >
      <h1 class="display-5 fw-bold mb-4">
        {{ current.title }}
      </h1>
      <div class="col-lg-12 col-xl-10 mx-auto">
        <component
          :is="current.component"
          :application="application"
          @back="back"
          @next="next"
        />
      </div>
    </div>
  </main>
</template>

<script>
import Intro from './shared/Intro.vue'
import TrackOrganizer from './track/Organizer.vue'
import TrackContact from './track/Contact.vue'
import TrackMeet from './track/Meet.vue'
import TrackJudge from './track/Judge.vue'
import TrackEvents from './track/Events.vue'
import TrackCompetition from './track/Competition.vue'
import TrackAttachment from './track/Attachment.vue'
import TrackConfirm from './track/Confirm.vue'
import TrackThanks from './track/Thanks.vue'

import RunOrganizer from './run/Organizer.vue'
import RunContact from './run/Contact.vue'
import RunMeet from './run/Meet.vue'
import RunJudge from './run/Judge.vue'
import RunEvents from './run/Events.vue'
import RunConfirm from './run/Confirm.vue'
import RunThanks from './run/Thanks.vue'

export default {
  components: {
    Intro,
    TrackOrganizer,
    TrackContact,
    TrackMeet,
    TrackJudge,
    TrackEvents,
    TrackCompetition,
    TrackAttachment,
    TrackConfirm,
    TrackThanks,
    RunOrganizer,
    RunContact,
    RunMeet,
    RunJudge,
    RunEvents,
    RunConfirm,
    RunThanks
  },
  provide: {
    FRI_API_URL: import.meta.env.VITE_FRI_API_URL,
    FRI_API_TOKEN: import.meta.env.VITE_FRI_API_TOKEN
  },
  data () {
    return {
      application: undefined,
      type: undefined,
      step: 0,
      trackSteps: [
        {
          title: 'Umsókn vegna mótahalds',
          component: 'Intro'
        },
        {
          title: 'Ábyrgðaraðili',
          component: 'TrackOrganizer'
        },
        {
          title: 'Mótsstjóri',
          component: 'TrackContact'
        },
        {
          title: 'Mótið',
          component: 'TrackMeet'
        },
        {
          title: 'Dómari',
          component: 'TrackJudge'
        },
        {
          title: 'Greinar',
          component: 'TrackEvents'
        },
        {
          title: 'Aldursflokkar og kyn',
          component: 'TrackCompetition'
        },
        {
          title: 'Boðsbréf',
          component: 'TrackAttachment'
        },
        {
          title: 'Staðfesting',
          component: 'TrackConfirm'
        },
        {
          title: 'Takk',
          component: 'TrackThanks'
        }
      ],
      runSteps: [
        {
          title: 'Umsókn vegna mótahalds',
          component: 'Intro'
        },
        {
          title: 'Ábyrgðaraðili',
          component: 'RunOrganizer'
        },
        {
          title: 'Hlaupstjóri',
          component: 'RunContact'
        },
        {
          title: 'Hlaupið',
          component: 'RunMeet'
        },
        {
          title: 'Dómari',
          component: 'RunJudge'
        },
        {
          title: 'Greinar',
          component: 'RunEvents'
        },
        {
          title: 'Boðsbréf',
          component: 'TrackAttachment'
        },
        {
          title: 'Staðfesting',
          component: 'RunConfirm'
        },
        {
          title: 'Takk',
          component: 'RunThanks'
        }
      ]
    }
  },
  computed: {
    current () {
      if (this.type === 'mot') {
        return this.trackSteps[this.step]
      } else if (this.type === 'hlaup') {
        return this.runSteps[this.step]
      } else {
        return {
          title: 'Umsókn vegna mótahalds',
          component: 'Intro'
        }
      }
    }
  },
  created () {
    this.application = JSON.parse(sessionStorage.getItem('FRI_UMSOKN'))
    this.step = this.application ? this.application.step : 0
    this.type = this.application ? this.application.type : undefined
  },
  methods: {
    updateSession (newApplication) {
      const oldApplication = JSON.parse(sessionStorage.getItem('FRI_UMSOKN'))
      this.application = {
        ...oldApplication,
        ...newApplication,
        step: this.step
      }

      sessionStorage.setItem('FRI_UMSOKN', JSON.stringify(this.application))
    },
    back () {
      this.step = this.step - 1
      this.updateSession({})
    },
    next (application) {
      if (application.type) {
        this.type = application.type
        window.location.replace('#/?tegund=' + application.type)
      }
      this.step = this.step + 1
      this.updateSession(application)
    }
  }
}
</script>

<style>
@keyframes shakeAnimation {
  0% { margin-left: 0rem; }
  25% { margin-left: 1rem; }
  75% { margin-left: -1rem; }
  100% { margin-left: 0rem; }
}

.shake {
  animation: shakeAnimation 0.2s ease-in-out 0s 2;
}
</style>
