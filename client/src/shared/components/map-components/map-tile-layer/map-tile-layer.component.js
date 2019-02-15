import React from 'react';
import PropTypes from 'prop-types';
import { ImageOverlay, TileLayer } from 'react-leaflet';
import { AppLayoutModel } from '../../../models/AppLayoutModel';

export class MapTileLayerComponent extends React.Component {
    state = { showMapImage: false };

    onMapTileLoadError = (e) => {
        if (!this.state.showMapImage) {
            this.setState({ showMapImage: true });
        }
    };

    render() {
        if (this.state.showMapImage && this.props.appLayout.mapSettings.mapImage) {
            return <ImageOverlay url={this.props.appLayout.mapSettings.mapImage}
                                 bounds={this.props.appLayout.mapSettings.imageBounds}/>;
        }

        return <TileLayer
            onTileError={this.onMapTileLoadError}
            url={this.props.appLayout.getSelectedTile().value}/>;
    }
}

MapTileLayerComponent.propTypes = {
    appLayout: PropTypes.instanceOf(AppLayoutModel).isRequired,
};
