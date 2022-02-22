import {Link, LinkProps, useMatch, useResolvedPath} from "react-router-dom";
import React from "react";

export function WrappedLink({children,to,...props}:LinkProps){
  let resolved = useResolvedPath(to)
  let match = useMatch({path:resolved.pathname,end:false})
  console.log(resolved,match)
  return (
    <>
      <Link
        style={{
          color:match?'blue':'black',
          textDecoration:'none',
        }}
        to={to}
      >
        {children}
      </Link>
    </>
  )
}