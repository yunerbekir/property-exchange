export class TravelTimeComparePeriodsChartDataModel {
    constructor({
                    chartId = null,
                    data = {},
                }) {
        this.chartId = chartId;
        this.data = { ...data };
    }

    static fromJson(json) {
        const instance = new TravelTimeComparePeriodsChartDataModel({});

        instance.chartId = json.chartId;
        instance.data = json.data;

        return instance;
    }
}
