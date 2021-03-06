import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import CovidStatsComponent from "../../components/covid-stats/CovidStatsComponent";
import Loader from "../../components/loader/Loader";
import { fetch, destroy } from "./covidStatsSlice";

const CovidStats = () => {
  const { collection, loading, uniqCountries } = useSelector(
    (state) => state.covidStatsReducer
  );
  const [selectedCountry, setSelectedCountry] = useState("Lithuania");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      fetch({
        country: selectedCountry,
      })
    );
    return () => dispatch(destroy());
  }, [dispatch, selectedCountry]);
  const onCountrySelect = (value) => {
    setSelectedCountry(value.value);
  };
  if (loading || !collection || !uniqCountries) {
    return <Loader />;
  }
  return (
    <CovidStatsComponent
      collection={collection}
      countries={uniqCountries}
      selectedCountry={selectedCountry}
      onCountrySelect={onCountrySelect}
    />
  );
};
export default CovidStats;
