import moment from 'moment';

export const convertDate = ({ date }) => moment.unix(date).format('YYYY-MM-DD');

export const formatDate = ({ date, locale }) => moment(date).locale(locale).format('MMM YYYY, D');

export const daysDifference = ({ date }) => Math.ceil(moment.duration(moment(date, 'YYYY-MM-DD').diff(moment())).asDays());

export const fetchTimestamp = ({ date }) => moment(date, 'YYYY-M-D').unix();
