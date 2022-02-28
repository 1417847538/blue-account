import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'lib-flexible'

import {
  Loading,
  Button,
  CellGroup,
  Field,
  Form,
  Tab,
  Tabbar,
  TabbarItem,
  Tabs,
  Toast,
  Icon,
  Popup,
  DatetimePicker,
  Divider,
  List,
  PullRefresh,
  SwipeCell,
  Tag,
  Cell,
  NumberKeyboard,
  NavBar,
  Dialog,
  Empty,
  Progress,
  Image,
  ActionSheet,
  Lazyload,
} from 'vant'

const app = createApp(App)
app.use(router)

app.use(CellGroup)
app.use(Toast)
app.use(Tabbar).use(TabbarItem)
app.use(Tabs).use(Tab)
app.use(Form).use(Field)
app.use(Button)
app.use(Icon)
app.use(Loading)
app.use(Popup).use(DatetimePicker)
app.use(Divider)
app.use(PullRefresh).use(List)
app.use(SwipeCell).use(Cell).use(Tag)
app.use(Field)
app.use(NumberKeyboard)
app.use(NavBar)
app.use(Dialog)
app.use(Empty)
app.use(Progress)
app.use(Image)
app.use(ActionSheet)
app.use(Lazyload)

app.mount('#app')
