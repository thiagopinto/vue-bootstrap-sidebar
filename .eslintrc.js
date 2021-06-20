module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    "eslint:recommended",
    //"plugin:vue/strongly-recommended",
    //"plugin:vue/recommended",
    "plugin:vue/vue3-strongly-recommended",
    "plugin:vue/strongly-recommended",
    "plugin:vue/vue3-recommended",
    "plugin:vue/recommended",
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
  },
  //plugins: ["vue"]
  options: {
    "vue/v-slot-style": ["error", {
      "atComponent": "shorthand" | "longform" | "v-slot",
      "default": "shorthand" | "longform" | "v-slot",
      "named": "shorthand" | "longform",
    }]
  }
};
