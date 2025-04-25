"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useGlobalStore, ClientInfo } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/packages/design-system/components/ui/select";
import { Input } from "@/packages/design-system/components/ui/input";
import { Users, Loader2, RefreshCw } from "lucide-react";
import { Badge } from "@/packages/design-system/components/ui/badge";

const PAGE_SIZE = 20;

export function ClientSelector() {
  const {
    clients,
    selectedClient,
    setSelectedClient,
    loadClients,
    isLoadingClients,
    loadError,
    clearClients,
    forceReloadClients,
  } = useGlobalStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredClients, setFilteredClients] = useState<ClientInfo[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [visibleClients, setVisibleClients] = useState<ClientInfo[]>([]);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastClientRef = useRef<HTMLDivElement | null>(null);
  const refreshTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Función para manejar la recarga de clientes
  const handleRefreshClients = async () => {
    setIsRefreshing(true);
    try {
      clearClients();
      await forceReloadClients();
      console.log("[ClientSelector] Clientes recargados exitosamente");
    } catch (error) {
      console.error("[ClientSelector] Error al recargar clientes:", error);
      // No mostramos el error al usuario, pero limpiamos los clientes para evitar datos corruptos
      clearClients();
    } finally {
      setIsRefreshing(false);
    }
  };

  // Función para cargar más clientes (para scroll infinito)
  const loadMoreClients = useCallback(() => {
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = page * PAGE_SIZE;
    const newBatch = filteredClients.slice(startIndex, endIndex);

    if (newBatch.length > 0) {
      setVisibleClients((prev) => [...prev, ...newBatch]);
      setPage((prev) => prev + 1);
    }
  }, [filteredClients, page]);

  // Inicializar el observer para scroll infinito
  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (
            entries[0].isIntersecting &&
            filteredClients.length > visibleClients.length
          ) {
            loadMoreClients();
          }
        },
        { threshold: 0.5 }
      );
    }

    if (lastClientRef.current) {
      observerRef.current.observe(lastClientRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreClients, filteredClients, visibleClients]);

  // Cargar clientes al inicio y establecer intervalo de actualización
  useEffect(() => {
    loadClients().catch((error) => {
      console.error("[ClientSelector] Error al cargar clientes:", error);
      // No hacemos nada más aquí, el error ya se maneja en el store
    });

    refreshTimerRef.current = setInterval(() => {
      console.log("[ClientSelector] Actualizando clientes automáticamente");
      forceReloadClients().catch((error) => {
        console.error(
          "[ClientSelector] Error en actualización automática:",
          error
        );
        // No mostramos el error al usuario
      });
    }, 5 * 60 * 1000); // 5 minutos

    return () => {
      if (refreshTimerRef.current) {
        clearInterval(refreshTimerRef.current);
      }
    };
  }, [loadClients, forceReloadClients, clearClients]);

  // Filtrar clientes cuando cambia el término de búsqueda o la lista de clientes
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredClients(clients);
    } else {
      const search = searchTerm.toLowerCase();
      const filtered = clients.filter(
        (client) =>
          client.name?.toLowerCase().includes(search) ||
          client.email?.toLowerCase().includes(search) ||
          (client.rut && client.rut.toLowerCase().includes(search))
      );
      setFilteredClients(filtered);
    }

    // Reiniciar la paginación
    setPage(1);
    setVisibleClients([]);
  }, [searchTerm, clients]);

  // Cargar la primera página cuando cambian los clientes filtrados
  useEffect(() => {
    if (filteredClients.length > 0 && visibleClients.length === 0) {
      loadMoreClients();
    }
  }, [filteredClients, visibleClients, loadMoreClients]);

  const handleSelectClient = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    if (client) {
      setSelectedClient(client);
    }
  };

  const getGiroColor = (giroType?: string | null) => {
    switch (giroType) {
      case "AFECTO":
        return "bg-blue-600 border-blue-700";
      case "EXCEMPTO":
        return "bg-[#9747FF] border-purple-700";
      case "PROPORCIONAL":
        return "bg-[#FFB800] border-amber-700";
      default:
        return "bg-gray-500 border-gray-600";
    }
  };

  const getGiroLabel = (giroType?: string | null) => {
    return giroType || "SIN GIRO";
  };

  const renderSelectedValue = () => {
    if (!selectedClient) return <span>Seleccionar cliente</span>;

    return (
      <div className="flex items-center gap-2">
        <Badge
          className={`${getGiroColor(
            selectedClient.giroType
          )} px-1 py-0 text-xs text-white font-medium rounded`}
        >
          {getGiroLabel(selectedClient.giroType)}
        </Badge>
        <span className="truncate">{selectedClient.name}</span>
      </div>
    );
  };

  const LastClientObserver = () => (
    <div ref={lastClientRef} className="h-2 w-full my-1" />
  );

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-1 lg:gap-2 w-full lg:w-auto lg:min-w-[250px]">
      <div className="flex items-center mb-0.5 lg:mb-0 lg:mr-1">
        <Users className="hidden lg:inline h-4 w-4 text-[#0F8E95]" />
        <span className="hidden lg:inline text-sm font-medium ml-1 text-[#0F8E95]">
          Cliente:
        </span>
      </div>

      <div className="relative w-full lg:w-[280px] flex items-center">
        <Select
          value={selectedClient?.id || ""}
          onValueChange={handleSelectClient}
          disabled={isLoadingClients}
        >
          <SelectTrigger className="h-8 lg:h-9 pr-8 w-full bg-white border-gray-200 hover:border-[#0F8E95] focus:ring-[#0F8E95] focus:border-[#0F8E95] rounded-lg shadow-sm transition-all duration-200 text-sm">
            {isLoadingClients ? (
              <div className="flex items-center gap-2">
                <Loader2 className="h-3 w-3 animate-spin text-[#0F8E95]" />
                <span className="text-gray-600">Cargando clientes...</span>
              </div>
            ) : (
              renderSelectedValue()
            )}
          </SelectTrigger>
          <SelectContent className="max-h-[400px] bg-white border border-gray-100 rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
            <div className="py-2 px-2 sticky top-0 z-10 border-b bg-white flex gap-2">
              <Input
                placeholder="Buscar cliente..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-9 border-gray-200 focus:ring-[#0F8E95] focus:border-[#0F8E95] rounded-lg"
              />
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleRefreshClients();
                }}
                disabled={isRefreshing || isLoadingClients}
                className="flex items-center justify-center rounded p-1 hover:bg-gray-100 disabled:opacity-50 transition-colors"
                title="Recargar clientes"
              >
                <RefreshCw
                  className={`h-4 w-4 text-[#EFC74F] ${
                    isRefreshing ? "animate-spin" : ""
                  }`}
                />
              </button>
            </div>

            {isLoadingClients && visibleClients.length === 0 ? (
              <div className="py-4 flex justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-[#0F8E95]" />
              </div>
            ) : visibleClients.length > 0 ? (
              <>
                {visibleClients.map((client) => (
                  <SelectItem
                    key={client.id}
                    value={client.id}
                    className="hover:bg-gray-50 focus:bg-gray-50 cursor-pointer rounded transition-colors data-[state=checked]:bg-[#0F8E95]/10 data-[state=checked]:text-[#0F8E95] data-[state=checked]:font-medium"
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getGiroColor(
                          client.giroType
                        )} px-1 py-0 text-xs text-white font-medium rounded`}
                      >
                        {getGiroLabel(client.giroType)}
                      </Badge>
                      <span className="truncate">{client.name}</span>
                    </div>
                  </SelectItem>
                ))}
                <LastClientObserver />
              </>
            ) : (
              <div className="p-2 text-sm text-gray-500 text-center">
                No se encontraron clientes
              </div>
            )}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
