<template>
  <section class="section">
    <nav class="breadcrumb notification is-info" aria-label="breadcrumbs">
      <ul>
        <li>
          PARTE DE TRABAJO - {{ localOrder.year }} - {{ localOrder.order_id }}
        </li>
      </ul>
    </nav>
    <div>
      <form @submit.prevent="onSubmit">
        <div class="field">
          <label for="date" class="label">FECHA</label>
          <div class="control">
            <input
              type="date"
              name="date"
              id="date"
              v-model="localOrder.date"
              class="input"
            />
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
            ></textarea>
          </div>
        </div>

        <div class="field">
          <label class="label" for="">VEHICULO</label>
          <div class="control">
            <div class="select">
              <select
                name="vehicle_id"
                id="vehicle_id"
                v-model="localOrder.vehicle_id"
                @change="cambiaSelect($event)"
              >
                <option
                  v-for="vehicle in localVehicles"
                  :key="vehicle._id"
                  :value="vehicle._id"
                  >{{ vehicle.matricula }} - {{ vehicle.nombre }}</option
                >
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label for="price" class="label">PRECIO</label>
          <div class="control">
            <input
              class="input"
              type="number"
              name="price"
              id="price"
              v-model="localOrder.price"
              step="any"
            />
          </div>
        </div>

        <div class="field">
          <label class="label" for="hours">HORAS</label>
          <div class="control">
            <input
              class="input"
              type="number"
              name="hours"
              id="hours"
              v-model="localOrder.hours"
              step="any"
            />
          </div>
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
            />
          </div>
        </div>

        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input
                type="checkbox"
                name="closed"
                id="closed"
                v-model="localOrder.closed"
              />REPARADO
            </label>
          </div>
        </div>
        <div class="field">
          <div class="control">
            <label class="checkbox">
              <input
                type="checkbox"
                name="finished"
                id="finished"
                v-model="localOrder.finished"
              />COMPROBADO
            </label>
          </div>
        </div>

        <div>
          <input ref="file" type="file" id="file" @change="onFileChange" />
        </div>

        <div>
          <ul class="card-list">
            <li v-for="image in localOrder.images" :key="image.index">
              <figure>
                <img :src="image.thumb_url" width="128px" />
              </figure>
              <div class="field is-grouped">
                <div>
                  <button
                    class="button is-danger"
                    type="button"
                    @click="deleteLocalImage(image, index)"
                  >
                    BORRAR
                  </button>
                </div>
                <div>
                  <button
                    class="button is-success"
                    type="button"
                    @click="showImage(image)"
                  >
                    VER
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </div>

        <div class="notification is-warning" v-if="waitImage">
          PROCESANDO LA IMAGEN ESPERA
        </div>

        <br /><br />

        <div class="buttons is-centered">
          <div>
            <button
              class="button is-link is-warning"
              type="button"
              @click="clickButton"
            >
              CAMERA
            </button>
          </div>
          <div>
            <button class="button is-link" type="submit">ACEPTAR</button>
          </div>
          <div>
            <button
              class="button is-link is-light"
              type="button"
              @click="onCancel"
            >
              CANCELAR
            </button>
          </div>
          <div>
            <button
              class="button is-link is-danger"
              type="button"
              @click="onDelete"
            >
              BORRAR
            </button>
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex';

export default {
  name: 'Detail',
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
        images: []
      },
      localVehicles: [],
      waitImage: false
    };
  },
  mounted() {
    this.localOrder = this.order;

    this.getVehicles().then(() => {
      this.localVehicles = this.vehicles;
    });
  },
  computed: {
    ...mapState('orders', ['order', 'vehicles'])
  },
  methods: {
    ...mapActions('orders', [
      'postImage',
      'getVehicles',
      'postOrder',
      'putOrder',
      'getOrders',
      'deleteImage',
      'deleteOrder',
      'getOrdersLast'
    ]),
    ...mapMutations('orders', ['setOrder', 'setCurrentImage']),
    onFileChange(e) {
      let image = {
        id: null,
        image_name: null,
        image_url: null,
        thumb_name: null,
        thumb_url: null,
        delete_url: null
      };

      this.waitImage = true;

      const file = e.target.files[0];
      this.getBase64(file).then(data => {
        this.postImage({ name: file.name, data: data }).then(result => {
          image.id = result.id;
          image.image_name = result.image.name;
          image.image_url = result.image.url;
          image.thumb_name = result.thumb.name;
          image.thumb_url = result.thumb.url;
          image.delete_url = result.delete_url;
          this.localOrder.images.push(image);
          this.waitImage = false;
        });
      });
    },
    clickButton() {
      this.$refs.file.click();
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let encoded = reader.result.toString().replace(/^data:(.*,)?/, '');
          if (encoded.length % 4 > 0) {
            encoded += '='.repeat(4 - (encoded.length % 4));
          }
          resolve(encoded);
        };
        reader.onerror = error => reject(error);
      });
    },
    cambiaSelect(event) {
      let sel = this.localVehicles.find(
        item => item._id === event.target.value
      );

      if (sel) {
        this.localOrder.vehicle = sel.nombre;
        this.localOrder.license_plate = sel.matricula;
      }
    },
    onSubmit() {
      if (this.localOrder._id == null) {
        // this.postOrder(this.localOrder).then(() => {
        //   this.getOrders(false).then(() => this.$router.go(-1));

        let y = new Date();
        this.localOrder.year = y.getFullYear();
        this.getOrdersLast(this.localOrder.year).then(result => {
          let next = result + 1;
          this.localOrder.order_id = next;
          this.postOrder(this.localOrder).then(() => {
            this.$router.go(-1);
          });
        });
      } else {
        // this.putOrder(this.localOrder).then(() => {
        //   this.getOrders(false).then(() => this.$router.go(-1));
        this.putOrder(this.localOrder).then(() => {
          this.$router.go(-1);
        });
      }
    },
    onDelete() {
      if (this.localOrder._id == null) {
        return true;
      } else {
        // this.putOrder(this.localOrder).then(() => {
        //   this.getOrders(false).then(() => this.$router.go(-1));
        this.deleteOrder(this.localOrder).then(result => {
          if (result) this.$router.go(-1);
        });
      }
    },
    onCancel() {
      this.$router.go(-1);
    },
    deleteLocalImage(data, index) {
      this.localOrder.images.splice(index, 1);
    },
    showImage(data) {
      this.setOrder(this.localOrder);
      this.setCurrentImage(data);
      this.$router.push({ name: 'showimage' });
    }
  }
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
  grid-template-columns: repeat(5, minmax(100px, 1fr));
}
</style>
