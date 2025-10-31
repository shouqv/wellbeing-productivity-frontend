// crediting https://git.generalassemb.ly/SDA-SEB-02-V/DRF-example/blob/main/cat-collector-frontend/src/components/Auth/ProtectedRoute.jsx
import React from "react"
import { getUserFromToken } from "../../services/auth"
import { Navigate } from "react-router"

export default function ProtectedRoute({ children }) {
  const user = getUserFromToken()
  if (!user) return <Navigate to="/login" replace />
  return children
}