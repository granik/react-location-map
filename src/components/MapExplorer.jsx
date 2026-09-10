import { useState } from "react";
import { Map, List } from "@components/content-elements";

const MapExplorer = ({
  centerOnSelected = false,
  defaultCenter = [50.0, 8.0],
  defaultSelectedId = null,
  defaultZoom = 4,
  doAlwaysCenterReset = false,
  getMarkerCoords,
  getMarkerId,
  listLabel = null,
  mapHeight = 400,
  mapOnly = false,
  markers,
  markerWidth = 40,
  onItemClick,
  onItemHover,
  renderListItem,
  renderMarkerPopup,
  title,
  wrapperExtraCssClass,
}) => {
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [selectedItemId, setSelectedItemId] = useState(defaultSelectedId);

  const handleHover = (event, itemId) => {
    setHoveredItemId(itemId);
    /* eslint-disable-next-line no-unused-expressions */
    onItemHover && onItemHover(event);
  };

  const handleClick = (event, itemId) => {
    setSelectedItemId(itemId !== selectedItemId ? itemId : null);
    setHoveredItemId(itemId !== selectedItemId ? itemId : null);
    /* eslint-disable-next-line no-unused-expressions */
    onItemClick && onItemClick(event);
  };

  return (
    <div
      className={["event-explorer", wrapperExtraCssClass]
        .filter((el) => !!el)
        .join(" ")}
    >
      <Map
        centerOnSelected={centerOnSelected}
        defaultCenter={defaultCenter}
        defaultZoom={defaultZoom}
        doAlwaysCenterReset={doAlwaysCenterReset}
        expandedMarkerId={selectedItemId}
        getMarkerCoords={(m) => (m !== null ? getMarkerCoords(m) : null)}
        getMarkerId={getMarkerId}
        height={mapHeight}
        highlightedMarkerId={hoveredItemId}
        markers={markers}
        markerWidth={markerWidth}
        onMarkerClick={handleClick}
        onMarkerHover={handleHover}
        renderMarkerPopup={renderMarkerPopup}
        title={title}
      />
      {mapOnly || (
        <List
          getMarkerId={getMarkerId}
          highlightedItemId={selectedItemId}
          items={markers}
          onItemClick={handleClick}
          onItemHover={handleHover}
          renderListItem={renderListItem}
          title={listLabel}
        />
      )}
    </div>
  );
};

export default MapExplorer;
