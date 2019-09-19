# Drawer 抽屉

有些时候, `Dialog` 组件并不满足我们的需求, 比如你的表单很长, 亦或是你需要临时展示一些文档, `Drawer` 拥有和 `Dialog` 几乎相同的 API, 在 UI 上带来不一样的体验.

### 基本用法

呼出一个临时的侧边栏, 可以从多个方向呼出

:::demo
```html
<by-radio-group v-model="direction">
  <by-radio label="ltr">从左往右开</by-radio>
  <by-radio label="rtl">从右往左开</by-radio>
  <by-radio label="ttb">从上往下开</by-radio>
  <by-radio label="btt">从下往上开</by-radio>
</by-radio-group>

<by-button @click="drawer = true" type="primary" style="margin-left: 16px;">
  点我打开
</by-button>

<by-drawer
  title="我是标题"
  :visible.sync="drawer"
  :direction="direction"
  :before-close="handleClose"
  @close="close"></by-drawer>


<script>
  export default {
    data() {
      return {
        drawer: false,
        direction: 'rtl',
      };
    },
    methods: {
      handleClose(done) {
        done();
      },
      close(){
          console.log('close);
      }
    }
  };
</script>
```
:::


<script lang="ts">
    import { Vue, Component } from "vue-property-decorator";

    @Component
    export default class drawerMd extends Vue {

        drawer = false;

        direction = 'rtl';

        handleClose(done) {
            // this.$confirm('确认关闭？').then(_ => {
            //     done();
            // }).catch(_ => {});
            done();
        }

        close(){
            console.log('close');
        }
    }

</script>
