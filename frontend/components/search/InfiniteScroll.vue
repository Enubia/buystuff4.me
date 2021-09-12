<template>
  <div v-show="!enough" :id="id">
    <slot>
      <!-- We can add an SR only text for screen readers by passing class to these slot or add a spinner ico-->
      <span> Loading...</span>
    </slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({
  name: 'InfiniteScroll',
})
export default class InfiniteScroll extends Vue {
  @Prop({ type: String, default: 'load-more' }) id!: string;

  @Prop({ type: Number, default: 0 }) offset!: number;

  @Prop({ type: Boolean, default: false }) enough!: boolean;

  handleScroll() {
    if (this.enough) {
      return;
    }

    const element_toTop = this.getElementOffset().top;
    const current_distance =
      document.documentElement.scrollTop + window.innerHeight;

    if (current_distance + this.offset > element_toTop) {
      this.$emit('load-more');
    }
  }

  getElementOffset() {
    let top = 0;
    let left = 0;
    let element = document.getElementById(this.id) as any;
    // Loop through the DOM tree
    // and add it's parent's offset to get page offset
    do {
      top += element.offsetTop || 0;
      left += element.offsetLeft || 0;
      element = element.offsetParent;
    } while (element);
    return {
      top,
      left,
    };
  }

  beforeMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}
</script>
