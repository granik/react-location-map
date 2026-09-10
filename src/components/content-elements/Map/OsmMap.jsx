import { Map, Marker, Overlay as MarkerPopup } from "pigeon-maps";
import * as providers from "pigeon-maps/providers";

import "./osm-map.scss";

const OsmMap = ({
  defaultCenter,
  defaultZoom = 3,
  expandedMarkerId,
  getMarkerCoords,
  getMarkerId,
  height = 400,
  highlightColor = "#ff0000",
  highlightedMarkerId,
  mapsProvider = "osm",
  markers,
  markerWidth = 40,
  metaWheelZoom = true,
  onMarkerClick,
  onMarkerHover,
  popupOffset = [0, 35],
  renderMarkerPopup,
  title,
  twoFingerDrag = true,
}) => {
  const provider = providers[mapsProvider] ?? providers.osm;
  const expandedMarker = markers.find(
    (marker) => getMarkerId(marker) === expandedMarkerId,
  );

  return (
    <div className="map" aria-labelledby="map-heading">
      <figure>
        <Map
          provider={provider}
          height={height}
          defaultCenter={defaultCenter}
          defaultZoom={defaultZoom}
          onClick={(e) => onMarkerClick(e, null)}
          metaWheelZoom={metaWheelZoom}
          twoFingerDrag={twoFingerDrag}
        >
          {markers &&
            markers.map((marker) => (
              <Marker
                key={getMarkerId(marker)}
                color={
                  highlightedMarkerId === getMarkerId(marker) && highlightColor
                }
                width={markerWidth}
                anchor={getMarkerCoords(marker)}
                payload={getMarkerId(marker)}
                onMouseOver={(e) => onMarkerHover(e, getMarkerId(marker))}
                onClick={(e) => onMarkerClick(e, getMarkerId(marker))}
              />
            ))}

          {expandedMarker && (
            <MarkerPopup
              anchor={getMarkerCoords(expandedMarker)}
              offset={popupOffset}
            >
              <div className="popupContent">
                {renderMarkerPopup(expandedMarker)}
              </div>
            </MarkerPopup>
          )}
        </Map>
        <figcaption>{title}</figcaption>
      </figure>
    </div>
  );
};

export default OsmMap;
