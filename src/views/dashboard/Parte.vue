<template>
    <section>
        <h1>parte Component</h1>

        <form>
            <div class="columns">
                <div class="column is-6">
                    <label class="label" for="mecanico">Mecanico</label>
                    <div class="control">
                        <input
                            id="mecanico"
                            name="mecanico"
                            type="text"
                            placeholder="Mecanico"
                            class="input"
                            v-model="parte.mecanico"
                        />
                        <p class="help">Mecanico</p>
                    </div>
                </div>
                <div class="column is-3">
                    <label class="label" for="fecha">Fecha</label>
                    <div class="control">
                        <input
                            id="fecha"
                            name="fecha"
                            type="date"
                            class="input"
                            v-model="parte.fecha"
                        />
                        <p class="help">Fecha abrir el parte</p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-3">
                    <label class="label" for="matricula">Matricula</label>
                    <div class="select">
                        <select
                            id="matricula"
                            name="matricula"
                            v-model="parte.matricula"
                            @change="cambiaSelect($event)"
                        >
                            <option
                                v-for="vehiculo in vehiculos"
                                :key="vehiculo.matricula"
                                :value="vehiculo.matricula"
                            >{{ vehiculo.matricula }}</option>
                        </select>
                        <p class="help">Matricula</p>
                    </div>
                </div>
                <div class="column">
                    <label class="label" for="vehiculo">Vehiculo</label>
                    <div class="control">
                        <input
                            id="vehiculo"
                            name="vehiculo"
                            type="text"
                            placeholder="Vehiculo"
                            class="input"
                            v-model="parte.vehiculo"
                        />
                        <p class="help">Vehiculo</p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-6">
                    <label class="label" for="motivo">Averia</label>
                    <div class="control">
                        <input
                            id="motivo"
                            name="motivo"
                            type="text"
                            placeholder="Averia"
                            class="input"
                            v-model="parte.motivo"
                        />
                        <p class="help">Averia</p>
                    </div>
                </div>
                <div class="column is-3">
                    <label class="label" for="km">KM / Horometro</label>
                    <div class="control">
                        <input id="km" name="km" type="number" class="input" v-model="parte.km" />
                        <p class="help">Kilometros / Horometro</p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label class="label" for="averia">Descripción averia</label>
                    <div class="control">
                        <textarea
                            id="averia"
                            name="averia"
                            class="textarea"
                            placeholder="8 lineas"
                            rows="8"
                            v-model="parte.averia"
                        ></textarea>
                        <p class="help">Descripción detallada de la averia</p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <button type="button" class="button is-link" @click="otraLinea">
                        <span class="icon">
                            <i class="fas fa-plus"></i>
                        </span>
                        <span>Reparacion</span>
                    </button>
                    <table name="reparacion" class="table is-responsive is-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Fecha</th>
                                <th>Concepto</th>
                                <th>Udads / horas</th>
                                <th>Importe</th>
                                <th>Total</th>
                                <th>ACCIONES</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="(reparacion, index) in parte.reparacion"
                                :key="reparacion.linea"
                            >
                                <th>{{ reparacion.linea }}</th>
                                <td>
                                    <input
                                        id="fecha"
                                        name="fecha"
                                        type="date"
                                        placeholder="Fecha"
                                        class="input"
                                        required
                                        v-model="reparacion.fecha"
                                        :readonly="reparacion.linea !== lineaEnEdicion"
                                    />
                                </td>
                                <td>
                                    <input
                                        id="concepto"
                                        name="concepto"
                                        type="text"
                                        placeholder="Concepto"
                                        class="input"
                                        v-model="reparacion.concepto"
                                        :readonly="reparacion.linea !== lineaEnEdicion"
                                    />
                                </td>
                                <td>
                                    <input
                                        id="cdad_horas"
                                        name="cdad_horas"
                                        type="number"
                                        placeholder="Cdad_horas"
                                        class="input"
                                        v-model="reparacion.cdad_horas"
                                        :readonly="reparacion.linea !== lineaEnEdicion"
                                    />
                                </td>
                                <td>
                                    <input
                                        id="importe"
                                        name="importe"
                                        type="number"
                                        placeholder="importe"
                                        class="input"
                                        v-model="reparacion.importe"
                                        :readonly="reparacion.linea !== lineaEnEdicion"
                                    />
                                </td>
                                <td>
                                    <label class="input">{{ total(reparacion) }}</label>
                                </td>
                                <td>
                                    <a
                                        class="button is-success"
                                        @click="editarReparacion(reparacion)"
                                    >
                                        <span class="icon">
                                            <i class="fas fa-edit"></i>
                                        </span>
                                        <span>EDITAR</span>
                                    </a>
                                </td>
                                <td>
                                    <a class="button is-danger" @click="borrarReparacion(index)">
                                        <span class="icon">
                                            <i class="fas fa-edit"></i>
                                        </span>
                                        <span>BORRAR</span>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="columns">
                <div class="column is-three-fifths"></div>
                <div class="column">
                    <h3 class="title is-3">TOTAL: {{ suma }}</h3>
                </div>
            </div>
            <div class="columns">
                <div class="column">
                    <label class="label" for="observaciones">Observaciones de la reparación</label>
                    <div class="control">
                        <textarea
                            id="observaciones"
                            name="observaciones"
                            class="textarea"
                            placeholder="8 lineas"
                            rows="8"
                            v-model="parte.observaciones"
                        ></textarea>
                        <p class="help">Observaciones de la reparación</p>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-3">
                    <div class="field">
                        <input
                            id="switchReparado"
                            type="checkbox"
                            name="switchReparado"
                            class="switch is-rounded is-success"
                            v-model="parte.reparado"
                        />
                        <label for="switchReparado">Reparación COMPLETADA</label>
                    </div>
                </div>
                <div class="column is-3">
                    <div class="field">
                        <input
                            id="switchCerrado"
                            type="checkbox"
                            name="switchCerrado"
                            class="switch is-rounded is-success"
                            v-model="parte.cerrado"
                        />
                        <label for="switchCerrado">Reparación revisada y CERRADA</label>
                    </div>
                </div>
            </div>
            <div class="columns">
                <div class="column is-3">
                    <label class="label" for="fecha_f">Fecha fin reparación</label>
                    <div class="control">
                        <input
                            id="fecha_f"
                            name="fecha_f"
                            type="date"
                            class="input"
                            v-model="parte.fecha_f"
                        />
                        <p class="help">Fecha fin reparación</p>
                    </div>
                </div>
            </div>
            <div class="buttons are-medium">
                <button
                    type="button"
                    class="button is-link"
                    @click="guardaParte(parte.reparacion)"
                    :disabled="salvado"
                >GUARDAR PARTE</button>
                <button type="button" class="button is-warning" @click="cancelaParte">CANCELAR</button>
                <button
                    type="button"
                    class="button is-danger"
                    @click="borraParte"
                    :disabled="nuevoParte"
                >ELIMINAR</button>
            </div>
        </form>
        <footer class="footer">
            <div class="content has-text-centered">
                <p>Parte de trabajo de taller</p>
            </div>
        </footer>
    </section>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
