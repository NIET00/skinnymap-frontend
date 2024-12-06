import mapboxgl from 'mapbox-gl';
import { createRoot } from 'react-dom/client';
import { MapPinPlusInside } from 'lucide-react';

class AddMarkerControl implements mapboxgl.IControl {
  private map: mapboxgl.Map | undefined;
  private container: HTMLElement | undefined;

  constructor() {
    this.map = undefined;
    this.container = undefined;
  }

  onAdd(map: mapboxgl.Map): HTMLElement {
    this.map = map;

    this.container = document.createElement('div');
    this.container.className = 'mapboxgl-ctrl mapboxgl-ctrl-group';

    const button = document.createElement('button');
    button.type = 'button';
    button.title = 'Add a waypoint';

    const iconContainer = document.createElement('div');
    iconContainer.style.display = 'flex';
    iconContainer.style.alignItems = 'center';
    iconContainer.style.justifyContent = 'center';
    const root = createRoot(iconContainer);
    root.render(<MapPinPlusInside color="#333333" />);
    button.appendChild(iconContainer);

    // TODO: Add marker by clicking again.
    button.onclick = () => {
      if (this.map) {
        const center = this.map.getCenter();
        const marker = new mapboxgl.Marker().setLngLat([center.lng, center.lat]).addTo(this.map);
        console.log(marker._lngLat);
      }
    };

    this.container.appendChild(button);
    return this.container;
  }

  onRemove(): void {
    if (this.container && this.container.parentNode) {
      this.container.parentNode.removeChild(this.container);
    }
    this.container = undefined;
    this.map = undefined;
  }
}

export default AddMarkerControl;
