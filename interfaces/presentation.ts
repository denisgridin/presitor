export interface IPresentation {
  presentationId: string,
  editorIds: string[],
  name: string,
  fillColor: string,
  fontFamily: string,
  description: string,
  lastUpdated: Date
}

export interface ILayout {
  x: number,
  y: number,
  width: number,
  height: number,
  rotation: number
}

export interface IElement {
  presentationId: string,
  slideId: string,
  elementId: string,
  name: string,
  layout: ILayout
}

export interface ISlide {
  presentationId: string,
  slideId: string,
  name: string,
  index: number,
  elements: IElement[]
}
