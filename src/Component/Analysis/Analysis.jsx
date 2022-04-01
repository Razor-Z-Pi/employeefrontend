import React, {useContext} from "react";
import AnalysNav from "../Navigate/AnalysNav/AnalysNav";
import {Card, CardContent, Paper} from "@mui/material";
import {
  Chart,
  ArgumentAxis,
  ValueAxis,
  BarSeries,
  LineSeries,
  Legend,
  Title,
} from '@devexpress/dx-react-chart-material-ui';
import {ValueScale} from '@devexpress/dx-react-chart';
import { Animation } from '@devexpress/dx-react-chart';
import {ItemContext} from "../Context/ContextAppProvider";
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/lab";
import PrintIcon from "@mui/icons-material/Print";

const Analysis = () => {
  //первый график

  const context = useContext(ItemContext);
  const data = [
    {month: 'Январь', sale: 0, total: 0},
    {month: 'Февраль', sale: 3, total: 3},
    {month: 'Март', sale: 9, total: 5},
    {month: 'Апрель', sale: 0, total:0},
    {month: 'Май', sale: 0, total: 0},
    {month: 'Июнь', sale: 0, total: 0},
  ]
  // второй график

  const data2 = [
    { argument: 1, value: 1 },
    { argument: 2, value: 0 },
    { argument: 3, value: 2 },
    { argument: 4, value: 1 },
    { argument: 5, value: 0 },
    { argument: 6, value: 1 },
  ];

  // третий график
  const data3 = [
    { position: 'Программист', item: 6 },
    { position: 'Тестеровщик', item: 2 },
    { position: 'Дизайнер', item: 3 },
  ];

  const actions = [
    {
      icon: <PrintIcon values="Print" onClick={window.print}/>, name: 'PDF'
    },
  ];

  return (
    <div>
      <AnalysNav/>
      <div style={{display: "flex", flexWrap: "wrap", width: "100%"}}>
        <Card sx={{ width: 950, minWidth: 275, maxWidth: 1000, margin: "10px"}}>
          <CardContent>
            <Paper>
              <Chart
                data={data}
              >
                <ValueScale name="sale"/>
                <ValueScale name="total"/>

                <ArgumentAxis/>
                <ValueAxis scaleName="sale" showGrid={false} showLine showTicks/>
                <ValueAxis scaleName="total" position="right" showGrid={false} showLine showTicks/>

                <BarSeries
                  name="Найми сотрудников"
                  valueField="sale"
                  argumentField="month"
                  scaleName="sale"
                />

                <LineSeries
                  name="Выполнено проектов"
                  valueField="total"
                  argumentField="month"
                  scaleName="total"
                />
                <Legend/>
              </Chart>
            </Paper>
          </CardContent>
        </Card>
        <Card sx={{ width: 900, minWidth: 275, maxWidth: 1000, margin: "10px"}}>
          <CardContent>
            <Paper>
              <Chart
                data={data2}
              >
                <ArgumentAxis />
                <ValueAxis />
                <Title text="Проекты нагрузка" />
                <LineSeries valueField="value" argumentField="argument" />
              </Chart>
            </Paper>
          </CardContent>
        </Card>
          <Card sx={{ width: 1000, minWidth: 275, maxWidth: 1000, margin: "10px"}}>
          <CardContent>
            <Paper>
              <Chart
                data={data3}
                rotated
              >
                <ArgumentAxis />
                <ValueAxis max={7} />

                <BarSeries
                  valueField="item"
                  argumentField="position"
                />
                <Title text="Сотрудники" />
                <Animation />
              </Chart>
            </Paper>
          </CardContent>
        </Card>
      </div>
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
          />
        ))}
      </SpeedDial>
    </div>
  )
}

export default Analysis;