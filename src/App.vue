<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col">
          <suggest-form/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SuggestForm from "./components/suggestForm/SuggestForm";

export default {
  name: "App",
  components: {
    SuggestForm
  },
  created() {
    this.$store.dispatch("updateVkInitData");
  }
};
</script>




<style lang="scss">
@import "./assets/scss/variables.scss";

*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  background: #fafbfc;
}

input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  font-style: italic;
  font-weight: normal;
}

input.niph::-webkit-input-placeholder {
  font-style: normal;
}
input.lnth::-webkit-input-placeholder {
  text-decoration: line-through;
}

i.fa-color {
  color: $icon;
}
i.fa-color-hover {
  cursor: pointer;
  transition: color 0.1s;
  &:hover,
  &:active,
  &.active {
    color: $iconHover;
  }
}

#app {
  margin: 30px auto;
  line-height: 1.5;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $vue-blue;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.tooltip {
  font-size: 0.8rem;
  line-height: 125%;
}

.form-control.spy,
.custom-select.spy {
  border-color: transparent;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.form-control.form-control-sm.spy {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}

.bold {
  font-weight: bold;
}
.nowrap {
  white-space: nowrap;
}
.opacity-50 {
  opacity: 0.5;
}
.opacity-60 {
  opacity: 0.6;
}
.opacity-70 {
  opacity: 0.7;
}
.opacity-80 {
  opacity: 0.8;
}
.opacity-90 {
  opacity: 0.9;
}
.opacity-100 {
  opacity: 1;
}

.card-header {
  border-bottom: none;
}
</style>
