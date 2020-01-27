<template>
  <b-card no-body class="block mb-2" :class="'block-'+initBlock.type">
    <!--  BLOCK HEADER  -->
    <template v-slot:header>
      <div class="block__header" @click="expanded = !expanded">
        <!--  BLOCK HEADER MAIN -->
        <div>
          <template v-if="title">
            <h5 class="mb-0">
              <i class="fas fa-grip-vertical block__drag"></i>
              {{title}}
            </h5>
            <small class="text-muted ml-4">Текстовое поле</small>
          </template>
          <template v-else>
            <h5 class="mb-0 mt-1">
              <i class="fas fa-grip-vertical block__drag"></i>
              Текстовое поле
            </h5>
          </template>
        </div>
        <!--  / BLOCK HEADER MAIN -->
        <!--  BLOCK HEADER CONTROLS -->
        <div>
          <button
            class="btn btn-light btn-sm"
            @click.stop="$store.commit('removeBlock', initBlock.id)"
          >
            <i class="fas fa-trash-alt fa-fw opacity-50" title="Удалить поле"></i>
          </button>
        </div>
        <!--  / BLOCK HEADER CONTROLS -->
      </div>
    </template>
    <!--  / BLOCK HEADER  -->
    <!--  BLOCK CONTENT  -->
    <b-card-body v-if="expanded">
      <div class="block-settings">
        <!--  Заголовок  -->
        <admin-block-setting
          label="Название поля"
          help="Краткий заголовок, указывающий пользователям, что вводить в это поле"
        >
          <b-form-input v-model="title" placeholder="Название не заполнено" class="spy bold"></b-form-input>
        </admin-block-setting>
        <!--  / Заголовок  -->
        <!--  Формат  -->
        <admin-block-setting
          label="Формат поля"
          help="В какой форме подразумевается ввод данных в это поле. В зависимости от формата могут измениться внешний вид и дополниительные настройки поля"
        >
          <b-form-select v-model="format" :options="formats" class="spy"></b-form-select>
        </admin-block-setting>
        <!--  / Формат  -->
        <!--  Обязательное  -->
        <admin-block-setting
          label="Обязательное"
          help="Обязательно ли это поле к заполнению перед отправкой формы"
        >
          <b-form-checkbox :id="initBlock.id+'-required'" v-model="required" switch></b-form-checkbox>
        </admin-block-setting>
        <!--  / Обязательное  -->
        <div class="block-settings__more" v-if="expandedMore">
          <h6 class="mt-4">Дополнительно</h6>
          <!--  Подсказка  -->
          <admin-block-setting
            label="Подсказка"
            help="Краткая подсказка по заполнению этого поля. Будет отображаться полупрозрачным текстом внутри поля"
          >
            <b-form-input
              v-model="placeholder"
              placeholder="Подсказка не заполнена"
              class="spy"
              maxlength="60"
            ></b-form-input>
          </admin-block-setting>
          <!--  / Помощь  -->
          <!--  Помощь  -->
          <admin-block-setting
            label="Помощь"
            help="Подробные рекомендации для пользователей по заполнению этого поля. Будут отображать в свёрнутом виде рядом с полем."
            fixlabel="1"
          >
            <b-form-textarea
              v-model="hint"
              placeholder="Рекомендации не заполнены"
              class="spy"
              max-rows="8"
              :class="{ shyTextareaHeight:!hint }"
            ></b-form-textarea>
          </admin-block-setting>
          <!--  / Помощь  -->
          <!--  Мин длина  -->
          <admin-block-setting
            v-if="initBlock.format === 'input'"
            label="Мин. длина"
            help="Сколько минимально сивмолов нужно ввести в это поле. Установите '0', чтобы убрать ограничение."
          >
            <flex-input
              v-model="length.min"
              type="number"
              placeholder="0"
              suffix="символов"
              classes="spy"
            ></flex-input>
          </admin-block-setting>
          <!--  / Мин длина  -->
          <!--  Макс длина  -->
          <admin-block-setting
            v-if="initBlock.format === 'input'"
            label="Макс. длина"
            help="Сколько максимально сивмолов можно ввести в это поле. Установите '0', чтобы убрать ограничение."
          >
            <flex-input
              v-model="length.max"
              type="number"
              placeholder="0"
              suffix="символов"
              classes="spy"
            ></flex-input>
          </admin-block-setting>
          <!--  / Макс длина  -->
          <!--  Мин число  -->
          <admin-block-setting
            v-if="initBlock.format === 'number'"
            label="Мин. число"
            help="Минимальное число, которое можно установить в это поле. Или установите '0', чтобы убрать ограничеие"
          >
            <b-form-input v-model="range.min" type="number" placeholder="0" class="spy"></b-form-input>
          </admin-block-setting>
          <!--  / Мин число  -->
          <!--  Макс число  -->
          <admin-block-setting
            v-if="initBlock.format === 'number'"
            label="Макс. число"
            help="Максимальное число, которое можно установить в это поле. Или установите '0', чтобы убрать ограничеие"
          >
            <b-form-input v-model="range.max" type="number" placeholder="0" class="spy"></b-form-input>
          </admin-block-setting>
          <!--  / Макс число  -->
          <h6 class="mt-4">Вид поля в посте</h6>
          <!--  Префикс  -->
          <admin-block-setting label="Префикс" help="Префикс">
            <b-form-select v-model="prefix.position" :options="prefixPositions" class="spy"></b-form-select>
          </admin-block-setting>
          <!--  / Префикс  -->
          <!--  Текст префикса  -->
          <admin-block-setting
            v-if="prefix.position != 'hidden'"
            label="Текст префикса"
            help="Текст префикса"
          >
            <b-form-input v-model="prefix.text" placeholder="Равен названию поля" class="spy"></b-form-input>
          </admin-block-setting>
          <!--  / Текст префикса  -->
          <!--  Отступ снизу  -->
          <admin-block-setting
            label="Отступ снизу"
            help="Требуется ли добавить отступ снизу, чтобы визуально отделить это поле от последующих полей в тексте поста"
          >
            <b-form-checkbox :id="initBlock.id+'-offset'" v-model="offset" switch></b-form-checkbox>
          </admin-block-setting>
          <!--  / Отступ снизу  -->
        </div>
        <div style="margin:1rem -1.25rem -1.25rem;">
          <button class="btn btn-block btn-light mt-2" @click="expandedMore = !expandedMore">
            <small v-if="!expandedMore">
              <i class="fas fa-chevron-down mr-1 opacity-50"></i> Больше настроек
            </small>
            <small v-else>
              <i class="fas fa-chevron-up mr-1 opacity-50"></i> Меньше настроек
            </small>
          </button>
        </div>
      </div>
    </b-card-body>
    <!--  / BLOCK CONTENT  -->
  </b-card>
