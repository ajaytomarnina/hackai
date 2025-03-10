// eslint-disable-next-line no-unused-vars
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Admin from 'Layout/Admin'
import Authentication from 'Layout/Authentication'
import Agents from 'Pages/Admin/Agents'
import Dashboard from 'Pages/Admin/Dashboard'
import Login, { action as loginAction } from 'Pages/Authentication/Login'
import { SnackbarProvider, useSnackbar } from 'notistack'
import { createRef } from 'react'
import CloseIcon from 'assets/Icons/close-white.svg'
import { RecoilRoot } from 'recoil'
import 'scss/global.scss'
import Chat from 'Pages/Admin/Chat'

function App() {
  const notistackRef = createRef()
  const { enqueueSnackbar } = useSnackbar()
  const onClickDismiss = (key) => {
    notistackRef?.current?.closeSnackbar(key)
  }
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Authentication />,
      errorElement: <Navigate to="/login" replace />,
      children: [
        { path: '/', element: <Navigate to="login?mode=email" replace /> },
        { path: 'login', element: <Login />, action: loginAction },
      ],
    },
    {
      path: '/',
      element: <Admin />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'agents', element: <Agents /> },
        { path: 'chat', element: <Chat /> },
      ],
    },
  ])

  return (
    <SnackbarProvider
      ref={notistackRef}
      autoHideDuration={2000}
      action={(key) => (
        <img
          width={20}
          height={20}
          src={CloseIcon}
          alt=""
          className="cursor-pointer"
          onClick={() => {
            onClickDismiss(key)
          }}
        />
      )}
      maxSnack={1}
      className="text-xl"
      anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
    >
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </SnackbarProvider>
  )
}

export default App
