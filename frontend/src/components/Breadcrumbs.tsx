// import React from "react";
import { UIMatch, useMatches, useSearchParams } from "react-router-dom";
type HandleType = {
  crumb: (data?: RecipeType) => React.ReactNode;
};

function Breadcrumbs() {
  const [searchParams] = useSearchParams();
  const edit = searchParams.get("edit");

  const matches = useMatches() as UIMatch<RecipeType, HandleType>[];
  const crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => match.handle?.crumb)
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => match.handle.crumb(match.data));

  return (
    <ol className="flex text-lg">
      {crumbs.map((crumb, index) => (
        <li key={index}>{crumb}</li>
      ))}
      {edit === "true" && <li>&nbsp;/&nbsp;edit</li>}
    </ol>
  );
}

export default Breadcrumbs;
