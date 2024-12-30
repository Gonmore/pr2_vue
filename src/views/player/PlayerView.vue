<template>
    <div>
        <Modal v-model:modelValue="showModalNuevo">
            <PlayerNew @on-register="onRegister($event)"/>
        </Modal>
        <Modal v-model:modelValue="showModalEdit">
            <PlayerEdit @on-update="onUpdate($event)" :item="itemToEdit"/>
        </Modal>
        <h1>Lista Jugadores</h1>
        <button @click="showModalNuevo = true" class="btn btn-primary">Nuevo</button>
        <button @click="buscar()" class="btn btn-lith" style="float:right">Buscar</button>
        <input type="search" style="float:right" v-model="textToSearch" @search="buscar()" placeholder="Buscar por nombre">
        <select v-model="ageFilter" @change="filterByAge" >
            <option value="">Todas las edades</option> 
            <option value="20">Mayores de 20 años</option> 
            <option value="25">Mayores de 25 años</option> 
            <option value="30">Mayores de 30 años</option>
        </select>
        <table>
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Posicion</th>
                    <th>Equipo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in itemList" :key="index">
                    <td>{{ 1 + index }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.age }}</td>
                    <td>{{ item.position }}</td>
                    <td>{{ item.teamId.name}}</td>
                    <td>
                        <button @click="edit(item)" class="btn btn-dark" style="margin-right: 15px;">Editar</button>
                        <button @click="Eliminar(item.id)" class="btn btn-danger">Eliminar</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
  
<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import Modal from '../../components/Modal.vue'
import PlayerNew from './PlayerNewView.vue'
import PlayerEdit from './PlayerEditView.vue'


export default {
    name: 'Player',
    data() {
        return {
            currentPage: 1,
            totalPages: 100, // Este valor debe ser calculado según tus datos
            showModalNuevo: false,
            showModalEdit: false,
            itemToEdit: null,
            textToSearch: '',
            ageFilter: '',
            itemList: [],
            initialItemList: [],
        }
    },
    components: {
        // Registro de componentes que se utilizaran.
        Modal,
        PlayerNew,
        PlayerEdit
    },
    methods: {
        // métodos que se pueden llamar desde la plantilla o desde otras partes del componente.
        ...mapActions(['increment']),
        getList() { 
            const vm = this; 
            let url = this.baseUrl + "/players?_expand=team"; 
        if (this.textToSearch) { 
            url += `&name_like=${encodeURIComponent(this.textToSearch)}`; } 
            this.axios.get(url) .then(function (response) { 
                vm.itemList = response.data;
                vm.initialItemList = response.data; 
            }) .catch(function (error) 
            { console.error(error); }); 
        },
        edit(item) {
            this.itemToEdit = Object.assign({}, item);
            this.showModalEdit = true;
        },
        Eliminar(id) {
            if (confirm("¿Esta Seguro de eliminar el registro?")) {
                const vm = this;
                this.axios.delete(this.baseUrl + "/players/" + id)
                    .then(function (response) {
                        vm.getList();
                        vm.$toast.show("Registro eliminado.", "danger");
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            }

        },
        buscar() {
            this.getList();
        },
        onRegister(event) {
            this.getList();
            this.showModalNuevo = false;
            this.$toast.show('Registro exitoso', 'success');
        },
        onUpdate(event) {
            this.getList();
            this.showModalEdit = false;
            this.itemToEdit = null;
            this.$toast.show('Edicion exitosa', 'info');
        },
        showToast(message, type) {
            this.$toast.show(message, type);
        },
        filterByAge() { 
            this.itemList = this.initialItemList
            this.itemList = this.itemList.filter(player => player.age > this.ageFilter); 
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
    props: {
        // propiedades que el componente puede recibir.
    },
    mounted() {
        this.getList();
    },
    emits: [] // los eventos personalizados que el componente puede emitir.
}
</script>
  
<style></style>