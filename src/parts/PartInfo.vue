<template>
  <div>
    <h1>{{ part.title }}</h1>
    <div >
      {{part.description}}
    </div>
  </div>
</template>

<script>
import parts from '../data/parts';
import getPartsMixin from './get-parts-mixin';

export default {
  name: 'PartInfo',
    mixins: [getPartsMixin],

  // data() {
  //   return {
  //     part: {
  //       title: 'Part Title',
  //       description: 'Part Description'
  //     }
  //   }
  // },
  // props: ['partType', 'id'],

  props: {
    partType: { type: String },
    id: {
      type: [Number, String],
      validator(value) {
        return Number.isInteger(Number(value));
      },
    },   
  },
  computed: {
    part() {
      // const partType = this.$route.params.partType;
      // const id = this.$route.params.id;
      // return {
      //   title: 'Part Title',
      //   description: 'Part Description'
      // }

            // const {partType, id} = this.$route.params
        const {partType, id} = this

      // const { partType, id } = this;
    //   return parts[partType].find((part) => part.id === +id);
          return this.parts[partType].find((part) => part.id === +id);

    },
  },
};
</script>
