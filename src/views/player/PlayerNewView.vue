<template>
  <div>
    <h1>Registrar Jugador</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="team">Equipo:</label>
        <select id="team" v-model="form.teamId" :class="{ 'is-invalid': errors.teamId }">
          <option :value="team.id" v-for="(team, index) in teamList" :key="`team-${index}`">{{ team.name }}
          </option>
        </select>
        <div v-if="errors.teamId" class="invalid-feedback">{{ errors.teamId }}</div>
      </div>

      <div class="form-group">
        <label for="name">Nombre jugador:</label>
        <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <div class="form-group">
        <label for="age">edad:</label>
        <input type="text" default="20" id="age" v-model="form.age" :class="{ 'is-invalid': errors.age }"
          placeholder="Ingrese la edad" />
        <div v-if="errors.age" class="invalid-feedback">{{ errors.age}}</div>
      </div>

      <div class="form-group">
        <label for="position">Posicion:</label>
        <select id="position" v-model="form.position" :class="{ 'is-invalid': errors.position }">
          <option :value="position" v-for="(position, index) in positionList" :key="`position-${index}`">{{ position }}
          </option>
        </select>
        <div v-if="errors.position" class="invalid-feedback">{{ errors.position }}</div>
      </div>
      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'PlayerNew',
  data() {
    return {
      teamList: [],
      positionList: ["portero", "defensor", "mediocampista", "delantero"],
      
      form: {
        name: '',
        age: '',
        position: '',
        teamId: null
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = 'El nombre es obligatorio.';
      }

      if (!this.form.age) {
        this.errors.age = 'La edad es obligatoria.';
      }

      if (!this.form.position) {
        this.errors.position = 'La posicion es obligatoria.';
      }

      if (!this.form.teamId) {
        this.errors.teamId = 'El Equipo es obligatorio.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
        this.form = {
          name: '',
          age: '',
          position: '',
          teamId: null
        };
      }
    },
    save() {
      const vm = this;
      this.axios.post(this.baseUrl + "/players", this.form)
        .then(function (response) {
          if (response.status == '201') {
            vm.$emit('on-register', response.data);
          }
          vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    getTeamList() {
      const vm = this;
      this.axios.get(this.baseUrl + "/teams")
        .then(function (response) {
          vm.teamList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    }
  },
  mounted() {
    this.getTeamList();
  },
}
</script>
  
<style scoped></style>
  