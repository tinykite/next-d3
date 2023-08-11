import React, { createContext, useContext } from "react"
import type { ReactNode } from "react"
import type { dimensionsProps } from "@/lib/chart"

const dimensionDefaults = {
    width: 0,
    height: 0,
    marginLeft: 0,
    marginRight: 0,
    marginTop: 0,
    marginBottom: 0,
    boundedHeight: 0,
    boundedWidth: 0
}

const ChartContext = createContext(dimensionDefaults)

export const useDimensionsContext = () => useContext(ChartContext)

const Chart = ({ dimensions = dimensionDefaults, children }: {children: ReactNode, dimensions: dimensionsProps }) => (
  <ChartContext.Provider value={dimensions}>
    <svg className="Chart" width={dimensions.width} height={dimensions.height}>
      <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}>
        { children }
      </g>
    </svg>
  </ChartContext.Provider>
)

export default Chart