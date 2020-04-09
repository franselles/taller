<template>
  <section class="section">
    <nav class="breadcrumb notification is-info" aria-label="breadcrumbs">
      <ul>
        <li>
          R.A. BENIDORM. #PARTE DE TRABAJO DEL VEHICULO# {{ localOrder.year }} -
          {{ localOrder.order_id }}
        </li>
      </ul>
    </nav>
    <div>
      <form>
        <div class="field">
          <label for="date" class="label">FECHA</label>
          <div class="control">
            <input
              type="date"
              name="date"
              id="date"
              v-model="localOrder.date"
              class="input"
              readonly
            />
          </div>
        </div>

        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">VEHICULO</label>
          </div>
          <div class="field-body">
            <div class="field">
              <p class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  name="license_plate"
                  id="license_plate"
                  v-model="localOrder.license_plate"
                  readonly
                />
              </p>
            </div>
            <div class="field">
              <p class="control is-expanded">
                <input
                  class="input"
                  type="text"
                  name="vehicle"
                  id="vehicle"
                  v-model="localOrder.vehicle"
                  readonly
                />
              </p>
            </div>
          </div>
        </div>

        <div class="field">
          <label for="fault" class="label">AVERIA</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Textarea"
              name="fault"
              id="fault"
              v-model="localOrder.fault"
              readonly
            ></textarea>
          </div>
        </div>

        <div class="field">
          <label for="price" class="label">PRECIO</label>
          <div class="control is-expanded">
            <input
              class="input"
              type="number"
              name="price"
              id="price"
              v-model="localOrder.price"
              step="any"
              readonly
            />
          </div>

          <label class="label" for="hours">HORAS</label>
          <div class="control is-expanded">
            <input
              class="input"
              type="number"
              name="hours"
              id="hours"
              v-model="localOrder.hours"
              step="any"
              readonly
            />
          </div>
        </div>
        <div class="field is-grouped is-grouped-right">
          <label class="label" for="">MANO DE OBRA {{ workHand }} €</label>
        </div>

        <div class="field">
          <label class="label" for="materials">MATERIALES</label>
          <div class="control">
            <input
              class="input"
              type="number"
              name="materials"
              id="materials"
              v-model="localOrder.materials"
              step="any"
              readonly
            />
          </div>
        </div>

        <div class="field is-grouped is-grouped-right">
          <h1 class="title">TOTAL REPARACION {{ totalWork }} €</h1>
        </div>

        <div>
          <ul class="card-list">
            <li v-for="image in localOrder.images" :key="image.index">
              <figure>
                <img :src="image.image_url" width="400px" />
              </figure>
            </li>
          </ul>
        </div>

        <div class="field is-grouped">
          <div class="noprint">
            <button
              class="button is-link is-light"
              type="button"
              @click="onCancel"
            >
              CANCELAR
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'DetailPrint',
  data() {
    return {
      localOrder: {
        _id: null,
        order_id: null,
        year: null,
        date: null,
        fault: null,
        vehicle_id: null,
        vehicle: null,
        license_plate: null,
        price: null,
        hours: null,
        materials: null,
        closed: false,
        finished: false,
        images: [],
      },
    };
  },
  mounted() {
    this.localOrder = this.order;
  },
  computed: {
    ...mapState('orders', ['order']),
    workHand() {
      return this.localOrder.price * this.localOrder.hours;
    },
    totalWork() {
      return this.workHand + this.localOrder.materials;
    },
  },
  methods: {
    onCancel() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
#preview {
  /* display: flex; */
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}

#file {
  display: none;
}

.thumb {
  padding: 10px;
}

.card-list {
  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(3, minmax(100px, 1fr));
}
</style>
