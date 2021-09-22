<template>
  <div class="w-full flex justify-center mt-8 mb-8 md:mt-36 md:mb-36">
    <div class="flex flex-col lg:flex-row lg:max-w-6xl">
      <div
        class="
          lg:w-1/3
          p-4
          text-sm
          lg:relative lg:sticky lg:top-28 lg:left-0 lg:h-1/4
        "
      >
        <div class="text-3xl">
          Frequently asked <span class="font-medium">Questions</span>
        </div>
        <div class="my-2">Wondering how our service works ?</div>
        <div class="mb-2">
          Confused about how we can improve your business ?
        </div>
        <div class="text-xs">Dive into our FAQ for more details</div>
      </div>
      <div class="lg:w-2/3">
        <div class="p-4">
          <div class="my-8 collapse border-b border-base-300 collapse-arrow">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
              I open/close with click
            </div>
            <div class="collapse-content">
              <p>
                Collapse content reveals with focus. If you add a checkbox, you
                can control it using checkbox instead of focus. Or you can
                force-open/force-close using
                <span class="badge badge-outline">collapse-open</span> and
                <span class="badge badge-outline">collapse-close</span> classes.
              </p>
            </div>
          </div>
          <div class="my-8 collapse border-b border-base-300 collapse-arrow">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
              I open/close with click
            </div>
            <div class="collapse-content">
              <p>
                Collapse content reveals with focus. If you add a checkbox, you
                can control it using checkbox instead of focus. Or you can
                force-open/force-close using
                <span class="badge badge-outline">collapse-open</span> and
                <span class="badge badge-outline">collapse-close</span> classes.
              </p>
            </div>
          </div>
          <div class="my-8 collapse border-b border-base-300 collapse-arrow">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
              I open/close with click
            </div>
            <div class="collapse-content">
              <p>
                Collapse content reveals with focus. If you add a checkbox, you
                can control it using checkbox instead of focus. Or you can
                force-open/force-close using
                <span class="badge badge-outline">collapse-open</span> and
                <span class="badge badge-outline">collapse-close</span> classes.
              </p>
            </div>
          </div>
          <div class="my-8 collapse border-b border-base-300 collapse-arrow">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
              I open/close with click
            </div>
            <div class="collapse-content">
              <p>
                Collapse content reveals with focus. If you add a checkbox, you
                can control it using checkbox instead of focus. Or you can
                force-open/force-close using
                <span class="badge badge-outline">collapse-open</span> and
                <span class="badge badge-outline">collapse-close</span> classes.
              </p>
            </div>
          </div>
          <div class="my-8 collapse border-b border-base-300 collapse-arrow">
            <input type="checkbox" />
            <div class="collapse-title text-xl font-medium">
              I open/close with click
            </div>
            <div class="collapse-content">
              <p>
                Collapse content reveals with focus. If you add a checkbox, you
                can control it using checkbox instead of focus. Or you can
                force-open/force-close using
                <span class="badge badge-outline">collapse-open</span> and
                <span class="badge badge-outline">collapse-close</span> classes.
              </p>
            </div>
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
