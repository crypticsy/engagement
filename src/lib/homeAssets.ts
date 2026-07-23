// Every raster image rendered inside <Home> — kept in one place so the intro
// screen can preload them all before handing off, instead of each section
// popping its own art in mid-scroll on a slow connection (GitHub Pages has
// no HTTP/2 push, so this matters more there than on `bun run dev`).
import sky from '@/assets/sky.png'
import cloud1 from '@/assets/cloud_1.png'
import cloud2 from '@/assets/cloud_2.png'
import cloud3 from '@/assets/cloud_3.png'
import templeWithTree from '@/assets/temple-with-tree.png'
import pond from '@/assets/pond.png'
import lanternAndLotus from '@/assets/lantern and lotus.png'
import mandap from '@/assets/mandap.png'
import together from '@/assets/together.png'
import balcony from '@/assets/balcony.png'
import peacockAndLanterns from '@/assets/peacock and lanterns.png'
import coupleInBalcony from '@/assets/couple in balcony.png'

export const homeImageAssets = [
  sky,
  cloud1,
  cloud2,
  cloud3,
  templeWithTree,
  pond,
  lanternAndLotus,
  mandap,
  together,
  balcony,
  peacockAndLanterns,
  coupleInBalcony,
]
