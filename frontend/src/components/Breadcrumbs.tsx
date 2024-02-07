// import React from "react";
import { useMatches } from "react-router-dom";
type HandleType = {
  crumb: (data?: RecipeType) => React.ReactNode;
};
function Breadcrumbs() {
  const matches = useMatches();
  const crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) =>
      Boolean(match.handle && (match.handle as HandleType).crumb)
    )
    // now map them into an array of elements, passing the loader
    // data to each one
    .map(
      (match) =>
        match.handle &&
        (match.handle as HandleType).crumb(match.data as RecipeType)
    );

  return (
    <ol className="flex">
      {(crumbs as React.ReactNode[]).map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
    </ol>
  );
}

export default Breadcrumbs;
