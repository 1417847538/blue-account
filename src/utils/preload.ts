// 图片预加载
import { avatarList } from '../views/user/avatarList'

import bg1 from '@/assets/img/bg1.jpg'
import bg2 from '@/assets/img/bg2.jpeg'
import bg3 from '@/assets/img/bg3.jpg'

export function preLoad() {
  const bgImage2 = new Image()
  bgImage2.src = bg2

  const bgImage1 = new Image()
  bgImage1.src = bg1

  const bgImage3 = new Image()
  bgImage3.src = bg3

  avatarList.dog.forEach((item) => {
    let img = new Image()
    img.src = item.url
  })

  avatarList.cat.forEach((item) => {
    let img = new Image()
    img.src = item.url
  })
}
