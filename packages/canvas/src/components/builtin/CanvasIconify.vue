<script>
import * as SvgIcons from '@opentiny/vue-icon'
import { Icon } from '@iconify/vue';
import { h } from 'vue'

export default {
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  setup(props) {
    return () =>
      h('span', { class: 'iconwarp' }, [
        h(Icon, { icon:props.name, style: { width: '100%', height: '100%' } }),
      ])
  }
}
</script>

<style scoped>
.iconwarp {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  fill: currentColor;
  width: 1.5em;
  height: 1.5em;
}
</style>
