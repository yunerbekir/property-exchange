const tileTypes = [
    {
        name: 'Gray',
        value: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png'
    },
    {
        name: 'Normal',
        value: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    {
        name: 'Dark',
        value: 'https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
    },
];

const themes = [
    'Day Theme',
    'Day Night',
];

export class AppLayoutModel {
    constructor({
                    originTableColumnWidth = 200, tableColumnWidth = 200, selectedThemeIdx = 0, deploymentInfo = '', mapSettings = {
            imageBounds: [[0, 0], [10, 10]],
            mapImage: '',
            mapImageName: '',
            lat: 0,
            lng: 0,
            zoom: 1,
            selectedTileIdx: 0,
        }
                }) {
        this.originTableColumnWidth = originTableColumnWidth;
        this.tableColumnWidth = tableColumnWidth;
        this.selectedThemeIdx = selectedThemeIdx;
        this.deploymentInfo = deploymentInfo;
        this.mapSettings = mapSettings;
    }

    static clone(props) {
        return new AppLayoutModel({ ...props });
    }

    static fromJson({ global }) {
        const appLayoutInstance = new AppLayoutModel({});

        appLayoutInstance.originTableColumnWidth = global.originTableColumnWidth || 200;
        appLayoutInstance.tableColumnWidth = global.tableColumnWidth || 200;
        appLayoutInstance.selectedThemeIdx = global.selectedThemeIdx || 0;
        appLayoutInstance.deploymentInfo = global.deploymentInfo || '';
        appLayoutInstance.mapSettings = global.mapSettings || {
            imageBounds: [[0, 0], [10, 10]],
            mapImage: '',
            mapImageName: '',
            lat: 0,
            lng: 0,
            zoom: 1,
            selectedTileIdx: 0,
        };

        return appLayoutInstance;
    }

    getSelectedTheme = () => {
        return themes[this.selectedThemeIdx];
    };

    getThemes = () => {
        return themes;
    };


    getSelectedTile = () => {
        return tileTypes[this.mapSettings.selectedTileIdx];
    };

    getTiles = () => {
        return tileTypes;
    };
}
