import React, { createContext, useContext, useState } from 'react';

const RouteTransitionContext = createContext<{
    routeTransition: { from: string; to: string };
    setRouteTransition: React.Dispatch<React.SetStateAction<{ from: string; to: string }>>;
  } | undefined>(undefined);
  
  // Typing the props for RouteTransitionProvider to specify that children is a ReactNode
  interface RouteTransitionProviderProps {
    children: React.ReactNode;
  }

export const RouteTransitionProvider: React.FC<RouteTransitionProviderProps> = ({ children }) => {
  const [routeTransition, setRouteTransition] = useState({
    from: '',
    to: '',
  });

  return (
    <RouteTransitionContext.Provider value={{ routeTransition, setRouteTransition }}>
      {children}
    </RouteTransitionContext.Provider>
  );
};

export const useRouteTransition = () => {
    const context = useContext(RouteTransitionContext);
    if (context === undefined) {
      throw new Error('useRouteTransition must be used within a RouteTransitionProvider');
    }
    return context;
};