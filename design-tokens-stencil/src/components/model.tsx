export interface Model {
    colors: Colors
}

interface Colors {
  disabled: boolean
  items: ColorItem[]
}

interface ColorItem {
  caption: string
  value: string
}
