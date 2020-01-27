<template>
  <div class="blocks blocks-publ">
    <template v-if="allBlocks.length">
      <form @submit.prevent="wallPost()">
        <component
          v-for="block in allBlocks"
          :is="defineComponent(block.type)"
          :key="block.id"
          :init-block="block"
          ref="block"
        />
        <button type="submit" class="btn btn-block btn-success">Отправить</button>
      </form>
    </template>
    <p v-else>Ещё не создано ни одного блока</p>
    <div class="mt-4" style="white-space:pre">{{postText}}</div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import PublInputBlock from "./types/PublInputBlock.vue";

export default {
  components: {
    PublInputBlock
  },
  props: {
    initialBlocks: {
      type: Array
    }
  },
  computed: mapGetters(["allBlocks", "postText", "vkGroupId"]),
  data: function() {
    return {};
  },
  created() {},
  methods: {
    defineComponent(blockType) {
      const componentNames = {
        input: "PublInputBlock",
        checkboxes: "PublCheckboxesBlock",
        radios: "PublRadiosBlock"
      };
      return componentNames[blockType];
    },
    wallPost() {
      console.log("wallPost");
    }
  }
};
</script>

<style lang="scss">
@import "../../../../assets/scss/variables.scss";
.block-publ__header {
  display: flex;
  margin-bottom: 0.35rem;
  font-size: 14px;
  line-height: 18px;
}
.block-publ__title {
  color: $textInfo;
}
.block-publ__hint {
  margin: 0.35rem 0;
  padding: 0.35rem 0.5rem;
  border-radius: 4px;
  color: $textInfo;
  font-size: 80%;
  background: #e1e5eb;
  white-space: pre;
}
.block-publ__hint-toggler {
  margin: 1px 6px 1px 1px;
  font-size: 16px;
}
</style>
