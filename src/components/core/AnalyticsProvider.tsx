import { useAnalytics } from '../../hooks/useAnalytics';
import { IComponent } from '../IComponent';

export const AnalyticsProvider = ({ children }: IComponent) => {
  useAnalytics();

  return children;
};