export default {
    name: 'parte',
    components: {},
    props: [],
    mounted() {
        this.getVehiculos();
    },
    data() {
        return {
            lineaEnEdicion: null,
            linea: {
                linea: null,
                fecha: null,
                concepto: null,
                cdad_horas: null,
                importe: null,
            },
            salvado: false,
        };
    },
    methods: {
        ...mapMutations('partes', [
            'setParte',
            'setReparacion',
            'setNuevoParte',
        ]),
        ...mapActions('partes', [
            'addParte',
            'updateParte',
            'getPartes',
            'removeParte',
            'getVehiculos',
        ]),
        cambiaSelect(event) {
            let sel = this.vehiculos.find(
                item => item.matricula === event.target.value
            );

            if (sel) {
                this.parte.vehiculo = sel.nombre;
            }
        },
        lineaVacia() {
            return {
                linea: null,
                fecha: null,
                concepto: null,
                cdad_horas: null,
                importe: null,
            };
        },
        guardaParte() {
            this.salvado = true;
            if (this.nuevoParte) {
                this.addParte(this.parte);
            } else {
                this.updateParte(this.parte);
            }
            this.$router.push({ name: 'partes' });
        },
        borraParte() {
            this.removeParte(this.parte);
            this.$router.push({ name: 'partes' });
        },
        editarReparacion(payload) {
            this.lineaEnEdicion = payload.linea;
        },
        otraLinea() {
            this.linea = new this.lineaVacia();
            this.linea.linea = this.parte.reparacion.length + 1;
            this.linea.fecha = new Date().toISOString().split('T')[0];
            this.parte.reparacion.push(this.linea);
            this.lineaEnEdicion = this.linea.linea;
        },
        total(payload) {
            return payload.cdad_horas * payload.importe;
        },
        borrarReparacion(payload) {
            this.parte.reparacion.splice(payload, 1);
            let i = 1;
            this.parte.reparacion.forEach(element => {
                element.linea = i;
                i++;
            });
        },
        cancelaParte() {
            this.$router.push({ name: 'partes' });
        },
    },
    computed: {
        ...mapState('partes', ['parte', 'nuevoParte', 'vehiculos']),
        suma() {
            let t = 0;
            this.parte.reparacion.forEach(x => {
                t = t + x.cdad_horas * x.importe;
            });
            return t;
        },
    },
};
</script>
