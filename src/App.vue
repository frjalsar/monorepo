<template>
  <main class="container">
    <div class="px-4 py-5 my-sm-5 text-center">
      <img
        class="d-block mx-auto mb-4"
        src="./assets/logo.png"
        alt="FRI"
        width="100"
        height="90"
      />
      <h1 class="display-5 fw-bold mb-4">{{ current.title }}</h1>
      <div class="col-lg-12 col-xl-10 mx-auto">
        <component :is="current.component" :data="data" @next="next" />  
      </div>
    </div>
  </main>
</template>

<script>
import Intro from './track/Intro.vue'
import Organizer from './track/Organizer.vue'
import Contact from './track/Contact.vue'
import Meet from './track/Meet.vue'
import Judge from './track/Judge.vue'
import Events from './track/Events.vue'
import Confirm from './track/Confirm.vue'
import Thanks from './track/Thanks.vue'

export default {
  components: {
    Intro,
    Organizer,
    Contact,
    Meet,
    Judge,
    Events,
    Confirm,
    Thanks
  },
  provide: {
    FRI_API_URL: import.meta.env.VITE_FRI_API_URL,
    FRI_API_TOKEN: import.meta.env.VITE_FRI_API_TOKEN,    
  }, 
  data() {
    return {
      data: undefined,
      type: undefined,
      step: 0,
      trackSteps: [
        {
        title: 'Umsókn vegna mótahalds',
        component: 'Intro'
        },
        {
          title: 'Ábyrgðaraðili',
          component: 'Organizer'
        },
        {
          title: 'Mótsstjóri',
          component: 'Contact'
        },
        {
          title: 'Mótið',
          component: 'Meet'
        },
        {
          title: 'Dómari',
          component: 'Judge'
        },
        {
          title: 'Greinar',
          component: 'Events'
        },
        {
          title: 'Staðfesting',
          component: 'Confirm'
        },
        {
          title: 'Takk',
          component: 'Thanks'
        }
      ],
      runSteps: [
        {
          title: 'Ábyrgðaraðili',
          component: 'Organizer'
        },
        {
          title: 'Hlaupastjóri',
          component: 'Contact'
        }
      ],
    };
  },
  computed: {    
    current() {
      if (this.type === 'track') {
        return this.trackSteps[this.step]
      } else if (this.type === 'run') {
        return this.runSteps[this.step]
      } else {
        return {
          title: 'Umsókn vegna mótahalds',
          component: 'Intro'
        }
      }      

    }
  },
  methods: {
    updateSession(newData) {
      const oldData = JSON.parse(sessionStorage.getItem("FRI_UMSOKN"));
      this.data = {
        ...oldData,
        ...newData,
        step: this.step,
      };

      sessionStorage.setItem("FRI_UMSOKN", JSON.stringify(this.data));
    },
    next(data) {
      if (data.type) {
        this.type = 'track'
      }      
      this.step = this.step + 1;
      this.updateSession(data);
    },
  },
  created() {
    this.data = JSON.parse(sessionStorage.getItem("FRI_UMSOKN"));
    this.step = this.data ? this.data.step : 0;
    this.type = this.data ? this.data.type : undefined
  },  
};
</script>

<style>
</style>
