/**
 * LoadingScreen Component Types
 */

export interface LoadingScreenProps {
  /**
   * Text to display while loading
   * @default 'Portfolio'
   */
  text?: string;
  
  /**
   * Duration of the loading screen in milliseconds
   * @default 1500
   */
  duration?: number;
  
  /**
   * Callback when loading completes
   */
  onLoadingComplete?: () => void;
  
  /**
   * Additional CSS classes
   */
  className?: string;
}

