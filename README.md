# web3-auth
NPM for signing into Express apps using Web3.

Note this NPM disables non-AJAX requests to prevent XSRF attacks.

## How does it work
* The Web3 environment (MetaMask / Mist) is requested to sign a message using the account's private key.
* The account address and the signed message are POSTed to the backend.
* The backend verifies that the signature is correct and generates a signed Json Web Token (JWT) proving that the holder is in control of the address.
* The JWT is sent back to the web browser as a HttpOnly (not accessible from frontend JS) session cookie.

## TODO
* token revocation
* set secret in external config

Check out https://github.com/vanbexlabs/ethereum-auth-demo to see how to use it.
