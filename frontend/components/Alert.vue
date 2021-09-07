<template>
  <div :class="`${type}-body`">
    <div class="mr-4">
      <div :class="`${type}-icon`">
        <i class="material-icons">{{ type }}</i>
      </div>
    </div>
    <div class="flex justify-between w-full">
      <div :class="`${type}-message`">
        <p class="mb-2 font-bold">{{ message }}</p>
        <p class="text-xs">{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator';

@Component({
  name: 'Alert',
})
export default class Alert extends Vue {
  @Prop({
    type: String,
    required: true,
    validator: (value) => ['done', 'info', 'warning', 'report'].includes(value),
  })
  type!: string;

  @Prop({
    type: String,
    required: true,
  })
  message!: string;

  @Prop({
    type: String,
    required: true,
  })
  description!: string;
}
</script>

<style scoped lang="scss">
.done {
  &-body {
    @apply flex bg-green-200 p-4;
  }

  &-icon {
    @apply h-10
    w-10
    text-white
    bg-green-600
    rounded-full
    flex
    justify-center
    items-center;
  }

  &-message {
    @apply text-green-600;
  }
}

.info {
  &-body {
    @apply flex bg-blue-200 p-4;
  }

  &-icon {
    @apply h-10
    w-10
    text-white
    bg-blue-600
    rounded-full
    flex
    justify-center
    items-center;
  }

  &-message {
    @apply text-blue-600;
  }
}

.warning {
  &-body {
    @apply flex bg-highlight-200 p-4;
  }

  &-icon {
    @apply h-10
    w-10
    text-white
    bg-highlight-600
    rounded-full
    flex
    justify-center
    items-center;
  }

  &-message {
    @apply text-highlight-600;
  }
}

.report {
  &-body {
    @apply flex bg-red-200 p-4;
  }

  &-icon {
    @apply h-10
    w-10
    text-white
    bg-red-600
    rounded-full
    flex
    justify-center
    items-center;
  }

  &-message {
    @apply text-red-600;
  }
}
</style>
