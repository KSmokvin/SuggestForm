<template>
  <div class="suggest-form">
    <header class="mb-3">
      <b-form-checkbox
        v-model="mode"
        value="admin"
        unchecked-value="publ"
        name="mode-button"
        switch
      >Администрирование</b-form-checkbox>
    </header>

    <admin-blocks v-if="mode=='admin'"/>
    <publ-blocks v-if="mode=='publ'"/>
  </div>
</template>



<script>
import { mapActions } from "vuex";
import AdminBlocks from "./admin/blocks/AdminBlocks.vue";
import PublBlocks from "./publ/blocks/PublBlocks.vue";

export default {
  components: {
    AdminBlocks,
    PublBlocks
  },

  methods: {
    ...mapActions(["fetchBlocks"])
  },

  data: function() {
    return {
      mode: "admin"
    };
  },
  mounted() {
    this.fetchBlocks();
  }
};
</script>