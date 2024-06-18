import moment from "moment";
const fixTheDate = (timestamp) => {
  const date = new Date(timestamp);
  return moment(date).format("MMM DD, YYYY");
};

export default fixTheDate;
