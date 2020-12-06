import React, { useEffect, useState, useRef, useCallback } from "react"
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api"
import Loader from "../../common/Loader/Loader"
import MapMarker from "../../../assets/icons/MapMarker.svg"
import "@reach/combobox/styles.css"

const API_KEY = "AIzaSyCrF2ESCD9XTV0X2_4JOrAvPSIHq2NPJiI"
const libraries = ["places"]
const mapContainerStyle = {
  maxWidth: 736,
  width: "100%",
  height: 352,
  marginTop: 16,
}
const options = {
  disableDefaultUI: true,
  zoomControl: true,
}

const center = {
  lat: 54.2799058,
  lng: 48.2452392,
}

let zoom = 10

const Map = ({ formik, points, cities }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: API_KEY,
    libraries,
  })

  const mapRef = useRef()
  const onMapLoad = useCallback((map) => {
    mapRef.current = map
  }, [])

  const [currentPoints, setCurrentPoints] = useState([])
  useEffect(() => {
    const sortedPoints = []
    points.map(
      (point) =>
        formik.values.locationCity === point.cityId.name &&
        sortedPoints.push(point)
    )
    setCurrentPoints(sortedPoints)
  }, [formik.values.locationCity, points])

  useEffect(() => {
    const isCityValid = cities.find(
      (city) => city.name === formik.values.locationCity
    )
    if (isCityValid && mapRef.current) {
      const { lat, lng } = isCityValid
      mapRef.current.panTo({ lat, lng })
      mapRef.current.setZoom(12)
    }
  }, [cities, formik.values.locationCity])

  useEffect(() => {
    const isPointValid = currentPoints.find(
      (point) => point.address === formik.values.locationPoint
    )
    if (isPointValid && mapRef.current) {
      const { lat, lng } = isPointValid
      mapRef.current.panTo({ lat, lng })
      mapRef.current.setZoom(14)
      center.lat = lat
      center.lng = lng
      zoom = 14
    }
  }, [currentPoints, formik.values.locationPoint])

  const [selectedPoint, setSelectedPoint] = useState(null)

  if (!isLoaded) return <Loader />

  return (
    <>
      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={zoom}
        center={center}
        options={options}
        onLoad={onMapLoad}
      >
        {currentPoints.map((point) => (
          <Marker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            icon={{
              url: MapMarker,
              origin: new window.google.maps.Point(0, 0),
              anchor: new window.google.maps.Point(10, 10),
              scaledSize: new window.google.maps.Size(20, 20),
            }}
            onClick={() => {
              formik.setValues({
                ...formik.values,
                locationPoint: point.address,
              })
              setSelectedPoint(point)
            }}
          />
        ))}
        {selectedPoint ? (
          <InfoWindow
            position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
            onCloseClick={() => {
              setSelectedPoint(null)
            }}
          >
            <div>
              <span>{selectedPoint.name}</span>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </>
  )
}

export default Map
