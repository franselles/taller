<template>
    <section>
        <nav class="navbar" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <router-link class="navbar-item" :to="{name: 'principal'}">
                    <img src="../../assets/mecanica.png" width="28" height="28" />
                </router-link>

                <a
                    role="button"
                    class="navbar-burger burger"
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    @click="menuBurger"
                >
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>

            <div id="navbarBasicExample" class="navbar-menu">
                <div class="navbar-start">
                    <router-link class="navbar-item" :to="{name: 'principal'}">Inicio</router-link>

                    <router-link :to="{name: 'partes'}" class="navbar-item">Partes</router-link>

                    <div class="navbar-item has-dropdown is-hoverable">
                        <a class="navbar-link">Opciones</a>

                        <div class="navbar-dropdown">
                            <a class="navbar-item">Opcion 1</a>
                            <a class="navbar-item">Opcion 2</a>
                            <a class="navbar-item">Opcion 3</a>
                            <hr class="navbar-divider" />
                            <a class="navbar-item">Notificar</a>
                        </div>
                    </div>
                </div>

                <div class="navbar-end">
                    <div class="navbar-item">
                        <div class="buttons">
                            <a @click="logout" class="button is-danger">
                                <strong>Logout</strong>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
        <router-view />
    </section>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
    name: 'principal',
    props: [],
    mounted() {},
    data() {
        return {
            loginVacio: {
                user: '',
                password: '',
                level: 0,
                isLogged: false,
            },
        };
    },
    methods: {
        ...mapMutations('login', ['setUsuario']),
        logout() {
            this.setUsuario(this.loginVacio);
            this.$router.push({ name: 'login' });
        },
        menuBurger() {
            // Get all "navbar-burger" elements
            const $navbarBurgers = Array.prototype.slice.call(
                document.querySelectorAll('.navbar-burger'),
                0
            );

            // Check if there are any navbar burgers
            if ($navbarBurgers.length > 0) {
                // Add a click event on each of them
                $navbarBurgers.forEach(el => {
                    // Get the target from the "data-target" attribute
                    const target = el.dataset.target;
                    const $target = document.getElementById(target);

                    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                    el.classList.toggle('is-active');
                    $target.classList.toggle('is-active');
                });
            }
        },
    },
    computed: {},
};
</script>

