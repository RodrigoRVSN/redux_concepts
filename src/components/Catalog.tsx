import { useEffect, useState } from "react"
import api from "../services/api"
import { IProduct } from "../store/modules/cart/types"
import Catalogitem from "./CatalogItem"

export function Catalog() {
  const [catalog, setCatalog] = useState<IProduct[]>([])

  useEffect(() => {
    api.get('products').then(response => setCatalog(response.data))
  }, [])
  
  return (
    <>
      <h1>Catalogo</h1>
      {catalog.map((product => (
        <Catalogitem key={product.id} product={product}/>
      )))}
    </>
  )
}