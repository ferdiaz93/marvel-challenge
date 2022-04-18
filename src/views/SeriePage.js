import React, { Component } from 'react'
import { useParams } from 'react-router-dom';

const SeriePage = () => {
  const { serie_id } = useParams();

  return (
    <h1>SERIE</h1>
  )
}

export default SeriePage;