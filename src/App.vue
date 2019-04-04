<template>
  <div>
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          Vagas BR
        </a>

        <a role="button" :class="`navbar-burger burger ${isActive ? 'is-active': ''}`" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" @click="isActive = !isActive">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" :class="`navbar-menu ${isActive ? 'is-active': ''}`">
        <!-- <div class="navbar-start">
          <a class="navbar-item">
            Frontend
          </a>

          <a class="navbar-item">
            Backend
          </a>

          <a class="navbar-item">
            Mobile
          </a>
        </div> -->

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Contato</strong>
              </a>
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
