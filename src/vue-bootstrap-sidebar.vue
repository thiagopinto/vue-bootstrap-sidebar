<template>
  <div>
    <!-- Sidebar -->
    <nav
      id="sidebar"
      :class="`vue-bootstrap-sidebar bg-light text-dark default-theme  ${
        [theme] && [show ? 'sidebar-visible' : 'sidebar-hidden']
      } ${align}`"
    >
      <!-- eslint-disable vue/no-v-html -->
      <div v-if="header" class="sidebar-header" v-html="header"></div>
      <div v-else class="sidebar-header" @click="onButtonClick">
        <slot name="logo-mini" />
      </div>
      <!-- eslint-enable -->
      <b-list-group class="items-wrapper">
        <template v-for="(link, index) in links">

          <template v-if="link.href !== undefined">
            <b-list-group-item
              :key="index"
              v-b-tooltip.hover.right
              :title="link.name"
            >
              <b-button
                block
                :to="link.href"
                variant="info"
                class="btn sidebar-menu-item"
                :class="`${align}`"
                :squared="true"
                size="lg"
              >
                <div class="fa-icon">
                  <component
                    v-if="link.faIcon"
                    :is="'font-awesome-icon'"
                    :icon="link.faIcon"
                  />
                </div>
                <div class="link-name">
                  {{ link.name }}
                </div>
              </b-button>
            </b-list-group-item>
          </template>

          <template v-else>
            <b-list-group-item
              :key="index"
              v-b-tooltip.hover.right
              :title="link.name"
            >
              <b-button
                v-b-toggle="`accordion-${index + 10}`"
                block
                href="#"
                variant="info"
                class="sidebar-menu-item dropdown-toggle rounded-0"
                :class="`${align}`"
                size="lg"
              >
                <div class="fa-icon">
                  <component
                    v-if="link.faIcon"
                    :is="'font-awesome-icon'"
                    :icon="link.faIcon"
                  />
                </div>
                <div class="link-name">
                  {{ link.name }}
                </div>
              </b-button>
            </b-list-group-item>
            <b-collapse
              :id="`accordion-${index + 10}`"
              :key="index + 10"
              accordion="my-accordion"
              role="tabpanel"
            >
              <b-list-group>
                <b-list-group-item
                  v-for="(child, idx) in link.children"
                  :key="idx"
                >
                  <b-button
                    block
                    variant="primary"
                    class="sidebar-menu-item rounded-0 child-level-1"
                    :class="`${align}`"
                    :to="child.href"
                  >
                    <div class="fa-icon">
                      <component
                        v-if="child.faIcon"
                        :is="'font-awesome-icon'"
                        :icon="child.faIcon"
                      />
                    </div>
                    <div class="link-name">
                      {{ child.name }}
                    </div>
                  </b-button>
                </b-list-group-item>
              </b-list-group>
            </b-collapse>
          </template>
        </template>
      </b-list-group>
      <slot name="footer" />
      <!--/ .items-wrapper -->
      <HamburgerButton
        id="sidebarButton"
        class="sidebar-button"
        :is-hamburger="initialShow"
        :class="[show ? 'visible' : 'hidden']"
        @click="onButtonClick"
      />
    </nav>
    <div id="navbar" :class="`${[show ? 'sidebar' : 'no-sidebar'] } ${align}`">
      <slot name="navbar" />
    </div>
    <!-- Hamburger Menu -->
    <div id="content" :class="`${[show ? 'sidebar' : 'no-sidebar'] } ${align}`">
      <slot name="content" />
    </div>

  </div>
</template>
<script>
import HamburgerButton from "@jurajkavka/vue-hamburger-button";

export default {
  name: "BootstrapSidebar",
  components: {
    HamburgerButton,
  },
  props: {
    links: {
      type: Array,
      default: null,
    },
    initialShow: {
      type: Boolean,
      default: false,
    },
    theme: {
      type: String,
      default: "default-theme",
    },
    header: {
      type: String,
      default: "",
    },
    align: {
      type: String,
      default: "left",
    },
  },
  data() {
    return {
      show: this.initialShow,
    };
  },
  beforeMount() {
    /*     this.$nextTick(function () {
      this.onResize();
    }); */

    window.addEventListener("resize", this.onResize);
    let width = window.document.documentElement.clientWidth;
    if (width <= 991.98) {
      this.show = false;
    } else {
      this.show = true;
    }
  },
  beforeDestroy() {
     window.removeEventListener("resize", this.onResize);
  },
  methods: {
    onButtonClick() {
      this.show = !this.show;
      this.$emit("sidebar-changed", this.show);
    },
    onResize(windowResize) {
      let targetElement = windowResize.target || windowResize.srcElement;
      if (targetElement != undefined) {
        //(min-width: 576px) and (max-width: 991.98px)
        console.log(targetElement.document.documentElement.clientWidth);
        let width = targetElement.document.documentElement.clientWidth;
        if (width <= 991.98) {
          this.show = false;
        } else {
          this.show = true;
        }
      }
    },
  },
};
</script>
<style lang="scss">
@import "node_modules/@jurajkavka/vue-hamburger-button/src/scss/default-theme.scss";
</style>
