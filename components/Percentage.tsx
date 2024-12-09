'use client'

import React, { useState, useEffect } from "react"

export default function UserPercentage () {
  const [totalUsers, setTotalUsers] = useState<number>(0)
  const [designers, setDesigners] = useState<number>(0)
  const [weavers, setWeavers] = useState<number>(0)
  const [others, setOthers] = useState<number>(0)

  useEffect(() => {

    const mockUsers = [
      { id: 1, type: "designer" },
      { id: 2, type: "weaver" },
      { id: 3, type: "designer" },
      { id: 4, type: "other" },
      { id: 5, type: "weaver" },
      { id: 6, type: "designer" },
    ];

    const designersCount = mockUsers.filter(user => user.type === "designer").length;
    const weaversCount = mockUsers.filter(user => user.type === "weaver").length;
    const othersCount = mockUsers.filter(user => user.type === "other").length;

    setTotalUsers(mockUsers.length);
    setDesigners(designersCount);
    setWeavers(weaversCount);
    setOthers(othersCount);
  }, []);

  const calculatePercentage = (count: number) => (totalUsers > 0 ? ((count / totalUsers) * 100).toFixed(2) : 0);

  return (
    <div className="py-5 space-y-3 text-2xl">
      <h1 className="text-center font-semibold">User Analytics</h1>
      <p className="text-center">Total Users: {totalUsers}</p>
      <p className="text-center">Designers: {calculatePercentage(designers)}% </p>
      <p className="text-center">Weavers: {calculatePercentage(weavers)}%</p>
      <p className="text-center">Others: {calculatePercentage(others)}%</p>
    </div>
  )
}