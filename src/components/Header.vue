<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#fcb69f"
      dark
      shrink-on-scroll
      src="https://picsum.photos/1920/1080?random"
      scroll-target="#scrolling-techniques-2"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>

      <v-img 
        :max-width="$vuetify.breakpoint.xs ? 260 : 700"
        class="ma-auto"
        src="../assets/icon-left-font-monochrome-white.svg"
        alt="Groupomania logo"
      >
      </v-img>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-2"
      class="overflow-y-auto"
      max-height="800"
    >
      <v-container style="height: 128px;"></v-container>
    </v-sheet>
  </v-card>
</template>

<script>
export default {
  name: "Header",
};
</script>
