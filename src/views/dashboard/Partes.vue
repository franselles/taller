<template>
  <section>
    <div class="field">
      <label class="label">Busqueda por averia</label>
      <div class="control">
        <input class="input" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="radio">
          <input type="radio" name="question">
          Todos
        </label>
        <label class="radio">
          <input type="radio" name="question">
          Reparados
        </label>
        <label class="radio">
          <input type="radio" name="question">
          Cerrados
        </label>
      </div>
    </div>
    <div class="field is-grouped">
      <div class="control">
        <a @click="masParte()" class="button is-link">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span>NUEVO</span>
        </a>
      </div>
    </div>
    <table class="table is-responsive is-striped">
      <thead>
        <tr>
          <th>#</th>
          <th>Mecanico</th>
          <th>Fecha</th>
          <th>Matricula</th>
          <th>Vehiculo</th>
          <th>Reparado</th>
          <th>Cerrado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="parte in partes" :key="parte._id">
          <th></th>
          <td>{{ parte.mecanico }}</td>
          <td>{{ parte.fecha }}</td>
          <td>{{ parte.matricula }}</td>
          <td>{{ parte.vehiculo }}</td>
          <td>{{ parte.reparado }}</td>
          <td>{{ parte.cerrado }}</td>
          <td>
            <a class="button is-success" @click="editarParte(parte)">
              <span class="icon">
                <i class="fas fa-edit"></i>
              </span>
              <span>EDITAR</span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "partes-vue",
  components: {},
  props: [],
  mounted() {
    this.getPartes();
  },
  data() {
    return {
      parteVacio: {
        mecanico: "",
        fecha: "",
        matricula: "",
        vehiculo: "",
        averia: "",
        reparacion: [],
        observaciones: "",
        fecha_f: "",
        reparado: false,
        cerrado: false
      }
    };
  },
  methods: {
    ...mapActions("partes", ["getPartes"]),
    ...mapMutations("partes", ["setParte", "setNuevoParte"]),
    editarParte(payload) {
      this.setParte(payload);
      this.setNuevoParte(false);
      this.$router.push({ name: "parte" });
    },
    masParte() {
      this.setParte(this.parteVacio);
      this.setNuevoParte(true);
      this.$router.push({ name: "parte" });
    }
  },
  computed: {
    ...mapState("partes", ["partes"])
  }
};
</script>