</template>


<script>
//import { mapGetters, mapActions } from "vuex";
import AdminBlockSetting from "../elements/AdminBlockSetting.vue";
import FlexInput from "../../../../elements/FlexInput.vue";

export default {
  components: {
    AdminBlockSetting,
    FlexInput
  },
  props: {
    initBlock: {
      type: Object,
      required: true
    }
  },
  computed: {
    // ------ Title -------
    title: {
      get() {
        return this.initBlock.title;
      },
      set(value) {
        this.updateBlock("title", value);
      }
    },
    // ------ Format -------
    format: {
      get() {
        return this.initBlock.format;
      },
      set(value) {
        this.updateBlock("format", value);
      }
    },
    // ------ Required -------
    required: {
      get() {
        return this.initBlock.required;
      },
      set(value) {
        this.updateBlock("required", value);
      }
    },
    // ------ Hint -------
    hint: {
      get() {
        return this.initBlock.hint;
      },
      set(value) {
        this.updateBlock("hint", value);
      }
    },
    // ------ Placeholder -------
    placeholder: {
      get() {
        return this.initBlock.placeholder;
      },
      set(value) {
        this.updateBlock("placeholder", value);
      }
    },
    // ------ Prefix -------
    prefix: {
      get() {
        return this.initBlock.prefix;
      },
      set(value) {
        this.updateBlock("prefix", value);
      }
    },
    // ------ Length -------
    length: {
      get() {
        return this.initBlock.length;
      },
      set(value) {
        this.updateBlock("length", value);
      }
    },
    // ------ Range -------
    range: {
      get() {
        return this.initBlock.range;
      },
      set(value) {
        this.updateBlock("range", value);
      }
    },
    // ------ Offset -------
    offset: {
      get() {
        return this.initBlock.offset;
      },
      set(value) {
        this.updateBlock("offset", value);
      }
    }
  },
  data: function() {
    return {
      expanded: false,
      expandedMore: false,
      prefixPositions: [
        { value: "above", text: "Показать над значением" },
        { value: "start", text: "Показать в начале строки" },
        { value: "hidden", text: "Скрыть" }
      ],
      formats: [
        { value: "textarea", text: "Многострочный текст" },
        { value: "input", text: "Однострочный текст" },
        { value: "number", text: "Число" },
        {
          value: "email",
          text: "Email (доступно только для Pro)",
          disabled: true
        },
        {
          value: "phone",
          text: "Телефон (доступно только для Pro)",
          disabled: true
        },
        {
          value: "mask",
          text: "Маска (доступно только для Pro)",
          disabled: true
        },
        {
          value: "regexp",
          text: "RegExp (доступно только для Pro)",
          disabled: true
        }
      ]
    };
  },
  created: function() {
    this.$eventBus.$on("addBlock", this.applyFirstCreationConfig);
  },
  methods: {
    buildComputedField(name) {
      console.log(name);
      return "boo";
    },
    applyFirstCreationConfig(blockId) {
      if (blockId === this.initBlock.id) {
        this.expanded = true;
      }
    },
    updateBlock: function(prop, value) {
      this.$store.commit("updateBlock", {
        prop: prop,
        value: value,
        blockId: this.initBlock.id
      });
    }
  }
};
</script>

<style>
.block__header {
  display: flex;
  justify-content: space-between;
  margin: -0.75rem -1.25rem;
  padding: 0.75rem 1.25rem;
  background: #f8f9fa;
  transition: background 0.2s;
  cursor: pointer;
  border-radius: calc(0.25rem - 1px);
}
.block__header:hover {
  background: #e1e5eb;
}
.block__drag {
  padding-right: 6px;
  opacity: 0.2;
  cursor: move;
}
.shyTextareaHeight {
  height: calc(1.5em + 0.75rem + 2px) !important;
}
</style>