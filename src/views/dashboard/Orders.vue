<template>
  <section class="section">
    <div class="columns">
      <div class="column is-6">
        <div class="field">
          <label class="label">Visualiza partes que esten ...</label>
        </div>
        <div class="field">
          <div class="control">
            <label class="radio">
              <input
                v-model="filtro"
                type="radio"
                name="filtro"
                value="R"
                @change="aplicaFiltro"
              />
              Reparados
            </label>
            <label class="radio">
              <input
                v-model="filtro"
                type="radio"
                name="filtro"
                value="SR"
                @change="aplicaFiltro"
              />
              Sin reparar
            </label>
          </div>
        </div>
      </div>
      <div class="column is-2">
        Número de partes a visulizar
        <input
          v-model="myPerPage"
          class="input"
          name="myPerPage"
          type="number"
        />
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
          <th>Comprobado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in ordersPaged" :key="order._id">
          <th>{{ index + 1 + (pagination.page - 1) * pagination.perPage }}</th>
          <td>{{ order.date }}</td>
          <td>{{ order.license_plate }}</td>
          <td>{{ order.fault }}</td>
          <td>
            <span v-if="order.closed" class="icon has-text-success">
              <i class="fas fa-check-circle fa-lg"></i>
            </span>
            <span v-else class="icon has-text-danger">
              <i class="fas fa-circle fa-lg"></i>
            </span>
          </td>
          <td>
            <span v-if="order.finished" class="icon has-text-success">
              <i class="fas fa-check-circle fa-lg"></i>
            </span>
            <span v-else class="icon has-text-danger">
              <i class="fas fa-circle fa-lg"></i>
            </span>
          </td>
          <td>
            <a class="button is-link" @click="editarParte(order)">
              <span class="icon">
                <i class="fas fa-edit"></i>
              </span>
              <span>EDITAR</span>
            </a>
            <a class="button is-link is-warning" @click="printParte(order)">
              <span class="icon">
                <i class="fas fa-print"></i>
              </span>
              <span>IMPRIMIR</span>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
    <paginate
      :value.sync="paginaActual"
      :pageCount="pagination.totalPages"
      :click-handler="onChange"
      :prevText="'Prev'"
      :nextText="'Next'"
      :container-class="'pagination-list'"
      :page-link-class="'pagination-link'"
      :prev-link-class="'pagination-previous'"
      :next-link-class="'pagination-next'"
      :active-class="'pagination-link is-current'"
      :no-li-surround="true"
    ></paginate>
  </section>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from 'vuex';
import Paginate from 'vuejs-paginate';

export default {
  name: 'Orders',
  components: { Paginate },
  props: [],
  data() {
    return {
      filtro: '',
    };
  },
  computed: {
    ...mapState('orders', [
      'orders',
      'filtroOrders',
      'pagination',
      'paginaActual',
    ]),
    ...mapGetters('orders', ['ordersPaged']),
    myPerPage: {
      // getter
      get: function () {
        return this.pagination.perPage;
      },
      // setter
      set: function (newValue) {
        this.setPerPage(newValue);
        this.aplicaFiltro();
      },
    },
  },
  mounted() {
    this.filtro = this.filtroOrders;
    this.aplicaFiltro();
  },
  methods: {
    ...mapActions('orders', ['getOrders']),
    ...mapMutations('orders', [
      'setOrder',
      'setFiltro',
      'resetOrder',
      'setPage',
      'setPerPage',
    ]),
    editarParte(payload) {
      this.setFiltro(this.filtro);
      this.setOrder(payload);
      this.$router.push({ name: 'detail' });
    },
    printParte(payload) {
      this.setFiltro(this.filtro);
      this.setOrder(payload);
      this.$router.push({ name: 'detailprint' });
    },
    masParte() {
      this.setFiltro(this.filtro);
      this.resetOrder();
      this.$router.push({ name: 'detail' });
    },
    aplicaFiltro() {
      switch (this.filtro) {
        case 'R':
          this.setFiltro('R');
          this.getOrders(true);
          break;
        case 'SR':
          this.setFiltro('SR');
          this.getOrders(false);
          break;
      }
    },
    onChange(page) {
      this.setPage(page);
    },
  },
};
</script>
