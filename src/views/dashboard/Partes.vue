<template>
  <section>
    <div class="field">
      <label class="label">Visualiza partes que esten ...</label>
    </div>
    <div class="field">
      <div class="control">
        <label class="radio">
          <input type="radio" name="filtro" v-model="filtro" value="SR" @change="aplicaFiltro">
          Sin reparar
        </label>
        <label class="radio">
          <input type="radio" name="filtro" v-model="filtro" value="R" @change="aplicaFiltro">
          Reparados
        </label>
        <label class="radio">
          <input type="radio" name="filtro" v-model="filtro" value="C" @change="aplicaFiltro">
          Cerrados
        </label>
        <label class="radio">
          <input type="radio" name="filtro" v-model="filtro" value="SC" @change="aplicaFiltro">
          Sin cerrar
        </label>
        <label class="radio">
          <input type="radio" name="filtro" v-model="filtro" value="T" @change="aplicaFiltro">
          Todos
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
          <th>Fecha</th>
          <th>Matricula</th>
          <th>Averia</th>
          <th>Reparado</th>
          <th>Cerrado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(parte, index) in partes" :key="parte._id">
          <th>{{ index + 1 }}</th>
          <td>{{ parte.fecha }}</td>
          <td>{{ parte.matricula }}</td>
          <td>{{ parte.motivo }}</td>
          <td>
            <span v-if="parte.reparado" class="icon has-text-success">
              <i class="fas fa-check-circle fa-lg"></i>
            </span>
            <span v-else class="icon has-text-danger">
              <i class="fas fa-circle fa-lg"></i>
            </span>
          </td>
          <td>
            <span v-if="parte.cerrado" class="icon has-text-success">
              <i class="fas fa-check-circle fa-lg"></i>
            </span>
            <span v-else class="icon has-text-danger">
              <i class="fas fa-circle fa-lg"></i>
            </span>
          </td>
          <td>
            <a class="button is-link" @click="editarParte(parte)">
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
    this.filtro = this.filtroPartes;
    this.aplicaFiltro();
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
      },
      filtro: ""
    };
  },
  methods: {
    ...mapActions("partes", ["getPartes", "getPartesFiltro"]),
    ...mapMutations("partes", ["setParte", "setNuevoParte", "setFiltroPartes"]),
    editarParte(payload) {
      this.setParte(payload);
      this.setNuevoParte(false);
      this.$router.push({ name: "parte" });
    },
    masParte() {
      this.setParte(this.parteVacio);
      this.setNuevoParte(true);
      this.$router.push({ name: "parte" });
    },
    aplicaFiltro() {
      this.setFiltroPartes(this.filtro);
      switch (this.filtro) {
        case "T":
          this.getPartesFiltro(this.filtro);
          break;
        case "R":
          this.getPartesFiltro(this.filtro);
          break;
        case "C":
          this.getPartesFiltro(this.filtro);
          break;
        case "SR":
          this.getPartesFiltro(this.filtro);
          break;
        case "SC":
          this.getPartesFiltro(this.filtro);
          break;
      }
    }
  },
  computed: {
    ...mapState("partes", ["partes", "filtroPartes"])
  }
};
</script>
