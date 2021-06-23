<script>
import Vue from 'vue'
import BootstrapSidebar from '@/vue-bootstrap-sidebar.vue'

export default Vue.extend({
  name: 'App',
  components: {
    BootstrapSidebar
  },
  data () {
    return {
      logoMini: require("@/assets/img/logo_bootstrap_vue.png"),
      initialShow: true,
      header: '<h3>Sidebar</h3>',
      links: [
        { name: 'Home', href: { name: 'home' }, faIcon: ['fas', 'home'] },
        { name: 'Dropdown',
          faIcon: ['fas', 'tint'],
          children: [
            { name: 'Child Item 1', href: { name: 'child-item-1' }, 
              faIcon: ['fas', 'child'] },
            { name: 'Child Item 2', href: { name: 'child-item-2' }, 
              faIcon: ['fas', 'child'] }
          ]
        },
        { name: 'About', href: { name: 'about' }, faIcon: 'users' },
        { name: 'Contact', href: { name: 'contact' }, faIcon: 'phone' },
      ]
    }
  },
  methods: {
    onSidebarChanged () {
    }
  }
});
</script>

<template>
  <div id="App">
    <BootstrapSidebar 
      :initial-show="initialShow" 
      :links="links"
      :fa="true"
      align="right"
      @sidebarChanged="onSidebarChanged"
    >
      <template v-slot:logo-mini>
        <div class="logo-mini">
            <b-img :src="logoMini" rounded="circle" alt="Circle image"></b-img>
            <div class="logo-title">
              <h2>Sidebar</h2>
            </div>
            
        </div>
      </template>
      <template v-slot:navbar>
        <b-navbar 
          id="mainNavbar" 
          toggleable="lg" 
          type="light" 
          variant="light" 
          fixed="top"
        >
          <b-navbar-nav>
            <b-nav-item>
              Navbar
            </b-nav-item>
          </b-navbar-nav>
        </b-navbar>
      </template>
      
      <template v-slot:content>
        <b-container style="margin-top: 56px">
          <router-view />
        </b-container>
      </template>
    </BootstrapSidebar>
  </div>
</template>

<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';
@import './assets/scss/default-theme';
</style>
