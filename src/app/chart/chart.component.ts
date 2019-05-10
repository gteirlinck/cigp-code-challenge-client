import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { ServerAPIService, DailyTimeSeriesPoint } from '../server-api.service';
import { AmChart, AmChartsService } from '@amcharts/amcharts3-angular';

@Component({
  selector: 'app-chart',
  template:
    '<div id="chartdiv" [style.width.%]="100" [style.height.px]="500"></div>'
})
export class ChartComponent implements OnInit, OnDestroy {
  private chart: AmChart;

  private _symbol: string;

  @Input()
  set symbol(value: string) {
    this._symbol = value;

    if (this.chart) {
      this.service.getTimeSeries(this._symbol).subscribe(data => {
        this.AmCharts.updateChart(this.chart, () => {
          this.chart.dataSets[0].title = this._symbol;
          this.chart.dataSets[0].dataProvider = data;
        });
      });
    }
  }

  constructor(
    private service: ServerAPIService,
    private AmCharts: AmChartsService
  ) {}

  computeCharData(data: DailyTimeSeriesPoint[]) {
    return {
      type: 'stock',
      theme: 'none',
      dataSets: [
        {
          title: this._symbol,
          fieldMappings: [
            {
              fromField: 'open',
              toField: 'open'
            },
            {
              fromField: 'high',
              toField: 'high'
            },
            {
              fromField: 'low',
              toField: 'low'
            },
            {
              fromField: 'close',
              toField: 'close'
            },
            {
              fromField: 'volume',
              toField: 'volume'
            }
          ],
          compared: false,
          categoryField: 'timestamp',
          dataProvider: data
        }
      ],
      panels: [
        {
          title: 'Value',
          percentHeight: 70,

          stockGraphs: [
            {
              type: 'candlestick',
              id: 'g1',
              openField: 'open',
              closeField: 'close',
              highField: 'high',
              lowField: 'low',
              valueField: 'close',
              lineColor: '#fff',
              fillColors: '#fff',
              negativeLineColor: '#db4c3c',
              negativeFillColors: '#db4c3c',
              fillAlphas: 1,
              comparedGraphLineThickness: 2,
              columnWidth: 0.7,
              useDataSetColors: false,
              comparable: true,
              compareField: 'close',
              showBalloon: false,
              proCandlesticks: true
            }
          ],

          stockLegend: {
            valueTextRegular: undefined,
            periodValueTextComparing: '[[percents.value.close]]%'
          }
        },
        {
          title: 'Volume',
          percentHeight: 30,
          marginTop: 1,
          columnWidth: 0.6,
          showCategoryAxis: false,
          stockGraphs: [
            {
              title: 'Volume',
              valueField: 'volume',
              type: 'column',
              fillAlphas: 1,
              lineColor: '#fff',
              fillColors: '#fff',
              negativeLineColor: '#db4c3c',
              negativeFillColors: '#db4c3c',
              useDataSetColors: false
            }
          ]
        }
      ],
      panelsSettings: {
        plotAreaFillColors: '#333',
        plotAreaFillAlphas: 1,
        marginLeft: 60,
        marginTop: 5,
        marginBottom: 5
      },

      chartScrollbarSettings: {
        graph: 'g1',
        graphType: 'line',
        usePeriod: 'DD',
        backgroundColor: '#333',
        graphFillColor: '#666',
        graphFillAlpha: 0.5,
        gridColor: '#555',
        gridAlpha: 1,
        selectedBackgroundColor: '#444',
        selectedGraphFillAlpha: 1
      },

      categoryAxesSettings: {
        equalSpacing: true,
        gridColor: '#555',
        gridAlpha: 1,
        minPeriod: 'mm'
      },

      valueAxesSettings: {
        gridColor: '#555',
        gridAlpha: 1,
        inside: false,
        showLastLabel: true
      },

      chartCursorSettings: {
        pan: true,
        valueLineEnabled: true,
        valueLineBalloonEnabled: true
      },
      balloon: {
        textAlign: 'left',
        offsetY: 10
      },

      periodSelector: {
        position: 'bottom',
        periods: [
          {
            period: 'mm',
            count: 30,
            label: '30m'
          },
          {
            period: 'hh',
            count: 2,
            label: '2H',
            selected: true
          },
          {
            period: 'DD',
            count: 10,
            label: '10D'
          },
          {
            period: 'MM',
            count: 1,
            label: '1M'
          },
          {
            period: 'MM',
            count: 6,
            label: '6M'
          },
          {
            period: 'MAX',
            label: 'MAX'
          }
        ]
      },
      pathToImages: 'src/assets/'
    };
  }

  ngOnInit() {
    this.service.getTimeSeries(this._symbol).subscribe(data => {
      this.chart = this.AmCharts.makeChart(
        'chartdiv',
        this.computeCharData(data)
      );
    });
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.AmCharts.destroyChart(this.chart);
    }
  }
}
