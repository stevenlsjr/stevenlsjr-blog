import React from 'react'
export default function ErrorPage({status, statusMessage}: any) {
  return <article>
    <h1>Error: {status}</h1>
    <p>{statusMessage}</p>
  </article>
}