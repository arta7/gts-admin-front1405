import * as am5 from '@amcharts/amcharts5'
import am5themes_Animated from '@amcharts/amcharts5/themes/Animated'
import * as am5xy from '@amcharts/amcharts5/xy'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const LineChart = (props: any) => {
  const { title } = props
  const seriesRef = useRef(null)
  const root1Ref = useRef(null)
  const xAxisRef = useRef(null)
  const yAxisRef = useRef(null)

  const [height, setHeight] = useState('250px')
  useLayoutEffect(() => {
    /* Chart code */
    // Create root1 element
    // https://www.amcharts.com/docs/v5/getting-started/#root1_element
    let root1 = am5.Root.new(title)

    // Set themes
    // https://www.amcharts.com/docs/v5/concepts/themes/
    root1.setThemes([am5themes_Animated.new(root1)])

    root1.setThemes([
  am5themes_Animated.new(root1)
]);

let data = [{ value: 10, category: 'One' },
      { value: 9, category: 'Two' },
      { value: 6, category: 'Three' },
      { value: 5, category: 'Four' },
      { value: 4, category: 'Five' },
      { value: 3, category: 'Six' },
      { value: 1, category: 'Seven' },
    ]

// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root1.container.children.push(
  am5xy.XYChart.new(root1, {
    focusable: true,
    panX: true,
    panY: true,
    wheelX: "panX",
    wheelY: "zoomX"
  })
);

var easing = am5.ease.linear;

// Create axes
// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
let xAxis = chart.xAxes.push(
  am5xy.CategoryAxis.new(root1, {
    categoryField: "category",
    renderer: am5xy.AxisRendererX.new(root1, {})
  })
);

let yAxis = chart.yAxes.push(
  am5xy.ValueAxis.new(root1, {
    renderer: am5xy.AxisRendererY.new(root1, {})
  })
);

// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
var series = chart.series.push(
  am5xy.LineSeries.new(root1, {
    minBulletDistance: 1,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: "value",
    valueXField: "category",
    tooltip: am5.Tooltip.new(root1, {
      pointerOrientation: "horizontal",
      labelText: "{valueY}"
    })
  })
);

series.strokes.template.setAll({
  strokeWidth: 2,
  templateField: "strokeSettings"
});

series.data.setAll(data);

// Add cursor
// https://www.amcharts.com/docs/v5/charts/xy-chart/cursor/
var cursor = chart.set("cursor", am5xy.XYCursor.new(root1, {
  xAxis: xAxis
}));
cursor.lineY.set("visible", false);

// add scrollbar
chart.set("scrollbarX", am5.Scrollbar.new(root1, {
  orientation: "horizontal"
}));

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
series.appear(1000, 100);
chart.appear(1000, 100);
  }, [])

  return (
    <React.Fragment>
      
        <CardContent className="d-flex justify-content-center align-items-center mt-2">
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <div id={title} style={{ width: 'auto', height }}></div>
        </CardContent>
      
    </React.Fragment>
  )
}

export default LineChart
