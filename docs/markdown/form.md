# From 表单

:::demo
```html
<by-form>
    <by-form-item label="活动名称">
        <by-input v-model="form.name"></by-input>
    </by-form-item>
</by-form>
```
:::

<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class ByFormMd extends Vue {
        form = {
            name: ''
        }
    }
</script>
