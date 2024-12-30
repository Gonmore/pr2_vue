<template>
  <div>
    <h1>Registrar Equipo</h1>
    <form @submit.prevent="submitForm()">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <div class="form-group">
        <label for="city">Ciudad:</label>
        <textarea id="city" v-model="form.city" :class="{ 'is-invalid': errors.city }"
          placeholder="Ingrese la ciudad"></textarea>
        <div v-if="errors.city" class="invalid-feedback">{{ errors.city }}</div>
      </div>

      <button type="submit" class="btn btn-primary">Registrar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'RegisterTeam',
  data() {
    return {
      form: {
        name: '',
        city: ''
      },
      errors: {}
    };
  },
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.form.name) {
        this.errors.name = 'El nombre es requerido.';
      }

      if (!this.form.city) {
        this.errors.city = 'La Ciudad es obligatoria.';
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
          city: '',
        };
      }
    },
    save() {
      
      const vm = this;
      this.axios.post(this.baseUrl + "/teams", this.form)
        .then(function (response) {
          if (response.status == '201') {
            vm.$emit('on-register', response.data);
          }
          console.log(response);
          //vm.itemList = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  },
  computed: {
    // propiedades computadas que dependen de otras propiedades reactivas
    ...mapState(['count']),
    ...mapGetters(['doubleCount', 'getBaseUrl']),
    baseUrl() {
      return this.getBaseUrl
    }
  },
}
</script>
  
<style scoped></style>
  