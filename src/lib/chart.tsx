import { useEffect, useState, useRef } from "react"
import ResizeObserver from "resize-observer-polyfill"

export interface scatterData {
    humidity: number,
    temperature: number
} 
  
export interface temperatureData {
    date: string, 
    temperature: number
}

export interface dimensionsProps {
    width: number,
    height: number,
    marginLeft: number,
    marginRight: number,
    marginTop: number, 
    marginBottom: number,
    boundedHeight: number,
    boundedWidth: number
}

// TODO: Fix type
export const callAccessor = (accessor: any | string, d: any, i: number) => (
  typeof accessor === "function" ? accessor(d, i) : accessor
)

export const combineChartDimensions = (dimensions: Partial<dimensionsProps>) => {
  let parsedDimensions = {
    marginTop: 40,
    marginRight: 30,
    marginBottom: 40,
    marginLeft: 75,
    ...dimensions,
  }

    if (parsedDimensions.height && parsedDimensions.width) {
        return {
        ...parsedDimensions,
        boundedHeight: parsedDimensions.height - parsedDimensions.marginTop - parsedDimensions.marginBottom,
        boundedWidth: parsedDimensions.width - parsedDimensions.marginLeft - parsedDimensions.marginRight,
        }
    }

    else return {
        ...parsedDimensions, 
        boundedHeight: 0,
        boundedWidth: 0
    }
}

export const useChartDimensions = (chartSettings: Partial<dimensionsProps> = {}) => {
  const ref = useRef()
  const dimensions = combineChartDimensions(chartSettings)

  const [width, changeWidth] = useState(0)
  const [height, changeHeight] = useState(0)

    // TODO: Properly type useEffect
   // @ts-ignore
  useEffect(() => {
    if (dimensions.width && dimensions.height) return [ref, dimensions]

    const element = ref.current
    const resizeObserver = new ResizeObserver(entries => {
      if (!Array.isArray(entries)) return
      if (!entries.length) return

      const entry = entries[0]

      if (width !== entry.contentRect.width) changeWidth(entry.contentRect.width)
      if (height !== entry.contentRect.height) changeHeight(entry.contentRect.height)
    })
    // @ts-ignore
    resizeObserver.observe(element)
    // @ts-ignore
    return () => resizeObserver.unobserve(element)
  }, [chartSettings, height, width, dimensions])

  const newSettings = combineChartDimensions({
    ...dimensions,
    width: dimensions.width || width,
    height: dimensions.height || height,
  })

  return [ref, newSettings]
}

let lastId = 0
export const useUniqueId = (prefix="") => {
  lastId++
  return [prefix, lastId].join("-")
}
