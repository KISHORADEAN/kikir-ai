declare namespace google.accounts.oauth2 {
  interface TokenClient {
    callback: (resp: { access_token?: string; error?: string }) => void
    requestAccessToken(): void
  }

  interface TokenClientConfig {
    client_id: string
    scope: string
    callback: (resp: { access_token?: string; error?: string }) => void
  }

  function initTokenClient(config: TokenClientConfig): TokenClient
}
