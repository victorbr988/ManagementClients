// RoutingMachine.js
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

interface IRoutingMachineProps {
  waypoints: L.LatLng[];
}

export function RoutingMachine({ waypoints }: IRoutingMachineProps) {
  const map: any = useMap();

  useEffect(() => {
    if (!map) return;
    L.Routing.control({
      waypoints,
      // @ts-ignore
      lineOptions:{
        styles: [{ color: 'blue', weight: 4 }],
        missingRouteStyles: [{ color: 'red', weight: 4 }],
      },
      collapsible: true,
      show: false,
      addWaypoints: false, // Impede de adicionar waypoints arrastando
      // @ts-ignore
      draggableWaypoints: false, // Impede de arrastar os waypoints existentes
      showAlternatives: false,
    }).addTo(map);
  }, [map, waypoints]);

  return null;
}
