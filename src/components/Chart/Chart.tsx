import React, { createContext, useContext } from "react"
import type { ReactNode } from "react"

const ChartContext = createContext({})
export const useDimensionsContext = () => useContext(ChartContext)

const Chart = ({ dimensions = {}, children }: { dimensions: {}, children: ReactNode}) => (
  <ChartContext.Provider value={dimensions}>
    <svg className="Chart" width={dimensions.width} height={dimensions.height}>
      <g transform={`translate(${dimensions.marginLeft}, ${dimensions.marginTop})`}>
        { children }
      </g>
    </svg>
  </ChartContext.Provider>
)

export default Chart