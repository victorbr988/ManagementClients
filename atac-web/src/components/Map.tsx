"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { getClients } from "@/requests/getClients";
import { useMutation, useQuery } from "@tanstack/react-query";
import leaflet from "leaflet";
import { Fragment, useState } from "react";
import { Client } from "@/interfaces/client";
import { getRoutes } from "@/requests/getRoutes";
import { RoutingMachine } from "./RoutingMachine";

export default function Map() {
  const start: Record<string, number> = { latitude: -8.277550724908538, longitude: -35.97184501776442 }; // Ponto de partida

  const { data: clients = [] } = useQuery({	
    queryKey: ["get-clientes"],
    queryFn: getClients,
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const { data: routes = [] } = useQuery({
    queryKey: ["route-map", "get-clientes"],
    queryFn: getRoutes,
  });

  return (
    <Fragment>
      <MapContainer
        center={[start.latitude, start.longitude]}
        zoom={14}
        style={{ height: "98vh" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Fragment>
          {
            clients && clients.map((client: Client) => (
              <Marker position={[client.latitude, client.longitude]} icon={new leaflet.Icon({ iconUrl: "/marker-icon.png" })} key={client.id}>
                <Popup>{client.name}</Popup>
              </Marker>
            ))
          }
          <RoutingMachine
            waypoints={routes}
          />
        </Fragment>
      </MapContainer>
    </Fragment>
  );
}
