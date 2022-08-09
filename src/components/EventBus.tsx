import React, { PropsWithChildren, useContext } from 'react';
import mitt, { Emitter } from 'mitt';

const emitter = mitt();

export interface MittContextType {
  emitter: typeof emitter;
}

const EventBusContext = React.createContext<MittContextType>({ emitter });

export const EventBusProvider: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <EventBusContext.Provider value={{ emitter }}>
      {children}
    </EventBusContext.Provider>
  );
};

export const useEventBus = (): MittContextType => useContext(EventBusContext);
