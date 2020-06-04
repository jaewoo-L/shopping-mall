<template>
  <transition name="modal" appear>
    <div class="modal modal-overlay" @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-content">
          <slot/>
        </div>
        <footer class="modal-footer">
          <slot name="footer">
            <button @click="$emit('close')">Close</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<style lang="css" scoped>
  .modal.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  .modal-window {
    background: #fff;
    border-radius: 4px;
    /* overflow: hidden; */
  }
  .modal-content {
    padding: 15px 25px;
    border:0;
    border-radius:0;
  }
  .modal-content p {
    font-size:1.5rem;
  }
  .modal-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
    border-top:0
  }
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.4s;
  }
  .modal-enter-active .modal-window, .modal-leave-active .modal-window{
    transition: opacity 0.3s, transform 0.3s;
  }
  .modal-enter, .modal-leave-to {
    opacity: 0;
  }
  .modal-enter .modal-window, .modal-leave-to .modal-window{
    opacity: 0;
    transform: translateY(-20px);
  }
  </style>
