<template>
  <div
    class="
      px-4
      py-16
      mx-auto
      sm:max-w-xl
      md:max-w-full
      lg:max-w-screen-xl
      md:px-24
      lg:px-8 lg:py-20
    "
  >
    <div class="max-w-xl sm:mx-auto lg:max-w-2xl">
      <div class="flex flex-col mb-16 sm:text-center sm:mb-0">
        <div
          class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12"
        >
          <h2
            class="
              flex
              items-center
              max-w-lg
              mb-6
              font-sans
              text-3xl
              font-bold
              leading-none
              tracking-tight
              sm:text-4xl
              md:mx-auto
            "
          >
            <img src="../assets/svg/logo.svg" alt="logo" class="w-36" />
            <span>{{ $t('faq.title') }}</span>
          </h2>
        </div>
      </div>
    </div>
    <div class="max-w-screen-xl sm:mx-auto">
      <div class="grid grid-cols-1 gap-16 row-gap-8 lg:grid-cols-2">
        <div class="space-y-8">
          <div>
            <p class="mb-4 text-xl font-medium">
              The quick, brown fox jumps over a lazy dog?
            </p>
            <p>
              Space, the final frontier. These are the voyages of the Starship
              Enterprise. Its five-year mission: to explore strange new
              worlds.<br />
              <br />
              Many say exploration is part of our destiny, but it’s actually our
              duty to future generations.
            </p>
          </div>
          <div>
            <p class="mb-4 text-xl font-medium">
              The first mate and his Skipper too will do?
            </p>
            <p>
              Well, the way they make shows is, they make one show. That show's
              called a pilot.<br />
              <br />
              Then they show that show to the people who make shows, and on the
              strength of that one show they decide if they're going to make
              more shows. Some pilots get picked and become television
              programs.Some don't, become nothing. She starred in one of the
              ones that became nothing.
            </p>
          </div>
          <div>
            <p class="mb-4 text-xl font-medium">
              Is the Space Pope reptilian!?
            </p>
            <p>
              A flower in my garden, a mystery in my panties. Heart attack never
              stopped old Big Bear. I didn't even know we were calling him Big
              Bear.
            </p>
          </div>
        </div>
        <div class="space-y-8">
          <div>
            <p class="mb-4 text-xl font-medium">
              How much money you got on you?
            </p>
            <p>
              The first mate and his Skipper too will do their very best to make
              the others comfortable in their tropic island nest.<br />
              <br />
              Michael Knight a young loner on a crusade to champion the cause of
              the innocent. The helpless. The powerless in a world of criminals
              who operate above the law. Here he comes Here comes Speed Racer.
              He's a demon on wheels.
            </p>
          </div>
          <div>
            <p class="mb-4 text-xl font-medium">
              Galaxies Orion's sword globular star cluster?
            </p>
            <p>
              A business big enough that it could be listed on the NASDAQ goes
              belly up. Disappears!<br />
              <br />
              It ceases to exist without me. No, you clearly don't know who
              you're talking to, so let me clue you in.
            </p>
          </div>
          <div>
            <p class="mb-4 text-xl font-medium">
              When has justice ever been as simple as a rule book?
            </p>
            <p>
              This is not about revenge. This is about justice. A lot of things
              can change in twelve years, Admiral. Well, that's certainly good
              to know. About four years. I got tired of hearing how young I
              looked.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Faq',
})
export default class Faq extends Vue {}
</script>
