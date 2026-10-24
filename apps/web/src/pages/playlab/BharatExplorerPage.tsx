// =========================================================
// BHARAT EXPLORER PAGE (VidyaVerse PlayLab Integration)
// Mounts the feature module from features/bharat-explorer
// =========================================================

import React from 'react';
import { BharatExplorerView } from '../../features/bharat-explorer/BharatExplorerView';

export * from '../../features/bharat-explorer/types';

export const BharatExplorerPage: React.FC = () => {
  return <BharatExplorerView />;
};

export default BharatExplorerPage;
