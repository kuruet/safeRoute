// Risk Engine Service
// Responsible for computing safety risk of routes

import Report from "../models/report.js";
import { getTimeWeight } from "../utils/timeWeight.js";

/*
Sample route points to create evaluation segments.
Higher resolution improves route differentiation.
*/
function sampleRouteSegments(routeCoordinates, sampleRate = 2) {
  const segments = [];

  for (let i = 0; i < routeCoordinates.length; i += sampleRate) {
    const [lng, lat] = routeCoordinates[i];

    segments.push({
      lng,
      lat
    });
  }

  return segments;
}

/*
Find reports near a route segment
*/
 

/*
Main Route Risk Calculation
*/
export async function calculateRouteRisk(routeCoordinates) {

  if (!routeCoordinates || routeCoordinates.length === 0) {
    return 0;
  }

  const segments = sampleRouteSegments(routeCoordinates);

  const segmentRisks = [];

  /* Fetch reports once instead of querying MongoDB per segment */
  const allReports = await Report.find({});

  for (const segment of segments) {

    /* Find nearby reports in memory */
    const nearbyReports = allReports.filter((report) => {

      const [reportLng, reportLat] = report.location.coordinates;

      const distance = calculateDistanceMeters(
        segment.lat,
        segment.lng,
        reportLat,
        reportLng
      );

      return distance <= 100;

    });

    let segmentRisk = 0;

    for (const report of nearbyReports) {

      const risk = calculateReportRisk(report, segment);

      if (!Number.isNaN(risk)) {
        segmentRisk += risk;
      }

    }

    /*
    Cluster amplification
    More reports in same area increases perceived danger
    */
    const clusterFactor = 1 + Math.min(nearbyReports.length / 4, 2);

    segmentRisk = segmentRisk * clusterFactor;

    segmentRisks.push(segmentRisk);

  }

  if (segmentRisks.length === 0) {
    return 0;
  }

  /*
  Use average segment risk instead of sum
  Prevents longer routes from automatically appearing riskier
  */
  const totalRisk = segmentRisks.reduce((a, b) => a + b, 0);

  const averageRisk = totalRisk / segmentRisks.length;

  return averageRisk;

}

/*
Distance calculation using Haversine formula
*/
function calculateDistanceMeters(lat1, lng1, lat2, lng2) {

  const R = 6371000;

  const toRad = (deg) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) *
    Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;

}

/*
Proximity decay model
Creates smoother risk corridor
*/
function getDistanceWeight(distance) {

  if (distance <= 40) return 1.0;
  if (distance <= 80) return 0.8;
  if (distance <= 120) return 0.5;
  if (distance <= 160) return 0.25;

  return 0;

}

/*
Risk contribution of a single report
*/
function calculateReportRisk(report, segment) {

  const [reportLng, reportLat] = report.location.coordinates;

  const distance = calculateDistanceMeters(
    segment.lat,
    segment.lng,
    reportLat,
    reportLng
  );

  const proximityWeight = getDistanceWeight(distance);

  if (proximityWeight === 0) return 0;

  const severityWeight = report.severity || 1;

  const timeWeight = getTimeWeight(report.createdAt);

  const riskContribution =
    severityWeight *
    proximityWeight *
    timeWeight;

  return riskContribution;

}