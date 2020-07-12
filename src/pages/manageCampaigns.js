import React, { useState } from 'react';
import {
  Typography,
  makeStyles,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import CampaignList from '../components/Tabs';
import Header from '../components/Header';

const useStyles = makeStyles(() => ({
  heading: {
    color: '#2B416C',
    paddingTop: '3%',
    '@media (max-width:600px)': {
      fontSize: '28px',
      fontWeight: 600,
    },
  },
  outerWrap: {
    paddingLeft: '12.5%',
    paddingRight: 180,
    paddingTop: 40,
    '@media (max-width:600px)': {
      paddingRight: 0,
    },
  },
  langBarStyle: {
    position: 'fixed',
    margin: '5%',
    padding: 20,
    right: 0,
  },
}));

const manageCampaigns = () => {
  const classes = useStyles();
  const [lang, setLang] = useState('en');

  const handleChange = (event) => {
    setLang(event.target.value);
    i18next.changeLanguage(event.target.value);
  };
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className={classes.langBarStyle}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={lang}
          onChange={handleChange}
        >
          <MenuItem value="en">English</MenuItem>
          <MenuItem value="de">German</MenuItem>
        </Select>
      </div>
      <div className={classes.outerWrap}>
        <Typography variant="h3" className={classes.heading}>
          {t('campaignActionText')}
        </Typography>
        <CampaignList language={t} />
      </div>
    </>
  );
};

export default manageCampaigns;
