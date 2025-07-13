

import React from 'react';
import { useTranslation } from 'react-i18next';

const ComingSoonBadge= () => {
  const {t} = useTranslation()

  return (
    <div className="absolute top-0 right-0 bg-yellow-300 text-yellow-800 text-xs font-bold px-2 py-1 rounded">
      {t('featured.coming_soon.soon')}
    </div>
  );
};

export default ComingSoonBadge;
