<script setup>
</script>

<template>
  <div class="h-full">
    <!--Main-->
    <div class="container pt-5 md:pt-10 px-6 mx-auto flex flex-wrap flex-col md:flex-row items-center">
      <!--Left Col-->
      <div class="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
        <h1 class="my-4 text-3xl md:text-5xl font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
          Welcome to ORSIP-OR5
        </h1>
        <p class="leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
          Online Appointment Scheduling System for Integrated Project Clinics
        </p>
      </div>
      <!--Right Col-->
      <div class="w-full xl:w-3/5 py-6 overflow-y-hidden">
        <img class="w-5/6 mx-auto lg:mr-0 slide-in-bottom" src="../assets/oasip.png">
      </div>
    </div>
  </div>
</template>

<style>
.slide-in-bottom {
  -webkit-animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) both;
  animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) both
}

.slide-in-bottom-h1 {
  -webkit-animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) .5s both;
  animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) .5s both
}

.slide-in-bottom-subtitle {
  -webkit-animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) .75s both;
  animation: slide-in-bottom .5s cubic-bezier(.25, .46, .45, .94) .75s both
}

.fade-in {
  -webkit-animation: fade-in 1.2s cubic-bezier(.39, .575, .565, 1.000) 1s both;
  animation: fade-in 1.2s cubic-bezier(.39, .575, .565, 1.000) 1s both
}

.bounce-top-icons {
  -webkit-animation: bounce-top .9s 1s both;
  animation: bounce-top .9s 1s both
}

@-webkit-keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1
  }
}

@keyframes slide-in-bottom {
  0% {
    -webkit-transform: translateY(1000px);
    transform: translateY(1000px);
    opacity: 0
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    opacity: 1
  }
}

@-webkit-keyframes bounce-top {
  0% {
    -webkit-transform: translateY(-45px);
    transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 1
  }

  24% {
    opacity: 1
  }

  40% {
    -webkit-transform: translateY(-24px);
    transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  65% {
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  82% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  93% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1
  }
}

@keyframes bounce-top {
  0% {
    -webkit-transform: translateY(-45px);
    transform: translateY(-45px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
    opacity: 1
  }

  24% {
    opacity: 1
  }

  40% {
    -webkit-transform: translateY(-24px);
    transform: translateY(-24px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  65% {
    -webkit-transform: translateY(-12px);
    transform: translateY(-12px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  82% {
    -webkit-transform: translateY(-6px);
    transform: translateY(-6px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  93% {
    -webkit-transform: translateY(-4px);
    transform: translateY(-4px);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in
  }

  25%,
  55%,
  75%,
  87% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out
  }

  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
    opacity: 1
  }
}

@-webkit-keyframes fade-in {
  0% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
}

@keyframes fade-in {
  0% {
    opacity: 0
  }

  100% {
    opacity: 1
  }
}
</style>
