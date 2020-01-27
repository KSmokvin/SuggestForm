import mixin from "../../assets/mixin/index";

export default {
  actions: {
    updateVkInitData: function(ctx) {
      ctx.commit("updateVkInitData", mixin.getQueryParams());
    }
  },
  mutations: {
    updateVkInitData: function(state, vkInitData) {
      state.vkInitData = vkInitData;
      console.log("vkInitData", vkInitData);
    }
  },
  state: {
    vkInitData: {}
  },
  getters: {
    allVkInitData(state) {
      return state.vkInitData;
    },
    vkUserId(state) {
      return state.vkInitData.vk_user_id;
    },
    vkAppId(state) {
      return state.vkInitData.vk_app_id;
    },
    vkGroupId(state) {
      return state.vkInitData.vk_group_id;
    },
    vkToken(state) {
      return state.vkInitData.vk_group_id;
    }
  }
};
