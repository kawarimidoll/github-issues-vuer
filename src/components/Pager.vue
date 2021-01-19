<template>
  <div className="flex justify-center">
    <div className="flex">
      <component
        :is="getTag(current > 1)"
        :class="getClass(current > 1)"
        :to="getPath(1)"
      >
        First
      </component>
      <component
        :is="getTag(current > 1)"
        :class="getClass(current > 1)"
        :to="getPath(current - 1)"
      >
        Prev
      </component>
      <div className="px-2">{{ current }} / {{ max }}</div>
      <component
        :is="getTag(current < max)"
        :class="getClass(current < max)"
        :to="getPath(current + 1)"
      >
        Next
      </component>
      <component
        :is="getTag(current < max)"
        :class="getClass(current < max)"
        :to="getPath(max)"
      >
        Last
      </component>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    current: { type: String, required: true },
    max: { type: Number, required: true },
    getPath: { type: Function, required: true },
  },
  methods: {
    getTag(enable) {
      return enable ? "router-link" : "span";
    },
    getClass(enable) {
      return (
        "block px-2 border border-solid border-transparent" +
        (enable ? " hover:border-black" : " text-gray-400 cursor-not-allowed")
      );
    },
  },
};
</script>
