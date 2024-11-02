<template>
  <div class="components-wrap">
    <tiny-tabs v-model="activeName" tab-style="button-card" class="full-width-tabs" @click="tabClick">
      <tiny-tab-item name="iconify" title="在线图标">
        <iconify></iconify>
      </tiny-tab-item>
      <tiny-tab-item name="custom" title="我的图标">
        <icon-custom></icon-custom>
      </tiny-tab-item>
    </tiny-tabs>
  </div>
</template>

<script>
import { inject, onMounted, reactive, ref } from 'vue'
import { Tabs, TabItem } from '@opentiny/vue'
import { useResource, useCanvas } from '@opentiny/tiny-engine-controller'
import IconCustom from './Custom.vue'
import Iconify from './Iconify.vue'

export default {
  components: {
    TinyTabs: Tabs,
    TinyTabItem: TabItem,
    IconCustom,
    Iconify
  },
  setup() {
    const COMPONENT_PANEL_COLUMNS = '1fr 1fr 1fr'
    const SHORTCUT_PANEL_COLUMNS = '1fr 1fr 1fr 1fr 1fr 1fr'
    const { generateNode, resState } = useResource()
    const gridTemplateColumns = ref(COMPONENT_PANEL_COLUMNS)
    const panelState = inject('panelState', {})
    const { components } = resState

    const activeName = ref('iconify')
    const tabClick = (tabs) => {

    }

    const fetchComponents = (components, name) => {
      if (!name) {
        return components
      }

      const result = []
      components.forEach((component) => {
        const children = []

        component.children.forEach((child) => {
          if (child.name?.zh_CN?.toLowerCase().indexOf(name.toLowerCase()) > -1) {
            children.push(child)
          }
        })

        if (children.length > 0) {
          result.push({
            groupId: component.groupId,
            group: component.group,
            groupName: component.groupName,
            children: children
          })
        }
      })

      return result
    }

    const state = reactive({
      components,
      activeName: [...Array(components.length).keys()],
      searchValue: ''
    })

    const change = (value) => {
      state.components = fetchComponents(components, value)
    }

    const componentClick = (data) => {
      const { isShortcutPanel, emitEvent } = panelState
      const { addComponent } = useCanvas().canvasApi.value

      if (isShortcutPanel) {
        addComponent(data, isShortcutPanel)
        emitEvent('close')
      }
    }

    onMounted(() => {
      if (panelState.isShortcutPanel) {
        gridTemplateColumns.value = SHORTCUT_PANEL_COLUMNS
      }
    })

    return {
      activeName,
      tabClick,
      gridTemplateColumns,
      state,
      change,
      generateNode,
      componentClick
    }
  }
}
</script>

<style lang="less" scoped>
.components-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;

  .tiny-tabs{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .tiny-tabs__content{
    flex:1;
  }

  .tiny-collapse {
    flex: 1;
    overflow-y: scroll;
    .tiny-collapse-item.is-active + .tiny-collapse-item {
      margin-top: 0;
    }

    .components-items {
      .item {
        cursor: pointer;
      }
    }
  }
}
</style>
