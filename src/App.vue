<template>
  <main class="container">
    <div class="py-4 my-sm-5 text-center">
      <img
        class="d-block mx-auto mb-4"
        src="./assets/fri-logo-med-texta.svg"
        alt="FRI"
        width="256"
        height="120"
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
import IntroStep from './steps/Intro.vue'
import OrganizerStep from './steps/Organizer.vue'
import ContactStep from './steps/Contact.vue'
import MeetStep from './steps/Meet.vue'
import JudgeStep from './steps/Judge.vue'
import EventsStep from './steps/Events.vue'
import CompetitionStep from './steps/Competition.vue'
import AttachmentStep from './steps/Attachment.vue'
import ConfirmStep from './steps/Confirm.vue'
import ThanksStep from './steps/Thanks.vue'

export default {
  components: {
    IntroStep,
    OrganizerStep,
    ContactStep,
    MeetStep,
    JudgeStep,
    EventsStep,
    CompetitionStep,
    AttachmentStep,
    ConfirmStep,
    ThanksStep
  },
  provide: {
    FRI_API_URL: import.meta.env.VITE_FRI_API_URL,
    FRI_API_TOKEN: import.meta.env.VITE_FRI_API_TOKEN
  },
  data () {
    return {
      application: undefined,
      step: 0,
      run: [
        {
          title: 'Umsókn vegna mótahalds',
          component: 'IntroStep'
        },
        {
          title: 'Ábyrgðaraðili',
          component: 'OrganizerStep'
        },
        {
          title: 'Hlaupstjóri',
          component: 'ContactStep'
        },
        {
          title: 'Hlaupið',
          component: 'MeetStep'
        },
        {
          title: 'Dómari',
          component: 'JudgeStep'
        },
        {
          title: 'Greinar',
          component: 'EventsStep'
        },
        {
          title: 'Uppsetning hlaups',
          component: 'CompetitionStep'
        },
        {
          title: 'Samantekt á hlaupi',
          component: 'AttachmentStep'
        },
        {
          title: 'Staðfesting',
          component: 'ConfirmStep'
        },
        {
          title: 'Takk',
          component: 'ThanksStep'
        }
      ],
      meet: [
        {
          title: 'Umsókn vegna mótahalds',
          component: 'IntroStep'
        },
        {
          title: 'Ábyrgðaraðili',
          component: 'OrganizerStep'
        },
        {
          title: 'Mótsstjóri',
          component: 'ContactStep'
        },
        {
          title: 'Mótið',
          component: 'MeetStep'
        },
        {
          title: 'Dómari',
          component: 'JudgeStep'
        },
        {
          title: 'Greinar',
          component: 'EventsStep'
        },
        {
          title: 'Uppsetning móts',
          component: 'CompetitionStep'
        },
        {
          title: 'Boðsbréf',
          component: 'AttachmentStep'
        },
        {
          title: 'Staðfesting',
          component: 'ConfirmStep'
        },
        {
          title: 'Takk',
          component: 'ThanksStep'
        }
      ]
    }
  },
  computed: {
    isRun () {
      return this.application.type === 'hlaup'
    },
    current () {
      if (this.application && this.application.type === 'hlaup') {
        if (this.step >= 0 || this.step <= this.steps.length) {
          return this.run[this.step]
        }
      }

      if (this.application && this.application.type === 'mot') {
        if (this.step >= 0 || this.step <= this.steps.length) {
          return this.meet[this.step]
        }
      }

      return this.meet[0]
    }
  },
  created () {
    this.application = JSON.parse(sessionStorage.getItem('FRI_UMSOKN'))
    this.step = this.application ? this.application.step : 0
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
