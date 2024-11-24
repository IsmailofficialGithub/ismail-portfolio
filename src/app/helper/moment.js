import React from "react";
import moment from "moment";

function TimeAgo({ createdAt }) {
     return <span>{moment(createdAt).fromNow()}</span>;
}

export default TimeAgo;
