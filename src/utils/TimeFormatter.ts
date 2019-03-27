import moment from "moment-timezone";
import { RouteTime } from "../types/RouteSearch";

export const formattedTime = (time: RouteTime) =>
  moment(time.time)
    .tz(time.timeZone || "Europe/Helsinki")
    .format("HH:mm");

export const duration = (from: RouteTime, to: RouteTime) =>
  moment(to.time).diff(moment(from.time), "minutes");
