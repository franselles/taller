<template>
  <section class="section">
    <nav class="breadcrumb notification is-info" aria-label="breadcrumbs">
      <ul>
        <li>
          VISIALIZAR IMAGEN
        </li>
      </ul>
    </nav>
    <div class="buttons is-centered">
      <div>
        <button class="button is-success" type="button" @click="backDetail">
          VOLVER
        </button>
      </div>
    </div>
    <div>
      <img :src="url_img.image_url" width="100%" height="auto" />
    </div>
  </section>
</template>

<script>
export default {
  name: 'ShowImage',
  data() {
    return {};
  },
  methods: {
    backDetail() {
      this.$router.go(-1);
    }
  },
  computed: {
    url_img() {
      return this.$store.state.orders.currentImage;
    }
  }
};
</script>

<style scoped></style>
