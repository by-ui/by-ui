const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
export function camelCase(name: string) {
    return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
        return offset ? letter.toUpperCase() : letter
    }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}
export function getStyle (element:any, styleName:string) {
    if (!element || !styleName) return null
  
    styleName = camelCase(styleName)
    if (styleName === 'float') {
      styleName = 'cssFloat'
    }
  
    try {
      const computed = (document as any).defaultView.getComputedStyle(element, '')
      return element.style[styleName] || computed ? computed[styleName] : null
    } catch (e) {
      return element.style[styleName]
    }
  }