import React from 'react';
import { Box, fontSizeLine, Text, useI18n } from 'vnpt-rn-component';

const TextTitle = () => {
  const i18n = useI18n();
  return (
    <Box>
      <Text size={fontSizeLine(14)}>{i18n.t('labels.title')}</Text>
    </Box>
  );
};

export default TextTitle;
