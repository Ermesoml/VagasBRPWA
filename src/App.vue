<template>
  <div id="app">
    <nav class="navbar container" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          Vagas<strong>BR</strong>
        </a>

        <a role="button" :class="`navbar-burger burger ${isActive ? 'is-active': ''}`" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isActive = !isActive">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" :class="`navbar-menu ${isActive ? 'is-active': ''}`">
        <div class="navbar-start">
          <!-- <a class="navbar-item">
            Frontend
          </a>

          <a class="navbar-item">
            Backend
          </a>

          <a class="navbar-item">
            Mobile
          </a> -->
        </div>
        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <router-link class="button is-primary" to="/sobre">
                <strong>Sobre</strong>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
    data(){
      return {
        isActive: false
      }
    }
  }
</script>

<style lang="scss">
  @import "~bulma/bulma";

  $sizeUnit: rem;
  $marginKey: 'm';
  $paddingKey: 'p';
  $separator: '-';
  $sizes: (
      ('none', 0),
      ('xxs', 0.125),
      ('xs', 0.25),
      ('sm', 0.5),
      ('md', 1),
      ('lg', 2),
      ('xl', 4),
      ('xxl', 8),
  );
  $positions: (
      ('t', 'top'),
      ('r', 'right'),
      ('b', 'bottom'),
      ('l', 'left')
  );

  @function sizeValue($key, $value) {
      @return if($key == 'none', 0, $value + $sizeUnit + "!important");
  }

  @each $size in $sizes {
      $sizeKey: nth($size, 1);
      $sizeValue: nth($size, 2);
      .#{$marginKey}#{$separator}#{$sizeKey} {
          margin: sizeValue($sizeKey, $sizeValue);
      }
      .#{$paddingKey}#{$separator}#{$sizeKey} {
          padding: sizeValue($sizeKey, $sizeValue);
      }
      @each $position in $positions {
          $posKey: nth($position, 1);
          $posValue: nth($position, 2);
          .#{$marginKey}#{$separator}#{$posKey}#{$separator}#{$sizeKey} {
              margin-#{$posValue}: sizeValue($sizeKey, $sizeValue);
          }
          .#{$paddingKey}#{$separator}#{$posKey}#{$separator}#{$sizeKey} {
              padding-#{$posValue}: sizeValue($sizeKey, $sizeValue);
          }
      }
  }
  // Logo
  .navbar-brand {
    font-size: 2em;
    font-weight: bold;
    .navbar-item {
      color: $blue;
      text-shadow: 0 1px #fff, 0 -1px #fff, 1px 0 #fff, -1px 0 #fff, 0 4px 5px $yellow;
      transition: .3s all;
      &:hover {
        color: darken($yellow, 20%);
        text-shadow: 0 1px #fff, 0 -1px #fff, 1px 0 #fff, -1px 0 #fff, 0 4px 5px $green;
      }
    }
    strong {
      color: $primary;
      margin-left: 5px;
    }
  }
</style>
