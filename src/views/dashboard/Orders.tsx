import React, { useEffect, useState } from 'react'
import Link from '@mui/material/Link'
import TableSortLabel from '@mui/material/TableSortLabel'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Title from './Titles'
import api from '../../api'
import { User } from '../../types/api'

function preventDefault(event: React.MouseEvent) {
  event.preventDefault()
}

export default function Orders() {
  const [userInfoList, setUserInfoList] = useState<User.UserInfo[]>([])
  const [order, setOrder] = useState<'asc' | 'desc'>('desc')

  // Get user info
  const getUserInfo = async () => {
    try {
      const res: User.UserInfo[] = await api.getUserInfo()
      const sortedData = res.slice().sort((a, b) => a.id - b.id)
      setUserInfoList(sortedData)
    } catch (error: string | any) {
      console.error('Failed to get user info:', error)
    }
  }

  // Get user info on component mount
  useEffect(() => {
    getUserInfo()
  }, [])

  const handleRequestSort = () => {
    const isAsc = order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setUserInfoList(prevList =>
      prevList.slice().sort((a, b) => (isAsc ? a.id - b.id : b.id - a.id))
    )
  }

  return (
    <React.Fragment>
      <Title>Recent Users</Title>
      <Table size='small'>
        <TableHead>
          <TableRow>
            <TableCell sortDirection={order}>
              <TableSortLabel
                active
                direction={order}
                onClick={handleRequestSort}
              >
                No.
              </TableSortLabel>
            </TableCell>
            <TableCell>User Name</TableCell>
            <TableCell>First Name</TableCell>
            <TableCell>Last Name</TableCell>
            <TableCell>User Email</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userInfoList.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.username}</TableCell>
              <TableCell>{row.first_name}</TableCell>
              <TableCell>{row.last_name}</TableCell>
              <TableCell>{row.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color='primary' href='#' onClick={preventDefault} sx={{ mt: 3 }}>
        See more users
      </Link>
    </React.Fragment>
  )
}
