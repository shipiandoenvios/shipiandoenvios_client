import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { getApiUrl } from "@/packages/config";

// Tipo para la información del usuario
export type UserInfo = {
  id: string;
  email: string;
  name: string | null;
  role: string;
  active: boolean;
  rut: string | null;
  giroType: string | null;
  empresaId: string | null;
  companyId: string | null;
  trialEnd: Date | null;
  planActive: boolean;
};

// Definición del tipo para la información del cliente
export type ClientInfo = {
  id: string;
  name: string;
  email: string;
  rut?: string | null;
  giroType?: string | null;
  claveTributaria?: string | null;
};

// Definición del tipo para notificaciones
export type Notification = {
  id: string;
  message: string;
  type: "success" | "error" | "info" | "warning";
};

// Tipo para el período
export interface Period {
  month: string;
  year: number;
}

// Interfaz para el estado de autenticación
interface AuthState {
  user: UserInfo | null;
  isAuthenticated: boolean;
  token: string | null;

  // Acciones
  setUser: (user: UserInfo | null) => void;
  setAuth: (
    isAuthenticated: boolean,
    token: string | null,
    user: UserInfo | null
  ) => void;
  logout: () => void;
}

// Crear el store con persistencia
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,

      setUser: (user) => set({ user }),

      setAuth: (isAuthenticated, token, user) => {
        // También guardar el token en localStorage para el middleware
        if (token) {
          localStorage.setItem("auth-token", token);
        }

        set({ isAuthenticated, token, user });
      },

      logout: () => {
        // Limpiar también localStorage
        localStorage.removeItem("auth-token");

        set({
          user: null,
          isAuthenticated: false,
          token: null,
        });
      },
    }),
    {
      name: "sopy-auth-store", // Nombre para localStorage
      storage: createJSONStorage(() => localStorage),
    }
  )
);

// Interfaz para el estado global
export interface GlobalState {
  notifications: Notification[];
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;

  currentPeriod: Period;
  setCurrentPeriod: (period: Period) => void;

  currentClientId: string | null;
  clients: ClientInfo[];
  selectedClient: ClientInfo | null;
  setClients: (clients: ClientInfo[]) => void;
  setSelectedClient: (client: ClientInfo | null) => void;
  loadClients: () => Promise<void>;
  isLoadingClients: boolean;
  loadError: string | null;
  clearClients: () => void;
  forceReloadClients: () => Promise<void>;
}

// Crear el store global con persistencia
export const useGlobalStore = create<GlobalState>()(
  persist(
    (set) => ({
      // Notificaciones
      notifications: [],
      addNotification: (notification: Notification) =>
        set((state) => ({
          notifications: [...state.notifications, notification],
        })),
      removeNotification: (id: string) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),

      // Estado para el período
      currentPeriod: { month: "01", year: new Date().getFullYear() },
      setCurrentPeriod: (period: Period) => set({ currentPeriod: period }),

      // Estado para clientes
      currentClientId: null,
      clients: [],
      selectedClient: null,
      isLoadingClients: false,
      loadError: null,

      setClients: (clients: ClientInfo[]) => set({ clients }),
      setSelectedClient: (client: ClientInfo | null) =>
        set({ selectedClient: client, currentClientId: client?.id || null }),

      clearClients: () =>
        set({ clients: [], selectedClient: null, currentClientId: null }),

      loadClients: async () => {
        set({ isLoadingClients: true, loadError: null });

        try {
          const response = await fetch(getApiUrl("/api/clients"), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          });

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          set({ clients: data.clients || [], isLoadingClients: false });
        } catch (error) {
          console.error("Error loading clients:", error);
          set({ loadError: "Error loading clients", isLoadingClients: false });
        }
      },

      forceReloadClients: async () => {
        set({ isLoadingClients: true, loadError: null });

        try {
          console.log("[GlobalStore] Forzando recarga de clientes...");
          const response = await fetch(getApiUrl("/api/clients"), {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            cache: "no-store",
          });

          if (!response.ok) {
            console.error(`[GlobalStore] Error HTTP: ${response.status}`);
            set({
              clients: [],
              isLoadingClients: false,
              loadError: null,
            });
            return;
          }

          const data = await response.json();
          console.log(
            `[GlobalStore] ${
              data.clients?.length || 0
            } clientes cargados (forzado)`
          );

          set({
            clients: data.clients || [],
            isLoadingClients: false,
          });
        } catch (error) {
          console.error("[GlobalStore] Error cargando clientes:", error);
          set({
            clients: [],
            loadError: null,
            isLoadingClients: false,
          });
        }
      },
    }),
    {
      name: "global-store",
      partialize: (state) => ({
        currentPeriod: state.currentPeriod,
        currentClientId: state.currentClientId,
        selectedClient: state.selectedClient,
      }),
    }
  )
);
