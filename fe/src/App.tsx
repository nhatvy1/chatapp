import AppThemeProvider from './components/ThemeProviders/AppThemeProviders'
import Layout from './components/layouts'
import Routes from './routes'

function App() {
  return (
    <AppThemeProvider>
      <Layout>
        <Routes />
      </Layout>
    </AppThemeProvider>
  )
}

export default App
