<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title has-text-grey">R.A. BENIDORM</h3>
          <p class="subtitle has-text-grey">Introduzca PIN para continuar.</p>
          <div class="box">
            <figure class="avatar">
              <img src="../../assets/mecanica.png">
            </figure>
            <form @submit.prevent="login">
              <div class="field">
                <div class="control">
                  <input class="input is-large" type="password" placeholder="Su PIN" v-model="pin">
                </div>
              </div>
              <button class="button is-block is-info is-large is-fullwidth" type="submit">Login</button>
            </form>
          </div>
          <p class="has-text-grey">
            <a href="../">0.1.11</a> &nbsp;·&nbsp;
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "login-vue",
  data() {
    return {
      pin: ""
    };
  },
  methods: {
    ...mapMutations("login", ["setUsuario"]),
    login() {
      let usuario = this.usuarios.find(data => data.password === this.pin);
      if (usuario) {
        this.setUsuario(usuario);
        this.$router.push({ name: "principal" });
      }
    }
  },
  computed: {
    ...mapState("login", ["usuarios"])
  }
};
</script>
