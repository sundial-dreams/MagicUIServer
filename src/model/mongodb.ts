export interface IWebGLPage {
  createTime: number;
  own: string;
  page?: IWebGLComponent | null
}

export interface IWebGLComponent {
  type: string,
  name: string,
  props: {
    position: {x:number, y: number},
    size: {
      width: number,
      height: number
    },
    background?: {
      fill: string,
      opacity: number
    },
    border?: {
      width: number,
      radius: number,
      fill: string
    },
    shadow?: {
      offsetX: number,
      offsetY: number,
      blur: number,
      fill: string
    },
    text?: {
      text: string,
      fill: string
    },
    image?: {
      image: string
    }
  },
  children: IWebGLComponent[],
}