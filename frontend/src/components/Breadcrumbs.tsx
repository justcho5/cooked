// import React from "react";
import { useMatches, useSearchParams } from "react-router-dom";
type HandleType = {
  crumb: (data?: RecipeType) => React.ReactNode;
};

function Breadcrumbs() {
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");

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
    <ol className="flex text-lg">
      {(crumbs as React.ReactNode[]).map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
      {edit === "true" && <li>&nbsp;/&nbsp;edit</li>}
    </ol>
  );
}

export default Breadcrumbs;
