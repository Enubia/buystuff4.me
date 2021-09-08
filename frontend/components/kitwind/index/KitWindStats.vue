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
    <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
      <!-- <div> -->
      <!--   <p -->
      <!--     class=" -->
      <!--       inline-block -->
      <!--       px-3 -->
      <!--       py-px -->
      <!--       mb-4 -->
      <!--       text-xs -->
      <!--       font-semibold -->
      <!--       tracking-wider -->
      <!--       text-teal-900 -->
      <!--       uppercase -->
      <!--       rounded-full -->
      <!--       bg-teal-accent-400 -->
      <!--     " -->
      <!--   > -->
      <!--     Brand new -->
      <!--   </p> -->
      <!-- </div> -->
      <h2
        class="
          max-w-lg
          mb-6
          font-sans
          text-3xl
          font-bold
          leading-none
          tracking-tight
          text-gray-900
          sm:text-4xl
          md:mx-auto
        "
      >
        <span class="relative inline-block">
          <svg
            viewBox="0 0 52 24"
            fill="currentColor"
            class="
              absolute
              top-0
              left-0
              z-0
              hidden
              w-32
              -mt-8
              -ml-20
              text-blue-gray-100
              lg:w-32 lg:-ml-28 lg:-mt-10
              sm:block
            "
          >
            <defs>
              <pattern
                id="d5589eeb-3fca-4f01-ac3e-983224745704"
                x="0"
                y="0"
                width=".135"
                height=".30"
              >
                <circle cx="1" cy="1" r=".7"></circle>
              </pattern>
            </defs>
            <rect
              fill="url(#d5589eeb-3fca-4f01-ac3e-983224745704)"
              width="52"
              height="24"
            ></rect>
          </svg>
          <span class="relative">The</span>
        </span>
        quick, brown fox jumps over a lazy dog
      </h2>
      <p class="text-base text-gray-700 md:text-lg">
        Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque rem aperiam, eaque ipsa quae.
      </p>
    </div>
    <div
      class="
        relative
        w-full
        p-px
        mx-auto
        mb-4
        overflow-hidden
        transition-shadow
        duration-300
        border
        rounded
        lg:mb-8 lg:max-w-4xl
        group
        hover:shadow-xl
      "
    >
      <div
        class="
          absolute
          bottom-0
          left-0
          w-full
          h-1
          duration-300
          origin-left
          transform
          scale-x-0
          bg-deep-purple-accent-400
          group-hover:scale-x-100
        "
      ></div>
      <div
        class="
          absolute
          bottom-0
          left-0
          w-1
          h-full
          duration-300
          origin-bottom
          transform
          scale-y-0
          bg-deep-purple-accent-400
          group-hover:scale-y-100
        "
      ></div>
      <div
        class="
          absolute
          top-0
          left-0
          w-full
          h-1
          duration-300
          origin-right
          transform
          scale-x-0
          bg-deep-purple-accent-400
          group-hover:scale-x-100
        "
      ></div>
      <div
        class="
          absolute
          bottom-0
          right-0
          w-1
          h-full
          duration-300
          origin-top
          transform
          scale-y-0
          bg-deep-purple-accent-400
          group-hover:scale-y-100
        "
      ></div>
      <div
        class="
          relative
          flex flex-col
          items-center
          h-full
          py-10
          duration-300
          bg-white
          rounded-sm
          transition-color
          sm:items-stretch sm:flex-row
        "
      >
        <div class="px-12 py-8 text-center">
          <h6
            class="text-4xl font-bold text-deep-purple-accent-400 sm:text-5xl"
          >
            82%
          </h6>
          <p class="text-center md:text-base">
            Lorem ipsum dolor adipiscing sit amet, consectetur elit.
          </p>
        </div>
        <div
          class="
            w-56
            h-1
            transition
            duration-300
            transform
            bg-gray-300
            rounded-full
            group-hover:bg-deep-purple-accent-400 group-hover:scale-110
            sm:h-auto sm:w-1
          "
        ></div>
        <div class="px-12 py-8 text-center">
          <h6
            class="text-4xl font-bold text-deep-purple-accent-400 sm:text-5xl"
          >
            106.5K
          </h6>
          <p class="text-center md:text-base">
            Lorem ipsum elit consectetur sit amet, adipiscing dolor.
          </p>
        </div>
      </div>
    </div>
    <p
      class="
        mx-auto
        mb-4
        text-gray-600
        sm:text-center
        lg:max-w-2xl lg:mb-6
        md:px-16
      "
    >
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </p>
  </div>
</template>

<script>
export default {};
</script>
