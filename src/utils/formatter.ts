import moment from "moment";

export const timeFormatter = (time : string) : string => (moment(time).format('hh:mm A'));

export const dateFormatter = (date : Date) : string => (moment(date).format('D MMMM YYYY'));