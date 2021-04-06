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
  rotation: number,
  [ key: string ]: any
}

export interface IElement {
  presentationId: string,
  slideId: string,
  elementId: string,
  name: string,
  layout: ILayout,
  color: string
}

export interface IContent extends IElement{
  text: string,
  fontFamily: string,
  fontSize: number,
  letterSpacing: 'normal' | number,
  lineHeight: 'normal' | number,
  fontCase: 'normal' | 'uppercase' | 'lowercase'
}

export interface ISlide {
  presentationId: string,
  slideId: string,
  name: string,
  index: number,
  elements: (IContent)[]
}
