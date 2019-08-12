import { Vue, Component, Prop, Model } from 'vue-property-decorator';

/** Mixin：双向绑定 */
@Component
export default class TwoWay extends Vue {
    @Prop()
    @Model('valueChanged')
    bindValue!: any;

    /** 双向绑定数据 */
    get currentValue() {
        return this.bindValue;
    }

    set currentValue(value) {
        this.$emit('valueChanged', value);
    }
}
