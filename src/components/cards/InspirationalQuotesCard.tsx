import React from "react";
import { Button } from "@mui/material";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import { Link } from "react-router-dom";
import InfoCard from "../global/InfoCard";
import { useTranslation } from "react-i18next";
const InspirationalQuotesCard = () => {
  const {t} = useTranslation()
  return (
    <InfoCard
      title={t('featured.quotes.title')}
      icon={<FormatQuoteIcon style={{ fontSize: 40, color: '#4A90E2' }} />}
      description={t('featured.quotes.description')}
      highlights={[
        {
          icon: <EmojiObjectsIcon style={{ fontSize: 30, color: '#FF9800' }} />,
          text: t('featured.quotes.benefits'),
        },
      ]}
      button={{ text: t('featured.quotes.cta'), href: '/qoutes' }}
    />
  );
};

export default InspirationalQuotesCard;
