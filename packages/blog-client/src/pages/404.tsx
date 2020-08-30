import React from 'react'
export default function Error404({status, statusMessage}: any) {
  return <article>
    <h1>404 Not Found</h1>

    <p>Error: {status}</p>
  </article>
}