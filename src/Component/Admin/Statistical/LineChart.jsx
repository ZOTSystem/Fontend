import React, { useEffect, useRef, useState } from 'react';
import insertCss from 'insert-css';
import { Line } from '@antv/g2plot';
import * as _ from '@antv/util';

const LineChart = ({data}) => {
    const chartNodeRef = useRef();
    const chartRef = useRef();
    const [tooltipItems, setTooltipItems] = useState([]);
    const [activeTooltipTitle, setActiveTooltipTitle] = useState(null);
    const [activeSeriesList, setActiveSeriesList] = useState([]);
  
    useEffect(() => {
      const chartDom = chartNodeRef.current;
  
      fetch('https://gw.alipayobjects.com/os/antfincdn/3PtP0m%26VuK/trend-data.json')
        .then((res) => res.json())
        .then((data) => {
          window.data = data;
          if (chartRef.current) {
            chartRef.current.clear();
          }
          const line = new Line(chartDom, {
            data,
            autoFit: true,
            xField: 'Date',
            yField: 'value',
            seriesField: 'series',
            xAxis: {
              type: 'cat',
              label: {
                autoRotate: false,
                formatter: (v) => {
                  return v.split('/').reverse().join('-');
                },
              },
            },
            yAxis: {
              grid: {
                line: {
                  style: {
                    lineWidth: 0.5,
                  },
                },
              },
            },
            meta: {
              Date: {
                range: [0.04, 0.96],
              },
            },
            point: {
              shape: 'circle',
              size: 2,
              style: () => {
                return {
                  fillOpacity: 0,
                  stroke: 'transparent',
                };
              },
            },
            appendPadding: [0, 0, 0, 0],
            legend: false,
            smooth: true,
            lineStyle: {
              lineWidth: 1.5,
            },
            tooltip: {
              showMarkers: false,
              follow: false,
              position: 'top',
              customContent: () => null,
            },
            theme: {
              geometries: {
                point: {
                  circle: {
                    active: {
                      style: {
                        r: 4,
                        fillOpacity: 1,
                        stroke: '#000',
                        lineWidth: 1,
                      },
                    },
                  },
                },
              },
            },
            interactions: [{ type: 'marker-active' }, { type: 'brush' }],
          });
  
          line.render();
          chartRef.current = line;
  
          const lastData = _.last(data);
          const point = line.chart.getXY(lastData);
          line.chart.showTooltip(point);
          const activeTooltipTitle = lastData.Date;
          setTooltipItems(data.filter((d) => d.Date === activeTooltipTitle));
          setActiveTooltipTitle(activeTooltipTitle);
  
          line.on('plot:mouseleave', () => {
            line.chart.hideTooltip();
          });
  
          line.on('tooltip:change', (evt) => {
            const { title } = evt.data;
            const tooltipItems = data.filter((d) => d.Date === title);
            setTooltipItems(tooltipItems);
            setActiveTooltipTitle(title);
          });
        });
    }, []);
  
    const changeActiveSeries = (activeSeries) => {
      let newList = [];
      if (!activeSeriesList.includes(activeSeries)) {
        newList = [...activeSeriesList, activeSeries];
      } else {
        newList = activeSeriesList.filter((s) => s !== activeSeries);
      }
      setActiveSeriesList(newList, () => {
        const chart = chartRef.current?.chart;
        if (chart && activeSeries) {
          chart.filter('series', (series) => !newList.includes(series));
          chart.render(true);
          chart.geometries
            .find((geom) => geom.type === 'point')
            .elements.forEach((ele) => {
              const { Date, series } = ele.getModel().data;
              if (Date === activeTooltipTitle && series === activeSeries) {
                ele.setState('active', true);
              }
            });
        }
      });
    };
  
    const generateTooltip = () => {
      const chart = chartRef.current?.chart;
      if (!chart) {
        return null;
      }
      const { colors10 } = chart.themeObject;
  
      return (
        <div className="g2-tooltip">
          <div className="g2-tooltip-title">{activeTooltipTitle}</div>
          <div className="g2-tooltip-items">
            {tooltipItems.map((item, idx) => {
              const changeActiveSeries = () => changeActiveSeries(item.series);
              const inactiveClass = activeSeriesList.includes(item.series) ? 'inactive' : '';
              return (
                <div
                  key={item.series}
                  className={`g2-tooltip-item tooltip-${item.series} ${inactiveClass}`}
                  onClick={changeActiveSeries}
                >
                  <div className="g2-tooltip-item-marker" style={{ background: colors10[idx] }}></div>
                  <div className="g2-tooltip-item-label">{item.series}</div>
                  <div className="g2-tooltip-item-value">{item.value || '-'}</div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };
  
    useEffect(() => {
      // Insert CSS
      const css = `
        .trend-wrapper .g2-tooltip {
          position: absolute;
          z-index: 8;
          transition: left 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s, top 0.4s cubic-bezier(0.23, 1, 0.32, 1) 0s;
          background-color: transparent;
          color: rgb(89, 89, 89);
          padding: 0px 12px;
          margin: 0px;
          overflow-x: auto;
          width: 100%;
          left: 0px;
          top: 0px;
          pointer-events: auto;
        }
        .trend-wrapper .g2-tooltip-title {
          margin: 10px 0;
          font-weight: 700;
          height: 12px;
          line-height: 12px;
        }
        .trend-wrapper .g2-tooltip-items {
          display: flex;
          flex-direction: row;
          align-items: center;
          overflow: auto;
          width: 100%;
        }
        .trend-wrapper .g2-tooltip-item {
          opacity: 1;
          cursor: pointer;
          position: relative;
          display: flex;
          flex-direction: column;
          width: 92px;
          min-width: 92px;
          padding-left: 12px;
          justify-content: space-between;
        }
        .trend-wrapper .g2-tooltip-item.inactive {
          opacity: 0.25;
        }
        .trend-wrapper .g2-tooltip-item-marker {
          width: 3px;
          position: absolute;
          top: 0px;
          right: 0px;
          bottom: 0px;
          height: 48px;
          left: 0px;
        }
        .trend-wrapper .g2-tooltip-item-label {
          font-size: 14px;
          line-height: 14px;
          margin: 2px 0px 12px;
        }
        .trend-wrapper .g2-tooltip-item-value {
          font-weight: 700;
          font-size: 18px;
          line-height: 18px;
          color: rgba(0, 0, 0, 0.65);
          margin: 0px 0px 4px;
        }
        #container {
          width: 100%;
          height: 100%;
        }
        .wrapper {
          position: relative;
          width: 100%;
          height: 100%;
        }
        .wrapper .chart-wrapper {
          position: absolute !important;
          top: 94px;
          bottom: 0px;
          right: 10px;
          left: 10px;
          height: calc(100% - 88px);
        }
      `;
      insertCss(css);
  
      return () => {
        insertCss.remove(css);
      };
    }, []);
  
    return (
      <section className="wrapper trend-wrapper">
        {generateTooltip()}
        <div className="chart-wrapper" ref={chartNodeRef} />
      </section>
    );
  };
export default LineChart;
