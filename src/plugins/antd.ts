import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css'
import { Button } from 'ant-design-vue';;
import type { App } from 'vue';

export function setupAntd(app: App<Element>) {
  app.use(Antd);
  app.component('AButton', Button)
}