<template>
  <div>
    <b-taglist>
      <b-tag :style="`background-color:#${label.color};color:white`" v-for="label in labels" :key="label.id">{{label.name}}</b-tag>
    </b-taglist>
  </div>
</template>

<script>
  export default {
    name: 'LabelsVaga',
    props:{
      labels: Array
    }
  }
</script>
