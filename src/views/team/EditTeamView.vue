<template>
  <div>
    <h1>Editar Equipo</h1>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input type="text" id="name" v-model="form.name" :class="{ 'is-invalid': errors.name }"
          placeholder="Ingrese el nombre" />
        <div v-if="errors.name" class="invalid-feedback">{{ errors.name }}</div>
      </div>

      <div class="form-group">
        <label for="city">Ciudad:</label>
        <input type="text" id="city" v-model="form.city" :class="{ 'is-invalid': errors.city }"
          placeholder="Ingrese la ciudad" />
        <div v-if="errors.city" class="invalid-feedback">{{ errors.city }}</div>
      </div>


      <button type="submit" class="btn btn-primary">Editar</button>
    </form>
  </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'EditTeam',
  data() {
    return {

      errors: {}
    };
  },
  props: ['item'],
  methods: {
    ...mapActions(['increment']),
    validateForm() {
      this.errors = {};

      if (!this.item.name) {
        this.errors.name = 'El nombre es obligatorio.';
      }

      if (!this.item.city) {
        this.errors.city = 'La ciudad es obligatoria.';
      }

      return Object.keys(this.errors).length === 0;
    },

    submitForm() {
      if (this.validateForm()) {
        // Enviar los datos al servidor
        this.save();
        // Reiniciar el formulario
      }
    },
    save() {
      const vm = this;
      this.axios.patch(this.baseUrl + "/teams/" + this.item.id, this.form)
        .then(function (response) {
          if (response.status == '200') {
            vm.$emit('on-update', response.data);
          }
          console.log(response); 
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
    },
    form() {
      return Object.assign({}, this.item);
    }
  },
}
</script>
  
<style scoped></style>
  